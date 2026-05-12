import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  const configService = app.get(ConfigService);
  const port = configService.get('app.port', 4200);
  const env = configService.get('app.env', 'development');

  logger.log(`Application starting in [${env}] mode`);
  logger.log(`Listening on port ${port}`);
  logger.log(`Health endpoints:`);
  logger.log(` - GET /health/live  (liveness probe)`);
  logger.log(` - GET /health/ready (readiness probe)`);
  logger.log(` - GET /health       (detailed status)`);

  await app.listen(port, '0.0.0.0');

  if (process.env.KUBERNETES_SERVICE_HOST) {
    logger.log(`Running in Kubernetes: ${process.env.HOSTNAME}`);
  }
}

process.on('unhandledRejection', (reason, promise) => {
  Logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

bootstrap().catch((error) => {
  Logger.error('Application bootstrap failed', error);
  process.exit(1);
});
