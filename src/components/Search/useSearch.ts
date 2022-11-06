import debounce from "lodash/debounce";
import { useCallback, useEffect, useState } from "react";
import useOptions from "./useOptions";
import { Option } from "./types";

export type OptionFetcher<V, T = undefined> = (
  query: string
) => Promise<Option<V, T>[]>;

export type HookProperties<V, T = undefined> = {
  dataFetcher: OptionFetcher<V, T>;
  limit?: number;
};

export function useSearch<V, T = undefined>({
  dataFetcher,
}: HookProperties<V, T>) {
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const { options, setOptions, moveOptionIdx, optIdx } = useOptions<V, T>({
    options: [],
  });

  const onSetQuery = useCallback(
    debounce(async (query: string) => {
      if (!query || query.length < 2) return;
      try {
        setLoading(true);
        const options = await dataFetcher(query);
        if (options) {
          setOptions(options);
        }
      } catch (e) {
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    }, 250),
    [setOptions, setError, setLoading, options]
  );

  useEffect(() => {
    if (!query) return;
    onSetQuery(query);
  }, [query]);

  return { loading, options, error, setQuery, query, moveOptionIdx, optIdx };
}
