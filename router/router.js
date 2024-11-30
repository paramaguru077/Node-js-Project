import express from 'express'
import {db} from '../db/db.js'
const router = express.Router();


router.post('/addschool',(req,res)=>{
    const{name,address,latitude,longitude}=req.body;
    if(!name|| !address|| !latitude|| !longitude){
        return res.status(400).send("All fiels are request");
    }
    const sql ='insert into schooldetails(name,address,latitude,longitude) values(?,?,?,?)';

    db.query(sql,[name,address,latitude,longitude],(err,result)=>{
        if(err) return err;
        res.status(201).send({Message:"school added successfully",id:result.insertId});
    })

})

router.get('/listschools', (req, res) => {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
        return res.status(400).send("Latitude and longitude are required");
    }
    const sql = 'SELECT * FROM schooldetails';

    db.query(sql, (err, results) => { // Renamed `res` to `results`
        if (err) {
            console.error(err); // Log the error for debugging
            return res.status(500).send("Error retrieving schools");
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        const sortedSchools = results.map((school) => {
            const dist = Math.sqrt(
                Math.pow(userLat - school.latitude, 2) +
                Math.pow(userLon - school.longitude, 2)
            );
            return { ...school, distance: dist };
        }).sort((a, b) => a.distance - b.distance);

        res.send(sortedSchools); // Sends the sorted schools
    });
});


export default router;
