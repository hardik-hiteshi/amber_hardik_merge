import { Prop, Schema } from '@nestjs/mongoose';
import regions from 'src/common/enum/region.enum';

@Schema()
export class From {
  @Prop()
  public niceName: string;

  @Prop({ enum: regions })
  public region: string;
}
