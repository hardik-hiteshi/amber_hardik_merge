/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema } from '@nestjs/mongoose';
import { EnergyScale } from './scales/energyScale.subschema';
import { GramsScale } from './scales/gramsScale..subschema';
import { IUscale } from './scales/IUscale.subschema';
import { RAEscale } from './scales/RAEscale.subschema';
@Schema({ _id: false })
export class NutritionalKeys {
  @Prop({ type: GramsScale, default: {} })
  public Water: GramsScale;

  @Prop({ type: EnergyScale, default: {} })
  public Energy: EnergyScale;

  @Prop({ type: GramsScale, default: {} })
  public Protein: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public LipidTot: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Ash: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Carbohydrt: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public FiberTD: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public SugarTot: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Calcium: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Iron: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Magnesium: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Phosphorus: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Potassium: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Sodium: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Zinc: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Copper: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Manganese: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Selenium: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public VitC: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Thiamin: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Riboflavin: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Niacin: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public PantoAcid: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public VitB6: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public FolateTot: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public FolicAcid: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public FoodFolate: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public FolateDFE: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public CholineTot: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public VitB12: GramsScale;

  @Prop({ type: IUscale, default: {} })
  public VitAIU: IUscale;

  @Prop({ type: RAEscale, default: {} })
  public VitARAE: RAEscale;

  @Prop({ type: GramsScale, default: {} })
  public Retinol: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public AlphaCarot: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public BetaCarot: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public BetaCrypt: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Lycopene: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public LutplusZea: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public VitE: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public VitD: GramsScale;

  @Prop({ type: IUscale, default: {} })
  public VitDIU: IUscale;

  @Prop({ type: GramsScale, default: {} })
  public VitK: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public FASat: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public FAMono: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public FAPoly: GramsScale;

  @Prop({ type: GramsScale, default: {} })
  public Cholestrl: GramsScale;
}
