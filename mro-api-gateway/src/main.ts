import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/AllExceptionFilter';
import { setupAxiosErrorInterceptor } from './common/interceptors/axios.error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());

  setupAxiosErrorInterceptor();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
