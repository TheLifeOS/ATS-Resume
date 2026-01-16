import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export async function analyzeResumeATS(resumeText: string, jobDescription: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Analyze this resume for ATS compatibility against the job description.
  
Resume:
${resumeText}

Job Description:
${jobDescription}

Provide:
1. ATS Score (0-100)
2. Missing Keywords
3. Improvement Suggestions
4. Format Issues

Return as JSON.`;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}

export async function optimizeResume(resumeText: string, jobDescription: string, keywords: string[]) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an expert ATS resume optimizer. Rewrite resumes to maximize ATS compatibility while maintaining authenticity."
      },
      {
        role: "user",
        content: `Optimize this resume for the job description. Include these keywords naturally: ${keywords.join(', ')}

Resume:
${resumeText}

Job Description:
${jobDescription}

Return the optimized resume in the same format.`
      }
    ],
    model: "llama-3.1-70b-versatile",
    temperature: 0.7,
  });
  
  return completion.choices[0].message.content;
}