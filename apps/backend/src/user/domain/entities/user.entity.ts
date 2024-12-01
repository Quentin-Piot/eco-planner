export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly phoneNumber: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {
  }
}

