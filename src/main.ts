import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
// import { WsJwtGuard } from './Chat/WsJwtGuard';
// import { SocketIO } from './chat/socket-io.gateway';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
    credentials: true,
  });
  // app.useGlobalGuards(new WsJwtGuard());
  app.useGlobalPipes(new ValidationPipe());
  app.useWebSocketAdapter(new IoAdapter(app));


  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
