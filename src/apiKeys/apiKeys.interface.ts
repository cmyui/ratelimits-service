import { IsNotEmpty, IsOptional } from 'class-validator';

// input models

export class CreateApiKeyDto {
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  name: string;
}

export class UpdateApiKeyDto {
  @IsOptional()
  @IsNotEmpty()
  key: string;

  @IsOptional()
  @IsNotEmpty()
  name: string;
}

// output models

export interface ApiKeyDto {
  id: number;
  key: string;
  name: string;
  status: 'active' | 'deleted';
  createdAt: Date;
  updatedAt: Date;
}
