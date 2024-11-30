import mysql2 from 'mysql2'
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql2.createConnection({
    host:"localhost",
    user:'root',
    password:"GuRU077@",
    database: "school",
})

db.connect(err=>{
    if(err) throw err;
    console.log('MySQL Connected...');
})
