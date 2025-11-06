"use client";

import * as React from "react";

type LoaderState = {
  showing: boolean;
};

type LoaderAction = { type: "SHOW_LOADER" } | { type: "HIDE_LOADER" };

const loaderReducer = (
  state: LoaderState,
  action: LoaderAction,
): LoaderState => {
  switch (action.type) {
    case "SHOW_LOADER":
      return { showing: true };
    case "HIDE_LOADER":
      return { showing: false };
    default:
      return state;
  }
};

let memoryState: LoaderState = { showing: false };
const listeners: Array<(state: LoaderState) => void> = [];

function dispatch(action: LoaderAction) {
  memoryState = loaderReducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

export function useLoader() {
  const [state, setState] = React.useState<LoaderState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  const showLoader = React.useCallback(
    () => dispatch({ type: "SHOW_LOADER" }),
    [],
  );
  const hideLoader = React.useCallback(
    () => dispatch({ type: "HIDE_LOADER" }),
    [],
  );

  return {
    loading: state.showing,
    showLoader,
    hideLoader,
  };
}
