import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { password, ...userData } = signUpDto;
    if (!password) {
      throw new BadRequestException('Password is required');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });
    return { message: 'User registered successfully', userId: newUser.id };
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    console.log('Attempting to validate user:', email);
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      console.log('User not found');
      return null;
    }
    if (!user.password) {
      console.log('User has no password set');
      return null;
    }
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        console.log('User validated successfully');
        const { password, ...result } = user;
        return result;
      }
    } catch (error) {
      console.error('Error comparing passwords:', error);
    }
    console.log('User validation failed');
    return null;
  }
}