require("dotenv").config({ path: "./backend/.env" });

console.log("Porta configurada no .env:", process.env.DB_PORT);

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Permite receber requisições com JSON

// Configuração do banco de dados usando um pool de conexões
const db = mysql.createPool({   //mysql.createPool(), que gerencia conexões de forma eficiente, abrindo e fechando automaticamente quando necessário.
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Teste de conexão inicial
db.getConnection((err, connection) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
    } else {
        console.log("Conectado ao banco de dados!");
        connection.release(); // Libera a conexão após o teste
    }
});

//busca todos os usuarios arquivados
app.get("/api/usuarios/arquivados", (req, res)=>{
    db.getConnection((err, connection)=>{
        if (err){
            return res.status(500).json({error: "Erro ao conectar ao banco de dados - tabela arquivados"})
        }
        connection.query("SELECT * FROM arquivados", (err, results)=>{
            connection.release();
            if (err){
                return res.status(500).json({error: "Erro ao buscar usuarios arquivados"})
            }
            res.json(results);

        })
    })
})

// Rota para buscar todos os usuários
app.get("/api/usuarios", (req, res) => {
    db.getConnection((err, connection) => {
        if(err){
            return res.status(500).json({error:"Erro ao conectar ao banco de dados - tabela usuarios"});
        }

        connection.query("SELECT * FROM informacao", (err, results) => {
            connection.release(); //fecha a conexão após a consulta
            if (err) {
                return res.status(500).json({ error: "Erro ao buscar usuários." });
            }
            res.json(results);
        });
    })
});

//buscar um id especifico 
app.get("/api/usuarios/:id", (req, res) => {
    const { id } = req.params;  // Pega o parâmetro 'id' da URL
  
    const sql = "SELECT * FROM informacao WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Erro ao buscar usuário:", err);
        return res.status(500).json({ error: "Erro ao buscar usuário" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.json(result[0]); // Retorna apenas o primeiro usuário encontrado
    });
  });
  
// buscar um id especifico em arquivados
  app.get("/api/usuarios/arquivados/:id", (req, res) => {
    const { id } = req.params;  // Pega o parâmetro 'id' da URL
  
    const sql = "SELECT * FROM arquivados WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Erro ao buscar usuário:", err);
        return res.status(500).json({ error: "Erro ao buscar usuário" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.json(result[0]); // Retorna apenas o primeiro usuário encontrado
    });
  });

  app.put("/api/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nome, email, idade } = req.body;

    const sql = "UPDATE informacao SET nome = ?, email = ?, idade = ? WHERE id = ?";
    db.query(sql, [nome, email, idade, id], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar usuário:", err);
            return res.status(500).json({ error: "Erro ao atualizar usuário" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.json({ message: "Usuário atualizado com sucesso" });
    });
});

//arquivar
app.put("/api/usuarios/arquivados/:id", (req, res) => {
    const { id } = req.params;

    // Primeiro insere as informações do id selecionado para segunda tabela
    const insertSql = `
        INSERT INTO arquivados (id, nome, email, idade)
        SELECT id, nome, email, idade
        FROM informacao
        WHERE id = ?;
    `;

    db.query(insertSql, [id], (err, result) => {
        if (err) {
            console.error("Erro ao arquivar usuário:", err);
            return res.status(500).json({ error: "Erro ao arquivar usuário" });
        }

        // Depois deleta a informação da primeira tabela
        const deleteSql = "DELETE FROM informacao WHERE id = ?;";
        db.query(deleteSql, [id], (err, result) => {
            if (err){
                console.error("Erro ao deletar usuário após arquivamento: ", err);
                return res.status(500).json({ error: "Erro ao deletar usuário após arquivamento" });
            }
            res.json({message: "Usuário arquivado com sucesso"});
        })
    });
});

// Arquivar varios usuarios
app.post("/api/usuarios/arquivados", (req, res) => {
    const {ids} = req.body;
    if(!ids || ids.length === 0){
        return res.status(400).json({ error: "Nenhum ID foi enviado."});
    }

    const quantidade = ids.map(() => "?").join(","); //Gera os pontos de ?

    const insertSql = `INSERT INTO arquivados (id, nome, email, idade) 
    SELECT id, nome, email, idade 
    FROM informacao 
    WHERE id IN (${quantidade}); `;

    db.query(insertSql, ids, (err, result) => {
        if (err) {
            console.error("Erro ao arquivar usuários:", err);
            return res.status(500).json({ error: "Erro ao arquivar usuários" });
        }

        // Depois deleta a informação da primeira tabela
        const deleteSql = `DELETE FROM informacao WHERE id IN (${quantidade});`;
        db.query(deleteSql, ids, (err, result) => {
            if (err){
                console.error("Erro ao arquivar usuárioS após arquivamento: ", err);
                return res.status(500).json({ error: "Erro ao arquivar usuárioS após arquivamento" });
            }
            res.json({message: `Usuários arquivado com sucesso`});
        })
    });
})

