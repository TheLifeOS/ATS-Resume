// lib/ai-router.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

// Initialize AI clients
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

// Track usage (in-memory, resets on server restart)
// For production, store this in Supabase
let usageTracker = {
  gemini: { count: 0, resetTime: Date.now() + 24 * 60 * 60 * 1000 },
  groq: { count: 0, resetTime: Date.now() + 24 * 60 * 60 * 1000 },
};

// API limits (daily)
const LIMITS = {
  gemini: 1500,  // 1,500 requests/day
  groq: 14000,   // 14,000 requests/day (conservative estimate)
};

// Reset counters if 24 hours passed
function checkAndResetCounters() {
  const now = Date.now();
  if (now > usageTracker.gemini.resetTime) {
    usageTracker.gemini = { count: 0, resetTime: now + 24 * 60 * 60 * 1000 };
  }
  if (now > usageTracker.groq.resetTime) {
    usageTracker.groq = { count: 0, resetTime: now + 24 * 60 * 60 * 1000 };
  }
}

// Get available API
function getAvailableAPI(): 'gemini' | 'groq' | null {
  checkAndResetCounters();

  // Priority: Gemini first (better quality), then Groq (faster)
  if (usageTracker.gemini.count < LIMITS.gemini) {
    return 'gemini';
  } else if (usageTracker.groq.count < LIMITS.groq) {
    return 'groq';
  }
  return null;
}

// Increment usage counter
function incrementUsage(api: 'gemini' | 'groq') {
  usageTracker[api].count++;
  console.log(`📊 API Usage - ${api}: ${usageTracker[api].count}/${LIMITS[api]}`);
}

// Analyze resume with Gemini
async function analyzeWithGemini(resumeText: string, jobDescription: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `You are an ATS (Applicant Tracking System) expert. Analyze this resume against the job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Provide analysis in this EXACT JSON format (no markdown, no backticks, just pure JSON):
{
  "atsScore": <number between 0-100>,
  "keywordsMatched": [<array of matched keywords>],
  "keywordsMissing": [<array of critical missing keywords from job description>],
  "formatIssues": [<array of ATS-unfriendly formatting issues>],
  "recommendations": [<array of top 5 specific improvements>],
  "summary": "<2 sentence overall assessment>"
}

Be specific and actionable. Return ONLY valid JSON, no extra text.`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();
  
  // Clean up response (remove markdown code blocks if present)
  const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  return JSON.parse(cleanedResponse);
}

// Analyze resume with Groq
async function analyzeWithGroq(resumeText: string, jobDescription: string) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are an ATS expert. Always respond with valid JSON only, no markdown formatting.',
      },
      {
        role: 'user',
        content: `Analyze this resume against the job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return ONLY this JSON structure:
{
  "atsScore": <number 0-100>,
  "keywordsMatched": [<matched keywords>],
  "keywordsMissing": [<missing critical keywords>],
  "formatIssues": [<ATS issues>],
  "recommendations": [<5 improvements>],
  "summary": "<2 sentence assessment>"
}`,
      },
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.3,
    max_tokens: 2000,
  });

  const response = completion.choices[0].message.content || '{}';
  const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  return JSON.parse(cleanedResponse);
}

// Optimize resume with Gemini
async function optimizeWithGemini(resumeText: string, jobDescription: string, missingKeywords: string[]) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `You are an expert resume writer. Optimize this resume for ATS systems.

ORIGINAL RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

MISSING KEYWORDS TO INCORPORATE:
${missingKeywords.join(', ')}

INSTRUCTIONS:
1. Naturally incorporate missing keywords where relevant
2. Keep all original achievements and experience - DO NOT remove anything
3. Remove ATS-unfriendly formatting (tables, columns, graphics references)
4. Use standard section headers (Summary, Experience, Education, Skills)
5. Use simple formatting with bullet points
6. Maintain professional tone
7. DO NOT fabricate experience or skills
8. Keep the same structure and length

Return ONLY the optimized resume text, ready to copy-paste. No explanations, no preamble, just the resume.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

// Optimize resume with Groq
async function optimizeWithGroq(resumeText: string, jobDescription: string, missingKeywords: string[]) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a professional resume writer. Return only the optimized resume text, no explanations.',
      },
      {
        role: 'user',
        content: `Optimize this resume for ATS:

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

