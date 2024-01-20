const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); 

const uri = "mongodb+srv://ssrivastav:shaurya237833@cluster0.3ygnbwf.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1
});

// Function to connect to the database
async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (err) {
    console.error("Connection to MongoDB failed", err);
  }
}

// Ping the database to check the connection
app.get('/pingdb', async (req, res) => {
  try {
    await client.connect();
    await client.db("aggie-guide").command({ ping: 1 });
    res.send('Pinged MongoDB successfully.');
  } finally {
    await client.close();
  }
});

// API endpoint to get all courses
app.get('/api/courses', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db('aggie-guide').collection('courses');
    const courses = await collection.find({}).toArray();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  } finally {
    await client.close();
  }
});

app.post('/api/courses', async (req, res) => {
    try {
      await client.connect();
      const collection = client.db('aggie-guide').collection('courses');
      const course = req.body; // The course data sent in the request body
      const result = await collection.insertOne(course);
      
      // If you want to return the entire new course document, use the 'insertedId' to fetch it.
      // The inserted document is not returned directly in the result of `insertOne()`.
      if (result.insertedId) {
        const newCourse = await collection.findOne({ _id: result.insertedId });
        res.status(201).json(newCourse);
      } else {
        throw new Error('Failed to insert new course.');
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } finally {
      await client.close();
    }
  });
  

// Start the server and make sure the database is connected
run().catch(console.dir);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