// desarquivar usuario
app.put("/api/usuarios/desarquivar/:id", (req, res) => {
    const {id} = req.params;

    const insertSql = `
        INSERT INTO informacao (id, nome, email, idade)
        SELECT id, nome, email, idade
        FROM arquivados
        WHERE id = ?;
    `
    db.query(insertSql, [id], (err, result) => {
        if (err){
            console.error("Erro ao desarquivar usuário: ", err);
            return res.status(500).json({error: "Erro ao desarquivar usuário."});
        }

        

        const deleteSql = "DELETE FROM arquivados WHERE id = ?;";
        db.query(deleteSql, [id], (err, result) =>{
            if (err){
                console.error("Erro ao deletar usuário após desarquivamento: ", err);
                return res.status(500).json({error: "Erro ao deletar usuário após desarquivamento"});
            }
            res.json({message: "Usuário desarquivado com sucesso"});
        })
    })
})

//desarquivar varios usuarios
app.post("/api/usuarios/desarquivados", (req, res) => {
    const {ids} = req.body;

    if(!ids || ids.length === 0){
        return res.status(400).json({error: "Nenhum Id foi enviado"})
    }

    const quantidade = ids.map(() => "?").join(",");

    const insertSql = `
        INSERT INTO informacao (id, nome, email, idade)
        SELECT id, nome, email, idade
        FROM arquivados
        WHERE id IN (${quantidade});
    `
    db.query(insertSql, ids, (err, result) => {
        if (err){
            console.error("Erro ao desarquivar usuários: ", err);
            return res.status(500).json({error: "Erro ao desarquivar usuários."});
        }

        

        const deleteSql = `DELETE FROM arquivados WHERE id IN (${quantidade});`;
        db.query(deleteSql, ids, (err, result) =>{
            if (err){
                console.error("Erro ao deletar usuários após desarquivamento: ", err);
                return res.status(500).json({error: "Erro ao deletar usuários após desarquivamento"});
            }
            res.json({message: "Usuários desarquivado com sucesso"});
        })
    })
})

  //deletar usuario arquivado
  app.delete("/api/usuarios/arquivados/:id", (req, res) => {
    const {id} = req.params;

    const DeleteArchivedSql = "DELETE FROM arquivados WHERE id = ?";

    db.query(DeleteArchivedSql, [id], (err, result) => {
        if (err){
            console.error("Erro ao deletar usuário arquivado ", err);
            return res.status(500).json({ error: "Erro ao deletar usuário arquivado."});
        }

        if (result.affectedRows === 0){
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.json({message: "Usuário que estava arquivado foi deletado com sucesso."});
    }) 
  })

  //deletar multiplos usuarios
app.post("/api/usuarios/arquivados/delete", (req, res) => {
    const {ids} = req.body;
    if(!ids || ids.length === 0){
        return res.status(400).json({ error: "Nenhum ID foi enviado."});
    }

    const deleteSql = "DELETE FROM arquivados WHERE id In (?)";
    db.query(deleteSql, [ids], (err, result) => {
        if (err) {
            console.error("Erro ao deletar usuário arquivados:", err);
            return res.status(500).json({ error: "Erro ao deletar usuário arquivados"});
        }
        res.json({message: "Usários arquivados deletados com sucesso!"})
    })
})

// DEletar usuario
  app.delete("/api/usuarios/:id", (req, res) => {
    const { id } = req.params;

    // SQL para deletar o usuário com o ID fornecido
    const sql = "DELETE FROM informacao WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erro ao deletar usuário:", err);
            return res.status(500).json({ error: "Erro ao deletar usuário" });
        }

        // Verifica se algum usuário foi realmente deletado
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Retorna mensagem de sucesso
        res.json({ message: "Usuário deletado com sucesso" });
    });
});

//deletar multiplos usuarios
app.post("/api/usuarios/delete", (req, res) => {
    const {ids} = req.body;
    if(!ids || ids.length === 0){
        return res.status(400).json({ error: "Nenhum ID foi enviado."});
    }

    const deleteSql = "DELETE FROM informacao WHERE id In (?)";
    db.query(deleteSql, [ids], (err, result) => {
        if (err) {
            console.error("Erro ao deletar usuário:", err);
            return res.status(500).json({ error: "Erro ao deletar usuário"});
        }
        res.json({message: "Usários deletados com sucesso!"})
    })
})


// Adicionar novo usuario
app.post("/api/usuarios", (req, res) => {
    const { name, email, idade } = req.body;

    if(!name){
        return res.status(400).json({error: "Adicione o nome!"});
    }

    const addSql = "INSERT INTO informacao (nome, email, idade) VALUES (?, ?, ?) " 
    db.query(addSql, [name, email, idade || null], (err, result)=>{
        if (err) {
            console.error("Erro ao inserir usuário:", err);
            return res.status(500).json({ error: "Erro ao adicionar usuário." });
        }
        res.status(201).json({ message: "Usuário adicionado com sucesso!" });
    })
})


// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}!`));
// db.close();
