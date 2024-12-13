import { Controller, useForm } from "react-hook-form";

import {
  Container,
  createListCollection,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { GlassCard } from "@/components/ui/glass-card";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

import { useMutation } from "@tanstack/react-query";

import { generateItinerary } from "@/api/itinerary/itinerary.api";

const transportationTypes = createListCollection({
  items: [
    { label: "Transports en commun", value: "PUBLIC_TRANSPORT" },
    { label: "Voiture", value: "PRIVATE_TRANSPORT" },
  ],
});

type FormValues = {
  startingPlace: string;
  transportationType: [string];
  numberOfDays: number;
};

export async function loader() {
  return { message: "Hello, world!" };
}

export default function HomePage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      startingPlace: "",
      transportationType: ["PUBLIC_TRANSPORT"],
      numberOfDays: 7,
    },
  });

  const generateItineraryMutation = useMutation({
    mutationFn: generateItinerary,
    onSuccess: async (data) => {
      console.log(data);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    return generateItineraryMutation.mutate({
      startingPlace: data.startingPlace,
      transportationType: data.transportationType[0] as any,
      travelPreferences: [],
      totalNumberOfDays: data.numberOfDays,
    });
  });

  return (
    <Container width="xl">
      <GlassCard
        title={"Générer un itinéraire éco-responsable en france"}
        footer={
          <Button type={"submit"} form={"itinerate-form"}>
            Générer l'itinéraire
          </Button>
        }
      >
        <form id="itinerate-form" onSubmit={onSubmit}>
          <VStack gap={3}>
            <Field
              label="Ville de départ"
              errorText={errors.startingPlace?.message}
              invalid={!!errors.startingPlace}
            >
              <Input
                placeholder="Biarritz"
                type={"text"}
                {...register("startingPlace", {
                  required: "Veuillez renseigner une ville de départ",
                })}
              />
            </Field>
            <Field
              errorText={errors.transportationType?.message}
              invalid={!!errors.transportationType}
            >
              <Controller
                control={control}
                name="transportationType"
                render={({ field }) => (
                  <SelectRoot
                    value={field.value}
                    collection={transportationTypes}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                  >
                    <SelectLabel>Mode de transport</SelectLabel>
                    <SelectTrigger>
                      <SelectValueText placeholder="Mode de transport" />
                    </SelectTrigger>
                    <SelectContent>
                      {transportationTypes.items.map((transportationType) => (
                        <SelectItem
                          item={transportationType}
                          key={transportationType.value}
                        >
                          {transportationType.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                )}
              />
            </Field>
            <Field
              label="Nombre de jours"
              width={"100%"}
              errorText={errors.numberOfDays?.message}
              invalid={!!errors.numberOfDays}
            >
              <Input
                placeholder="7"
                type={"number"}
                {...register("numberOfDays", {
                  min: {
                    value: 3,
                    message: "Le nombre de jour minimum est de 3",
                  },
                  max: {
                    value: 7,
                    message: "Le nombre de jour maximum est de 7",
                  },
                })}
              />
            </Field>
          </VStack>
        </form>
      </GlassCard>
    </Container>
  );
}
