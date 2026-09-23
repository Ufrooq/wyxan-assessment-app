import { IsMongoId, IsNotEmpty, Matches, MaxLength } from 'class-validator';

export class CreateSiteDto {
    @Matches(/^[a-z0-9-]+\.zz$/)
    address: string;

    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @IsNotEmpty()
    bodyHtml: string;

    @IsMongoId()
    authorId: string;
}
