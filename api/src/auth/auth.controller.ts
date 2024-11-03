import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthPostDto } from './dtos/auth-post-dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Sign In',
  })
  @ApiBody({ type: AuthPostDto })
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
