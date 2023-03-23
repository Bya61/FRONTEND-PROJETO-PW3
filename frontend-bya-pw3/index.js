const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Configurações do ejs
app.use(express.static('public'));
app.set('view engine', 'ejs');

//Rotas de acesso as páginas ejs
app.get('/', (req, res)=>{
    res.render('index');
});

//Inicio das rotas de produto

//cadastro
app.get('/produto' , (req, res)=>{
    res.render('produto/index');
});

app.listen(3001, ()=> {
    console.log("SERVIDOR FRONTEND RODANDO EM - http://localhost:3001");
});

//Listagem 
app.get('/listagemProduto', (req, res)=>{
   
    //configuração da requisição backend via axios

    //rota backend
    const urlListarProduto = 'http://localhost:3000/listarProduto';

    /*
     CHAMADA DO AXIOS PARA A ROTA DO BACK END 
     PARAMETROS DO VERBO:
     1 - ROTA
     2 - .then DE TRATAMENTO DA RESPOSTA
     */
    axios.get(urlListarProduto)
    .then((response)=>{

        console.log(response.data);
        let produtos = response.data;
        res.render('produto/listagemProduto', {produtos});

    });
});

