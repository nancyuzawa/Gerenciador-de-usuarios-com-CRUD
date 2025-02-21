import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './adicionar.css'
import { Link } from 'react-router-dom';


function Adicionar() {
    const [inputData, setInputData] = useState({name:'', email:'', idade:''})

    const navigat = useNavigate();

    function handleSubmit(event){
        event.preventDefault();

        axios.post('http://localhost:5000/api/usuarios', inputData)
        .then(res => {
            alert("Dados adicionados com sucesso!");
            navigat('/')
        }).catch(err => console.log(err));
    }
    return ( 
        <div className='conatainer-principal'>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name='name' className='form-control'
                    onChange={e=>setInputData({...inputData, name: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                
                    <input type="email" name="email" className='form-control'
                    onChange={e=>setInputData({...inputData, email: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="idade">Idade:</label>
                
                    <input type="idade" name="idade" className='form-control'
                    onChange={e=>setInputData({...inputData, idade: e.target.value})}/>
                </div>
                <button className='btn-submit buttons'>Adicionar</button>
                <Link to="/" className="campo-cancelar buttons ">Cancelar </Link>
            </form>
        </div>

     )
}

export default Adicionar;