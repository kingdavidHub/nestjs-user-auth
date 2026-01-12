import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() userData: RegisterDto) {
    return await this.authService.registerUser(userData);
  }

  @Post('login')
  async login(@Body() userData: RegisterDto){
    return await this.authService.loginUser(userData)
  }
}
