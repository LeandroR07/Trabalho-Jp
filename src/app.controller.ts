
import { Get, Controller, Render, Body, Redirect, Query } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('app')
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService){}

//exibição do login 
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }

  @Get('login')
  @Render('login')
  login() {
    return { message: 'Login!' };
  }
}
