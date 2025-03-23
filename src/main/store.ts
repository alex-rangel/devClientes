import { app, ipcMain } from 'electron'
import { Customer } from '../entities/Customer.entity'
import { conection } from '../database/conection'
import { ResultSetHeader } from 'mysql2'

//cadastrar um novo cliente
ipcMain.handle('add-customer', async (_, { name, email, role, status, address, phone }: Customer) => {
    try {

        const query = `INSERT INTO customer (name, address, email, role, phone, status) VALUES (?, ?, ?, ?, ?, ?)`
        const values = [name, address, email, role, phone, status]
        const [result] = await conection.promise().query<ResultSetHeader>(query, values)

        // Verifica se o cliente foi cadastrado
        if (result.affectedRows > 0) {
            // Pega o id do cliente cadastrado
            const customerId = result.insertId

            const newCustomer = new Customer({ _id: String(customerId), name, email, role, status, address, phone })
        }

        return true

    } catch (error) {
        console.error(error)
        return false
    }
})


//buscar todos os clientes
async function fetchAllCustomers(): Promise<Customer[]> {
    try {
        const query = 'SELECT * FROM customer'
        const rows = await conection.promise().query(query) as unknown as [Customer[]]
        const customers: Customer[] = []
        rows[0].forEach((customer) => {
            customers.push(new Customer({ ...customer, _id: String((customer as any).id) }))
        })
        return customers
    } catch (error) {
        console.error(error)
        return []
    }
}

ipcMain.handle('fetch-all-customers', async () => {
    return fetchAllCustomers()
})

//buscar um cliente pelo id

async function fetchCustomerById(id: string): Promise<Customer | null> {
    try {
        const query = 'SELECT * FROM customer WHERE id = ?'
        const [rows] = await conection.promise().query(query, [id]) as unknown as [Customer[]]
        if (rows.length > 0) {
            const customer = new Customer({ ...rows[0], _id: String((rows[0] as any).id) })
            return customer
        }
        return null
    } catch (error) {
        console.error(error)
        return null
    }
}

ipcMain.handle('fetch-customer-by-id', async (_, id: string) => {
    return fetchCustomerById(id)
})

//deletar um cliente
async function deleteCustomer(id: string): Promise<boolean> {
    try {

        const customer = fetchCustomerById(id)

        if (!customer) {
            return false
        }

        const query = 'DELETE FROM customer WHERE id = ?'
        const [result] = await conection.promise().query<ResultSetHeader>(query, [id])
        if (result.affectedRows > 0) {
            return true
        }
        return false
    } catch (error) {
        console.error(error)
        return false
    }
}

ipcMain.handle('delete-customer', async (_, id: string) => {
    return deleteCustomer(id)
})

