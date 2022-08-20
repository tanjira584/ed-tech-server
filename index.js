const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://tanjirdemo:${process.env.DATABASE_PASS}@cluster0.3jhfr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        await client.connect();
        const courseCollection = client.db("ed-courses").collection("courses");
        app.get("/courses", async (req, res) => {
            const query = {};
            const courses = await courseCollection.find(query).toArray();
            res.send(courses);
        });
        app.get("/course/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await courseCollection.findOne(query);
            res.send(result);
        });
    } finally {
    }
}
run().catch(console.dir);
app.get("/", async (req, res) => {
    res.send("Hello Wordl , This is Ed-Tech");
});
app.listen(port, () => {
    console.log("Server is running successfully");
});
