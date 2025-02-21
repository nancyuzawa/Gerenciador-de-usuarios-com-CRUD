import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from "./App";
import Editar from "./Editar";
import Arquivados from "./Arquivados";
import Adicionar from "./Adicionar";

function AppRouter() {
    return (  
       <BrowserRouter>
            {/* <App></App> */}
            <Routes>
                <Route path='/' element={<App/>}/>
                <Route path='/update' element={<Editar/>}/>
                <Route path='/arquivados' element={<Arquivados/>}/>
                <Route path='/adicionar' element={<Adicionar/>}/>
            </Routes>
       </BrowserRouter>
    );
}

export default AppRouter;