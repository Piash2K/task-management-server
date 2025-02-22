const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH", "DELETE"]
    }
});

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uouce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        const taskCollection = client.db('taskManagementDB').collection('tasks');
        const usersCollection = client.db('taskManagementDB').collection('users');

        io.on("connection", (socket) => {
            console.log("Client connected");
            socket.on("disconnect", () => {
                console.log("Client disconnected");
            });
        });

        const changeStream = taskCollection.watch();
        changeStream.on("change", async (change) => {
            if (change.operationType === "insert") {
                io.emit("taskAdded", change.fullDocument);
            } else if (change.operationType === "delete") {
                io.emit("taskDeleted", change.documentKey._id);
            } else if (change.operationType === "update") {
                const updatedDoc = await taskCollection.findOne({ _id: change.documentKey._id });
                io.emit("taskUpdated", updatedDoc);
            }
        });

        app.post('/tasks', async (req, res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            res.send(result);
        });

        app.get('/tasks/:email', async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            const result = await taskCollection.find(query).toArray();
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
                $set: { category: category }
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

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Task management server running')
});

server.listen(port, () => {
    console.log(`Task management server running on port: ${port}`);
});