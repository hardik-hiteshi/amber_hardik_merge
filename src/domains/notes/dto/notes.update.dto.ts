import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class UpdateNotesDTO {
  @IsNotEmpty()
  @IsString()
  public user: string;

  @IsNotEmpty()
  @IsString()
  public recipe: string;

  @IsNotEmpty()
  @IsObject()
  public steps: { [key: string]: object };
}
