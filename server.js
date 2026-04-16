import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: `
You are an AI movie assistant inside a streaming platform UI.
Help users:
- recommend movies
- suggest shows
- explain ratings
- find genres
- give fun entertainment answers

User message: ${message}
      `,
    });

    res.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      reply: "Sorry, AI server error.",
    });
  }
});

app.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});