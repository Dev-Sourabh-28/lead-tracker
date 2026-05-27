import { isNotEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePortfolioDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsOptional()
    @IsString()
    bio?: string;
}