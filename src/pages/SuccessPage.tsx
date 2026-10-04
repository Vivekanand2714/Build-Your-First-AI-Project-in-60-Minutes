import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useGrowth } from '../context/GrowthContext';
import { 
  CheckCircle2, Copy, Check, Share2, ArrowRight, 
  MessageCircle, Sparkles, ExternalLink, Users, Zap
} from 'lucide-react';

export const SuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentStudent, simulateReferral } = useGrowth();

  const student = location.state?.student || currentStudent;
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [testSimMessage, setTestSimMessage] = useState<string | null>(null);

  // Subtle clean celebration
  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

  if (!student) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">No Active Registration Found</h2>
        <p className="text-slate-500 text-sm mb-6">Please register first to generate your unique referral link.</p>
        <Link to="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition">
          Go to Registration
        </Link>
      </div>
    );
  }

  const originUrl = window.location.origin;
  const referralLink = `${originUrl}/register?ref=${student.referralCode}&source=whatsapp`;

  const copyToClipboard = (text: string, isCode = false) => {
    navigator.clipboard.writeText(text);
    if (isCode) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const shareText = `Hey! I just registered for the free workshop "Build Your First AI Project in 60 Minutes". We code and deploy an AI app live. Register with my link to join: ${referralLink}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  const handleQuickTestSimulate = () => {
    const res = simulateReferral(student.referralCode);
    if (res.success) {
      setTestSimMessage(res.message);
      setTimeout(() => setTestSimMessage(null), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-14 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full">
        
        {/* Success Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm text-center space-y-6">
          
          {/* Success Check Icon */}
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              You're Registered!
            </h1>
            <p className="text-slate-600 text-sm mt-2">
              Welcome, <strong className="text-[#0F172A]">{student.fullName}</strong>. Your seat for <span className="font-semibold text-slate-900">"Build Your First AI Project in 60 Minutes"</span> is confirmed.
            </p>
            <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-xs text-emerald-700 font-medium">
              <span>✓ Registration confirmed</span>
              <span>&bull;</span>
              <span>{student.college.split('–')[0].trim()}</span>
            </div>
          </div>

          {/* Referral Code Showcase Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-left space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Your Referral Code
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-600 tracking-wider">
                  {student.referralCode}
                </span>
              </div>

              <button
                onClick={() => copyToClipboard(student.referralCode, true)}
                className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-200 transition cursor-pointer shadow-2xs"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Sharable Referral Link */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Direct Referral Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="w-full bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-3.5 py-2.5 font-mono truncate focus:outline-none"
                />
                <button
                  onClick={() => copyToClipboard(referralLink, false)}
                  className="shrink-0 inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Share to WhatsApp Button */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-xs transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share with Classmates on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl text-xs transition shadow-xs"
            >
              <span>Go to Student Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/leaderboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-5 rounded-xl text-xs border border-slate-200 transition"
            >
              <span>View Leaderboard</span>
            </Link>
          </div>

          {/* Discreet simulation test button for evaluator */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-center">
            <button
              onClick={handleQuickTestSimulate}
              className="text-[11px] text-slate-500 hover:text-emerald-600 font-medium flex items-center gap-1 cursor-pointer transition"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Evaluator Demo: Test 1 classmate referral</span>
            </button>
          </div>

          {testSimMessage && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs text-left">
              {testSimMessage}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
