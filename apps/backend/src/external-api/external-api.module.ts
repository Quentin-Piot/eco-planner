import { Module } from '@nestjs/common';
import { GoogleApiService } from "@/external-api/google/google-api.service";
import { MistralApiService } from "@/external-api/mistral/mistral-api.service";

@Module({
  providers: [GoogleApiService, MistralApiService],
  exports:[GoogleApiService, MistralApiService]
})
export class ExternalApiModule {}
