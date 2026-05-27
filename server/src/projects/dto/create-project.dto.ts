import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateProjectDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    githubUrl?: string;

    @IsOptional()
    @IsString()
    liveUrl?: string;

    @IsOptional()
    @IsArray()
    techStack?: string[];

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsString()
    portfolioId: string;
}