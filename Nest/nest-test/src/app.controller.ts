import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { Article } from './article.model';

@Controller()
export class AppController {
  @Get('/create')
  @Render('create')
  getForm(): void {
    return;
  }

  @Get(':id')
  @Render('article')
  async post(@Param('id', ParseIntPipe) id: number) {
    return Article.findOneBy({ id });
  }

  @Get()
  @Render('index')
  async index() {
    return {
      articles: await Article.find(null),
    };
  }

  @Post('articles')
  @Redirect('/', 301)
  async create(
    @Body() body: { title: string; content: string },
  ): Promise<void> {
    const article = new Article();
    article.title = body.title;
    article.content = body.content;

    await article.save();
  }
}
