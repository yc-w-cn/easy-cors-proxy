import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Next,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { version, repository } from '../package.json';
import { Logger } from '@nestjs/common';
import { LogStack } from './log-stack';
import { isURLValid } from './utils';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  private logStack = new LogStack(10);
  private proxyingCount = 0;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  private debug(message: string) {
    this.logger.debug(message);
    this.logStack.push(message);
  }

  @Get()
  getAppBrief() {
    const brief = {
      version,
      repository,
    };
    this.debug(`Show app brief: ${JSON.stringify(brief)}.`);
    return brief;
  }

  @Get('/proxy')
  async handleProxy(
    @Query('URL') url: string,
    @Query('ACCESS_TOKEN') accessToken: string,
    @Req() req,
    @Res() res,
    @Next() next,
  ) {
    this.debug(`Handle proxy with URL: ${url}`);

    if (!accessToken || !url) {
      throw new HttpException(
        'ACCESS_TOKEN and URL parameters are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!this.authService.validate(accessToken)) {
      this.debug(`Invalid ACCESS_TOKEN: ${accessToken}`);
      throw new HttpException('Invalid ACCESS_TOKEN', HttpStatus.UNAUTHORIZED);
    }

    if (!isURLValid(url)) {
      this.debug(`Invalid URL: ${url}`);
      throw new HttpException('Invalid URL', HttpStatus.BAD_REQUEST);
    }

    const maxProxingCount = this.configService.get<number>(
      'MAX_PROXYING_COUNT',
      3,
    );

    if (this.proxyingCount >= maxProxingCount) {
      this.debug(
        `Too many proxy requests in progress, current: ${this.proxyingCount}`,
      );
      throw new HttpException(
        'Too many proxy requests in progress',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    this.proxyingCount++;

    try {
      // Fetch the file
      const response = await fetch(url);

      if (!response.ok) {
        throw new HttpException('Failed to fetch file', HttpStatus.BAD_REQUEST);
      }

      const proxy = createProxyMiddleware({
        target: url, // Set target to the requested URL
        changeOrigin: true,
        pathRewrite: { [`^/proxy`]: '' }, // Remove '/proxy' from the path
        followRedirects: true,
      });

      proxy(req, res, next);
    } catch (error) {
      throw new HttpException(
        'Failed to proxy request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      this.proxyingCount--; // Decrement proxyingCount regardless of success or failure
    }
  }

  @Get('/status')
  getServiceStatus() {
    const { proxyingCount } = this;
    const status = {
      proxyingCount,
      recentLogs: this.logStack.getLogs(),
      timestamp: new Date().getTime(),
    };
    this.debug(
      `Show service status: ${JSON.stringify({
        proxyingCount,
      })}.`,
    );
    return status;
  }
}
