import { Injectable } from "@nestjs/common";

import { UserEntity } from "@/user/domain/entities/user.entity";
import { IUserRepository } from "@/user/interfaces/user-repository.interface";
import {PrismaService} from "@/prisma/prisma.service";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: Omit<UserEntity,'id'>): Promise<UserEntity> {
    const created = await this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
      },
    });

    return new UserEntity(
      created.id,
      created.email,
      created.password,
      created.phoneNumber,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findByEmailOrPhoneNumber(
    email: string,
    phoneNumber: string,
  ): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber }],
      },
    });

    if (!user) return null;

    return new UserEntity(
      user.id,
      user.email,
      user.password,
      user.phoneNumber,
      user.createdAt,
      user.updatedAt,
    );
  }
}
