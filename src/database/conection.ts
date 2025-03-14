import mysql from 'mysql2'

export const conection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'alex',
    password:'1234',
    database:'devClientes'
})
