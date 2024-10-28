import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HelpersService {

    async hashPassword(password:string): Promise<any> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return  hash;
    }

    async comparePassword(password:string, hashpass: string): Promise<any> {
        const isValid = await bcrypt.compare(password, hashpass);
        return  isValid;
    }

}
