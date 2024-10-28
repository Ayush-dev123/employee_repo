import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { admin } from '../Entity/adminEntity';
import { employee } from '../Entity/employee'
import { createEmpDto } from '../DTO/employeeDto'

@Injectable()
export class adminService {
  constructor(
    @InjectRepository(employee) private readonly employeeRepository: Repository<employee>
  ) { }

  async getAllEmp(): Promise<any> {
    const emp = await this.employeeRepository.find();
    return { emp }
  }


  async changeStatus(id: number): Promise<any> {
    const isExistEmployee = await this.employeeRepository.findOne({ where: { id } })
    if (isExistEmployee) {
      const statusChanged = await this.employeeRepository.update(id, { ...isExistEmployee, status: "inactive" })
      return {
        code: 200
      }
    }
    else {
      return {
        code: 404
      }
    }

  }


  async activeStatus(id: number): Promise<any> {
    const isExistEmp = await this.employeeRepository.findOne({ where: { id } })
    if (isExistEmp) {
      const statusChanged = await this.employeeRepository.update(id, { ...isExistEmp, status: "active" })
      return {
        code: 200
      }
    }
    return {
      code: 400
    }
  }

  async findEmp(id: number): Promise<any> {
    const isExistEmp = await this.employeeRepository.findOne({ where: { id } })
    if (isExistEmp) {
      return {
        code: 200,
        emp: isExistEmp
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
      if (createEmpDto.role) {
        return {
          code: 403
        }
      }
      if (createEmpDto.password) {
        return {
          code: 404
        }
      }
      const updateInfo = await this.employeeRepository.update(id, createEmpDto)
      return {
        code: 200
      }
    }

  }


}


