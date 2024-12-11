import type { UserResponse } from "@quentinpiot/protos/generated/user";
import type { Request as OriginalRequest } from "express";

declare module "express" {
  interface Request extends OriginalRequest {
    user: UserResponse;
  }
}
