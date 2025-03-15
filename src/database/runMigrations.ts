import { conection } from './conection'
import { migrations } from './migrations/migrations'

const runmigration = () => {

    migrations.forEach(migration => {

        const runMigrationQuery = migration

        conection.query(runMigrationQuery, (error, result) => {
            if (error) {
                console.log(error)
            }

        })
    })
}

runmigration()
