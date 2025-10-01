import { Controller, Get, Post, Render, Body, Redirect, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // Exibe o formulário de login
    @Get('login')
    @Render('login')
    showLogin(@Query('error') error?: string) {
        return { error };
    }

    // Processa login
    @Post('login')
    @Redirect('/app')
    async login(@Body() body: { email: string; senha: string }) {
        const user = await this.authService.validateUser(body.email, body.senha);
        if (!user) {
            return { url: '/auth/login?error=Senha%20errada' };
        }
        // Salvar sessão ou cookie JWT
        return { url: '/app' };
    }

    // Exibe o formulário de registro
    @Get('register')
    @Render('register')
    showRegister() {
        return {};
    }

    // Processa registro
    @Post('register')
    @Redirect('login')
    async register(@Body() body: { email: string; senha: string }) {
        await this.authService.register(body.email, body.senha);
        return { url: '/auth/login' };
    }

}