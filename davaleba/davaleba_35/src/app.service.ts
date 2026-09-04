import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  getWelcome() {
    return { message: 'NestJS + MongoDB is ready' };
  }

  getHealth() {
    const isConnected = this.connection.readyState === 1;

    return {
      status: isConnected ? 'ok' : 'error',
      database: isConnected ? 'connected' : 'disconnected',
    };
  }
}
