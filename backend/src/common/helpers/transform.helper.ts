export class TransformHelper {
  public static toStringTrimAndLowerCase({ value }: { value: string }): string {
    return value ? value.toString().toLowerCase().trim() : value;
  }

  public static trimAndLowerCaseArray({
    value,
  }: {
    value: string;
  }): string | string[] {
    return Array.isArray(value)
      ? value.map((item) => this.toStringTrimAndLowerCase(item))
      : value;
  }
  // public static stringTransformer({ value }: { value: string }): string {
  //   return this.toStringTrimAndLowerCase({ value }).split(' ')[0];
  // }

  public static uniqueItems({ value }) {
    return value ? Array.from(new Set(value)) : value;
  }

  // public static toLowerCaseArray({ value }) {
  //   return Array.isArray(value)
  //     ? value.map((item) => item.toLowerCase())
  //     : value;
  // }
}
