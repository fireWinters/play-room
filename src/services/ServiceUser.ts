import shajs from 'sha.js'
import { interfaceUser } from '../interface/interfacaUser'
import { ModuleUser } from '../models/ModelUser'
import config from '../config'
import { ExceptionUser } from '../exceptions'

export class ServiceUser{

    /**
     * 获取用户信息
     * @param uid {number} 用户id
     * @returns 用户信息
     * ```
     * const udata = ServiceUser.get(1) // 获取用户id为1的数据
     * ```
     */
    static get(uid: number): Promise<interfaceUser.detail|never>{
        return ModuleUser.find(uid)
    }

    /**
     * 更新用户信息
     * @param uid  {number} 用户id
     * @param updata {object} 更新的字段对象
     * @returns 更新的条目
     * ```
     * ServiceUser.upData(1, {nickname: '修改昵称'})
     * ```
     */
    static upData(uid: number, updata: Partial<interfaceUser.detail>): void{
        return ModuleUser.updata({id: uid}, updata)
    }

    /**
     * 对普通的字符串进行hash加密
     * @param pass {string} 需要加密的普通字符串
     * @returns 加密后的64位hex字符
     * ```
     * ServiceUser.codePassword('123456') // 000c5e2e844afd8f13eb5ff595a7d613e272ec93d3996f1a3c43448b89ab1849
     * ```
     */
    static codePassword(pass: string): string {
        return new shajs.sha256()
        .update(`${config.hash}${pass}`)
        .digest('hex')
    }

    /**
     * 添加用户并返回其新增的id
     * @param udata 
     * @returns 用户的新增id
     */
    static async createUser(udata: interfaceUser.detail): Promise<interfaceUser.detail> {
        const id = await ModuleUser.insertUser(udata)
        const _udata = Object.assign({id}, udata)
        return _udata
    }

    /**
     * 用户登录密钥
     */
    static codeLoginSign(udata: interfaceUser.detail): string{
        const hash = config.hash
        const id = udata.id as number
        const pass = udata.password.replace(/g/ig, '')
        const keyIndex = hash.charCodeAt(id % hash.length)
        const hashVal = this.charCodeVal(hash)
        const sign = [pass, Date.now().toString(16), (hashVal + id * keyIndex).toString(16), keyIndex.toString(16)].join('g')
        return sign
    }

    /**
     * 解密登录密钥
     */
    static async decodeLoginSign(sign: string): Promise<interfaceUser.detail|never>{
        const hash = config.hash
        const codeSign = sign.split('g')
        if (codeSign.length !== 4) { throw new ExceptionUser.MissSign('无效的sign码') }
        const [pass, create_time, codeId, keyIndex] = codeSign

        // 校验是否已过有效期, config.signTime为0不判断有效期
        const _create_time: number = parseInt('0x' + create_time)
        if (config.signTime !== 0 && _create_time + config.signTime > Date.now()) {
            throw new ExceptionUser.MissSign('登录已失效')
        }
        // 还原用户id
        const _codeId: number = parseInt('0x' + codeId)
        const _keyIndex: number = parseInt('0x' + keyIndex)
        const hashVal = this.charCodeVal(hash)
        const uid: number = (_codeId - hashVal) / _keyIndex
        
        // 对用户身份进行校验
        const udata = await ModuleUser.find(uid)
        if (udata.password !== pass) { throw new ExceptionUser.MissSign('密码已被更改') }
        return udata
    }

    /**
     * 对每个字符的ASCII码相加并返回
     * @param str {string} 字符串
     * @returns str字符串每个字符串的ASCII码相加后的结果
     * ```
     * ServiceUser.charCodeVal('ab')// a + b => 97 + 98 => 195
     * ```
     */
    static charCodeVal(str: string): number{
        return str.split('').map((str: string) => {
            return str.charCodeAt(0)
        }).reduce((prev: number, curr: number) => prev + curr)
    }
}