KEYWORDS TO ADD:
${missingKeywords.join(', ')}

Rules: Keep all original content, add keywords naturally, remove formatting issues, use standard headers. Return ONLY the resume text.`,
      },
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.5,
    max_tokens: 3000,
  });

  return completion.choices[0].message.content || resumeText;
}

// Main router function - ANALYZE
export async function analyzeResume(resumeText: string, jobDescription: string) {
  const availableAPI = getAvailableAPI();

  if (!availableAPI) {
    throw new Error('Daily API limit reached. Please try again tomorrow or upgrade to premium.');
  }

  try {
    let result;
    
    if (availableAPI === 'gemini') {
      console.log('🟢 Using Gemini API for analysis');
      result = await analyzeWithGemini(resumeText, jobDescription);
    } else {
      console.log('🔵 Using Groq API for analysis');
      result = await analyzeWithGroq(resumeText, jobDescription);
    }

    incrementUsage(availableAPI);
    
    return {
      ...result,
      apiUsed: availableAPI,
      remainingQuota: {
        gemini: LIMITS.gemini - usageTracker.gemini.count,
        groq: LIMITS.groq - usageTracker.groq.count,
      },
    };
  } catch (error) {
    console.error(`❌ ${availableAPI} API failed:`, error);
    
    // Fallback to other API if one fails
    const fallbackAPI = availableAPI === 'gemini' ? 'groq' : 'gemini';
    
    if (usageTracker[fallbackAPI].count < LIMITS[fallbackAPI]) {
      console.log(`🔄 Falling back to ${fallbackAPI}`);
      
      let result;
      if (fallbackAPI === 'gemini') {
        result = await analyzeWithGemini(resumeText, jobDescription);
      } else {
        result = await analyzeWithGroq(resumeText, jobDescription);
      }
      
      incrementUsage(fallbackAPI);
      return { ...result, apiUsed: fallbackAPI };
    }
    
    throw error;
  }
}

// Main router function - OPTIMIZE
export async function optimizeResume(
  resumeText: string,
  jobDescription: string,
  missingKeywords: string[]
) {
  const availableAPI = getAvailableAPI();

  if (!availableAPI) {
    throw new Error('Daily API limit reached. Please try again tomorrow or upgrade to premium.');
  }

  try {
    let result;
    
    if (availableAPI === 'gemini') {
      console.log('🟢 Using Gemini API for optimization');
      result = await optimizeWithGemini(resumeText, jobDescription, missingKeywords);
    } else {
      console.log('🔵 Using Groq API for optimization');
      result = await optimizeWithGroq(resumeText, jobDescription, missingKeywords);
    }

    incrementUsage(availableAPI);
    
    return {
      optimizedResume: result,
      apiUsed: availableAPI,
    };
  } catch (error) {
    console.error(`❌ ${availableAPI} API failed:`, error);
    
    // Fallback
    const fallbackAPI = availableAPI === 'gemini' ? 'groq' : 'gemini';
    
    if (usageTracker[fallbackAPI].count < LIMITS[fallbackAPI]) {
      console.log(`🔄 Falling back to ${fallbackAPI}`);
      
      let result;
      if (fallbackAPI === 'gemini') {
        result = await optimizeWithGemini(resumeText, jobDescription, missingKeywords);
      } else {
        result = await optimizeWithGroq(resumeText, jobDescription, missingKeywords);
      }
      
      incrementUsage(fallbackAPI);
      return { optimizedResume: result, apiUsed: fallbackAPI };
    }
    
    throw error;
  }
}

// Get current usage stats (for admin dashboard)
export function getUsageStats() {
  checkAndResetCounters();
  return {
    gemini: {
      used: usageTracker.gemini.count,
      limit: LIMITS.gemini,
      remaining: LIMITS.gemini - usageTracker.gemini.count,
      resetTime: new Date(usageTracker.gemini.resetTime),
    },
    groq: {
      used: usageTracker.groq.count,
      limit: LIMITS.groq,
      remaining: LIMITS.groq - usageTracker.groq.count,
      resetTime: new Date(usageTracker.groq.resetTime),
    },
  };
}