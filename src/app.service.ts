import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DB_HOST') ?? 'no definido';
  }

  getAppPort(): number {
    return this.configService.get<number>('PORT') ?? 3000;
  }
}
