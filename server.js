// usei o express pra criar e configurar meu servidor
const express = require("express")
const server = express()

const db = require("./db")



// configurar arquivos estáticos

server.use(express.static("public"))

// habilitar uso do re.body
server.use(express.urlencoded({extended:true}))


// configuração numjucks

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, // boolean
})

// criei uma rota /
// e capturo o pedido do cliente para respondê-lo.
server.get("/", function (req, res) {
    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err) 
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()
        let lastIdeas = [];

        for (let idea of reversedIdeas) {
            lastIdeas.push(idea)
            if (lastIdeas.length == 3) {
                break;
            }
        }

        return res.render("index.html", { lastIdeas });
        
    })


});

server.get("/ideias", function (req, res) {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err) 
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", { lastIdeas: reversedIdeas });

    })

})

server.post("/", function(req, res){
    
    // inserir dado na tabela
    const query = `
    INSERT INTO ideas(
        image, 
        title, 
        category,
        description,
        link
    )VALUES(?,?,?,?,?); 
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ];  

    db.run(query, values, function(err){
        if(err){
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        return res.redirect("/ideias")
    })
})



// liguei meu servidor na porta 3000
server.listen(3000)

