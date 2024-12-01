import {Injectable} from '@nestjs/common';
import {
    CreateUserDto,
    CreateUserResponse,
    EmailPhoneNumberPasswordDto,
    GetUserDto,
    GetUserResponse
} from "@quentinpiot/dtos";
import {CommandBus, QueryBus} from "@nestjs/cqrs";

import {CreateUserCommand} from "@/user/commands/create-user.command";
import {CheckPasswordCombinationQuery} from "@/user/queries/check-password-combination.query";
import {GetUserQuery} from "@/user/queries/get-user.query";
import {UserEntity} from "@/user/domain/entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {
    }


    async createUser(request: CreateUserDto): Promise<CreateUserResponse> {
        const user: UserEntity = await this.commandBus.execute(
            new CreateUserCommand(
                request.email + "",
                request.password,
                request.phoneNumber,
            ),
        );

        return {
            id: user.id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            createdAt: user.createdAt?.toISOString(),
            updatedAt: user.updatedAt?.toISOString(),
        };
    }

    async getUser(request: GetUserDto): Promise<GetUserResponse> {
        const user = await this.queryBus.execute(
            new GetUserQuery(request.email, request.phoneNumber),
        );

        return {
            id: user.id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            createdAt: user.createdAt?.toISOString(),
            updatedAt: user.updatedAt?.toISOString(),
        };
    }

    async checkPasswordCombination(
        request: EmailPhoneNumberPasswordDto,
    ): Promise<CreateUserResponse> {
        /*  if (!request.email && !request.phoneNumber)
          throw new BadRequestException("Email or Phone Number is required");*/
        const user = await this.queryBus.execute(
            new CheckPasswordCombinationQuery(
                request.password,
                request.email,
                request.phoneNumber,
            ),
        );

        return {
            id: user.id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            createdAt: user.createdAt?.toISOString(),
            updatedAt: user.updatedAt?.toISOString(),
        };
    }
}

