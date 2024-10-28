import { Inject, Injectable } from '@nestjs/common';
import { HelpersService } from 'src/Helpers/helpers.service';
import { admin } from '../Entity/adminEntity';
import { employee } from '../Entity/employee'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NodemailerService } from '../Helpers/nodeMailer.service';
import { RedisClientType } from 'redis';


@Injectable()
export class CommonService {
    constructor(
        private readonly helpersService: HelpersService,
        private readonly nodemailerService: NodemailerService,
        @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
        @InjectRepository(employee) private readonly employeeRepository: Repository<employee>,
        @InjectRepository(admin) private readonly adminRepository: Repository<admin>
    ) { }

    async resetPassword(body: any, email: string) {
        if (!body.old_password || !body.new_password || !body.confirm_password) {
            return {
                code: 400,
                message: 'Please fill all fields',
            }
        }
        const admin = await this.adminRepository.findOne({ where: { email } });
        if (admin) {
            const comparePass = await this.helpersService.comparePassword(body.old_password, admin.password);
            if (comparePass) {
                if (body.new_password === body.confirm_password) {
                    const hashedPassword = await this.helpersService.hashPassword(body.new_password);
                    await this.adminRepository.update(admin.id, { ...admin, password: hashedPassword });
                    return {
                        code: 200,
                        message: "Password reset successfully !!"
                    }
                } else {
                    return {
                        code: 400,
                        message: "New password and confirm password not matched !!"
                    }
                }

            } else {
                return {
                    code: 400,
                    message: 'Old password is incorrect !',
                }
            }

        }
        else if (!admin) {
            const employee = await this.employeeRepository.findOne({ where: { email } });
            if (employee) {
                const comparePass = await this.helpersService.comparePassword(body.old_password, employee.password);
                if (comparePass) {
                    if (body.new_password === body.confirm_password) {
                        const hashedPassword = await this.helpersService.hashPassword(body.new_password);
                        await this.employeeRepository.update(employee.id, { ...employee, password: hashedPassword });
                        return {
                            code: 200,
                            message: "Password reset successfully !!"
                        }
                    } else {
                        return {
                            code: 400,
                            message: "New password and confirm password not matched !!"
                        }
                    }
                } else {
                    return {
                        code: 400,
                        message: "Old password is incorrect !"
                    }
                }
            }
            return {
                code: 400,
                message: 'User not found !',
            }
        } else {
            return {
                code: 400,
                message: "User not found !"
            }
        }
    }


    async forgotPassword(body: any) {
        const email = body.email
        const isExistAdmin = await this.adminRepository.findOne({
            where: { email }
        })
        const otp = Math.floor(100000 + Math.random() * 900000)
        if (isExistAdmin) {
            var mailOptions = {
                from: 'techsolutions0017@gmail.com',
                to: email,
                subject: 'OTP verificatrion code !!',
                text: `Your otp is ${otp} and it will be expires in 3 minutes.`
            };


            const otpMail = await this.nodemailerService.sendMail(mailOptions);
            const redisKey = `${email}`;
            await this.redisClient.set(redisKey, JSON.stringify(otp), { EX: 180 })
            return otpMail
        }
    }

    async verifyPassword(body: any) {
        const email = body.email
        const otp = body.otp;
        const value = await this.redisClient.get(email);
        if (!value) {
            return {
                code: 400,
                message: "otp expires !!"
            }
        }
        if (value == otp) {
            return {
                code: 200,
                message: "Otp verified !!"
            }
        }
        return {
            code: 400,
            message: "Otp not matched !!"
        }
    }

    async changePassword(body: any) {
        const email = body.email
        const isExistAdmin = await this.adminRepository.findOne({
            where: { email }
        })

        if (isExistAdmin) {
            if (body.new_password == body.confirm_password) {
                const hashpassword = await this.helpersService.hashPassword(body.new_password)

                const changePass = await this.adminRepository.update(isExistAdmin.id, { ...isExistAdmin, password: hashpassword })
                return {
                    code: 200,
                    message: "Password changed successfully !!"
                }
            }
            else {
                return {
                    code: 400,
                    message: "Password and confirm password not matched !"
                }
            }

        }
        return {
            code: 400,
            message: "User not found !!"
        }



    }




}
