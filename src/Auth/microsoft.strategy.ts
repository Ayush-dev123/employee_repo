import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-microsoft';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'microsoft') {
    constructor() {
        super({
            clientID: process.env.microsoftClientID,
            clientSecret: process.env.microsoftClientSecret,
            callbackURL: 'http://localhost:4000/auth/microsoft/callback',
            scope: ['user.read'],
            tenant: 'common',  // You can specify the tenant if needed (e.g., specific Azure tenant ID)
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { displayName, userPrincipalName } = profile;
        const user = {
            email: userPrincipalName,
            name: displayName,
            accessToken,
        };
        done(null, user);
    }
}
