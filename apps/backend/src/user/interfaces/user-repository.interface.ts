import { UserEntity } from "@/user/domain/entities/user.entity";

export interface IUserRepository {
  create(user: Omit<UserEntity, 'id'>): Promise<UserEntity>;
  findByEmailOrPhoneNumber(
    email: string,
    phoneNumber: string,
  ): Promise<UserEntity | null>;
}
