/* eslint-disable @typescript-eslint/naming-convention */
import { IsOptional, ValidateNested } from 'class-validator';
import { EnergyScaleDTO } from './scales/energyScale.subDto';
import { GramsScaleDTO } from './scales/gramsScale..subDto';
import { IUscaleDTO } from './scales/IUscale.subDto';
import { RAEscaleDTO } from './scales/RAEscale.subDto';
import { Type } from 'class-transformer';

export class NutritionalKeysDTO {
  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Water?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => EnergyScaleDTO)
  public Energy?: EnergyScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Protein?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public LipidTot?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Ash?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Carbohydrt?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public FiberTD?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public SugarTot?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Calcium?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Iron?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Magnesium?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Phosphorus?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Potassium?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Sodium?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Zinc?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Copper?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Manganese?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Selenium?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public VitC?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Thiamin?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Riboflavin?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Niacin?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public PantoAcid?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public VitB6?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public FolateTot?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public FolicAcid?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public FoodFolate?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public FolateDFE?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public CholineTot?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public VitB12?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => IUscaleDTO)
  public VitAIU?: IUscaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => RAEscaleDTO)
  public VitARAE?: RAEscaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Retinol?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public AlphaCarot?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public BetaCarot?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public BetaCrypt?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Lycopene?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public LutplusZea?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public VitE?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public VitD?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => IUscaleDTO)
  public VitDIU?: IUscaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public VitK?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public FASat?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public FAMono: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public FAPoly?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GramsScaleDTO)
  public Cholestrl?: GramsScaleDTO;
}
