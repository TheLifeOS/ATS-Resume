"use client";

import React, { useState, useEffect } from 'react';
import { Upload, FileText, Target, Zap, Shield, TrendingUp, CheckCircle, Star, ArrowRight, Menu, X, Sparkles, Lock, Globe } from 'lucide-react';

export default function ATSOptimizer() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze your resume against job descriptions using Gemini & Groq AI to identify gaps and opportunities for maximum ATS compatibility."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Keyword Optimization",
      description: "Smart keyword matching ensures your resume contains the right terms that ATS systems scan for, dramatically increasing your pass rate."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-Time Scoring",
      description: "Get instant ATS compatibility scores with detailed breakdowns showing exactly what to improve for better interview callbacks."
    }
  ];

  const stats = [
    { value: "94%", label: "ATS Pass Rate" },
    { value: "10K+", label: "Resumes Optimized" },
    { value: "3.5x", label: "More Interviews" },
    { value: "4.9/5", label: "User Rating" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ResumeAI Pro
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-purple-400 transition">Features</a>
              <a href="#how-it-works" className="hover:text-purple-400 transition">How It Works</a>
              <a href="#pricing" className="hover:text-purple-400 transition">Pricing</a>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                Get Started Free
              </button>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg">
            <div className="px-6 py-4 space-y-4">
              <a href="#features" className="block hover:text-purple-400">Features</a>
              <a href="#how-it-works" className="block hover:text-purple-400">How It Works</a>
              <a href="#pricing" className="block hover:text-purple-400">Pricing</a>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full">
                Get Started Free
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-500/20 px-4 py-2 rounded-full mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm">AI-Powered Resume Optimization</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
            Beat the ATS System
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Optimize your resume for Applicant Tracking Systems using advanced AI. Increase your chances of landing interviews with data-driven insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button className="group bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center space-x-2">
              <span>Optimize My Resume Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
            <button className="px-8 py-4 rounded-full text-lg font-semibold border-2 border-purple-400 hover:bg-purple-400/10 transition-all duration-300">
              See How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to create ATS-friendly resumes that get noticed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className={`bg-gradient-to-br from-purple-900/50 to-slate-900/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 ${activeFeature === idx ? 'ring-2 ring-purple-400' : ''}`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Three simple steps to optimize your resume</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { num: "01", title: "Upload Resume", desc: "Upload your resume in PDF or DOCX format securely", icon: <Upload /> },
              { num: "02", title: "AI Analysis", desc: "Our AI analyzes your resume against ATS requirements", icon: <Target /> },
              { num: "03", title: "Get Optimized", desc: "Download your ATS-optimized resume and apply with confidence", icon: <CheckCircle /> }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-300">
                  <div className="text-6xl font-bold text-purple-400/20 mb-4">{step.num}</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="py-20 px-6 bg-black/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <Shield />, title: "Bank-Level Security", desc: "Your data is encrypted with AES-256 encryption" },
              { icon: <Lock />, title: "Privacy First", desc: "We never share or sell your personal information" },
              { icon: <Globe />, title: "GDPR Compliant", desc: "Fully compliant with global privacy regulations" }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
            <p className="text-xl mb-8 opacity-90">Start optimizing your resume today with AI-powered insights</p>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center space-x-2">
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 py-12 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold">ResumeAI Pro</span>
              </div>
              <p className="text-gray-400 text-sm">AI-powered resume optimization for the modern job seeker.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition">About</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Terms</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 ResumeAI Pro. All rights reserved. Built with Gemini & Groq AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}