const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const app = express();


app.use(cors());
app.use(express.json());







const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p9sgcbw.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run (){

    try{

        const productCollection = client.db('E-Commerce').collection('allProducts')



        // getting allProducts________________________________________________
        app.get('/allproducts/:category', async(req, res) => {
            const allCategory = req.params.category;
            console.log(allCategory);
            const query = {categories:allCategory};
            const result = await productCollection.find(query).toArray();
            res.send(result);

        })




        // getting data for addtoCart_________________________________________________
        app.get('/addtocart/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await productCollection.findOne(query);
            res.send(product);
        })






    }












    finally{

    }

}
run().catch(error => console.error(error));

























app.get('/', async(req, res) => {
    res.send('Server is running');
})


app.listen(port, () => console.log(`Don't worry your server is running on ${port}`))