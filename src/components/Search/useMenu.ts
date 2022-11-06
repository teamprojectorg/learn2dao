import React, { useCallback, useRef, useState } from "react";

const useMenu = () => {
  const timeoutId = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  const onFocusHandler = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      setFocus(true);
    },
    [setFocus]
  );

  const onBlurHandler = useCallback(
    // close on blur default
    (e: React.FocusEvent<HTMLElement>) => {
      const { currentTarget } = e;
      // Check the newly focused element in the next tick of the event loop
      timeoutId.current = setTimeout(() => {
        // Check if the new activeElement is a child of the original container
        if (!currentTarget.contains(document.activeElement)) {
          setFocus(false);
          setOpen(false);
        }
      }, 0);
    },
    [setFocus, setOpen]
  );

  const closeMenu = () => {
    if (!open) return;
    setOpen(false);
    setFocus(false);
    containerRef.current?.blur();
    menuRef.current?.blur();
  };

  const openMenu = () => {
    if (open) return;
    setOpen(true);
  };

  return {
    containerRef,
    menuRef,
    open,
    focus,
    onBlurHandler,
    onFocusHandler,
    closeMenu,
    openMenu,
  };
};

export default useMenu;
