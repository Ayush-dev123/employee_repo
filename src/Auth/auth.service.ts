import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { admin } from '../Entity/adminEntity';
import { employee } from '../Entity/employee'
import { loginDto } from '../DTO/loginDto';
import { createEmpDto } from '../DTO/employeeDto'
import { HelpersService } from '../Helpers/helpers.service'
import { JwtService } from '@nestjs/jwt';
import { super_admin_table } from '../Entity/superadminEntity';



@Injectable()
export class AuthService {
    constructor(
        private readonly helpersService: HelpersService,
        private jwtService: JwtService,
        @InjectRepository(employee) private readonly employeeRepository: Repository<employee>,
        @InjectRepository(admin) private readonly adminRepository: Repository<admin>,
        @InjectRepository(super_admin_table) private readonly superadminRepository: Repository<super_admin_table>
    ) { }

    async login(logindto: loginDto): Promise<any> {
        const { email, password } = logindto;

        var isExistAdmin = await this.adminRepository.findOne({ where: { email } })
        if (isExistAdmin) {
            const isPasswordMatch = await this.helpersService.comparePassword(password, isExistAdmin.password)
            if (!isPasswordMatch) {
                return {
                    code: 400
                }
            }
            const payload = {
                id: isExistAdmin.id,
                email: isExistAdmin.email,
                role: isExistAdmin.role
            }
            const token = await this.jwtService.signAsync(payload)

            return {
                code: 200,
                token: token
            }
        }
        else if (!isExistAdmin) {
            const isExistEmployee = await this.employeeRepository.findOne({
                where: {
                    email
                }
            })
            if (isExistEmployee) {
                const isPasswordMatch = await this.helpersService.comparePassword(password, isExistEmployee.password)
                if (!isPasswordMatch) {
                    return {
                        code: 400
                    }
                }
                const payload = {
                    id: isExistEmployee.id,
                    email: isExistEmployee.email,
                    role: isExistEmployee.role
                }
                const token = await this.jwtService.signAsync(payload)
                return {
                    code: 200,
                    token: token
                }
            }
            if (!isExistEmployee) {

                const isExistSuperadmin = await this.superadminRepository.findOne({
                    where: {
                        email
                    }
                })

                if (isExistSuperadmin) {
                    const isPasswordMatch = await this.helpersService.comparePassword(password, isExistSuperadmin.password)
                    if (!isPasswordMatch) {
                        return {
                            code: 400
                        }
                    }
                    const payload = {
                        id: isExistSuperadmin.id,
                        email: isExistSuperadmin.email,
                        role: isExistSuperadmin.role
                    }
                    const token = await this.jwtService.signAsync(payload)
                    return {
                        code: 200,
                        token: token
                    }

                }
                return {
                    code: 400,
                }
            }


        }

    }


    
}
