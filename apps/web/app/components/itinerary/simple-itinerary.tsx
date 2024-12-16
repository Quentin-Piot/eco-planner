import React from "react";

import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Separator,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Itinerary } from "@quentinpiot/shared";

type ItineraryDisplayProps = {
  itinerary: Itinerary;
  type: "classic" | "original";
};
const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({
  itinerary,
  type,
}) => {
  return (
    <Box w="100%">
      <Heading size="xl" textAlign="center" mb={4}>
        Itinéraire {type === "classic" ? "Classique" : "Original"}
      </Heading>
      <Separator mb={5} />

      <VStack gap={3} align="stretch">
        <Flex>
          <Text fontWeight="bold">Budget estimé:</Text>
          <Spacer />
          <Text>${itinerary.totalBudget.toFixed(2)}</Text>
        </Flex>

        <Flex>
          <Text fontWeight="bold">Impact carbone:</Text>
          <Spacer />
          <Text>{itinerary.totalCarbonImpact} kg CO₂</Text>
        </Flex>
      </VStack>

      <Separator my={5} />

      <VStack gap={4} align="stretch">
        {itinerary.stages.map((stage, index) => (
          <Box key={index} bg="white" p={4} borderRadius="md" boxShadow="sm">
            <HStack justify="space-between">
              <Text fontWeight="bold" fontSize="lg">
                {stage.city}, {stage.country}
              </Text>
              <Badge colorScheme="blue">
                {stage.numberOfDays} {stage.numberOfDays > 1 ? "jours" : "jour"}
              </Badge>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ItineraryDisplay;
