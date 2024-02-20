import {
  Body,
  Controller,
  HttpStatus,
  Post,
  HttpCode,
  UseGuards,
  Param,
  Req,
  Patch,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { UpdateDto } from './dto/update.dto';

@Controller('auth')
export class AuthController {
  //nestjs has provided me with the obect
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  signup(@Body() signupDto: SignupDto, @Req() request: any) {
    console.log(request, 'request.body');
    return this.authService.signup(signupDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('/userInfo/:userId')
  findById(@Param('userId') userId: string, @Req() req) {
    console.log(req, 'reqqqqqqq');
    return this.authService.findUserById(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('/updateUserInfo/:userId')
  async updateUserDetails(
    @Param('userId') userId: string,
    @Body() updateDto: UpdateDto,
    @Req() request: any,
  ) {
    return this.authService.updateUserDetails(
      userId,
      updateDto,
      request.body.place_id,
    );
  }
}
