import { interfaceUser } from "../interface/interfacaUser";
import {C, R, spotTable} from '../utils/db'
import { ExceptionUser } from "../exceptions";
const tableUser = spotTable('user_temporary')
const inserFields =  ['nickname', 'level', 'password', 'create_date']
const [insertUser] = C(tableUser, inserFields)
const [findUser] = R(tableUser, {
    field: ['id, nickname, create_date, level, password'], // 对查询语句的字段嗮选， 可缺省
    order: ['id DESC'], // 查询结果根据id进行倒序， 可缺省
})

export class ModuleUser{
    static insertUser(udata: interfaceUser.detail): Promise<number>{
        return insertUser(udata).then((resutl: { data: { insertId: number; }; }) => resutl?.data?.insertId)
    }

    static find(uid: number): Promise<interfaceUser.detail|never>{
        return findUser({id: uid, delele_date: null}).then((detail: null| interfaceUser.detail) => {
            if (detail === null) { throw new ExceptionUser.MissUser() }
            return detail
        })
    }
}