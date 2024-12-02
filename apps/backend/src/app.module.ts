import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
//import {PrismaModule} from "@/prisma/prisma.module";
//import { PrismaService } from "@/prisma/prisma.service";
import { ItineraryModule } from "./itinerary/itinerary.module";
import { ExternalApiModule } from "./external-api/external-api.module";

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
export class AppModule {
}
