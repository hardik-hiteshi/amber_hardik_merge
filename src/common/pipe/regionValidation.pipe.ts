import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class RegionValidationPipe implements PipeTransform<string, string> {
  public constructor(private allowedRegions: string[]) {}

  public transform(value: string, metadata: ArgumentMetadata): string {
    metadata;
    if (!this.isRegionValid(value)) {
      throw new BadRequestException([
        'Invalid region specified in the headers',
        `region must be one of the following values:${this.allowedRegions.join(
          ', ',
        )} `,
      ]);
    }

    return value;
  }

  private isRegionValid(region: string): boolean {
    return this.allowedRegions.includes(region);
  }
}
