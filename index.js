const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const Perfumes = [
    { id: 1, name: "Polo Blue", concentracion: "Parfum", familiaOlfativa: "Amaderada" },
    { id: 2, name: "Kaiak Urbe", concentracion: "EDT", familiaOlfativa: "Fougere" },
    { id: 3, name: "Hugo Man", concentracion: "EDT", familiaOlfativa: "Aromática Verde" },
];

// Rutas
app.get('/', (req, res) => {
    res.send("Node JS API");
});

app.get('/api/perfumes', (req, res) => {
    res.send(Perfumes);
});

app.get('/api/perfumes/:id', (req, res) => {
    const perfume = Perfumes.find(c => c.id === parseInt(req.params.id));
    if (!perfume) return res.status(404).send("Perfume no encontrado");
    res.send(perfume);
});

app.post('/api/perfumes', (req, res) => {
    const perfume = {
        id: Perfumes.length + 1,
        name: req.body.name,
        concentracion: req.body.concentracion,
        familiaOlfativa: req.body.familiaOlfativa
    };
    Perfumes.push(perfume);
    res.send(perfume);
});

app.delete('/api/perfumes/:id', (req, res) => {
    const perfume = Perfumes.find(c => c.id === parseInt(req.params.id));
    if (!perfume) return res.status(404).send("Perfume no encontrado");
    const index = Perfumes.indexOf(perfume);
    Perfumes.splice(index, 1);
    res.send(perfume);
});


app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));
