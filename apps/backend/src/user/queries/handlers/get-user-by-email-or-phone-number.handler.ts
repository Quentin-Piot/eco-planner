import { UserEntity } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../interfaces/user-repository.interface";
import { GetUserByEmailOrPhoneNumberQuery } from "../get-user-by-email-or-phone-number.query";

import { Inject, NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetUserByEmailOrPhoneNumberQuery)
export class GetUserByEmailOrPhoneNumberHandler implements IQueryHandler<GetUserByEmailOrPhoneNumberQuery> {
  constructor(
    @Inject("IUserRepository") private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: GetUserByEmailOrPhoneNumberQuery): Promise<UserEntity> {
    const user = await this.userRepository.findByEmailOrPhoneNumber(
      query.email,
      query.phoneNumber,
    );
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
