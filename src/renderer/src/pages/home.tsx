import React from 'react'
import { Link } from 'react-router-dom'

export function Home() {

  async function handleAdd() {
    const response = await window.api.fetchUsers()
    console.log(response)
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

    </div>


  )
}