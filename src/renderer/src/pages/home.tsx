import React from 'react'
import { Link } from 'react-router-dom'

export function Home() {

  async function handleAdd() {
    const response = await window.api.fetchAllCustomers();
    console.log(response)
  }

  async function handleCustomerById() {
    const docId = "1"

    const response = await window.api.fetchCustomerById(docId)
    console.log(response);
  }

  async function handleDeleteCustomer() {
    const docId = "1765"

    const response = await window.api.deleteCustomer(docId)
    console.log(response);
  }

  return (
    <div>

      <h1>Home</h1>
      <h3>Testeeeeee</h3>
      <Link to='/create'>Ir para a pagina create</Link>
      <br /><br />

      <button onClick={handleAdd}>
        BUSCAR USUARIOS
      </button>
      <br /><br />
      <button onClick={handleCustomerById}>
        BUSCAR USUARIO PELO ID
      </button>

      <br /> <br />

      <button onClick={handleDeleteCustomer}>
        DELETAR CLIENTE
      </button>

    </div>


  )
}