import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  validate(accessToken: string) {
    return (
      accessToken &&
      accessToken === this.configService.get<string>('ACCESS_TOKEN')
    );
  }
}
