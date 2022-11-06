import { Search } from "@web3uikit/icons";
import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import PhantomButton from "../PhantomButton";
import { FONT_FAMILY, hideBrowserOutline } from "../Text";

type SearchBarProps = {
  query?: string | null;
  onQueryChange: (q: string) => void;
  onSubmit: () => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  focusOnMount?: boolean;
};

export const SearchBar = ({
  className,
  disabled,
  placeholder,
  query,
  focusOnMount,
  onKeyDown,
  onSubmit,
  onClick,
  onQueryChange,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (focusOnMount) {
      inputRef.current?.focus();
    }
  }, [focusOnMount]);

  return (
    <SearchForm
      role="search"
      tabIndex={-1}
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <PhantomInput
        ref={inputRef}
        type="text"
        className={clsx({ disabled })}
        disabled={disabled}
        tabIndex={0}
        placeholder={placeholder}
        onChange={(e: any) => onQueryChange(e.target.value)}
        value={query ?? ""}
        onClick={onClick}
        onKeyDown={onKeyDown}
      />
      <SearchButtonBase
        disabled={disabled || !query}
        type="submit"
        onClick={() => onSubmit()}
      >
        <Search width="1.5rem" height="1.5rem" />
      </SearchButtonBase>
    </SearchForm>
  );
};

const searchBarWrapperStyle = css`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: none;
  box-sizing: border-box;
  width: 100%;

  background: white;

  &:not(.bg-white) {
    background: #ebf2fb; //basic200
  }

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;

  font-family: ${FONT_FAMILY.light};
  line-height: 20px;

  border: 1px solid #bcc7df; // basic500
  border-radius: 0.5rem;

  &.error:not(:focus):not(.focus) {
    background: rgba(234, 49, 49, 0.08); // dangerT100
    border-color: #ea3131; // danger500
  }

  &.focus:not(.disabled),
  &:focus:not(.disabled),
  &:active:not(.disabled) {
    outline: none;
    border-color: #3b4b81; // basic800
  }

  &.disabled {
    cursor: not-allowed;
    background: rgba(40, 29, 117, 0.16); // basicT200
    border-color: rgba(40, 29, 117, 0.4); // basicT500
    & > input,
    button {
      cursor: not-allowed;
      opacity: 0.8;
    }
  }
`;

const SearchForm = styled.form`
  ${searchBarWrapperStyle};
`;

const SearchButtonBase = styled(PhantomButton)`
  padding: 0.5rem;
  margin: 0;
  touch-action: manipulation;
  cursor: pointer;
  border-top-right-radius: inherit;
  border-top-left-radius: 0;
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: 0;
  white-space: nowrap;
  user-select: none;
  -webkit-font-smoothing: antialiased;
  background-image: none;
  display: inline-flex;
  align-items: center;
  height: 100%;
  width: auto;
  :active:not(:disabled) {
    background-color: #bcc7df;
  }
`;

const PhantomInput = styled.input`
  ${hideBrowserOutline}
  font-size: 1rem;
  font-family: ${FONT_FAMILY.light};
  background: none !important;
  border: none !important;
  outline: none !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 2;
  cursor: text;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  width: 100%;
  height: 100%;
`;
