import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class NewsMedia {
  @Prop({ default: true })
  public voice: boolean;

  @Prop({ default: true })
  public machine: boolean;
}
