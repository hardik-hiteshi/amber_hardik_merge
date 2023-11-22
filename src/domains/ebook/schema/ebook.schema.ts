import { HydratedDocument, Schema as mongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import regions from 'src/common/enum/region.enum';

export type EbookDocument = HydratedDocument<Ebook>;
@Schema({
  shardKey: { region: 1 },
})
export class Ebook {
  @Prop({ required: true })
  public title: string;

  @Prop({ required: true })
  public publishDate: Date;

  @Prop({ required: true })
  public niceName: string;

  @Prop()
  public url: string;

  @Prop()
  public description: string;

  @Prop({
    //type: [mongoSchema.Types.ObjectId],
    ref: 'Recipe',
  })
  public recipes: string[];

  @Prop({ required: true, enum: regions })
  public region: string;

  @Prop()
  public mauticFormId: number;

  @Prop({ type: mongoSchema.Types.Mixed })
  public image: mongoSchema.Types.Mixed;

  @Prop({ type: mongoSchema.Types.Mixed })
  public pdf: mongoSchema.Types.Mixed;
}

export const ebookSchema = SchemaFactory.createForClass(Ebook);
