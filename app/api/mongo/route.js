import { MongoClient } from "mongodb";

// MongoDB connection string (replace with your connection string)
const connectionString =
  `mongodb+srv://tensorblue:tensorblue@cluster0.i8gtraq.mongodb.net/?retryWrites=true&w=majority`;

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await client.db("tensorblue");

  cachedDb = db;
  return db;
}

export async function GET(req, res) {
  // Handle GET request
  const db = await connectToDatabase(connectionString);
  const data = await db.collection("chatbot").find().toArray();
  return Response.json({
    status: 200,
    data: data,
  });
}

export async function POST(req, res) {
  // Handle POST request
  const data = await req.json();
  // console.log(data);
  const db = await connectToDatabase(connectionString);
  const result = await db
    .collection("chatbot")
    .updateOne(
      { _id: data.id },
      { $set: { messages: data.messages } }
    );
  return Response.json({
    status: 201,
  });
}

export async function PUT(req, res) {
  // Handle PUT request
  const data = await req.json();
  // console.log(data);
  const db = await connectToDatabase(connectionString);
  const result = await db.collection("chatbot").insertOne(data);
  return Response.json({
    status: 201,
  });
}

export async function DELETE(req, res) {
  // Handle DELETE request
  const data = await req.json();
  console.log(data[0]);
  const db = await connectToDatabase(connectionString);
  const result = await db.collection("chatbot").deleteOne(data[0]);
  return Response.json({
    status: 201,
  });
}
