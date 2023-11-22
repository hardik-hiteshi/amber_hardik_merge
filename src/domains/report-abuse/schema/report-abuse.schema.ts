/* eslint-disable @typescript-eslint/naming-convention */
import { HydratedDocument, Schema as mongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import regions from 'src/common/enum/region.enum';
export type ReportAbuseDocument = HydratedDocument<ReportAbuse>;

@Schema({ shardKey: { region: 1 } })
export class ReportAbuse {
  @Prop({ required: true, enum: ['recipe', 'comment', 'rating'] })
  public type: string;

  @Prop()
  public reporting_user_niceName: string;

  @Prop()
  public reported_recipe_niceName: string;

  @Prop()
  public reported_user_niceName: string;

  @Prop()
  public reported_text: string;

  @Prop()
  public report_additional_description: string;

  @Prop()
  public report_date: Date;

  @Prop({ enum: ['Yes', 'No'] })
  public manager_done: string;

  @Prop()
  public manager_comment: string;

  @Prop({ type: mongoSchema.Types.ObjectId })
  public element_id: mongoSchema.Types.ObjectId;

  @Prop({
    required: true,
    enum: regions,
  })
  public region: string;
}

export const reportAbuseSchema = SchemaFactory.createForClass(ReportAbuse);
