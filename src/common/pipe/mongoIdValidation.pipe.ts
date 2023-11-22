/* eslint-disable indent */
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class MongoIdValidationPipe
  implements PipeTransform<string, Types.ObjectId>
{
  public transform(value: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return new Types.ObjectId(value);
  }
}
