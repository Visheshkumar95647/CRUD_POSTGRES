const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Create
app.post("/posts", async (req, res) => {
  const { title, content } = req.body;
  const post = await prisma.post.create({ data: { title, content } });
  res.json(post);
});

// Read All
app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

// Read One
app.get("/posts/:id", async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.json(post);
});

// Update
app.put("/posts/:id", async (req, res) => {
  const { title, content } = req.body;
  const post = await prisma.post.update({
    where: { id: Number(req.params.id) },
    data: { title, content },
  });
  res.json(post);
});

// Delete
app.delete("/posts/:id", async (req, res) => {
  const post = await prisma.post.delete({
    where: { id: Number(req.params.id) },
  });
  res.json(post);
});

app.listen(3000, () =>
  console.log("Server ready at http://localhost:3000")
);
