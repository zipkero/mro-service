import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { AllExceptionFilter } from './common/filters/AllExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
    defaultVersion: '1',
  });

  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
