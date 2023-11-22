import { Prop, Schema } from '@nestjs/mongoose';
// import regions from 'src/common/enum/region.enum';

@Schema()
export class DietTo {
  @Prop()
  public niceName: string;

  // @Prop({ enum: regions })
  @Prop()
  public region: string;

  @Prop()
  public lastUpdate: Date;
}
