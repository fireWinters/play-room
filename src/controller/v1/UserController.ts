import { POST, GET, route } from "awilix-koa";
import { interfaceUser } from "../../interface/interfacaUser";
import { randomName, date } from "../../utils/utils";
import {USER_LEVEL} from '../../menu/USER_LEVEL'
import {ServiceUser} from '../../services/ServiceUser'


@route('/v1/user')
export class ApiController{

    /**
     * 修改用户昵称
     * @returns 
     */

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
}