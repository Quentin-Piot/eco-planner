import { UserEntity, UserEntityWithoutId } from "@/user/domain/entities/user.entity";

export interface IUserRepository {
  create(user: UserEntityWithoutId): Promise<UserEntity>;
  findByEmailOrPhoneNumber(
    email: string,
    phoneNumber: string,
  ): Promise<UserEntity | null>;
}
