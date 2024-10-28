import { Body, Controller, Get, Inject, UseGuards, Param, Post, Put, Res, Req, Delete } from '@nestjs/common';
import { SuperAdminService } from './super_admin.service';
import { createEmpDto } from '../DTO/employeeDto'
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express'
import { isLength } from './../../node_modules/@types/validator/index.d';


@Controller('super-admin')
export class SuperAdminController {

  constructor(private readonly superAdminService: SuperAdminService) { }

  @UseGuards(AuthGuard)
  @Post('create-users')
  async create(@Body() createUserDto: createEmpDto, @Res() res: Response, @Req() request: Request) {
    const userPayload = request['user'];
    if (userPayload.role != 'Super Admin') {
      return res.status(400).json({
        code: 400,
        message: 'Only super admin can create users',
      })
    }
    this.superAdminService.createEmp(createUserDto);
    if (createUserDto.role == "admin") {
      return res.status(200).json({
        code: 200,
        message: 'Admin created successfully',
      })
    }
    if (createUserDto.role == "employee") {
      return res.status(200).json({
        code: 200,
        message: 'Employee created successfully',
      })
    }
    else {
      return res.status(400).json({
        message: 'Invalid role',
        code: 400
      })
    }
  }

  @UseGuards(AuthGuard)
  @Get('get_all')
  async getAllUsers(@Res() res: Response, @Req() request: Request) {
    const payload = request['user']
    if (payload.role != 'Super Admin') {
      return res.status(400).json({
        code: 400,
        message: "Only super admin can get all users"
      })
    }
    const result = await this.superAdminService.getAllEmp();
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
  async delete(@Param('id') id: string, @Body() createUserDto: createEmpDto, @Res() res: Response, @Req() request: Request) {
    const payload = request['user']
    if (payload.role != 'Super Admin') {
      return res.status(400).json({
        code: 400,
        message: "Only super admin can delete user"
      })
    }
    const changeStatus = await this.superAdminService.changeStatus(+id)
    if (changeStatus.code == 400) {
      return res.status(400).json({
        code: 400,
        message: "User not found"
      })
    } else {
      return res.status(200).json({
        code: 200,
        message: "User's status changed to INACTIVE successfully !!"
      })
    }
  }

  @UseGuards(AuthGuard)
  @Put('active_user/:id')
  async activeUser(@Param('id') id: string, @Body() createUserDto: createEmpDto, @Res() res: Response, @Req() request: Request) {
    const payload = request['user']
    if (payload.role != 'Super Admin' || payload.role != 'Super Admin') {
      return res.status(400).json({
        code: 400,
        message: "Only super admin can Activate the user"
      })
    }

    const changeStatus = await this.superAdminService.activeStatus(+id)
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
  @Put('update/:id')
  async updateEmp(@Param('id') id: string, @Body() createEmpDto: createEmpDto, @Res() res: Response, @Req() request: Request) {
    const payload = request['user']
    if (payload.role != 'super admin') {
      return res.status(400).json({
        code: 400,
        message: "Only super Super admin can update user"
      })
    }
    const updateInfo = await this.superAdminService.updateEmp(+id, createEmpDto)
    if (updateInfo.code == 400) {
      return res.status(400).json({
        code: updateInfo.code,
        message: "Error in updation"
      })
    }
    return res.status(200).json({
      code: updateInfo.code,
      message: "Details updated successfull !!"
    })
  }


  @UseGuards(AuthGuard)
  @Delete('delete_per/:id')
  async deletePermanently(@Param('id') id: string, @Body() createEmpDto: createEmpDto, @Res() res: Response, @Req() request: Request) {
    const payload = request['user']
    if (payload.role != 'Super Admin') {
      return res.status(400).json({
        code: 400,
        message: "Only super Super admin can Delete user"
      })
    }

    const updateInfo = await this.superAdminService.deletePermanently(+id, createEmpDto)
    if (updateInfo.code == 400) {
      return res.status(400).json({
        code: updateInfo.code,
        message: "User not found !"
      })
    }
    return res.status(200).json({
      code: updateInfo.code,
      message: "User permanently deleted !"
    })

  }

}
