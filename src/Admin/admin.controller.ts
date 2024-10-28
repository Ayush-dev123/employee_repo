import { Body, Controller, Get, Inject, UseGuards, Param, Post, Put, Res, Req } from '@nestjs/common';
import { createEmpDto } from '../DTO/employeeDto'
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express'
import { adminService } from './admin.service'


@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: adminService) { }

    @UseGuards(AuthGuard)
    @Get('get_all')
    async getAllUsers(@Res() res: Response, @Req() request: Request) {
        const payload = request['user']
        if (payload.role != 'admin') {
            return res.status(400).json({
                code: 400,
                message: "Only admin can get all employees !"
            })
        }

        const result = await this.adminService.getAllEmp();
        if (result.length == 0) {
            return res.status(400).json({
                code: 400,
                message: 'No users found',
            })
        }

        return res.status(200).json({
            code: 200,
            message: "All users ------> ",
            data: result
        })

    }


    @UseGuards(AuthGuard)
    @Put('inactive_user/:id')
    async changeStatus(@Param('id') id: string, @Body() createUserDto: createEmpDto, @Res() res: Response, @Req() request: Request) {
        const payload = request['user']
        if (payload.role != 'admin') {
            return res.status(400).json({
                code: 400,
                message: "You cannot access to this route !"

            })
        }
        const changeStatus = await this.adminService.changeStatus(+id)
        if (changeStatus.code == 400) {
            return res.status(400).json({
                code: 400,
                message: "User not found"
            })
        } else if (changeStatus.code == 200) {
            return res.status(200).json({
                code: 200,
                message: "User's status changed to INACTIVE successfully !!"
            })
        }
        else {
            return res.status(400).json({
                code: 400,
                message: "User not found"
            })

        }
    }


    @UseGuards(AuthGuard)
    @Put('active_user/:id')
    async activeStatus(@Param('id') id: string, @Body() createUserDto: createEmpDto, @Res() res: Response, @Req() request: Request) {
        const payload = request['user']
        if (payload.role != 'admin') {
            return res.status(400).json({
                code: 400,
                message: "You cannot access to this route !"

            })
        }
        const changeStatus = await this.adminService.activeStatus(+id)
        if (changeStatus.code == 400) {
            return res.status(400).json({
                code: 400,
                message: "User not found"
            })
        } else {
            return res.status(200).json({
                code: 200,
                message: "User's status changed to ACTIVE successfully !!"
            })
        }
    }

    @UseGuards(AuthGuard)
    @Post('get_emp/:id')
    async findEmp(@Param('id') id: string, @Body() createUserDto: createEmpDto, @Res() res: Response, @Req() request: Request) {
        const payload = request['user']
        if (payload.role != 'admin') {
            return res.status(400).json({
                code: 400,
                message: "You cannot access to this route !"

            })
        }
        const employee = await this.adminService.findEmp(+id)
        if (employee.code == 400) {
            return res.status(400).json({
                code: 400,
                message: "User not found"
            })
        } else {
            return res.status(200).json({
                code: 200,
                Employee: employee.emp
            })
        }
    }


    @UseGuards(AuthGuard)
    @Put('update_emp/:id')
    async updateEmp(@Param('id') id: string, @Body() createEmpDto: createEmpDto, @Res() res: Response, @Req() request: Request) {
        const payload = request['user']
        if (payload.role != 'admin') {
            return res.status(400).json({
                code: 400,
                message: "You cannot access to this route !"
            })
        }
        const updateInfo = await this.adminService.updateEmp(+id, createEmpDto)
        if (updateInfo.code == 400) {
            return res.status(400).json({
                code: updateInfo.code,
                message: "Error in updation"
            })
        }
        if (updateInfo.code == 403) {
            return res.status(400).json({
                code: 400,
                message: "You cannot change the role !"
            })
        }
        if(updateInfo.code ==404){
            return res.status(400).json({
                code:400,
                message:"You cannot change the password !"
            })
        }
        return res.status(200).json({
            code: updateInfo.code,
            message: "Details updated successfull !!"
        })
    }
}


