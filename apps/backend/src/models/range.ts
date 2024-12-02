export class Range {
  public min: number;
  public max: number;
  public length: number;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
    this.length = this.max - this.min + 1;

  }


}