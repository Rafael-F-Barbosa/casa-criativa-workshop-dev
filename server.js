// usei o express pra criar e configurar meu servidor
const express = require("express")
const server = express()

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2728/2728995.svg",
        title: "Cursos de programação",
        category: "Estudo",
        description: "Loren ipsum dolor sit amet consectetur...",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercíos",
        category: "Saúde",
        description: "Loren ipsum dolor sit amet consectetur...",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Saúde",
        description: "Loren ipsum dolor sit amet consectetur...",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaoke",
        category: "Diversao em família",
        description: "Loren ipsum dolor sit amet consectetur...",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
        title: "Pintura",
        category: "Criatividade",
        description: "Loren ipsum dolor sit amet consectetur...",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729062.svg",
        title: "DIY",
        category: "Criatividade",
        description: "Loren ipsum dolor sit amet consectetur...",
        url: "https://rocketseat.com.br"
    }
    
]



// configurar arquivos estáticos

server.use(express.static("public"))

// configuração numjucks

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, // boolean
})

// criei uma rota /
// e capturo o pedido do cliente para respondê-lo.
server.get("/", function(req, res)
{
    const reversedIdeas = [...ideas].reverse()
    let lastIdeas = [];

    for(let idea of reversedIdeas)
    {
        lastIdeas.push(idea)
        if(lastIdeas.length == 3)
        {
            break;
        }
    }
    
    return res.render("index.html", {lastIdeas});
});

server.get("/ideias", function(req, res)
{
    const reversedIdeas = [...ideas].reverse()

    return res.render("ideias.html", {lastIdeas: reversedIdeas});
});


// liguei meu servidor na porta 3000
server.listen(3000)

