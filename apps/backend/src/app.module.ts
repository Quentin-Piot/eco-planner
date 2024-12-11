import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { ExternalApiModule } from "./external-api/external-api.module";
//import {PrismaModule} from "@/prisma/prisma.module";
//import { PrismaService } from "@/prisma/prisma.service";
import { ItineraryModule } from "./itinerary/itinerary.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    //PrismaModule,
    ItineraryModule,
    ExternalApiModule,
  ],
  controllers: [AppController],
  providers: [
    //PrismaService
  ],
})
export class AppModule {}
