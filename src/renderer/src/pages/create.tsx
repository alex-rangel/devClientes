import React from 'react'

export function Create() {

  async function handleAddCustomer(){

    const doc = {
      name: "Antonio Rangel",
      email: "antonio@teste.com",
      phone: "67999999",
      address: "Rua X, centro",
      role: "Desing",
      status: true,
    }

    const response = await window.api.addCustomer(doc)
    console.log(response);
    
  }

  return (
    <div>

      <h1>Pagina para cadastrar um cliente</h1>

      <button onClick={handleAddCustomer}>CADASTRAR</button>

    </div>


  )
}