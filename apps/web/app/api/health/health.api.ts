import api from "@/api/helpers/api";

export const getHealthStatus = async (): Promise<boolean> => {
  try {
    const healthCheckResponse = await api.get("health");
    return !!healthCheckResponse;
  } catch {
    return false;
  }
};
