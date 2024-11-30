import {join} from "path";

import {AppModule} from "./app.module";
import {ConfigModule} from "@nestjs/config";

import {ReflectionService} from "@grpc/reflection";
import {NestFactory} from "@nestjs/core";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import { ServerCredentials} from "@grpc/grpc-js";

async function bootstrap() {
    const port = process.env.PORT || '5000';
    const address = '0.0.0.0';

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.GRPC,
            options: {
                url: `${address}:${port}`,
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
            },
        },
    );
    await ConfigModule.forRoot();

    await app.listen();
}

bootstrap();
