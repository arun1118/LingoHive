import express from 'express';

const app=express();

app.get("/",(req,res)=>{
    res.send('<h1>Backend working fine...</h1>');
})

const port=5000;
app.listen(port,()=>{
    console.log(`server started on port ${port}...`);
})