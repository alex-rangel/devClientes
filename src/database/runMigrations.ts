import path from 'node:path'
import { app, ipcMain } from 'electron'
import fs from 'node:fs'
import { conection } from './conection'

const runmigration = ()=>{
    
const fileDatabaseDir = path.join(app.getPath("userData"),"..", "..", "devClientes", "src", "database", "migrations");

    fs.readdir(fileDatabaseDir, (err, files) =>{
        if(err){
            console.error(err)
        }

        files.forEach(file => {
            fs.readFile(path.join(fileDatabaseDir,file), (err, content) =>{
                if(err){
                    console.error(err)
                }
                
                const runMigrationQuery = content.toString()

                conection.query(runMigrationQuery, (error, result) =>{
                    if(error){
                        console.log(error)
                    }

                })
            })
        })
    })

}

runmigration()
