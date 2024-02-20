import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/models/user.schema';
import { UpdateDto } from './dto/update.dto';

@Injectable() //The @Injectable() decorator attaches metadata, which declares that AuthService is a class that can be managed by the Nest IoC container.
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      name,
      email,
      // password: hashedPassword,
      password,
    });

    try {
      await user.save();
      return { message: 'User registered successfully' };
    } catch (error) {
      console.log(error, 'errorrrrrrrrrrrr');
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    const hexString = user._id.toHexString();

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({ id: user._id });
    return { hexString, token, message: 'login success' };
  }

  async findUserById(userId: string) {
    const user = await this.userModel.findOne({ _id: userId });
    const dataLength = (await this.userModel.find().lean().exec()).map(
      (items) => {
        return items.name;
      },
    ).length;
    const data = '0' + dataLength;
    return { user, data };
  }

  async updateUserDetails(
    userId: string,
    updateDto: UpdateDto,
    placeId: string,
  ) {
    try {
      const user = await this.userModel.findByIdAndUpdate(userId, updateDto, {
        new: true,
      });
      if (!user) {
        throw new Error('User not found');
      }

      const apiKey = 'AIzaSyA-Q3d6RwQbrA8DsJQeUs7aE0IKPTXK9KA';

      const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

      const response = await fetch(apiUrl);
      // console.log(response,"responseeeeeeeeeee")

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data,"dataaaaaaaaaaa")
      if (data.status === 'OK') {
        const addressComponents = data.result.address_components;
        // console.log(addressComponents,"addressssssssssssss")

        const formattedAddress = data.result.formatted_address;
        // console.log(formattedAddress,"formateeeeeeeeeeeeee")

        let address_line_1, city, state, country, postal_code;

        for (const component of addressComponents) {
          const types = component.types;

          if (types.includes('street_number')) {
            address_line_1 = component.long_name;
          } else if (types.includes('route')) {
            address_line_1 += ' ' + component.long_name;
          } else if (types.includes('sublocality')) {
            address_line_1 += ' ' + component.long_name;
          } else if (
            types.includes('locality') ||
            types.includes('administrative_area_level_3')
          ) {
            city = component.long_name;
          } else if (types.includes('administrative_area_level_1')) {
            state = component.short_name;
          } else if (types.includes('country')) {
            country = component.long_name;
          } else if (types.includes('postal_code')) {
            postal_code = component.long_name;
          }
        }

        console.log('Address Line 1:', address_line_1);
        console.log('City:', city);
        console.log('State:', state);
        console.log('Country:', country);
        console.log('Postal:', postal_code);
        console.log('Formatted Address:', formattedAddress);

        const updatedUser = await this.userModel.findByIdAndUpdate(
          userId,
          {
            $set: {
              address: {
                line1: address_line_1,
                city: city,
                state: state,
                country: country,
                postal_code: postal_code,
                formattedAddress: formattedAddress,
              },
            },
          },
          { new: true },
        );
        // console.log(updatedUser,'uusjsjjjjjjjjjjjjjjjjjjjj')
        return updatedUser;
      } else {
        console.error('Error fetching place details:', data.status);
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error('Error updating user details');
    }
  }
}
