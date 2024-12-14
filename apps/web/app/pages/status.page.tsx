import { PropsWithChildren } from "react";
import { LuCheckCircle, LuStopCircle } from "react-icons/lu";

import { Container, Flex, Text } from "@chakra-ui/react";
import { GlassCard } from "@/components/ui/glass-card";

import { getHealthStatus } from "@/api/health/health.api";

import { Route } from "../+types/root";

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

export async function loader() {
  return getHealthStatus();
}

export default function StatusPage({
  loaderData: isHealthy,
}: Route.ComponentProps) {
  return (
    <Container width="md">
      <GlassCard title={"StatusPage"}>
        <Item isUp={isHealthy as any}> Eco Planner API </Item>
      </GlassCard>
    </Container>
  );
}
