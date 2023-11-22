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
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/domains/auth/roles/permission.roles';
import { Type } from 'class-transformer';

export class CmsUserCreateDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => NameDto)
  @ApiProperty({
    description: 'User CMS data',
    type: () => NameDto,
  })
  public name?: NameDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  @ApiProperty({
    description: 'User CMS Location',
    type: () => LocationDto,
  })
  public location?: LocationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ContactnDto)
  @ApiProperty({
    description: 'User CMS Contact',
    type: () => ContactnDto,
  })
  public contact?: ContactnDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => HistoryDto)
  @ApiProperty({
    description: 'User CMS hystory',
    type: () => HistoryDto,
  })
  public history?: HistoryDto;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @ApiProperty({
    description: 'User CMS login',
    type: 'String',
    default: 'example',
  })
  public login: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @ApiProperty({
    description: 'User CMS niceName',
    type: 'String',
    default: 'example-niceName',
  })
  public niceName: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @ApiProperty({
    description: 'User CMS password',
    type: 'String',
    default: 'passwordMustBeEncripted',
  })
  public password: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileDto)
  @ApiProperty({
    description: 'User CMS Profile',
    type: () => ProfileDto,
  })
  public profile?: ProfileDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'User CMS image',
    type: 'String',
    default: 'hasImage?',
  })
  public image?: string[];

  @IsOptional()
  @IsString()
  @IsEnum(Role)
  @ApiProperty({
    description: 'User CMS role',
    type: 'String',
    enum: ['superadmin', 'admin'],
    default: 'admin',
  })
  public role?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => InfoDto)
  @ApiProperty({
    description: 'User CMS info',
    type: () => InfoDto,
  })
  public info?: InfoDto;

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
