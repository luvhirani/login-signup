import { IsOptional, IsString } from "class-validator";

export class UpdateDto {
    
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  about?: string;

  address: {
    line1: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    formattedAddress: string;
  };
}