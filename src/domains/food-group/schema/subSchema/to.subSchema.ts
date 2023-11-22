import { Prop, Schema } from '@nestjs/mongoose';
// import regions from 'src/common/enum/region.enum';

@Schema()
export class To {
  @Prop()
  public niceName: string;

  @Prop()
  // @Prop({ enum: regions })
  public region: string;

  @Prop()
  public lastUpdate: Date;
}
