const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uouce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const taskCollection = client.db('taskManagementDB').collection('tasks');
        const usersCollection = client.db('taskManagementDB').collection('users');


        app.post('/tasks', async (req, res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            res.send(result);
        });
        app.get('/tasks/:email', async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            const result = await taskCollection.find(query).sort({ order: 1 }).toArray();
            res.send(result);
        });
        app.delete('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await taskCollection.deleteOne(query);
            res.send(result);
        });
        app.patch('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const updatedTask = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    title: updatedTask.title,
                    description: updatedTask.description,
                    category: updatedTask.category,
                    order: updatedTask.order
                }
            };
            const result = await taskCollection.updateOne(filter, updateDoc);
            res.send(result);
        });
        app.patch('/tasks/category/:id', async (req, res) => {
            const id = req.params.id;
            const { category } = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    category: category
                }
            };
            const result = await taskCollection.updateOne(filter, updateDoc);
            res.send(result);
        });
        app.patch('/tasks/reorder', async (req, res) => {
            const { tasks } = req.body;
            const bulkOps = tasks.map(task => ({
                updateOne: {
                    filter: { _id: new ObjectId(task._id) },
                    update: { $set: { order: task.order } }
                }
            }));
            const result = await taskCollection.bulkWrite(bulkOps);
            res.send(result);
        });
        app.post('/users', async (req, res) => {
            const { uid, email, displayName, createdAt, lastLogin } = req.body;

            const existingUser = await usersCollection.findOne({ email });

            if (existingUser) {
                const result = await usersCollection.updateOne(
                    { email },
                    { $set: { lastLogin } }
                );
                res.send(result);
            } else {
                const newUser = { uid, email, displayName, createdAt, lastLogin };
                const result = await usersCollection.insertOne(newUser);
                res.send(result);
            }
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Task management server running')
})

app.listen(port, () => {
    console.log(`Task management server running on port: ${port}`);
})