import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface SignOptions {
  id: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  async validate(username: string, password: string) {
    return true;
  }

  async sign(options: SignOptions) {
    const { username, id } = options;
    return {
      access_token: `Bearer ${this.jwtService.sign({
        username: username,
        sub: id
      })}`
    }
  }
}
