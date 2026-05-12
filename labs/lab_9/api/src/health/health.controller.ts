import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private healthService: HealthService) {}

  @Get('live')
  @HttpCode(HttpStatus.OK)
  async liveness(): Promise<{ status: string; timestamp: number }> {
    this.logger.verbose('Liveness check requested');

    return {
      status: 'ok',
      timestamp: Date.now(),
    };
  }

  @Get('ready')
  @HealthCheck()
  async readiness(): Promise<HealthCheckResult> {
    this.logger.verbose('Readiness check requested');

    try {
      return await this.healthService.checkReadiness();
    } catch (error) {
      this.logger.error('Readiness check failed', error);

      throw error;
    }
  }

  @Get()
  @HealthCheck()
  async detailed(): Promise<HealthCheckResult> {
    this.logger.debug('Detailed health check requested');
    return await this.healthService.checkDetailed();
  }
}
