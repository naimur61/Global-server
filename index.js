const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();



// Middle Ware 
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.guif9pr.mongodb.net/your-database-name?retryWrites=true&w=majority`;



async function run() {
   const client = new MongoClient(uri);

   try {
      const db = client.db();

      /* <------------------------------------------- Collections  -----------------------------------------> */
      const carCollection = client.db('Global_server').collection('Cars');
      const blogCollection = client.db('Global_server').collection('blogs');




      /* <------------------------------------------- Projects  -----------------------------------------> */



      // Get Cars
      app.get('/allCars', async (req, res) => {
         const query = {};
         const cursor = carCollection.find(query);
         const projects = await cursor.toArray();
         res.send(projects);
      })


      // Get  Cars By search & page
      app.get('/cars', async (req, res) => {
         const searchQuery = parseInt(req.query.search) || {};
         const page = parseInt(req.query.page) || 0;

         const cursor = carCollection.find(searchQuery);
         const cars = await cursor.skip(page * 6).limit(6).toArray();
         console.log(cars);


      })

      // get Limit able Project 
      // app.get('/limitProject', async (req, res) => {
      //    const limit = parseInt(req.query.limit);
      //    const sortOptions = { _id: -1 };
      //    const cursor = projectCollection.find().sort(sortOptions).limit(limit);
      //    const projects = await cursor.toArray();
      //    res.json(projects);
      // })

      // Get Project By Id 
      // app.get('/project/:_id', async (req, res) => {
      //    const id = req.params._id;
      //    const query = { _id: ObjectId(id) };
      //    const result = await projectCollection.findOne(query);
      //    res.send(result);
      // })





      // Post Projects
      // app.post('/cars', async (req, res) => {
      //    const car = { name: 'Passat', model: 'v3' };
      //    const result = await carCollection.insertOne(car);
      //    console.log(result)
      //    res.status(201).json(result.ops[0]);
      // })


      /* <-------------------------------------------  X  -----------------------------------------> */


   } finally {
   }
}
run().catch(console.dir);


app.get('/', (req, res) => {
   res.send('Global Server');
})



app.listen(port, () => {
   console.log(`node is running in ${port}`);
})