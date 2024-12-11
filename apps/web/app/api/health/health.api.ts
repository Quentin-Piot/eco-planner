import api from "@/api/helpers/api";

export const getHealthStatus = async (): Promise<boolean> => {
  const healthCheckResponse = await api.get("health");
  return !!healthCheckResponse;
};
