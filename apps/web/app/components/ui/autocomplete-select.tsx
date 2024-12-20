"use client";

import { FC, useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";

import { Box } from "@chakra-ui/react";
import { Input } from "@/components/ui/input";
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
                  type="text"
                  ref={ref}
                  variant={"outline"}
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSuggestions(getSelection(value));
                    field.onChange(value);
                    setActiveIndex(null);
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
              <PopoverContent width="auto" borderRadius={"0.25em"}>
                <PopoverBody p={0}>
                  {suggestions.map((suggestion, index) => (
                    <Box
                      borderTopRadius={index === 0 ? "0.25em" : 0}
                      borderBottomRadius={
                        index === suggestions.length - 1 ? "0.25em" : 0
                      }
                      key={suggestion}
                      onClick={() => {
                        field.onChange(suggestion);
                        setSuggestions([]);
                      }}
                      p={2}
                      bgColor={
                        activeIndex === index ? "primaryLight" : "transparent"
                      }
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
