import { Location } from "@/models/location";

export class City {
  constructor(
    readonly label: string,
    readonly location: Location,
  ) {}
}
