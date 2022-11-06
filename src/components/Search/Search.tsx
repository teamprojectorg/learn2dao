import clsx from "clsx";
import keyboardKey from "keyboard-key";
import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import Text from "../Text";
import { SearchBar } from "./SearchBar";
import { FocusHandler, Option, RenderOption, Value } from "./types";
import useMenu from "./useMenu";
import { OptionFetcher, useSearch } from "./useSearch";

const directionMap: Record<number, -1 | 1> = {
  [keyboardKey.ArrowUp]: -1,
  [keyboardKey.ArrowDown]: 1,
};

const DefaultRenderOption: RenderOption<any> = ({ option }) => (
  <OptText>{option.label}</OptText>
);

const OptText = styled(Text.bodySmall)`
  margin: 0;
  user-select: none;
`;

export type SearchProps<V extends Value, T> = {
  /** function for fetching data async */
  dataFetcher: OptionFetcher<V, T>;
  /** callback triggered on search */
  onSearch: (query: string) => void;
  /** placeholder in input */
  placeholder?: string;
  /** onBlur handler  */
  onBlur?: FocusHandler;
  /** onFocus handler */
  onFocus?: FocusHandler;
  /** onOpen handler */
  onOpen?: () => void;
  /** whether or not to close dropdown on ESC (escape) */
  closeOnEsc?: boolean;
  /** is the dropdown disabled */
  disabled?: boolean;
  /** custom method for rendering option */
  renderOption?: RenderOption<V, T>;
  /* class names of outer wrapper */
  className?: string;
  /* [[TODO]]: what should be shown when loading new options */
  renderLoading?: () => JSX.Element;
  /* limit number of results shown in dropdown */
  optionLimit?: number;
  /* header of the search (logo, etc) */
  header?: React.ReactElement;
};

export function Search<V extends Value, T = undefined>({
  dataFetcher,
  onBlur,
  onFocus,
  onOpen,
  onSearch,
  closeOnEsc = true,
  disabled,
  className,
  placeholder = "Search...",
  optionLimit: limit,
  renderOption: RenderOpt = DefaultRenderOption,
}: SearchProps<V, T>) {
  const { options, loading, error, setQuery, query, moveOptionIdx, optIdx } =
    useSearch({
      dataFetcher,
      limit,
    });

  const {
    containerRef,
    menuRef,
    open,
    focus,
    openMenu,
    closeMenu,
    onBlurHandler,
    onFocusHandler,
  } = useMenu({
    onBlur,
    onFocus,
    onOpen,
    disabled,
  });

  const hasOptions = Boolean(options.length);

  const onSelectRaw = useCallback(
    (val: string) => {
      onSearch(val);
      closeMenu();
    },
    [onSearch, setQuery, closeMenu]
  );

  const onSelectOption = useCallback(
    (option: Option<V, T>) => {
      onSelectRaw(String(option.id));
      setQuery(option.label);
    },
    [onSelectRaw, setQuery]
  );

  const onSubmit = useCallback(() => {
    if (!query) return;
    onSelectRaw(query);
  }, [query, onSelectRaw]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const code = keyboardKey.getCode(e);
    if (!code) return;

    // event only happens if the menu is not open
    if (code === keyboardKey.Spacebar) {
      // don't prevent default here or space in input won't be picked up
      if (!open) openMenu();
      return;
    }

    // these keydown events only happen when the menu is open
    if (!open) return;

    if (code === keyboardKey.Enter) {
      e.preventDefault();
      if (optIdx < 0 || optIdx > options.length - 1) return;
      const option = options[optIdx];
      return onSelectOption(option);
    }

    if (code === keyboardKey.Escape) {
      if (!closeOnEsc) return;
      e.preventDefault();
      return closeMenu();
    }

    if (code === keyboardKey.Spacebar) {
      e.preventDefault();
      return openMenu();
    }

    const direction = directionMap[code];
    if (!direction) return;
    e.preventDefault();
    moveOptionIdx(direction);
  };

  const dropdownResults = useMemo(() => {
    if (!open || !hasOptions) return null;
    return (
      <DropdownMenu ref={menuRef} tabIndex={-1}>
        <ul role="listbox" tabIndex={-1}>
          {options.map((option, idx) => {
            const selected = optIdx === idx;
            return (
              <li
                className={clsx("option", { selected })}
                id={`option-${idx}`}
                key={option.id}
                role="option"
                aria-disabled={false}
                aria-label={option.label}
                aria-selected={selected}
                tabIndex={-1}
                onClick={(e) => {
                  e.preventDefault();
                  setQuery(option.label);
                  onSelectOption(option);
                }}
              >
                <RenderOpt option={option} />
              </li>
            );
          })}
        </ul>
      </DropdownMenu>
    );
  }, [
    open,
    hasOptions,
    menuRef,
    options,
    optIdx,
    RenderOpt,
    onSelectOption,
    setQuery,
  ]);

  const formClasses = clsx(className, {
    error,
    loading,
    disabled,
    focus,
  });

  return (
    <div
      className="pa0 ma0"
      ref={containerRef}
      tabIndex={0}
      style={{ position: "relative" }}
      /* TODO: not sure if these should be here. this needs some tweaking HANDE FULL ON FOCUS */
      onFocus={(e) => onFocusHandler(e)}
      onBlur={(e) => onBlurHandler(e)}
    >
      <SearchBar
        className={clsx("bg-white", formClasses)}
        onSubmit={onSubmit}
        onKeyDown={onKeyDown}
        onClick={() => openMenu()}
        query={query}
        onQueryChange={setQuery}
        placeholder={placeholder}
        disabled={disabled}
      />
      {dropdownResults}
    </div>
  );
}

const DropdownMenu = styled.div`
  top: calc(100% + 0.25rem);
  left: 0;
  width: 100%;
  z-index: 10;
  background-color: white;

  position: absolute;
  max-height: 30rem;
  overflow-y: scroll;
  border-radius: 0.25rem;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  & li {
    outline: none;

    &.group-header {
      padding: 1rem;
      cursor: default;
    }

    &.option {
      cursor: pointer;
      padding: 0.75rem 1rem;
      &:hover,
      &:focus,
      &.selected {
        background-color: rgb(238, 238, 238);
      }
    }
  }
`;
