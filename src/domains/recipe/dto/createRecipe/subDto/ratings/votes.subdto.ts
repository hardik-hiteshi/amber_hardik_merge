import { IsNumber, IsOptional } from 'class-validator';
export class VotesDTO {
  @IsOptional()
  @IsNumber()
  public good?: number;

  @IsOptional()
  @IsNumber()
  public bad?: number;
}
