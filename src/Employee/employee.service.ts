import { Injectable, Controller } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { employeeDetail } from '../Entity/employeeDetail';
import { employee } from '../Entity/employee'
import { empDetail } from '../DTO/employee.detail.dto';

@Injectable()
export class employeeDetailService {
    constructor(
        @InjectRepository(employee) private readonly employeeRepository: Repository<employee>,
        @InjectRepository(employeeDetail) private readonly detailRepository: Repository<employeeDetail>
    ) { }

    async empDetail(empdetail: empDetail, payload: any) {
        const userId = payload.id
        const detail = this.detailRepository.create({ ...empdetail, userId: userId })
        this.detailRepository.save(detail);
        if (detail) {
            return {
                code: 200
            }
        }
        else {
            return {
                code: 400
            }
        }

    }

    async getEmpDetail(id: number) {
        const details = await this.detailRepository.find({
            where: { userId: id }
        })
        if (!details) {
            return {
                code: 400
            }
        }
        else {
            return {
                code: 200,
                data: details
            }
        }
    }

    async updateDetails(id: number, data: any) {
        const details = await this.detailRepository.find({
            where: { userId: id }
        })
        let userId = id

        if (!details) {
            return {
                code: 400
            }
        }
        else {
            const updateInfo = await this.detailRepository.update({ userId: id }, { ...data, updated_date: new Date().toISOString(), })
            return {
                code: 200,
                data: updateInfo
            }
        }
    }
}
