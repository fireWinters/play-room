import {initDb} from 'mysql-curd'
import config from '../config'
export const db = initDb(Object.assign({

}, config.database))

export const spotTable = db.spotTable
export const C = db.C
export const R = db.R
export const U = db.U
export const D = db.D