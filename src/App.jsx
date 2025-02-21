import './style.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import "react-data-table-component-extensions/dist/index.css"
import { Link } from 'react-router-dom';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState(""); // Estado para armazenar o filtro
  const [selectedRows, setSelectedRows] = useState([]); // lista dos selecionados
  

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = () => {
    axios.get("http://localhost:5000/api/usuarios")
      .then((response) => setUsuarios(response.data))
      .catch((error) => console.error("Erro ao buscar dados", error));
  };

  // Filtrando os usuários com base no nome digitado
  const usuariosFiltrados = usuarios.filter(user =>
    user.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  //botão arquivar
  const handleArchiveUser = async (id) => {
    try {
      // Usando o método PUT do axios para arquivar o usuário
      await axios.put(`http://localhost:5000/api/usuarios/arquivados/${id}`);
      
      // Atualizando a lista de usuários removendo o usuário arquivado
      setUsuarios(prevUsuarios => prevUsuarios.filter(user => user.id !== id))
      
      console.log("Usuario arquivado com sucesso");
    } catch (error) {
      console.error("Erro ao arquivar usuario", error);
      alert("Erro ao arquivar usuario. Tente novamente");
    }
  };

  // arquivar os usuarios selecionados
  const handleArchiveSelectedUsers = () => {
    if(selectedRows.length === 0){
      alert("Selecione pelo menos um usuário para arquivar");
      return;
    }

    const idsParaArquivar = selectedRows.map(user => user.id);

    axios.post("http://localhost:5000/api/usuarios/arquivados", {ids: idsParaArquivar})
    .then(() => {
      alert("Usuários arquivados com sucesso.");
      setUsuarios(prevUsuarios => prevUsuarios.filter(user => !idsParaArquivar.includes(user.id)));
    })
    .catch(err => {
      console.error("Erro ao arquivar os usuários: ", err);
    })
  }

  const handleDelete = async (id) => {
    if(!window.confirm("Tem certeza que deseja excluir este usuario?")){
      return;
    }

    try{
      await axios.delete(`http://localhost:5000/api/usuarios/${id}`);

      //atualiza a lista apos exclusao
      setUsuarios(prevUsuarios => prevUsuarios.filter(user => user.id !== id))
      console.log("Usuario deletado com sucesso");
    }catch(error){
      console.error("Erro ao deletar usuario ", error);
      alert("Erro ao excluir usuario. Tente novamente");
    }

  
  };

  const handleDeleteSelectedUsers = () => {
    if (selectedRows.length === 0) {
      alert("Selecione pelo menos um usuário para excluir.");
      return;
    }
  
    const idsParaExcluir = selectedRows.map(user => user.id);
    
    axios.post("http://localhost:5000/api/usuarios/delete", { ids: idsParaExcluir })
    .then(() => {
      alert("Usuários excluídos com sucesso!");
      setUsuarios(prevUsuarios => prevUsuarios.filter(user => !idsParaExcluir.includes(user.id)));
      setSelectedRows([]);
      })
      .catch(err => console.error("Erro ao deletar usuário: ", err));
  };
  
  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows); // Atualizando o `selectedRows`
  };
  

  const columnsConfig = [
    {
      name: 'Nome',
      selector: (row) => row.nome,
      sortable: true,
      width: '200px'
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      resizable: true, 
      width: '200px'
    },
    {
      name: 'Idade',
      selector: (row) => row.idade,
      sortable: true,
      resizable: true,
      width: '80px'
    },
    {
      name: 'Ações',
      cell: (row) => (
        <div key={row.id} className='btn-crud'>
          <Link to="/update" state={{id: row.id}} className="btn-update">Editar</Link>
          
          <button onClick={() => handleDelete(row.id)} className="btn-delete">Excluir</button>
          
          <button onClick={() => handleArchiveUser(row.id)} className="btn-arquivar">Arquivar</button>
        </div>
      ),
      width: '290px'
    }
  ];
  

  return (
    <div className='container-principal'>
      <div className='btn-button'>
        <Link to="/adicionar" className='btn'>+ Adicionar</Link>
        <Link to="/arquivados" className='btn'>Pessoas arquivadas</Link>
      </div>
      <div className='config-tabela'>
        {/* Filtro de pesquisa */}
        <div className="text-end">
          <input 
            type="text" 
            placeholder="Filtrar por nome" 
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)} 
          />
        </div>
        <div className='btn-selecionados'>
          <button onClick={handleDeleteSelectedUsers}>Excluir os selecionados</button>
          <button onClick={handleArchiveSelectedUsers}>Arquivar os selecionados</button>
        </div>

      </div>

      <div className='container-tabela'>

        <DataTable
          columns={columnsConfig}
          data={usuariosFiltrados}
          selectableRows
          onSelectedRowsChange={handleRowSelected} //captura os itens selecionados
          pagination
          
        />
      </div>  
    </div>
  );
}

export default App;
