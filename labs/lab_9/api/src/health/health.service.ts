import { Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  TypeOrmHealthIndicator,
  MongooseHealthIndicator,
  HealthCheckResult,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    private typeOrm: TypeOrmHealthIndicator,
    private mongoose: MongooseHealthIndicator,
  ) {}

  /**
   * Liveness Probe: Is the application process alive?
   *
   * Kubernetes uses this to determine if the container should be restarted.
   * Should be FAST and NOT depend on external services.
   *
   */
  async checkLiveness(): Promise<HealthCheckResult> {
    return this.health.check([
      () =>
        Promise.resolve({ status: { status: 'up', info: { app: 'running' } } }),
    ]);
  }

  /**
   * Readiness Probe: Is the application ready to serve traffic?
   *
   * Kubernetes uses this to determine if the pod should receive requests.
   * Should check CRITICAL dependencies (databases, cache).
   *
   */
  async checkReadiness(): Promise<HealthCheckResult> {
    const checks = [
      () =>
        this.mongoose.pingCheck('mongodb', {
          timeout: 3000,
        }),
      () =>
        this.typeOrm.pingCheck('postgresql', {
          timeout: 3000,
        }),
      // RabbitMQ and Redis should be added
    ];

    return this.health.check(checks);
  }

  async checkDetailed(): Promise<HealthCheckResult> {
    const checks = [
      () => this.typeOrm.pingCheck('postgresql'),
      () => this.mongoose.pingCheck('mongodb'),
      // RabbitMQ and Redis should be added
    ];

    return this.health.check(checks);
  }
}
