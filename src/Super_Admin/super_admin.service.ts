import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { admin } from '../Entity/adminEntity';
import { employee } from '../Entity/employee'
// import { createAdminDto } from '../DTO/adminDto'
import { createEmpDto } from '../DTO/employeeDto'
import { HelpersService } from '../Helpers/helpers.service'


@Injectable()
export class SuperAdminService {

    constructor(
        private readonly helpersService: HelpersService,
        @InjectRepository(employee) private readonly employeeRepository: Repository<employee>,
        @InjectRepository(admin) private readonly adminRepository: Repository<admin>
    ) { }


    async createEmp(createEmpDto: createEmpDto): Promise<any> {
        if (createEmpDto.role == 'employee') {
            const hashpassword = await this.helpersService.hashPassword(createEmpDto.password)
            const newEmp = this.employeeRepository.create({ ...createEmpDto, password: hashpassword });
            return this.employeeRepository.save(newEmp);
        }
        else if (createEmpDto.role == 'admin') {
            const hashpassword = await this.helpersService.hashPassword(createEmpDto.password)
            const newEmp = this.adminRepository.create({ ...createEmpDto, password: hashpassword });
            return this.adminRepository.save(newEmp);
        }
        else {
            return { message: 'Invalid role' }
        }

    }


    async getAllEmp(): Promise<any> {

        const emp = await this.employeeRepository.find();
        const admin = await this.adminRepository.find()
        return { emp, admin }

    }



    async changeStatus(id: number): Promise<any> {
        const isExistAdmin = await this.adminRepository.findOne({ where: { id } })
        if (isExistAdmin) {
            const statusChanged = await this.adminRepository.update(id, { ...isExistAdmin, status: "inactive" })
            return {
                code: 200
            }
        }
        else if (!isExistAdmin) {
            const isExistEmployee = await this.employeeRepository.findOne({ where: { id } })
            if (isExistEmployee) {
                const statusChanged = await this.employeeRepository.update(id, { ...isExistEmployee, status: "inactive" })
                return {
                    code: 200
                }
            }
            return {
                code: 400
            }

        }
        return {
            code: 400
        }
    }


    async activeStatus(id: number): Promise<any> {
        const isExistAdmin = await this.adminRepository.findOne({ where: { id } })
        if (isExistAdmin) {
            const statusChanged = await this.adminRepository.update(id, { ...isExistAdmin, status: "active" })
            return {
                code: 200
            }
        }
        else if (!isExistAdmin) {
            const isExistEmployee = await this.employeeRepository.findOne({ where: { id } })
            if (isExistEmployee) {
                const statusChanged = await this.employeeRepository.update(id, { ...isExistEmployee, status: "active" })
                return {
                    code: 200
                }
            }
            return {
                code: 400
            }
        }
        return {
            code: 400
        }
    }


    async updateEmp(id: number, createEmpDto: createEmpDto): Promise<any> {
        const emp = await this.employeeRepository.findOne({
            where: { id }
        });
        if (emp) {
            const updateInfo = await this.employeeRepository.update(id, createEmpDto)
            return {
                code: 200
            }
        }
        if (!emp) {
            const admin = await this.adminRepository.findOne({
                where: { id }
            })
            if (!admin) {
                return {
                    code: 400
                }
            }
            const updateInfo = await this.employeeRepository.update(id, createEmpDto);
            return {
                code: 200
            }
        }
    }



    async deletePermanently(id: number, createEmpDto: createEmpDto): Promise<any> {
        const emp = await this.employeeRepository.findOne({
            where: { id }
        });
        if (emp) {
            const updateInfo = await this.employeeRepository.delete(id)
            return {
                code: 200
            }
        }
        if (!emp) {
            const admin = await this.adminRepository.findOne({
                where: { id }
            })
            if (!admin) {
                return {
                    code: 400
                }
            }
            const updateInfo = await this.employeeRepository.delete(id);
            return {
                code: 200
            }
        }
    }


}
