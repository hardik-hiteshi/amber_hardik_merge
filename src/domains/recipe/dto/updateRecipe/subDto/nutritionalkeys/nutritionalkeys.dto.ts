/* eslint-disable @typescript-eslint/naming-convention */
import { IsOptional, ValidateNested } from 'class-validator';
import { EnergyScaleDTO } from './scales/energyScale.subDto';
import { GramsScaleDTO } from './scales/gramsScale..subDto';
import { IUscaleDTO } from './scales/IUscale.subDto';
import { RAEscaleDTO } from './scales/RAEscale.subDto';
import { Type } from 'class-transformer';

export class NutritionalKeysDTO {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Water?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EnergyScaleDTO)
  public Energy?: EnergyScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Protein?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public LipidTot?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Ash?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Carbohydrt?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public FiberTD?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public SugarTot?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Calcium?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Iron?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Magnesium?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Phosphorus?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Potassium?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Sodium?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Zinc?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Copper?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Manganese?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Selenium?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public VitC?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Thiamin?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Riboflavin?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Niacin?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public PantoAcid?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public VitB6?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public FolateTot?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public FolicAcid?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public FoodFolate?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public FolateDFE?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public CholineTot?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public VitB12?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => IUscaleDTO)
  public VitAIU?: IUscaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RAEscaleDTO)
  public VitARAE?: RAEscaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Retinol?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public AlphaCarot?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public BetaCarot?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public BetaCrypt?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Lycopene?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public LutplusZea?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public VitE?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public VitD?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => IUscaleDTO)
  public VitDIU?: IUscaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public VitK?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public FASat?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public FAMono?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public FAPoly?: GramsScaleDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GramsScaleDTO)
  public Cholestrl?: GramsScaleDTO;
}
