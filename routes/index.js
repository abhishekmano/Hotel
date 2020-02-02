var express = require('express');
var router = express.Router();
var dat;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'db'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

router.get('/hotel',function(req,res){
  console.log('asdasd');
  connection.query('SELECT * FROM hotels', (err,rows) => {
    if(err) throw err;
    console.log('Data received from Db:');
    res.send(JSON.stringify(rows));
  });

})
router.get('/hotel/:uid',(req,res)=>{
  var hotel_id=parseInt(req.params.uid);
  connection.query("SELECT * FROM dish WHERE hotel_id="+hotel_id+"", (err,rows) => {
    if(err) throw err;
    console.log('Data received from Db:');
  console.log('j',JSON.stringify(rows));
  res.send(JSON.stringify(rows));
  
  });
 
});

setInterval(()=>{
  connection.query('UPDATE dish SET price=min_price+(max_prize-min_price)*(discount/100)');
  console.log('success');
}, 60000);



module.exports = router;
