'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AnalysisData {
  atsScore: number;
  scoreBreakdown: {
    keywordMatch: number;
    formatting: number;
    experience: number;
    skills: number;
  };
  missingKeywords: string[];
  presentKeywords: string[];
  suggestions: Array<{
    category: string;
    issue: string;
    recommendation: string;
  }>;
  formatIssues: string[];
  strengths: string[];
}

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const results = sessionStorage.getItem('atsResults');
    if (results) {
      const parsed = JSON.parse(results);
      setData(parsed.data);
    } else {
      router.push('/optimize');
    }
    setLoading(false);
  }, [router]);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xl font-bold text-gray-900">ResumeATS</span>
            </div>
            <button 
              onClick={() => router.push('/optimize')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Analyze Another
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Overall Score */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your ATS Analysis</h1>
              <p className="text-gray-600">Here's how your resume performs against ATS systems</p>
            </div>
            <div className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor(data.atsScore)} mb-2`}>
                {data.atsScore}
              </div>
              <div className="text-gray-600 font-medium">ATS Score</div>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(data.scoreBreakdown).map(([key, value]) => (
            <div key={key} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <span className={`text-2xl font-bold ${getScoreColor(value)}`}>
                  {value}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${value >= 80 ? 'bg-green-500' : value >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Keywords Analysis */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Keyword Analysis
            </h2>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {data.missingKeywords.map((keyword, index) => (
                  <span key={index} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Present Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {data.presentKeywords.map((keyword, index) => (
                  <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Strengths */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Strengths
            </h2>
            <ul className="space-y-3">
              {data.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Improvement Suggestions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Improvement Suggestions
          </h2>
          <div className="space-y-4">
            {data.suggestions.map((suggestion, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      {index + 1}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{suggestion.category}</h3>
                    <p className="text-gray-600 text-sm mb-2"><strong>Issue:</strong> {suggestion.issue}</p>
                    <p className="text-gray-700 text-sm"><strong>Recommendation:</strong> {suggestion.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Format Issues */}
        {data.formatIssues.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-6 h-6 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Format Issues
            </h2>
            <ul className="space-y-2">
              {data.formatIssues.map((issue, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-gray-700">{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="bg-blue-600 rounded-xl shadow-sm p-8 mt-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Optimize Your Resume?</h2>
          <p className="text-blue-100 mb-6">
            Get an AI-optimized version of your resume that incorporates all these improvements
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            Optimize Resume Now
          </button>
        </div>
      </div>
    </div>
  );
}