// lib/hooks/useResumeAnalysis.ts
import { useState } from 'react';

interface AnalysisResult {
  score: number;
  missingKeywords: string[];
  suggestions: string[];
  formattingIssues: string[];
  provider?: 'groq' | 'gemini' | 'fallback';
  cached?: boolean;
  timestamp?: string;
  warning?: string;
}

interface AnalysisResponse extends AnalysisResult {
  aiProcessingNotice?: string;
  privacyNote?: string;
  queueInfo?: string;
}

export function useResumeAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [progress, setProgress] = useState(0);

  const analyze = async (resume: string, jobDescription: string) => {
    setLoading(true);
    setError(null);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 200);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume,
          jobDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok && !data.fallback) {
        throw new Error(data.error || 'Analysis failed');
      }

      clearInterval(progressInterval);
      setProgress(100);
      setResult(data.result || data);

      // Show provider info
      if (data.provider) {
        console.log(`✅ Analysis completed using: ${data.provider}`);
      }

      if (data.cached) {
        console.log('⚡ Results served from cache');
      }

      return data.result || data;

    } catch (err: any) {
      clearInterval(progressInterval);
      setError(err.message || 'Failed to analyze resume');
      console.error('Analysis error:', err);
      return null;
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setProgress(0);
  };

  return {
    analyze,
    reset,
    loading,
    error,
    result,
    progress,
  };
}

// Example usage in a component:
/*
import { useResumeAnalysis } from '@/lib/hooks/useResumeAnalysis';

function ResumeAnalyzer() {
  const { analyze, loading, error, result, progress } = useResumeAnalysis();
  
  const handleAnalyze = async () => {
    const resumeText = "...";
    const jobDesc = "...";
    
    const analysis = await analyze(resumeText, jobDesc);
    
    if (analysis) {
      console.log('ATS Score:', analysis.score);
      console.log('Cached:', analysis.cached);
      console.log('Provider:', analysis.provider);
    }
  };
  
  return (
    <div>
      {loading && <div>Analyzing... {progress}%</div>}
      {error && <div>Error: {error}</div>}
      {result && (
        <div>
          <h3>ATS Score: {result.score}/100</h3>
          <p>{result.aiProcessingNotice}</p>
          <p>{result.privacyNote}</p>
        </div>
      )}
    </div>
  );
}
*/