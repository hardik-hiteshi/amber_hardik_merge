import {
  ContactnDto,
  HistoryDto,
  InfoDto,
  LocationDto,
  NameDto,
  ProfileDto,
} from './subDto';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/domains/auth/roles/permission.roles';
import { Type } from 'class-transformer';
export class CmsUserUpdateDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => NameDto)
  @ApiProperty({
    type: () => NameDto,
  })
  public name?: NameDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  @ApiProperty({
    type: () => LocationDto,
  })
  public location?: LocationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ContactnDto)
  @ApiProperty({
    type: () => ContactnDto,
  })
  public contact?: ContactnDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => HistoryDto)
  @ApiProperty({
    type: () => HistoryDto,
  })
  public history?: HistoryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileDto)
  @ApiProperty({
    type: () => ProfileDto,
  })
  public profile?: ProfileDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => InfoDto)
  @ApiProperty({
    type: () => InfoDto,
  })
  public info?: InfoDto;

  @IsOptional()
  @MinLength(8)
  @IsString()
  @ApiProperty({
    type: 'String',
    default: 'SecurePassword',
  })
  public password?: string;

  @IsOptional()
  @MinLength(3)
  @IsString()
  @ApiProperty({
    type: 'String',
    default: 'loginName',
  })
  public login?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    type: 'String',
    default: '',
  })
  public image?: string[];

  @IsOptional()
  @IsString()
  @IsEnum(Role)
  @ApiProperty({
    type: 'String',
    default: 'admin',
  })
  public role?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    type: 'Array',
    items: {
      type: 'String',
    },
    default: ['ES-TEST'],
  })
  public allowedRegions?: string[];
}
