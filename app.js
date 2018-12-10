const express = require('express'),
    app = express();
app.use(express.static("public"));

app.set("view engine", 'ejs');
app.get('',(req,res)=>res.render('index'));

app.listen(process.env.PORT, process.env.IP, () => {
    console.log(`Server is listening at port ${process.env.PORT}`);
});