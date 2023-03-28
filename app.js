const express= require('express');
const path = require('path')
const bodyParser = require('body-parser')
const sequelize = require('./util/database');
const controllers= require('./controllers/expense');
const { urlencoded } = require('body-parser');
var cors = require('cors')
const app = express();

app.use(cors())
app.use(bodyParser.json(),urlencoded({extended:true}))

app.get('/getExpenses',controllers.getExpanses);
app.post('/addExpenses',controllers.addExpanse);
app.get('/getExpense/:expanseId',controllers.getExpanse);
app.put('/updateExpense/:expanseId',controllers.updateExpanse);
app.delete('/deleteExpenses:expanseId',controllers.deleteExpanse)
sequelize.sync().then(result=>{console.log(result);}).catch(err=>{console.log(err);})
app.listen(3000,()=>{console.log("seerver running on port 3000");})