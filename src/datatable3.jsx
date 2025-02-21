import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  
  // Definindo as colunas com base nos dados retornados da API
  const columnsConfig = [
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
    },
    // Adicionando a coluna de Ações
    {
      name: 'Actions',
      cell: row => (
        <div>
          <Link to={`/update/${row.id}`} className="btn-update">Update</Link>
          <Link to={`/delete/${row.id}`} className="btn-delete">Delete</Link>
        </div>
      ),
      ignoreRowClick: true, // Ignora o clique na célula de ações
      allowOverflow: true,  // Permite a sobrecarga de células
      button: true          // Estiliza os botões
    }
  ];

  useEffect(() => {
    // Fazendo a requisição com Axios
    axios.get('http://localhost:3030/users')
      .then(res => {
        // Garantindo que os dados não estão vazios
        if (res.data.length > 0) {
          setColumns(columnsConfig); // Definir colunas
          setRecords(res.data); // Definir registros
        }
      })
      .catch(err => console.error("Erro ao buscar dados:", err));
  }, []);

  // Função de filtro
  function handleFilter(event) {
    const filteredData = records.filter(row => 
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(filteredData);
  }

  // Função de atualização
  function handleUpdate(row) {
    console.log("Updating row", row);
    // Aqui você pode adicionar a lógica para editar os dados
  }

  // Função de exclusão
  function handleDelete(id) {
    console.log("Deleting row with id", id);
    // Aqui você pode adicionar a lógica para excluir os dados, por exemplo, fazendo uma requisição para a API
    setRecords(records.filter(record => record.id !== id)); // Apenas removendo da lista local como exemplo
  }

  return (
    <div>
      {/* Adicoinar */}
      <div className='btn-button'>
        <Link to="/create" className='btn'>Add +</Link>
      </div>
      {/* Filtro de pesquisa */}
      <div className="text-end">
        <input 
          type="text" 
          placeholder="Filtrar por nome" 
          onChange={handleFilter} 
        />
      </div>

      {/* DataTable para exibir os registros */}
      <DataTable
        columns={columns} // Passando as colunas definidas
        data={records} // Passando os dados dos registros
        selectableRows // Permite selecionar as linhas
        fixedHeader // Cabeçalho fixo
        pagination // Paginação
      />
    </div>
  );
}

export default App;
