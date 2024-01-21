const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS

const uri = "mongodb+srv://ssrivastav:shaurya237833@cluster0.3ygnbwf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const upload = multer({ dest: 'uploads/' }); // This will save files to a directory `uploads`

// Connect to MongoDB once when the server starts
async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    // Start the server after successful MongoDB connection
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
      
      app.post('/upload', upload.single('file'), async (req, res) => {
        if (!req.file) {
          return res.status(400).send({ message: 'No file uploaded.' });
        }
      
        const collection = client.db('aggie-guide').collection('files');
        
        try {
          const result = await collection.insertOne({
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
            path: req.file.path,
            courseId: req.body.courseId // This assumes you're sending a courseId with the form data
          });
      
          res.status(201).send({ message: 'File uploaded successfully', fileId: result.insertedId });
        } catch (error) {
          console.error('Error when uploading file', error);
          res.status(500).json({ error: error.message });
        }
      });
      
      
        // API endpoint to get all courses
      app.get('/upload', async (req, res) => {
          try {
            await client.connect();
            const collection = client.db('aggie-guide').collection('files');
            const courses = await collection.find({}).toArray();
            res.json(courses);
          } catch (error) {
            res.status(500).json({ error: error.toString() });
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

        app.get('/api/homework', async (req, res) => {
          try {
            await client.connect();
            const collection = client.db('aggie-guide').collection('homework');
            const homework = await collection.find({}).toArray();
            res.json(homework);
          } catch (error) {
            res.status(500).json({ error: error.toString() });
          }
        });
        
        app.post('/api/homework', async (req, res) => {
          try {
            await client.connect();
            const collection = client.db('aggie-guide').collection('homework');
            const homework = req.body; // The course data sent in the request body
            const result = await collection.insertOne(homework);
            
            // If you want to return the entire new course document, use the 'insertedId' to fetch it.
            // The inserted document is not returned directly in the result of `insertOne()`.
            if (result.insertedId) {
              const newHW = await collection.findOne({ _id: result.insertedId });
              res.status(201).json(newHW);
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
    
  } catch (err) {
    console.error("Connection to MongoDB failed", err);
  }
}

run().catch(console.dir);
