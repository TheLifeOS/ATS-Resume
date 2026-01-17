'use client'

import React, { useState } from 'react';
import { Upload, Shield, Zap, CheckCircle, TrendingUp, FileText, Target, Award, ChevronRight, Sparkles } from 'lucide-react';

export default function ATSResumeOptimizer() {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ResumeATS Pro
            </span>
          </div>
          <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Optimize Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm backdrop-blur-sm hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="font-medium bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              AI-Powered • Privacy-First • Zero Tracking
            </span>
          </div>

          {/* Main Headline */}
          <div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-4">
              Beat Every ATS.
            </h1>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Land Interviews.
              </span>
            </h2>
          </div>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            AI-powered resume optimization that increases your ATS pass rate by an average of <span className="text-blue-400 font-bold">67%</span>. 
            Zero logs, zero tracking, maximum results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg transition-all hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 flex items-center gap-3 border border-blue-400/30">
              <Upload className="w-6 h-6 group-hover:animate-bounce" />
              Upload Resume
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/20 hover:scale-105 transition-all">
              Watch Demo
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Free scan • Instant results • No credit card required</span>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          {[
            { icon: TrendingUp, value: '67%', label: 'Avg Increase', desc: 'In ATS pass rate', color: 'from-green-500 to-emerald-500' },
            { icon: Zap, value: '<1s', label: 'Analysis Time', desc: 'Lightning fast results', color: 'from-yellow-500 to-orange-500' },
            { icon: Award, value: '50K+', label: 'Resumes', desc: 'Optimized successfully', color: 'from-blue-500 to-cyan-500' }
          ].map((stat, i) => (
            <div 
              key={i} 
              className="relative group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              <div className="relative z-10">
                <stat.icon className={`w-10 h-10 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-4`} strokeWidth={2} />
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-slate-200">{stat.label}</div>
                <div className="text-sm text-slate-400 mt-1">{stat.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ResumeATS Pro</span>
          </h2>
          <p className="text-xl text-slate-300">Three pillars of excellence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: 'Zero Logging',
              desc: 'AES-256 encryption, no data retention, GDPR/CCPA compliant. Your privacy is our priority.',
              color: 'from-blue-500 to-cyan-500',
              features: ['End-to-end encryption', 'No data storage', 'GDPR compliant']
            },
            {
              icon: Zap,
              title: 'Edge Fast',
              desc: 'Sub-second analysis running on Vercel Edge functions. Get results instantly.',
              color: 'from-purple-500 to-pink-500',
              features: ['< 1 second analysis', 'Edge computing', 'Real-time feedback']
            },
            {
              icon: CheckCircle,
              title: 'Proven Results',
              desc: 'Average 67% increase in ATS pass rate. Backed by real data and success stories.',
              color: 'from-green-500 to-emerald-500',
              features: ['67% avg increase', '50K+ optimized', 'Verified results']
            }
          ].map((feature, i) => (
            <div
              key={i}
              onMouseEnter={() => setIsHovered(i)}
              onMouseLeave={() => setIsHovered(null)}
              className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:border-white/30 transition-all hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{feature.desc}</p>
                
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tool Suite Preview */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            Complete <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Career Toolkit</span>
          </h2>
          <p className="text-xl text-slate-300">More powerful tools coming soon to supercharge your job search</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: FileText, name: 'ATS Resume Optimizer', status: 'Live', desc: 'Optimize your resume for ATS systems', color: 'blue', available: true },
            { icon: Target, name: 'Cover Letter Generator', status: 'Coming Soon', desc: 'AI-powered cover letters', color: 'purple', available: false },
            { icon: Award, name: 'LinkedIn Profile Optimizer', status: 'Coming Soon', desc: 'Boost your LinkedIn presence', color: 'pink', available: false },
            { icon: TrendingUp, name: 'Salary Negotiation Guide', status: 'Coming Soon', desc: 'Maximize your offer', color: 'green', available: false }
          ].map((tool, i) => (
            <div 
              key={i} 
              className={`p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all flex items-center gap-4 ${tool.available ? 'hover:scale-105 cursor-pointer hover:shadow-xl' : 'opacity-70'}`}
            >
              <div className={`w-14 h-14 bg-${tool.color}-500/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                <tool.icon className={`w-7 h-7 text-${tool.color}-400`} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{tool.name}</h3>
                <p className="text-sm text-slate-400 mt-1">{tool.desc}</p>
              </div>
              {tool.available ? (
                <span className="px-4 py-1.5 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full border border-green-500/30">
                  Live
                </span>
              ) : (
                <span className="px-4 py-1.5 bg-slate-500/20 text-slate-400 text-sm font-semibold rounded-full border border-slate-500/30">
                  Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <div className="relative p-12 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
          
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Beat the ATS?</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Join 50,000+ job seekers who've increased their interview rate by 67%
            </p>
            <button className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-xl transition-all hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 flex items-center gap-3 mx-auto">
              <Upload className="w-6 h-6" />
              Get Started Free
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-sm bg-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <span className="font-semibold">ResumeATS Pro</span>
            </div>
            <p className="text-sm text-slate-400">
              © 2026 ResumeATS Pro • <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
