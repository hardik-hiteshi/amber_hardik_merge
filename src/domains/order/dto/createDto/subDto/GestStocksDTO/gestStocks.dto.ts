import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { HistoryGestStocksDTO } from './historyGetStocks.subschema';
import { Type } from 'class-transformer';

export class GestStocksDTO {
  @IsOptional()
  @IsNumber()
  public clientRef?: string;

  @IsOptional()
  @IsNumber()
  public currentState?: string;

  @IsOptional()
  @IsNumber()
  public carrier?: string;

  @ValidateNested({ each: true })
  @Type(() => HistoryGestStocksDTO)
  public history: HistoryGestStocksDTO;
}
