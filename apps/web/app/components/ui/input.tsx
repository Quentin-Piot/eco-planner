import * as React from "react";

import type { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { Input as ChakraInput } from "@chakra-ui/react";

export type InputProps = ChakraInputProps;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref: any) {
    const { children, ...rest } = props;

    return (
      <ChakraInput variant={"subtle"} ref={ref} {...rest}>
        {children}
      </ChakraInput>
    );
  },
);
