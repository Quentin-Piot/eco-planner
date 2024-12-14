import { Controller } from "react-hook-form";
import { ActionFunctionArgs, Form } from "react-router";

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

import { zodResolver } from "@hookform/resolvers/zod";
import { TransportationType } from "@quentinpiot/shared";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import * as zod from "zod";

import { generateItinerary } from "@/api/itinerary/itinerary.api";

import type { Route } from "../+types/root";

const transportationTypes = createListCollection({
  items: [
    {
      label: "Transports en commun",
      value: TransportationType.PUBLIC_TRANSPORT,
    },
    { label: "Voiture", value: TransportationType.PRIVATE_TRANSPORT },
  ],
});

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Eco Planner",
      description: "Générer un itinéraire avec Eco Planner",
    },
  ];
}

const schema = zod.object({
  startingPlace: zod.string().min(1, "Veuillez renseigner une ville de départ"),
  transportationType: zod.array(zod.nativeEnum(TransportationType)),
  numberOfDays: zod.coerce
    .number()
    .int()
    .positive()
    .min(1, "Minimum de 1 jour")
    .max(14, "Maximum de 14 jours"),
});

type FormData = zod.infer<typeof schema>;

const resolver = zodResolver(schema);

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);

  if (errors) {
    return { errors, defaultValues };
  }

  return await generateItinerary({
    transportationType: data.transportationType[0] as any,
    totalNumberOfDays: data.numberOfDays,
    startingPlace: data.startingPlace,
    travelPreferences: [],
  });
};

export default function HomePage({ actionData }: Route.ComponentProps) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
    defaultValues: {
      startingPlace: "Biarritz",
      transportationType: [TransportationType.PUBLIC_TRANSPORT],
      numberOfDays: 7,
    },
  });

  return (
    <Container width="xl">
      <GlassCard
        title={"Générer un itinéraire éco-responsable en france"}
        footer={
          <Button type={"submit"} form={"itinerary"}>
            Générer l'itinéraire
          </Button>
        }
      >
        <Form onSubmit={handleSubmit} method="POST" id={"itinerary"}>
          <VStack gap={3}>
            <Field
              label="Ville de départ"
              errorText={errors.startingPlace?.message}
              invalid={!!errors.startingPlace}
            >
              <Input
                placeholder="Biarritz"
                type={"text"}
                {...register("startingPlace")}
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
                {...register("numberOfDays")}
              />
            </Field>
          </VStack>
        </Form>
      </GlassCard>
    </Container>
  );
}
