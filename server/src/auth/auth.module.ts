import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from 'src/models/user.schema';
import { jwtConstants } from './constant';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature(
      //forFeature is a method which creates collections in the database
      [{ name: 'User', schema: UserSchema }],
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService], //nestjs ko bta rahe hai ki service ko apne paas register kro or iska object rakho apne paas. Or jahan iss obect ko inject krunga yeh tumhari responsibility hogi obect ko create krke laake vahan doge
})
export class AuthModule {}
