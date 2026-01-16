import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { resumeText, jobDescription, analysis } = await req.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume and job description are required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const missingKeywords = analysis?.missingKeywords?.join(', ') || 'relevant skills';

    const prompt = `You are an expert resume writer and ATS optimization specialist with 15+ years of experience.

CURRENT RESUME:
${resumeText}

TARGET JOB DESCRIPTION:
${jobDescription}

MISSING KEYWORDS THAT MUST BE ADDED:
${missingKeywords}

YOUR TASK:
Rewrite this resume to be HIGHLY optimized for ATS systems. Follow these requirements EXACTLY:

1. **Include ALL Missing Keywords**: Naturally integrate these keywords: ${missingKeywords}
2. **Add Quantifiable Achievements**: Every bullet point should have numbers, percentages, or metrics (e.g., "Increased sales by 45%", "Managed team of 8", "Reduced costs by $50K")
3. **Use Power Action Verbs**: Start each bullet with: Led, Developed, Architected, Increased, Reduced, Implemented, Achieved, Transformed, Optimized, Streamlined
4. **Maintain Truth**: Keep the same person's actual experience, education, and skills - just make it more impactful
5. **ATS-Friendly Format**: Use simple formatting, clear section headers, no tables or columns
6. **Professional Structure**: Include these sections in order:
   - Professional Summary (2-3 sentences with keywords)
   - Technical Skills (list format with keywords)
   - Professional Experience (with quantified achievements)
   - Education
   - Optional: Certifications, Projects, or Achievements

IMPORTANT: Return ONLY the optimized resume text. No explanations, no introductions, no meta-commentary. Start directly with the person's name.`;

    const result = await model.generateContent(prompt);
    const optimizedResume = result.response.text();

    return NextResponse.json({ optimizedResume });
  } catch (error: any) {
    console.error('Optimization error:', error);
    return NextResponse.json(
      { error: 'Optimization failed: ' + error.message },
      { status: 500 }
    );
  }
}