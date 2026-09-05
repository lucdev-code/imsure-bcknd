import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class add_information {
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(500)
    description: string
}