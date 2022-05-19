import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Article } from './article.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'test',
      synchronize: true,
      logging: true,
      entities: [Article],
      subscribers: [],
      migrations: [],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
