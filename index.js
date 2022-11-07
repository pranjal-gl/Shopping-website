const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res)=>{
    res.sendFile('C:\\Users\\pranjal.tripathi\\Desktop\\KT Sessions\\POC\\StoreApp\\public\\HomePage.html')
});

app.listen(3002, ()=>{
    console.log("Server started at 3002");
})