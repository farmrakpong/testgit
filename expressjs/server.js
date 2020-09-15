const express = require("express")
let mysql = require('mysql');
let app = express()
var db = mysql.createConnection({
        host     : 'localhost', 
        user     : 'root',
        password : '',
        database : 'fortest'
  });
db.connect() // เชื่อมต่อฐานข้อมูล
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//
app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
      res.header('Access-Control-Allow-Headers','Content-Type, Option, Authorization')
      return next()
  });

app.post("/fuckinginsert" , async (req , res , next) =>{
        //   res.send(req.body)
    let sql = "INSERT INTO user (Name, S_name) VALUES ?";
    var values = [
        [req.body.Name, req.body.S_name],
    ];
    db.query(sql, [values], await function(err) {
        res.send("success")
        // if (err) throw err;
        if (err) {
            res.send(err) 
        }
        
    });
})

app.post("/fuckingdelete" ,async (req , res ,next) =>{
    let mianid = req.body.ID
    db.connect(() =>{
        let sql = `DELETE FROM user WHERE ID = ?`;
        db.query(sql,mianid, (result) => {
        res.json(result)
        });
    })
    // await res.send(mianid)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Brow
})

app.get("/user" , (req ,res ,next) =>{
        let sql = 'SELECT ID ,Name,S_name FROM user'  // คำสั่ง sql
        let query = db.query(sql, async(err,results) => { // สั่ง Query คำสั่ง sql
        await res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
        })
})

app.listen(8080 ,()=>{
    console.log("server is fucking running on port 8080");
})