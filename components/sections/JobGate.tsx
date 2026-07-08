'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Mail, Lock, User, Briefcase, Bell, ArrowLeft, 
  ShieldCheck, Loader2, Sparkles, TrendingUp, Building2, 
  Users, CheckCircle2, Zap, Eye 
} from 'lucide-react';

interface JobGateProps {
  children: React.ReactNode;
}

export function JobGate({ children }: JobGateProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('aijob_verified_email');
    if (savedEmail) {
      setIsVerified(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Role: role,
          IsSubscribed: subscribed,
        }),
      });

      const res = await response.json();

      if (res.success) {
        setStep('verify');
      } else {
        setError('Failed to submit. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const res = await response.json();

      if (res.success) {
        localStorage.setItem('aijob_verified_email', email);
        localStorage.setItem('aijob_verified_name', name);
        setIsVerified(true);
      } else {
        setError(res.error || 'Invalid code. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isVerified) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0B1B2B] flex items-center justify-center p-5 md:p-8">
      {/* Ambient glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0284C7]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-lg w-full">
        
        {/* Value Proposition — Above the fold */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0284C7]/15 border border-[#0284C7]/20 rounded-full mb-6">
             
            <span className="text-[12px] font-semibold text-[#0284C7] uppercase tracking-[0.1em]">
              Exclusive Access
            </span>
          </div>
          
          <h2 className="text-[1.75rem] leading-[1.2] font-bold text-white md:text-[2.25rem]">
            Unlock AI-Powered Job Intelligence
          </h2>
          <p className="mt-4 text-[15px] text-[#94A3B8] leading-relaxed max-w-md mx-auto">
            Get verified access to curated AI healthcare roles, company strategy insights, 
            and salary benchmarks you will not find anywhere else.
          </p>
        </div>

        {/* Benefits Grid — Why it's worth it */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="w-8 h-8 rounded-lg bg-[#0284C7]/15 flex items-center justify-center mb-3">
              <Zap className="w-4 h-4 text-[#0284C7]" />
            </div>
            <h3 className="text-[13px] font-semibold text-white mb-1">AI-Scored Roles</h3>
            <p className="text-[12px] text-[#94A3B8] leading-relaxed">Every job rated 1-10 for impact and growth potential</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="w-8 h-8 rounded-lg bg-[#0284C7]/15 flex items-center justify-center mb-3">
              <Building2 className="w-4 h-4 text-[#0284C7]" />
            </div>
            <h3 className="text-[13px] font-semibold text-white mb-1">Company Intel</h3>
            <p className="text-[12px] text-[#94A3B8] leading-relaxed">Strategy insights on who is hiring and why</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="w-8 h-8 rounded-lg bg-[#0284C7]/15 flex items-center justify-center mb-3">
              <TrendingUp className="w-4 h-4 text-[#0284C7]" />
            </div>
            <h3 className="text-[13px] font-semibold text-white mb-1">Salary Benchmarks</h3>
            <p className="text-[12px] text-[#94A3B8] leading-relaxed">Real compensation data across roles and regions</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="w-8 h-8 rounded-lg bg-[#0284C7]/15 flex items-center justify-center mb-3">
              <Eye className="w-4 h-4 text-[#0284C7]" />
            </div>
            <h3 className="text-[13px] font-semibold text-white mb-1">Early Access</h3>
            <p className="text-[12px] text-[#94A3B8] leading-relaxed">New roles delivered to your inbox before public posting</p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-full bg-[#1e3a5f] border-2 border-[#0B1B2B] flex items-center justify-center"
              >
                <Users className="w-3.5 h-3.5 text-[#64748B]" />
              </div>
            ))}
          </div>
          <p className="text-[12px] text-[#94A3B8]">
             
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E2E8F0] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-[12px] font-semibold text-[#64748B] uppercase tracking-[0.1em] mb-2.5">
                  <User className="w-3.5 h-3.5" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3.5 text-[14px] text-[#0B1B2B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-[12px] font-semibold text-[#64748B] uppercase tracking-[0.1em] mb-2.5">
                  <Mail className="w-3.5 h-3.5" />
                  Work Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3.5 text-[14px] text-[#0B1B2B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all"
                  placeholder="you@company.com"
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label className="flex items-center gap-2 text-[12px] font-semibold text-[#64748B] uppercase tracking-[0.1em] mb-2.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  Your Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3.5 text-[14px] text-[#0B1B2B] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="text-[#94A3B8]">Select your role...</option>
                  <option value="Health Executive">Health Executive</option>
                  <option value="AI / Data Leader">AI / Data Leader</option>
                  <option value="Technology Leader">Technology Leader</option>
                  <option value="Recruiter">Recruiter / Talent</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Subscribe checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center mt-0.5">
                  <input
                    type="checkbox"
                    checked={subscribed}
                    onChange={(e) => setSubscribed(e.target.checked)}
                    className="w-4 h-4 rounded border-[#CBD5E1] text-[#0284C7] focus:ring-[#0284C7]/20 cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span className="text-[13px] text-[#64748B] group-hover:text-[#475569] transition-colors">
                    Notify me about new AI healthcare jobs
                  </span>
                </div>
              </label>

              {/* Submit */}
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full py-6 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-[14px] shadow-lg shadow-[#0284C7]/20 transition-all duration-200"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Unlock Full Access
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-5">
              {/* Back to form */}
              <button
                type="button"
                onClick={() => setStep('form')}
                className="flex items-center gap-1.5 text-[13px] text-[#94A3B8] hover:text-[#0284C7] transition-colors mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Change details
              </button>

              {/* Code input */}
              <div>
                <label className="flex items-center gap-2 text-[12px] font-semibold text-[#64748B] uppercase tracking-[0.1em] mb-2.5">
                  <Lock className="w-3.5 h-3.5" />
                  Verification Code
                </label>
                <p className="text-[13px] text-[#94A3B8] mb-3">
                  Enter the 6-digit code sent to <span className="font-medium text-[#475569]">{email}</span>
                </p>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-4 text-[#0B1B2B] text-center text-[2rem] tracking-[0.5em] font-bold placeholder:text-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              {/* Verify */}
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full py-6 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-[14px] shadow-lg shadow-[#0284C7]/20 transition-all duration-200"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Verify & Unlock
                  </span>
                )}
              </Button>
            </form>
          )}

          {/* Error */}
          {error && (
            <div className="mt-5 p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-[13px] text-red-600 text-center font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-[#64748B]/60">
            <ShieldCheck className="w-3 h-3" />
            Secure & encrypted
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-[#64748B]/60">
            <CheckCircle2 className="w-3 h-3" />
            No spam, ever
          </span>
        </div>
      </div>
    </div>
  );
}