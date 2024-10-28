// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import * as jwt from 'jsonwebtoken'

// export const Role = createParamDecorator(
//     (id: string, ctx: ExecutionContext) => {
//         const request = ctx.switchToHttp().getRequest();
//         const token = request['headers']['authorization']?.replace('Bearer', '')?.trim()
//         const decoded: any = token ? jwt.decode(token) : undefined;
//         return decoded?.role
//     },
// );



// import { SetMetadata } from '@nestjs/common';
// // import { Role } from '../enums/role.enum';

// export const ROLES_KEY = 'roles';
// export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
