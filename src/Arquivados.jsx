import React, { useState, useEffect }  from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link } from 'react-router-dom';
import './style.css';
import './adicionar.css';

function Arquivados() {
    const [usuariosArquivados, setUsuariosArquivados] = useState([]);
    const [filtro, setFiltro] = useState(""); // Estado para armazenar o filtro
    const [selectedRows, setSelectedRows] = useState([]);

useEffect(() => {
    carregarUsuariosArquivados();  // Carrega os dados
  }, []);

  const carregarUsuariosArquivados = () => {
    axios.get("http://localhost:5000/api/usuarios/arquivados")
      .then((response) => setUsuariosArquivados(response.data))
      .catch((error) => console.error("Erro ao buscar dados", error));
  };
  
  // Filtrando os usuários com base no nome digitado
  const usuariosFiltrados = usuariosArquivados.filter(user =>
    user.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  // Deletar arquivados
  const handleArchivedDelete = async (id) => {
    if(!window.confirm("Tem certeza que deseja excluir este usuario?")){
        return;
    }
    try {
        axios.delete(`http://localhost:5000/api/usuarios/arquivados/${id}`);

        setUsuariosArquivados(usuariosArquivados.filter(user => user.id !== id));
        console.log("Usuário deletado com sucesso.");
  }catch(error){
    console.error("Erro ao deletar usuário arquivado", error);
    alert("Erro ao deletar usuário arquivado");
  }}

  // Desarquivar usuário
  const handleUnarchive = async(id) => {
    try {
        // Usando o método PUT do axios para desarquivar o usuário
        await axios.put(`http://localhost:5000/api/usuarios/desarquivar/${id}`);
        
        // Atualizando a lista de usuários removendo o usuário desarquivado
        setUsuariosArquivados(usuariosArquivados.filter(user => user.id !== id));
        
        console.log("Usuario desarquivado com sucesso");
      } catch (error) {
        console.error("Erro ao desarquivar usuario", error);
        alert("Erro ao desarquivar usuario. Tente novamente");
      }
  }

  // desarquivar os usuarios selecionados
  const handleUnarchiveSelectedUsers = () => {
    if(selectedRows.length === 0){
        alert("Selecione pelo menos um usuário para desarquivar.");
        return;
    }

    const idsParaDesarquivar = selectedRows.map(user => user.id);

    axios.post("http://localhost:5000/api/usuarios/desarquivados", {ids: idsParaDesarquivar})
    .then(()=>{
        alert("Usuários desarquivados com sucesso!");
        setUsuariosArquivados(prevUsuarios => prevUsuarios.filter(user => !idsParaDesarquivar.includes(user.id)));
    })
    .catch(err => {
        console.error("Erro ao desarquivar usuários: ", err);
    })
  }

  // excluir os usuarios selecionados
  const handleDeleteSelectedUsers = () => {
    if (selectedRows.length === 0) {
      alert("Selecione pelo menos um usuário para excluir.");
      return;
    }
  
    const idsParaExcluir = selectedRows.map(user => user.id);
    
    axios.post("http://localhost:5000/api/usuarios/arquivados/delete", { ids: idsParaExcluir })
    .then(() => {
      alert("Usuários excluídos com sucesso!");
      setUsuariosArquivados(prevUsuarios => prevUsuarios.filter(user => !idsParaExcluir.includes(user.id)));
      setSelectedRows([]);
      })
      .catch(err => console.error("Erro ao deletar usuário: ", err));
  };

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows); // atualizando o `selectedRows` 
  }

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
        <div key={row.id} className="buttons-arquivados-crud">
          
          <button onClick={() => handleArchivedDelete(row.id)} className="btn-delete">Excluir</button>
          
          <button onClick={() => handleUnarchive(row.id)} className="btn-desarquivar">Desarquivar</button>
        </div>
      ),
      width: '290px'
    }
  ];

    return (  
        <div className='container-principal'>
            <div className='btn-button-voltar'>
                <Link to="/" className="btn-voltar">
                    <div className="btn-voltar-config">
                        <svg className="svg-toggle-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path
                            className="defaul-icon-home"
                            fill="currentColor"
                            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                        />
                        </svg>
                        <p>
                            Voltar
                        </p>
                    </div>
                 </Link>
            </div>
            <div  className='btn-selecionados'>
                <button onClick={handleDeleteSelectedUsers}>Excluir os selecionados</button>
                <button onClick={handleUnarchiveSelectedUsers}>Desarquivar os selecionados</button>
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

export default Arquivados;