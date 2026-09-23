import { IsEnum, IsMongoId, IsOptional, IsString, Matches } from 'class-validator';

export class CreateVisitDto {
    @IsMongoId()
    personId: string;

    @Matches(/^[a-z0-9-]+\.zz$/)
    address: string;

    @IsOptional()
    @IsMongoId()
    siteId?: string;

    @IsEnum(['found', 'not_found'])
    status: 'found' | 'not_found';

  @IsEnum(['typed', 'link', 'history', 'search'])
  arrivedFrom: 'typed' | 'link' | 'history' | 'search';

    @IsOptional()
    @IsString()
    referrerAddress?: string;

    @IsOptional()
    @IsString()
    titleSnapshot?: string;

    @IsOptional()
    @IsString()
    htmlSnapshot?: string;
}
