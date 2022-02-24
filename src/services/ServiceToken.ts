import { interfaceUser } from "../interface/interfacaUser";
import shajs from 'sha.js'
import { interfaceToken } from "../interface/interfaceToken";
import config from "../config"
import { ExceptionToken } from "../exceptions";
const loginMap = new Map()

export class ServiceToken{

    /**
     * 校验token是否有效
     * @param token {string} 校验的token
     * @returns 不存在抛出异常
     */
    static hasIn(token: string): boolean|never {
        if (loginMap.has(token) === false) { throw new ExceptionToken.Miss() }
        return true
    }

    /**
     * 用户登录到token，返回token到密钥
     * @param udata {interfaceUser.detail} 用户信息
     * @returns 一串不等长的密钥
     * ```
     * const udata = await ModuleUser.find(1)
     * ServiceToken.login(udata) // tokenKey => 1as14as14aaeef11454646456462164
     * ```
     */
    static login(udata: interfaceUser.detail): string{
        const {id, level, nickname} = udata
        const tokenKey = this.codeTokenKey(udata)
        const current = Date.now()
        const tokenDatail: interfaceToken.detail = {
            id: id as number, level, nickname,
            exp_time: config.expTime + current
        }
        loginMap.set(tokenKey, tokenDatail)
        return tokenKey
    }

    /**
     * 根据用户特征来返回一段token密钥
     * @param udata {interfaceUser.detail} 用户信息
     * @returns 一串不等长的密钥
     * ```
     * const udata = await ModuleUser.find(1)
     * ServiceToken.codeTokenKey(udata) // tokenKey => 1as14as14aaeef11454646456462164
     * ```
     */
    static codeTokenKey(udata: interfaceUser.detail): string{
        const currnt = Date.now()
        return new shajs.sha256()
        .update(`${currnt}${udata.id}`)
        .digest('hex')
    }
}