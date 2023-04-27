const express = require('express');
const app = express();
//const http = require('http')
const port = 300
//const fs = require('fs')
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.set('views', './views')
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/feedback', (req, res) => {
    res.render('feedback')
})
app.get('/game', (req, res) => {
    res.render('game')
})
app.get('/gifts', (req, res) => {
    res.render('gifts')
})
app.get('/gallery', (req, res) => {
    res.render('trips')
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/fav', (req, res) => {
    res.render('fav')
})
app.listen(port, () => console.info('Listening on port ${port}'))

/*const server = http.createServer(function(req, res){

    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.readFile('./index.html', function(error, data) {
        if(error) {
            res.writeHead(404)
            res.write(Error)
        } else {
            res.write(data)
        }
        res.end()
    })
})
server.listen(port, function(error){
    if (error) {
console.log('something went wrong', error)
} else {
    console.log('Server is listening on port ', + port)
}
})*/