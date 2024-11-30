import {join} from "path";

import {AppModule} from "./app.module";
import {ConfigModule} from "@nestjs/config";

import {ReflectionService} from "@grpc/reflection";
import {NestFactory} from "@nestjs/core";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {ChannelCredentials} from "@grpc/grpc-js";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.GRPC,
            options: {
                url: "0.0.0.0:5000",
                package: "user",
                protoPath: join(
                    __dirname,
                    "..",
                    "node_modules",
                    "@quentinpiot",
                    "protos",
                    "user.proto",
                ),
                onLoadPackageDefinition: (pkg, server) => {
                    new ReflectionService(pkg).addToServer(server);
                },
                credentials: ChannelCredentials.createSsl()
            },
        },
    );
    await ConfigModule.forRoot();

    await app.listen();
}

bootstrap();
