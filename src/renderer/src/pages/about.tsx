import { useEffect, useState } from "react";

export function About(){
  const [data, setData] = useState<string>();

  useEffect(() => {
    async function fetchVersionApp(){
      const response = await window.api.getVersionApp();
      setData(response);
    }

    fetchVersionApp();
  }, [])

 

  return (
    <div className='flex-1 flex flex-col py-12 px-10 text-white'>
      <h1 className='text-white text-xl lg:text-3xl font-semibold mb-4'>
        Página sobre
      </h1>

      <p>Projeto criado no curso <b>@sujeitoprogramador</b></p>
      <p>Versão atual do projeto: {data}</p>
    </div>
  )
}