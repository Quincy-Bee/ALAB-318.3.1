import express from 'express';
const app = express();

const PORT = 3100;

app.get('/greeting/:name', (req, res) => {
    const name = req.params.name
    let msg = ""
    if (name == "") { msg = "Hello" } else {msg = "Whats Up " + name}

    res.send(msg);
})

app.get('/tip/:total/:tipPercentage', (req,res) => {
    let total = Number(req.params.total)
    let tipPercentage = Number(req.params.tipPercentage)
    // total = total + (total * tipPercentage/100)
    console.log(total, "   ",tipPercentage/100)
    res.send(total * tipPercentage/100)
})

app.listen(PORT, () => {

})

