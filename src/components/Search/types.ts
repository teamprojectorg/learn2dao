type WithData<Base, DataType> = DataType extends undefined
  ? Base
  : Base & { data: DataType };
export type Value = string | number;
export type Option<V, T = undefined> = Readonly<
  WithData<{ id: V; label: string }, T>
>;
export type RenderOption<V, T = undefined> = (props: {
  option: Option<V, T>;
}) => JSX.Element;
export type FocusHandler = (e: React.FocusEvent<HTMLElement>) => void;
