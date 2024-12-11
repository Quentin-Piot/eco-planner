import { PropsWithChildren } from "react";
import { LuCheckCircle, LuStopCircle } from "react-icons/lu";

import { Container, Flex, Text } from "@chakra-ui/react";
import { GlassCard } from "@/components/ui/glass-card";

import { useQuery } from "@tanstack/react-query";

import { getHealthStatus } from "@/api/health/health.api";

const Indicator = ({ isUp }: { isUp: boolean }) =>
  isUp ? (
    <Text color={"green.500"}>
      <LuCheckCircle />
    </Text>
  ) : (
    <Text color={"red.500"}>
      {" "}
      <LuStopCircle />
    </Text>
  );
const Item = ({ isUp, children }: PropsWithChildren<{ isUp: boolean }>) => (
  <Flex alignItems="center" gap={3}>
    <Indicator isUp={isUp} />
    {children}
  </Flex>
);

export default function StatusPage() {
  const { data: isHealthy } = useQuery({
    queryKey: ["health"],
    initialData: false,
    queryFn: getHealthStatus,
    refetchInterval: 5000,
  });
  return (
    <Container width="md">
      <GlassCard title={"StatusPage"}>
        <Item isUp={isHealthy}> Eco Planner API </Item>
      </GlassCard>
    </Container>
  );
}
