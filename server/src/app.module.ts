import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      //The forRoot() method accepts the same configuration object as mongoose.connect() from the Mongoose package.
      'mongodb+srv://luv:luvhirani@cluster0.dtjjfjx.mongodb.net/',
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
