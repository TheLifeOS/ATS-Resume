'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, TrendingUp, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OptimizePage() {
  const [step, setStep] = useState(1);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [optimizedResume, setOptimizedResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/extract', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setResumeText(data.text);
    } catch (error) {
      alert('Failed to extract text from file');
    } finally {
      setLoading(false);
    }
  };

  const analyzeResume = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription })
      });

      const data = await res.json();
      setAnalysis(data);
    } catch (error) {
      alert('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const optimizeResume = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription, analysis })
      });

      const data = await res.json();
      setOptimizedResume(data.optimizedResume);
    } catch (error) {
      alert('Optimization failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ResumeATS Pro
            </span>
          </Link>
          <Link href="/">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </Link>
        </div>
      </nav>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <StepIndicator number={1} title="Upload Resume" active={step >= 1} />
            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <div className={`h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
            </div>
            <StepIndicator number={2} title="Job Description" active={step >= 2} />
            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <div className={`h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
            </div>
            <StepIndicator number={3} title="Results" active={step >= 3} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Step 1: Upload Resume */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Upload Your Resume</h2>
            <p className="text-gray-600 mb-8">Upload your resume in PDF or DOCX format</p>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2 text-lg">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-400 mb-6">PDF or DOCX (max 5MB)</p>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg cursor-pointer hover:shadow-lg transition-all font-semibold">
                Choose File
              </label>
              {fileName && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-semibold flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    {fileName} uploaded successfully
                  </p>
                </div>
              )}
            </div>

            {loading && (
              <div className="mt-6 text-center">
                <div className="inline-block animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                <p className="text-gray-600 mt-2">Extracting text...</p>
              </div>
            )}

            <button
              onClick={() => resumeText && setStep(2)}
              disabled={!resumeText}
              className={`w-full mt-8 px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                resumeText
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Job Description
            </button>
          </div>
        )}

        {/* Step 2: Job Description */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Paste Job Description</h2>
            <p className="text-gray-600 mb-8">Copy and paste the job description you're applying for</p>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here...

Example:
We are looking for a Full Stack Developer with 3+ years experience in React, Node.js, and AWS. The ideal candidate will have:
- Strong problem-solving skills
- Experience with microservices architecture
- Knowledge of CI/CD pipelines
- Excellent communication skills"
              className="w-full h-80 p-6 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-gray-700 text-lg"
            />

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:border-gray-400 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setStep(3);
                  analyzeResume();
                }}
                disabled={!jobDescription}
                className={`flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                  jobDescription
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Analyze Resume
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && (
          <div className="space-y-6">
            {loading && !analysis ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Analyzing your resume with AI...</p>
                <p className="text-gray-500 text-sm mt-2">This may take 10-20 seconds</p>
              </div>
            ) : analysis && (
              <>
                {/* ATS Score Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Your ATS Score</h2>

                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-6xl font-bold shadow-2xl mb-4">
                      {analysis.atsScore}
                    </div>
                    <p className="text-xl text-gray-600 font-medium">
                      {analysis.atsScore >= 80
                        ? '🎉 Excellent! Your resume is highly ATS-friendly'
                        : analysis.atsScore >= 60
                        ? '👍 Good, but there\'s room for improvement'
                        : '⚠️ Needs optimization to pass ATS systems'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <ScoreCard label="Keyword Match" score={analysis.keywordMatch} color="blue" />
                    <ScoreCard label="Formatting" score={analysis.formatting} color="green" />
                    <ScoreCard label="Structure" score={analysis.structure} color="purple" />
                    <ScoreCard label="Quantifiable Results" score={analysis.quantifiable} color="orange" />
                  </div>
                </div>

                {/* Keywords Analysis */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Keyword Analysis</h3>

                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-green-600 mb-3 flex items-center gap-2 uppercase tracking-wide">
                      <CheckCircle className="w-5 h-5" />
                      Matched Keywords ({analysis.matchedKeywords?.length || 0})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.matchedKeywords?.map((kw: string, i: number) => (
                        <span key={i} className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                          ✓ {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-red-600 mb-3 flex items-center gap-2 uppercase tracking-wide">
                      <AlertCircle className="w-5 h-5" />
                      Missing Keywords ({analysis.missingKeywords?.length || 0})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.missingKeywords?.map((kw: string, i: number) => (
                        <span key={i} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                          ✗ {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <TrendingUp className="text-blue-600 w-8 h-8" />
                    AI Recommendations
                  </h3>
                  <ul className="space-y-4">
                    {analysis.suggestions?.map((suggestion: string, i: number) => (
                      <li key={i} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                        <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-gray-700 pt-1">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Optimize Button */}
                {!optimizedResume && (
                  <button
                    onClick={() => optimizeResume()}
                    className="w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    🚀 Generate Optimized Resume with AI
                  </button>
                )}

                {/* Optimized Resume */}
                {loading && optimizedResume === '' && (
                  <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                    <div className="animate-spin w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">AI is optimizing your resume...</p>
                    <p className="text-gray-500 text-sm mt-2">Creating ATS-friendly version</p>
                  </div>
                )}

                {optimizedResume && (
                  <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">✨ Your Optimized Resume</h3>

                    <div className="bg-gray-50 p-6 rounded-xl mb-6 max-h-96 overflow-y-auto border-2 border-gray-200">
                      <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                        {optimizedResume}
                      </pre>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          const blob = new Blob([optimizedResume], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'optimized-resume.txt';
                          a.click();
                        }}
                        className="flex-1 px-6 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Download Optimized Resume
                      </button>
                      <button
                        onClick={() => {
                          setStep(1);
                          setResumeText('');
                          setJobDescription('');
                          setAnalysis(null);
                          setOptimizedResume('');
                          setFileName('');
                        }}
                        className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-gray-400 transition-all"
                      >
                        Start New Analysis
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StepIndicator({ number, title, active }: { number: number; title: string; active: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
          active
            ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg'
            : 'bg-gray-200 text-gray-500'
        }`}
      >
        {number}
      </div>
      <span className={`font-semibold ${active ? 'text-gray-900' : 'text-gray-400'}`}>{title}</span>
    </div>
  );
}

function ScoreCard({ label, score, color }: { label: string; score: number; color: string }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className={`p-6 rounded-xl ${colors[color as keyof typeof colors]}`}>
      <div className="text-4xl font-bold mb-1">{score}%</div>
      <div className="text-sm font-medium opacity-80">{label}</div>
    </div>
  );
}