import './App.css'
import axios from 'axios';

import React, { useState, useEffect } from 'react'
import DataTabl from 'react-data-table-component';

function App() {
  const [columuns, setColumns] = useState([])
  const [records, setRecords] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:3030/users')
    .then(res =>{
        setColumns(Object.keys(res.data[0]))
        setRecords(res.data)
    })
  }, [])
  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            {columuns.map((c,i) => (
                <th key={i}>{c}</th>
            ))}
            <th>Action</th>
          </tr>

        </thead>
        <tbody>
        {
          records.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>{d.age}</td>
              <td>up/de</td>
            </tr>
          ))
        }
      </tbody>

      </table>
    </div>
  )
}

export default App
