const express = require('express')
const morgan = require ('morgan')
const cors = require('cors')
const ejs = require ('ejs')

const app = express()



//MIDDLEWARES
app.use(morgan('combined')) //con morgan obtenemos informacion del cliente (util para crear base de datos)
app.use(cors()) //con cors controlamos que servidor/cliente puede acceder a nuestra base de datos
app.use(express.json()) // estamos diciendo a express que pueda comprender formato jason
app.set('view engine', 'ejs')// enseñamos a el servidor a  renderizar paginas web 

// Archivos estáticos
app.use( express.static('public') )

// Conexión a Base de Datos
const { sequelize } = require('./database');
sequelize.authenticate()
.then(() => console.log("Conexión a Base de datos Exitosa"))
.catch( err => console.log('Error al conectar BD: ', err))

//Routes
const rutablog = require('./routes/blog.routes');
app.use(rutablog)

app.listen(3000)
console.log('Servidor corriendo en puerto ${3000}')