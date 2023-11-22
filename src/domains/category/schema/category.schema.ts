import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import categoryRegions from './subSchema/enums/Categoryregion.enum';
import { HydratedDocument } from 'mongoose';
import { Translations } from './subSchema/index';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ type: String, required: true })
  @ApiProperty({
    description: 'Category name',
    type: 'String',
    default: 'Category title',
  })
  public name: string;

  @Prop({
    type: String,
    // readonly: true,
  })
  @ApiProperty({
    description: 'Category niceName',
    type: 'String',
    default: 'category-niceName',
  })
  public niceName: string;

  @Prop({ type: String, format: 'mycook-image' })
  @ApiProperty({
    description: 'Category Image',
    type: 'String',
    default: '',
  })
  public image: string;

  @Prop({ type: Boolean, default: false })
  @ApiProperty({
    description: 'Category name',
    type: 'Boolean',
    default: 'true',
  })
  public visibility: boolean;

  @Prop({
    type: String,
    required: true,
    enum: categoryRegions,
  })
  @ApiProperty({
    description: 'Category region',
    type: 'String',
    enum: categoryRegions,
    default: 'ES-TEST',
  })
  public region: string;

  @Prop({
    type: String,
    // format: 'html',
  })
  @ApiProperty({
    description: 'Category Landing Text',
    type: 'String',
    default: 'Landinx Text',
  })
  public landingText: string;

  @Prop([{ type: String }])
  @ApiProperty({
    description: 'Category Image',
    type: [String],
    default: 'Category synonyms',
  })
  public synonyms: string[];

  @Prop(Translations)
  @ApiProperty({
    description: 'Category Translations',
    type: () => Translations,
  })
  public translations: Translations;

  // @Prop({ default: true })
  // @ApiProperty({
  //   description: 'Category isactive',
  //   type: 'Boolean',
  //   default: 'True',
  // })
  // public isActive: boolean;
}

export const categorySchema = SchemaFactory.createForClass(Category);
