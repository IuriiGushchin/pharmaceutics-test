import * as React from "react";

export default function useLabelState(initialValue, name) {
    const [value, setValue] = React.useState(initialValue);
    React.useDebugValue(`${name}: ${value}`);
    return [value, setValue];
  }