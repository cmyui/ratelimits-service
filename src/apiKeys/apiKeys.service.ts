import { Injectable } from '@nestjs/common';
import { ApiKeyDto, CreateApiKeyDto, UpdateApiKeyDto } from './apiKeys.interface';
import { InjectKnex, Knex } from 'nestjs-knex';

const READ_PARAMS = [
  'id',
  'key',
  'name',
  'status',
  'createdAt',
  'updatedAt',
];

@Injectable()
export class ApiKeysService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
  ) {}

  async createApiKey(input: CreateApiKeyDto): Promise<ApiKeyDto> {
    let rowIds = await this.knex<ApiKeyDto>('api_keys')
      .insert({ key: input.key, name: input.name });

    return await this.knex.select(...READ_PARAMS)
      .from<ApiKeyDto>('api_keys')
      .where({id: rowIds[0]})
      .first();
  }

  async getManyApiKeys(): Promise<Array<ApiKeyDto>> {
    return await this.knex<ApiKeyDto>('api_keys')
      .select(...READ_PARAMS);
  }

  async getApiKey(id: number): Promise<ApiKeyDto | null> {
    return await this.knex.select(...READ_PARAMS)
      .from<ApiKeyDto>('api_keys')
      .where({id: id})
      .first();
  }

  async updateApiKey(id: number, updates: UpdateApiKeyDto): Promise<ApiKeyDto | null> {
    let apiKey = await this.knex.select(...READ_PARAMS)
      .from<ApiKeyDto>('api_keys')
      .where({id: id})
      .first();
    if (apiKey === null) {
      return null;
    }

    // TODO: is there a nicer way?
    let realUpdates: any = {};
    if (updates.key !== undefined) {
      realUpdates.key = updates.key;
    }
    if (updates.name !== undefined) {
      realUpdates.name = updates.name;
    }

    if (Object.keys(realUpdates).length === 0) {
      return apiKey;
    }

    await this.knex<ApiKeyDto>('api_keys')
      .update(realUpdates)
      .where({id: id});

    return await this.knex.select(...READ_PARAMS)
      .from<ApiKeyDto>('api_keys')
      .where({id: id})
      .first();
  }

  async deleteApiKey(id: number): Promise<ApiKeyDto | null> {
    let apiKey = await this.knex.select(...READ_PARAMS)
      .from<ApiKeyDto>('api_keys')
      .where({id: id})
      .first();
    if (apiKey === null) {
      return null;
    }

    await this.knex<ApiKeyDto>('api_keys')
      .delete()
      .where({id: id});

    return apiKey;
  }
}
