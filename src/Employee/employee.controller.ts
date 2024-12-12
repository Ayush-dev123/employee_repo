import { Body, Controller, Post, Req, Res, UseGuards, Get, Put, Param } from '@nestjs/common';
import { employeeDetailService } from './employee.service'
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { empDetail } from '../DTO/employee.detail.dto';
import { employee } from './../Entity/employee';

@Controller('employee')
export class employeeDetailController {
    constructor(
        private readonly employeeDetailService: employeeDetailService
    ) { }

    @UseGuards(AuthGuard)
    @Post('emp_detail')
    async employee_detail(@Body() empdetail: empDetail, @Res() res: Response, @Req() request: Request) {
        const payload = request['user']
        if (payload.role != 'employee') {
            return res.status(400).json({
                code: 400,
                message: "you are not allowed to access this route !!"
            })
        }
        const detail = await this.employeeDetailService.empDetail(empdetail, payload)
        if (detail.code == 400) {
            return res.status(400).json({
                code: 400,
                message: "something went wrong!! employee details not created"
            })
        }
        else {
            return res.status(200).json({
                code: 200,
                message: "employee details created !!"
            })
        }
    }

    @UseGuards(AuthGuard)
    @Get("get_employee_details")
    async getEmpDetal(@Res() res: Response, @Req() request: Request) {
        const payload = request['user']
        console.log(payload)
        if (payload.role != 'employee') {
            return res.status(400).json({
                code: 400,
                message: "you are not allowed to access this route !!"
            })
        }

        const getDetail = await this.employeeDetailService.getEmpDetail(payload.id)
        if (getDetail.code == 400) {
            return res.status(400).json({
                code: 400,
                message: "no details found !!"
            })
        }
        else {
            return res.status(200).json({
                code: 200,
                message: "employee detail----",
                details: getDetail.data
            })
        }
    }


    @UseGuards(AuthGuard)
    @Put('update_detail/:id')
    async update_detail(@Param('id') id: string, @Body() data: any, @Res() res: Response, @Req() request: Request) {
        const payload = request['user']

        if (payload.role != 'employee') {
            return res.status(400).json({
                code: 400,
                message: "you are not allowed to access this route !!"
            })
        }
        if (payload.id! = id) {
            return res.status(400).json({
                code: 400,
                message: "you cannot change other's detail !!"
            })
        }
        const detail = await this.employeeDetailService.updateDetails(+id, data)
        if (detail.code == 400) {
            return res.status(400).json({
                code: 400,
                message: "something went wrong!! employee details not created"
            })
        }
        else {
            return res.status(200).json({
                code: 200,
                message: "employee details updated... !!"
            })
        }
    }



}
