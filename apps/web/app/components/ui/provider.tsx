"use client";

import {
  ChakraProvider,
  createSystem,
  defaultSystem,
  defineConfig,
  defineRecipe,
  mergeConfigs,
} from "@chakra-ui/react";

import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export const config = defineConfig({
  theme: {
    recipes: {
      input: defineRecipe({
        defaultVariants: {
          colorPalette: "red",
          visual: "subtle",
        },
        variants: {
          visual: {
            subtle: {
              bg: "gray.50",
              borderColor: "gray.400",
              _focus: {
                borderColor: "primary",
              },
            },
          },
        },
      }),
    },
    tokens: {
      colors: {
        primary: { value: "#007A5C" },
        primaryLight: { value: "#B1CFC8" },
        secondary: { value: "#E1A28E" },
      },
      fonts: {
        body: { value: "system-ui, verdana" },
      },
    },
  },
});

const mergedConfig = mergeConfigs(defaultSystem._config, config);
const system = createSystem(mergedConfig);

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
