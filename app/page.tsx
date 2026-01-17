'use client'
import React, { useState } from 'react';
import { Upload, Shield, Zap, CheckCircle, TrendingUp, FileText, Target, Award, ChevronRight } from 'lucide-react';

export default function ModernATSRedesign() {
  const [isHovered, setIsHovered] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ResumeATS Pro
          </span>
        </div>
        <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
          Optimize Now
        </button>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-20 pb-16">
        <div className="text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm backdrop-blur-sm">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300">AI-Powered • Privacy-First • Zero Tracking</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            Beat Every ATS.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Land Interviews.
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            AI-powered resume optimization that increases your ATS pass rate by an average of 67%. 
            Zero logs, zero tracking, maximum results.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Resume
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all">
              See How It Works
            </button>
          </div>

          <p className="text-sm text-slate-400">
            ✨ Free scan • Instant results • No credit card required
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {[
            { icon: TrendingUp, label: '67% Avg Increase', desc: 'In ATS pass rate' },
            { icon: Zap, label: '<1 Second', desc: 'Analysis time' },
            { icon: Award, label: '50K+ Resumes', desc: 'Optimized successfully' }
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all hover:scale-105">
              <stat.icon className="w-8 h-8 text-blue-400 mb-3" />
              <div className="text-2xl font-bold">{stat.label}</div>
              <div className="text-slate-400 text-sm">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">
          Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ResumeATS Pro</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: 'Zero Logging',
              desc: 'AES-256 encryption, no data retention, GDPR/CCPA compliant. Your privacy is sacred.',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: Zap,
              title: 'Edge Fast',
              desc: 'Sub-second analysis running on Vercel Edge functions. Lightning-fast results.',
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: CheckCircle,
              title: 'Proven Results',
              desc: 'Average 67% increase in ATS pass rate. Real data, real success stories.',
              color: 'from-green-500 to-emerald-500'
            }
          ].map((feature, i) => (
            <div
              key={i}
              onMouseEnter={() => setIsHovered(i)}
              onMouseLeave={() => setIsHovered(null)}
              className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/30 transition-all hover:scale-105 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tool Suite Preview Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Complete <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Career Toolkit</span>
          </h2>
          <p className="text-slate-300">More tools coming soon to supercharge your job search</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: FileText, name: 'ATS Resume Optimizer', status: 'Live', color: 'blue' },
            { icon: Target, name: 'Cover Letter Generator', status: 'Coming Soon', color: 'purple' },
            { icon: Award, name: 'LinkedIn Profile Optimizer', status: 'Coming Soon', color: 'pink' },
            { icon: TrendingUp, name: 'Salary Negotiation Guide', status: 'Coming Soon', color: 'green' }
          ].map((tool, i) => (
            <div key={i} className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center gap-4">
              <div className={`w-12 h-12 bg-${tool.color}-500/20 rounded-lg flex items-center justify-center`}>
                <tool.icon className={`w-6 h-6 text-${tool.color}-400`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{tool.name}</h3>
                <p className="text-sm text-slate-400">{tool.status}</p>
              </div>
              {tool.status === 'Live' && (
                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Active</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-sm bg-white/5 py-8 mt-20">
        <div className="max-w-6xl mx-auto px-8 text-center text-slate-400 text-sm">
          <p>© 2026 ResumeATS Pro • <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a></p>
        </div>
      </footer>
    </div>
  );
}