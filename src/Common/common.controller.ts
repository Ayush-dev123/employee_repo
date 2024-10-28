import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { CommonService } from './common.service'


@Controller('common')
export class CommonController {
    constructor(
        private readonly commonService: CommonService
    ) { }

    @UseGuards(AuthGuard)
    @Post('reset_password')
    async resetPassword(@Body() body: any, @Res() res: Response, @Req() request: Request) {
        const payload = request['user']
        const resetPass = await this.commonService.resetPassword(body, payload.email)
        if (resetPass.code == 400) {
            return res.status(400).json({
                code: 400,
                message: resetPass.message
            })
        }
        if (resetPass.code == 200) {
            return res.status(200).json({
                code: 200,
                message: resetPass.message
            })
        }
    }

    @Post('forgot_password')
    async forgotPassword(@Body() body:any,@Res() res: Response, @Req() request: Request){
        if(!body.email){
            return res.status(400).json({
                code:400,
                message:"email field cannot be empty"
            })
        }
        const forgotPass = await this.commonService.forgotPassword(body)
        return res.status(200).json({
            code:200,
            message:forgotPass
        })
    }

    @Post('verify_otp')
    async verifyPassword(@Body() body:any,@Res() res: Response, @Req() request: Request){
        if(!body.otp || !body.email){
            return res.status(400).json({
                code:400,
                message:"Please provide all fields.."
            })
        }
        const verify = await this.commonService.verifyPassword(body)
        return res.status(200).json({
            code:200,
            message:verify.message
        })
    }

    @Post('change_password')
    async changePassword(@Body() body:any,@Res() res: Response, @Req() request:Request){
        if(!body.new_password || !body.email || !body.confirm_password){
            return res.status(400).json({
                code:400,
                message:"Please provide all fields.."
            })
        }
        const changePass = await this.commonService.changePassword(body)
        if(changePass.code==400){
            return res.status(400).json({
                code:400,
                message:changePass.message
            })
        }
        if(changePass.code == 200){
            return res.status(200).json({
                code:200,
                message:changePass.message
            })
        }

    }

}
