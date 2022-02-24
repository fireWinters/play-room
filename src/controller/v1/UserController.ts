import { POST, GET, route } from "awilix-koa";
import { interfaceUser } from "../../interface/interfacaUser";
import { randomName, date } from "../../utils/utils";
import {USER_LEVEL} from '../../menu/USER_LEVEL'
import {ServiceUser} from '../../services/ServiceUser'
import {ServiceToken} from '../../services/ServiceToken'
import { Context } from "koa";
import { ExceptionUser } from "../../exceptions";


@route('/v1/user')
export class UserController{

    /**
     * 修改用户昵称
     * @returns 
     */
    @route('/upname')
    @POST()
    async upname() {}

    /**
     * 注册临时用户
     */
    @route('/temporary')
    @GET()
    async autoRegister(): Promise<{sign: string}>{
        const password = ServiceUser.codePassword(`${Date.now()}${Math.random()}`)
        const userData: interfaceUser.detail = {
            nickname: randomName(),
            level: USER_LEVEL.TEMPRORAAY,
            create_date: date('y-m-d h:i:s'),
            password: password
        }
        const udata = await ServiceUser.createUser(userData)
        const sign = ServiceUser.codeLoginSign(udata)
        return { sign: sign }
    }

    /**
     * 根据sign码来获取token
     */
    @route('/token')
    @GET()
    async token(ctx: Context): Promise<{token: string}>{
        const sign: string = ctx.header.sign as string
        if (!sign) { throw new ExceptionUser.MissSign('sign不存在！') }
        const udata = await ServiceUser.decodeLoginSign(sign)
        const token = ServiceToken.login(udata)
        return {token}
    }
}