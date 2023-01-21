import { Injectable } from '@nestjs/common';
import { ApiKeyDto } from './apiKeys.interface';
import { InjectKnex, Knex } from 'nestjs-knex';

const READ_PARAMS = ['id', 'key', 'name', 'status', 'createdAt', 'updatedAt'];

@Injectable()
export class ApiKeysService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async createApiKey(key: string, name: string): Promise<ApiKeyDto> {
    const rowIds = await this.knex<ApiKeyDto>('api_keys')
      .insert({ key: key, name: name });

    return await this.knex
      .select(...READ_PARAMS)
      .from<ApiKeyDto>('api_keys')
      .where({ id: rowIds[0] })
      .first();
  }

  async getManyApiKeys(): Promise<Array<ApiKeyDto>> {
    return await this.knex<ApiKeyDto>('api_keys')
      .select(...READ_PARAMS);
  }

  async getApiKey(id: number): Promise<ApiKeyDto | null> {
    return await this.knex
      .select(...READ_PARAMS)
      .from<ApiKeyDto>('api_keys')
      .where({ id: id })
      .first();
  }

  async updateApiKey(
    id: number,
    key: string | undefined,
    name: string | undefined,
  ): Promise<ApiKeyDto | null> {
    const apiKey = await this.knex
      .select(...READ_PARAMS)
      .from<ApiKeyDto>('api_keys')
      .where({ id: id })
      .first();
    if (apiKey === null) {
      return null;
    }

    const updates: any = {};
    if (key !== undefined) {
      updates.key = key;
    }
    if (name !== undefined) {
      updates.name = name;
    }

    if (Object.keys(updates).length === 0) {
      return apiKey;
    }

    await this.knex<ApiKeyDto>('api_keys')
      .update(updates)
      .where({ id: id });

    return await this.knex
      .select(...READ_PARAMS)
      .from<ApiKeyDto>('api_keys')
      .where({ id: id })
      .first();
  }

  async deleteApiKey(id: number): Promise<ApiKeyDto | null> {
    const apiKey = await this.knex
      .select(...READ_PARAMS)
      .from<ApiKeyDto>('api_keys')
      .where({ id: id })
      .first();
    if (apiKey === null) {
      return null;
    }

    await this.knex<ApiKeyDto>('api_keys')
      .delete()
      .where({ id: id });

    return apiKey;
  }
}
