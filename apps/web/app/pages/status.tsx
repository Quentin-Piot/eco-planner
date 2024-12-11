import { PropsWithChildren } from "react";
import { LuCheckCircle, LuStopCircle } from "react-icons/lu";

import { Container, Flex, Text } from "@chakra-ui/react";
import { GlassCard } from "@/components/ui/glass-card";

import { useQuery } from "@tanstack/react-query";

import { getHealthStatus } from "@/api/health/health.api";
import MainLayout from "@/templates/main.layout";

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

const isServiceUp = (health: any, service: string): boolean => {
  if (!health) return false;
  return health[service] && health[service].servingStatus === "SERVING";
};

export default function Status() {
  const { data: isHealthy } = useQuery({
    queryKey: ["health"],
    initialData: false,
    queryFn: getHealthStatus,
    refetchInterval: 5000,
  });
  return (
    <MainLayout>
      <Container width="md">
        <GlassCard title={"Status"}>
          <Item isUp={isHealthy}> Eco Planner API </Item>
        </GlassCard>
      </Container>
    </MainLayout>
  );
}
