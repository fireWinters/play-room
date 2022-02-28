import { interfaceUser } from "../interface/interfacaUser";
import {C, R, U, spotTable} from '../utils/db'
import { ExceptionUser } from "../exceptions";
const tableUser = spotTable('user')
const inserFields =  ['nickname', 'level', 'password', 'create_date']
const [insertUser] = C(tableUser, inserFields)
const [upUser] = U(tableUser)
const [findUser] = R(tableUser, {
    field: ['id, nickname, create_date, level, password'], // 对查询语句的字段嗮选， 可缺省
    order: ['id DESC'], // 查询结果根据id进行倒序， 可缺省
})

interface ResultSetHeader{
    fieldCount: number;
    affectedRows: number,
    insertId: number,
    info: string,
    serverStatus: number,
    warningStatus: number,
    changedRows:number
}

/**
 * 用户数据模型， 负责 az_user 表的增删改查
 */
export class ModuleUser{

    /**
     * 新增用户进数据库，并返回新增id
     * @param udata {interfaceUser.detail} 用户数据
     * @returns 新用户id
     * ```
     * const udata = {
     *      nickname: '用户昵称',
     *      level: 1,
     *      password: '加密后的64位密码',
     *      create_date: '2022-02-24 10:00:00'
     * }
     * await ModuleUser(udata) // 新增用户ID => 1
     * ```
     */
    static insertUser(udata: interfaceUser.detail): Promise<number>{
        return insertUser(udata).then((resutl: ResultSetHeader ) => resutl.insertId)
    }

    /**
     * 修改用户信息
     * @param where {object} 更新条件
     * @param data  {更新的数据}
     * @returns 更新的条目
     */
    static updata(where, data) {
        return upUser(data, where).then((resutl: ResultSetHeader ) => resutl.changedRows)
    }

    /**
     * 通过用户id来查找用户，如果不存在则抛出异常
     * @param uid {number} 用户id
     * @returns interfaceUser.detail
     * ```
     * const udata = await ModuleUser.find(1)
     * {
     *      id: 1,
     *      nickname: '用户昵称',
     *      level: 1,
     *      password: '加密后的64位密码',
     *      create_date: '2022-02-24 10:00:00'
     * }
     * ```
     */
    static find(uid: number): Promise<interfaceUser.detail|never>{
        return findUser({id: uid, delele_date: null}).then((detail: null| interfaceUser.detail) => {
            if (detail === null) { throw new ExceptionUser.MissUser() }
            return detail
        })
    }
}