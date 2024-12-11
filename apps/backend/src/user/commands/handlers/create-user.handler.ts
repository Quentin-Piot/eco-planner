import { ConflictException, Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import * as argon2 from "argon2";

import { CreateUserCommand } from "@/user/commands/create-user.command";
import { UserEntity } from "@/user/domain/entities/user.entity";
import { IUserRepository } from "@/user/interfaces/user-repository.interface";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject("IUserRepository") private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByEmailOrPhoneNumber(
      command.email,
      command.phoneNumber,
    );
    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    const hashedPassword = await argon2.hash(command.password);
    const user = {
      email: command.email,
      password: hashedPassword,
      phoneNumber: command.phoneNumber,
    };

    return this.userRepository.create(user);
  }
}
