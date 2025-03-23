import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Customer } from '../../../entities/Customer.entity';

export function Home() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  //Buscar os clientes
  useEffect(() => {
    async function fetchCustomers() {
      const response = await window.api.fetchAllCustomers();
      setCustomers(response);
    }

    fetchCustomers();
  }, [])

  // async function handleAdd(){
  //   const response = await window.api.fetchAllCustomers();
  //   console.log(response);
  // }

  // async function handleDeleteCustomer(){
  //   const docId = "e15a8b7d-188c-4a1d-af47-e484f3de074a"

  //   const response = await window.api.deleteCustomer(docId)
  //   console.log(response);
  // }

  // async function handleCustomerById(){
  //   const docId = "e15a8b7d-188c-4a1d-af47-e484f3de074a"

  //   const response = await window.api.fetchCustomerById(docId)
  //   console.log(response);
  // }

  return (
    <div className='flex-1 flex flex-col py-12 text-white'>
      <div className='px-10'>
        <h1 className='text-white text-xl lg:text-3xl font-semibold mb-4'>
          Todos clientes
        </h1>
      </div>

      <section className='flex flex-col gap-6 w-full h-screen overflow-y-auto px-10 pb-[200px]'>
        {customers?.length === 0 && (
          <p className='text-gray-300'>Nenhum cliente cadastrado...</p>
        )}
        {customers?.map((customer) => (

          <Link
            to={`/customer/${customer._id}`}
            key={customer._id}
            className='bg-gray-800 px-4 py-3 rounded'
          >
            <p className='mb-2 font-semibold text-lg'>{customer.name}</p>
            <p><span className='font-semibold'>Email: </span>{customer.email}</p>
            {customer.phone && (
              <p>
                <span className='font-semibold'>Telefone: </span> {customer.phone}
              </p>
            )}
          </Link>
        ))}
      </section>

    </div>
  )
}