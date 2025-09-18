import { Controller, Post, Body, Get, Query, Res, Req, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Response } from 'express';
import axios from 'axios';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) return { error: 'Invalid credentials' };
    return this.authService.login(user);
  }

  @Post('signup')
  async signup(@Body() body: any) {
    // body: { name, email, password }
    const existing = await this.authService['usersService'].findByEmail(body.email);
    if (existing) return { error: 'User exists' };
    const user = await this.authService['usersService'].create({
      name: body.name,
      email: body.email,
      password: body.password,
    });
    return this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body() body: any) {
    try {
      const decoded: any = this.authService['jwtService'].verify(body.refreshToken);
      const payload = { sub: decoded.sub, role: decoded.role };
      const accessToken = this.authService['jwtService'].sign(payload, { expiresIn: '15m' });
      return { accessToken };
    } catch (e) {
      return { error: 'Invalid refresh token' };
    }
  }

   // ------------------- GOOGLE OAUTH -------------------
  @Get('google')
  googleRedirect(@Res() res: Response) {
    const clientId = process.env.GOOGLE_CLIENT_ID || '';
    const backendBase = process.env.BACKEND_BASE_URL || 'http://localhost:3000';
    const redirectUri = `${backendBase}/auth/google/callback`;
    const scope = encodeURIComponent(
      'openid email profile https://www.googleapis.com/auth/gmail.readonly',
    );

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

    return res.redirect(url);
  }

  @Get('google/callback')
  async googleCallback(@Query('code') code: string, @Res() res: Response) {
    try {
      const backendBase =
        process.env.BACKEND_BASE_URL || 'http://localhost:3000';

      // 1. Exchange code for tokens
      const tokenRes = await axios.post(
        'https://oauth2.googleapis.com/token',
        new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID || '',
          client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
          redirect_uri: `${backendBase}/auth/google/callback`,
          grant_type: 'authorization_code',
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );

      const { access_token } = tokenRes.data;

      // 2. Get Google profile
      const profileRes = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${access_token}` } },
      );

      const profile = profileRes.data;

      // 3. Try Gmail API
      try {
        const gmailProfile = await axios.get(
          'https://www.googleapis.com/gmail/v1/users/me/profile',
          { headers: { Authorization: `Bearer ${access_token}` } },
        );
        profile.gmail = { profile: gmailProfile.data };

        const msgs = await axios.get(
          'https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=5',
          { headers: { Authorization: `Bearer ${access_token}` } },
        );
        profile.gmail.messages = msgs.data;
      } catch {
        // no Gmail scope or denied
      }

      // 4. Save/find user + issue your JWT
      const user = await this.authService.findOrCreateOAuthUser(
        'google',
        profile,
      );
      const tokens = await this.authService.login(user);

      // 5. Redirect back to frontend with token
      const frontend = process.env.FRONTEND_URL || 'http://localhost:5173';
      return res.redirect(
        `${frontend}/auth/callback?provider=google&token=${encodeURIComponent(
          tokens.accessToken,
        )}`,
      );
    } catch (err) {
      throw new HttpException(
        'Google OAuth failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ------------------- GITHUB OAUTH -------------------
  @Get('github')
  githubRedirect(@Res() res: Response) {
    const clientId = process.env.GITHUB_CLIENT_ID || '';
    const backendBase = process.env.BACKEND_BASE_URL || 'http://localhost:3000';
    const redirectUri = `${backendBase}/auth/github/callback`;
    const scope = encodeURIComponent('read:user user:email repo');

    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&scope=${scope}`;

    return res.redirect(url);
  }

  @Get('github/callback')
  async githubCallback(@Query('code') code: string, @Res() res: Response) {
    try {
      const backendBase =
        process.env.BACKEND_BASE_URL || 'http://localhost:3000';

      // 1. Exchange code for token
      const tokenRes = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: process.env.GITHUB_CLIENT_ID || '',
          client_secret: process.env.GITHUB_CLIENT_SECRET || '',
          code,
          redirect_uri: `${backendBase}/auth/github/callback`,
        },
        { headers: { Accept: 'application/json' } },
      );

      const { access_token } = tokenRes.data;

      // 2. Get GitHub profile
      const profileRes = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const profile = profileRes.data;

      // 3. Extra: emails + repos
      try {
        const emailsRes = await axios.get('https://api.github.com/user/emails', {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        profile.emails = emailsRes.data;

        const reposRes = await axios.get(
          'https://api.github.com/user/repos?per_page=5',
          { headers: { Authorization: `Bearer ${access_token}` } },
        );
        profile.repos = reposRes.data;
      } catch {
        // ignore if not accessible
      }

      // 4. Save/find user + issue JWT
      const user = await this.authService.findOrCreateOAuthUser(
        'github',
        profile,
      );
      const tokens = await this.authService.login(user);

      // 5. Redirect frontend
      const frontend = process.env.FRONTEND_URL || 'http://localhost:5173';
      return res.redirect(
        `${frontend}/auth/callback?provider=github&token=${encodeURIComponent(
          tokens.accessToken,
        )}`,
      );
    } catch (err) {
      throw new HttpException(
        'GitHub OAuth failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ------------------- ME -------------------
  @Get('me')
  async me(@Req() req: Request) {
    const auth = req.headers.authorization;
    if (!auth) throw new HttpException('Missing authorization', 401);

    const parts = auth.split(' ');
    if (parts.length !== 2) throw new HttpException('Invalid authorization', 401);

    const token = parts[1];
    try {
      const decoded: any = this.authService['jwtService'].verify(token);
      const user = await this.authService['usersService'].findById(decoded.sub);
      return { user };
    } catch {
      throw new HttpException('Invalid token', 401);
    }
  }
}