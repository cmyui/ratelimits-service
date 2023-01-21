import {
  Controller,
  HttpStatus,
  Res,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiKeysService } from './apiKeys.service';
import {
  ApiKeyDto,
  CreateApiKeyDto,
  UpdateApiKeyDto,
} from './apiKeys.interface';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('API Keys')
@Controller()
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Post('/v1/api-keys')
  async createApiKey(
    @Body() input: CreateApiKeyDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiKeyDto> {
    let data = await this.apiKeysService.createApiKey(input);
    res.status(HttpStatus.CREATED);
    return data;
  }

  @Get('/v1/api-keys')
  async getManyApiKeys(
    @Res({ passthrough: true }) res: Response,
  ): Promise<Array<ApiKeyDto>> {
    let data = await this.apiKeysService.getManyApiKeys();
    return data;
  }

  @Get('/v1/api-keys/:id')
  async getApiKey(
    @Param('id') id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiKeyDto | null> {
    let data = await this.apiKeysService.getApiKey(id);
    if (!data) {
      res.status(HttpStatus.NOT_FOUND);
      return null;
    }
    return data;
  }

  @Patch('/v1/api-keys/:id')
  async updateApiKey(
    @Param('id') id: number,
    @Body() updates: UpdateApiKeyDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiKeyDto | null> {
    let data = await this.apiKeysService.updateApiKey(id, updates);
    if (!data) {
      res.status(HttpStatus.NOT_FOUND);
      return null;
    }
    return data;
  }

  @Delete('/v1/api-keys/:id')
  async deleteApiKey(
    @Param('id') id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiKeyDto | null> {
    let data = await this.apiKeysService.deleteApiKey(id);
    if (!data) {
      res.status(HttpStatus.NOT_FOUND);
      return null;
    }
    return data;
  }
}
