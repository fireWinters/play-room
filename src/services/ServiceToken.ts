import { interfaceUser } from "../interface/interfacaUser";
import shajs from 'sha.js'
import { interfaceToken } from "../interface/interfaceToken";
import config from "../config"
const loginMap = new Map()

export class ServiceToken{

    static login(udata: interfaceUser.detail): string{
        const {id, level, nickname} = udata
        const tokenKey = this.codeTokenKey(udata)
        const current = Date.now()
        const tokenDatail: interfaceToken.detail = {
            id, level, nickname,
            exp_time: config.expTime + current
        }
        loginMap.set(tokenKey, tokenDatail)
        return tokenKey
    }

    static codeTokenKey(udata: interfaceUser.detail): string{
        const currnt = Date.now()
        return new shajs.sha256()
        .update(`${currnt}${udata.id}`)
        .digest('hex')
    }
}