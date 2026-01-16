// Only use dotenv if this is a standalone Node.js script
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Groq = require('groq-sdk');

// Test Gemini
async function testGemini() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const result = await model.generateContent("Analyze this resume for ATS compatibility");
  console.log("Gemini Response:", result.response.text());
}

// Test Groq
async function testGroq() {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });
  
  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: "Analyze this resume for ATS compatibility" }],
    model: "llama-3.1-70b-versatile",
  });
  
  console.log("Groq Response:", completion.choices[0].message.content);
}

testGemini().catch(console.error);
testGroq().catch(console.error);