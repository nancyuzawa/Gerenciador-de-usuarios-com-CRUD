import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; 

function Editar() {
    const navigate = useNavigate();
    const location = useLocation(); 
    const { id } = location.state || {}; //extrai o id do estado

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');

    // carrega dados do usuario
    useEffect(()=>{
        if(id){
            axios.get(`http://localhost:5000/api/usuarios/${id}`)
            .then((response) => {
                const {nome, email, idade} = response.data;
                setNome(nome);
                setEmail(email);
                setIdade(idade);
            })
            .catch((error) =>{
                console.error('Erro ao carregar os dados do usuário:', error);
            })
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { nome, email, idade };
    
        axios.put(`http://localhost:5000/api/usuarios/${id}`, updatedUser)
          .then((response) => {
            console.log('Usuário atualizado:', response.data);
           navigate('/')
          })
          .catch((error) => {
            console.error('Erro ao atualizar usuário:', error);
          });
      };
    
    return ( 
        <div className='conatainer-principal'>
            <form className="form-editar" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="number"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    placeholder="Idade"
                />
                <button type="submit" className="btn-atualizar">Atualizar</button>
            </form>
        </div>

     )
}

export default Editar;