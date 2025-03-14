import { app, ipcMain } from 'electron'
import { Customer } from '../shared/types/Customer.type'
import { Customer as CustomerEntity } from '../entities/Customes.entity'
import { conection } from '../database/conection'

ipcMain.handle('add-customer', async (_, customer: CustomerEntity) => {
    try {
        const customerEntity = new CustomerEntity(customer)
        const query = `INSERT INTO usuario (name, address, email, role, phone, status) VALUES (?, ?, ?, ?, ?, ?)`
        const values = [customerEntity.name, customerEntity.address, customerEntity.email, customerEntity.role, customerEntity.phone, customerEntity.status]
        await conection.promise().query(query, values)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
})



