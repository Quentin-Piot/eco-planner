"use client";

import {
  ChakraProvider,
  createSystem,
  defaultSystem,
  defineConfig,
} from "@chakra-ui/react";

import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "#196f3d" },
        secondary: { value: "#95d8b1" },
      },
      fonts: {
        body: { value: "system-ui, verdana" },
      },
    },
  },
});

const system = createSystem(defaultSystem._config, config);

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
