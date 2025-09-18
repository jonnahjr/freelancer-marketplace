import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string) {
    const user: any = await this.usersService.findByEmail(email);
    if (!user) return null;
    // if stored as passwordHash + salt
    if (user.passwordHash && user.salt) {
      const crypto = await import('crypto');
      const hash = crypto.pbkdf2Sync(pass, user.salt, 10000, 64, 'sha512').toString('hex');
      if (hash === user.passwordHash) {
  // intentionally ignoring passwordHash and salt from the returned result
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _passwordHash, salt: _salt, ...result } = user;
        return result;
      }
      return null;
    }
    // fallback for plain password field (legacy)
    if (user.password && user.password === pass) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: process.env.ACCESS_EXPIRES || '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: process.env.REFRESH_EXPIRES || '7d' });
    return { accessToken, refreshToken };
  }

  async findOrCreateOAuthUser(provider: string, profile: any) {
    // Try to find by provider id or email
    const providerId = profile.sub || profile.id || profile.email;
    // Try to find by email first
    const email = profile.email || (profile.emails && profile.emails[0] && profile.emails[0].value);

    let user = null;
    if (email) {
      user = await this.usersService.findByEmail(email);
    }

    if (!user) {
      // create a minimal user record
      const newUser = {
        email: email || `${provider}_${providerId}@example.com`,
  name: profile.name || profile.login || profile.username || 'OAuth User',
  oauth: { provider, providerId },
  providerData: profile,
      };
      user = await this.usersService.create(newUser as any);
    }

    return user;
  }
}
