import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

import { CreateUserCommand } from "@/user/commands/create-user.command";
import { UserEntity } from "@/user/domain/entities/user.entity";
import { CreateUserDto, CreateUserResponse } from "@/user/dtos/create-user.dto";
import {
  GetUserByEmailOrByNameDto,
  GetUserResponse,
} from "@/user/dtos/get-user.dto";
import { EmailPhoneNumberPasswordDto } from "@/user/dtos/login.dto";
import { CheckPasswordCombinationQuery } from "@/user/queries/check-password-combination.query";
import { GetUserByEmailOrPhoneNumberQuery } from "@/user/queries/get-user-by-email-or-phone-number.query";

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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

  async getUserByEmailOrPhoneNumber(
    request: GetUserByEmailOrByNameDto,
  ): Promise<GetUserResponse> {
    const user = await this.queryBus.execute(
      new GetUserByEmailOrPhoneNumberQuery(request.email, request.phoneNumber),
    );

    return {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };
  }

  async checkPasswordCombination(request: EmailPhoneNumberPasswordDto) {
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
