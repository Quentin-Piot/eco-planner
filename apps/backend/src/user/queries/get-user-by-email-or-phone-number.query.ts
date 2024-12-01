export class GetUserByEmailOrPhoneNumberQuery {
  constructor(
    public readonly email: string,
    public readonly phoneNumber: string,
  ) {}
}
