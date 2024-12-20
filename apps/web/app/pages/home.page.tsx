import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import {
  ActionFunctionArgs,
  Form,
  useNavigate,
  useNavigation,
} from "react-router";

import {
  Container,
  createListCollection,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { AutocompleteSelect } from "@/components/ui/autocomplete-select";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "@/components/ui/radio-card";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  GenerateItinerariesResponse,
  TransportationType,
} from "@quentinpiot/shared";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import * as zod from "zod";

import { generateItinerary } from "@/api/itinerary/itinerary.api";
import regions from "@/assets/regions-geo.json";
import { LeafletMap } from "@/components/map/leaflet-map";
import { useItinerary } from "@/hooks/itinerary.hook";

import { Route } from "../../.react-router/types/app/pages/+types/home.page";

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
  startingPlace: zod
    .string({ required_error: "Veuillez renseigner une ville de départ" })
    .min(1, "Veuillez renseigner une ville de départ"),
  mandatoryStage: zod.string({
    required_error: "Veuillez renseigner une destination",
  }),
  transportationType: zod.array(zod.nativeEnum(TransportationType)),
  numberOfDays: zod.coerce
    .number()
    .int("Veuillez renseigner un nombre de jours entre 1 et 14")
    .min(1, "Veuillez renseigner un minimum de 1 jour")
    .max(14, "Veuillez renseigner un maximum de 14 jours"),
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
    mandatoryStage:
      data.mandatoryStage && data.mandatoryStage.length
        ? data.mandatoryStage
        : undefined,
  });
};

type DestinationType = "city" | "region" | "anywhere";

const destinationTypeItems: {
  title: string;
  description: string;
  value: DestinationType;
}[] = [
  { value: "city", title: "Ville", description: "J'ai une ville en tête" },
  { value: "region", title: "Région", description: "J'ai une région en tête" },

  { value: "anywhere", title: "Partout", description: "Surprends moi" },
];

export default function HomePage({ actionData }: Route.ComponentProps) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
    defaultValues: {
      transportationType: [TransportationType.PUBLIC_TRANSPORT],
      numberOfDays: 7,
    },
  });

  const [destinationType, setDestinationType] =
    useState<DestinationType>("anywhere");

  const { setOriginalItinerary, setClassicItinerary, getCitiesFromSearchTerm } =
    useItinerary();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.formAction === "/";

  useEffect(() => {
    const itineraries = actionData as GenerateItinerariesResponse;
    if (
      itineraries &&
      itineraries.classicItinerary &&
      itineraries.originalItinerary
    ) {
      setClassicItinerary(itineraries.classicItinerary);
      setOriginalItinerary(itineraries.originalItinerary);
      navigate("/itinerary");
    }
  }, [actionData, navigate, setClassicItinerary, setOriginalItinerary]);

  return (
    <Container width="6xl">
      <GlassCard
        title={"Générer un itinéraire éco-responsable en france"}
        footer={
          <Button type={"submit"} form={"itinerary"} loading={isLoading}>
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
              <AutocompleteSelect
                control={control}
                name={"startingPlace"}
                getSelection={getCitiesFromSearchTerm}
              />
            </Field>

            <RadioCardRoot
              width={"100%"}
              value={destinationType}
              onValueChange={(e) => {
                setDestinationType(e.value as any);
                return setValue(
                  "mandatoryStage",
                  e.value === "anywhere" ? "" : (undefined as any),
                );
              }}
            >
              <RadioCardLabel>Destination</RadioCardLabel>
              <Flex
                flexDirection={{ base: "column", lg: "row" }}
                gap={2}
                align="stretch"
              >
                {destinationTypeItems.map((item) => (
                  <RadioCardItem
                    label={item.description}
                    key={item.value}
                    value={item.value}
                  />
                ))}
              </Flex>
            </RadioCardRoot>

            {destinationType === "city" && (
              <Field
                label="Ville de destination"
                errorText={errors.mandatoryStage?.message}
                invalid={!!errors.mandatoryStage}
              >
                <AutocompleteSelect
                  control={control}
                  name={"mandatoryStage"}
                  getSelection={getCitiesFromSearchTerm}
                />
              </Field>
            )}

            {destinationType === "region" && (
              <Field
                errorText={errors.mandatoryStage?.message}
                invalid={!!errors.mandatoryStage}
              >
                <Controller
                  control={control}
                  name="mandatoryStage"
                  render={({ field }) => (
                    <LeafletMap
                      isInvalid={!!errors.mandatoryStage?.message}
                      gjson={regions}
                      selectedFeature={field.value}
                      onFeatureSelect={(feature) => field.onChange(feature)}
                    />
                  )}
                />
              </Field>
            )}
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
              <Input type={"number"} {...register("numberOfDays")} />
            </Field>
          </VStack>
        </Form>
      </GlassCard>
    </Container>
  );
}
