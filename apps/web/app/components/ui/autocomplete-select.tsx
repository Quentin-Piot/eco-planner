"use client";

import { FC, useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";

import { Box, Input } from "@chakra-ui/react";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";

type AutocompleteSelectProps = {
  control: Control<any>;
  name: string;
  getSelection: (searchTerm: string) => string[]; // Hook pour obtenir les suggestions
};

export const AutocompleteSelect: FC<AutocompleteSelectProps> = ({
  control,
  name,
  getSelection,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Box width={"100%"}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <PopoverRoot
              positioning={{ sameWidth: true }}
              open={suggestions.length > 0}
              lazyMount
              initialFocusEl={() => ref.current}
            >
              <PopoverTrigger asChild>
                <Input
                  width={"100%"}
                  placeholder="Biarritz"
                  type="text"
                  ref={ref}
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSuggestions(getSelection(value));
                    field.onChange(value);
                    setActiveIndex(null); // Réinitialise l'index actif
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      setActiveIndex((prev) =>
                        prev === null || prev === suggestions.length - 1
                          ? 0
                          : prev + 1,
                      );
                      e.preventDefault();
                    } else if (e.key === "ArrowUp") {
                      setActiveIndex((prev) =>
                        prev === null || prev === 0
                          ? suggestions.length - 1
                          : prev - 1,
                      );
                      e.preventDefault();
                    } else if (e.key === "Enter") {
                      if (activeIndex !== null && suggestions[activeIndex]) {
                        field.onChange(suggestions[activeIndex]); // Met à jour la valeur avec la suggestion choisie
                        setSuggestions([]); // Réinitialise les suggestions
                        e.preventDefault(); // Empêche la soumission du formulaire
                      }
                    }
                  }}
                />
              </PopoverTrigger>
              <PopoverContent width="auto">
                <PopoverBody>
                  {suggestions.map((suggestion, index) => (
                    <Box
                      key={suggestion}
                      onClick={() => {
                        field.onChange(suggestion); // Met à jour la valeur avec la suggestion cliquée
                        setSuggestions([]); // Réinitialise les suggestions
                      }}
                      paddingX={2}
                      paddingY={2}
                      bgColor={activeIndex === index ? "#eee" : "transparent"}
                      cursor={"pointer"}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      {suggestion}
                    </Box>
                  ))}
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
          );
        }}
      />
    </Box>
  );
};
