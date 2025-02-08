import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'akash',
      host: 'localhost',
      database: 'okrs',
      password: '1234',
      port: 5432,
    });
  }

  async getObjectives(query) {
    const queryResponse = await this.pool.query(query);
    console.log(queryResponse);
    return await queryResponse.rows;
  }
}
