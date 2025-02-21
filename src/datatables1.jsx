import './App.css'

import React, { useState } from 'react'
import DataTabl from 'react-data-table-component';


import Datatable from './datatables.jsx'

function App() {
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },
    {
      name: 'Age',
      selector: row => row.age,
      sortable: true
    }
  ]
  const data = [
    { id: 1, name: 'Yousaf', email: 'yousaf@gmail.com', age: '23' },
    { id: 2, name: 'Maria Silva', email: 'maria.silva@email.com', age: '28' },
    { id: 3, name: 'João Souza', email: 'joao.souza@email.com', age: '35' },
    { id: 4, name: 'Ana Oliveira', email: 'ana.oliveira@email.com', age: '24' },
    { id: 5, name: 'Carlos Lima', email: 'carlos.lima@email.com', age: '40' },
    { id: 6, name: 'Fernanda Rocha', email: 'fernanda.rocha@email.com', age: '30' },
    { id: 7, name: 'Lucas Almeida', email: 'lucas.almeida@email.com', age: '27' },
    { id: 8, name: 'Patrícia Mendes', email: 'patricia.mendes@email.com', age: '33' },
    { id: 9, name: 'Rodrigo Ferreira', email: 'rodrigo.ferreira@email.com', age: '38' },
    { id: 10, name: 'Bruna Costa', email: 'bruna.costa@email.com', age: '29' },
    { id: 11, name: 'Gustavo Martins', email: 'gustavo.martins@email.com', age: '31' },
    { id: 12, name: 'Juliana Lopes', email: 'juliana.lopes@email.com', age: '26' },
    { id: 13, name: 'André Pereira', email: 'andre.pereira@email.com', age: '37' },
    { id: 14, name: 'Camila Duarte', email: 'camila.duarte@email.com', age: '25' },
    { id: 15, name: 'Eduardo Barbosa', email: 'eduardo.barbosa@email.com', age: '39' },
    { id: 16, name: 'Rafaela Nunes', email: 'rafaela.nunes@email.com', age: '32' },
    { id: 17, name: 'Fábio Teixeira', email: 'fabio.teixeira@email.com', age: '34' },
    { id: 18, name: 'Vanessa Ribeiro', email: 'vanessa.ribeiro@email.com', age: '28' },
    { id: 19, name: 'Thiago Fernandes', email: 'thiago.fernandes@email.com', age: '41' },
    { id: 20, name: 'Isabela Cardoso', email: 'isabela.cardoso@email.com', age: '29' }
  ];

  const [records, setRecords] = useState(data);

  function handleFilter(event){
    const newData = data.filter(row =>{
      return row.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData)
  }

  return (
    <div>
      <div className='text-end'>
        <input type="text" onChange={handleFilter}/>
      </div>
      <DataTabl
        columns={columns}
        data={records}
        selectableRows
        fixedHeader
        pagination
      ></DataTabl>
    </div>
  )
}

export default App
