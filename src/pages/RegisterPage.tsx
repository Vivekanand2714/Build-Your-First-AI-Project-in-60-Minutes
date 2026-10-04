import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useGrowth } from '../context/GrowthContext';
import { AcquisitionChannel } from '../types';
import { POPULAR_COLLEGES, ENGINEERING_BRANCHES, YEARS_OF_STUDY, WORKSHOP_DETAILS } from '../data/seedData';
import { 
  Sparkles, UserCheck, AlertCircle, CheckCircle2, 
  ArrowRight, Tag, School, BookOpen, GraduationCap, Phone, Mail, User, Clock, Calendar, Check
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { registerStudent, students } = useGrowth();

  const refParam = searchParams.get('ref') || '';
  const sourceParam = (searchParams.get('source') as AcquisitionChannel) || null;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    customCollege: '',
    branch: ENGINEERING_BRANCHES[0],
    yearOfStudy: YEARS_OF_STUDY[0],
    referralCode: refParam.toUpperCase(),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [referrerPreview, setReferrerPreview] = useState<{ found: boolean; name?: string; code?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check referrer when referral code changes
  useEffect(() => {
    const code = formData.referralCode.trim().toUpperCase();
    if (!code) {
      setReferrerPreview(null);
      return;
    }

    const matched = students.find(s => s.referralCode.toUpperCase() === code);
    if (matched) {
      setReferrerPreview({ found: true, name: matched.fullName, code: matched.referralCode });
    } else {
      setReferrerPreview({ found: false, code });
    }
  }, [formData.referralCode, students]);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 3) {
      errs.fullName = 'Please enter your complete name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    } else {
      const dup = students.find(s => s.email.toLowerCase() === formData.email.trim().toLowerCase());
      if (dup) {
        errs.email = 'This email is already registered. You can access your dashboard directly.';
      }
    }

    const phoneClean = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (phoneClean.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }

    const selectedCollege = formData.college === 'OTHER' ? formData.customCollege.trim() : formData.college;
    if (!selectedCollege) {
      errs.college = 'College/Institute name is required';
    }

    if (!formData.branch) {
      errs.branch = 'Please select your engineering branch';
    }

    if (!formData.yearOfStudy) {
      errs.yearOfStudy = 'Please select your current year of study';
    }

    if (formData.referralCode.trim()) {
      const code = formData.referralCode.trim().toUpperCase();
      const refStudent = students.find(s => s.referralCode.toUpperCase() === code);
      if (!refStudent) {
        errs.referralCode = `Referral code "${code}" is invalid or does not exist.`;
      } else if (formData.email.trim().toLowerCase() === refStudent.email.toLowerCase()) {
        errs.referralCode = 'Self-referral is not permitted. You cannot use your own referral code.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const chosenCollege = formData.college === 'OTHER' ? formData.customCollege.trim() : formData.college;

    let detectedChannel: AcquisitionChannel = 'direct';
    if (sourceParam && ['whatsapp', 'club', 'referral', 'outreach'].includes(sourceParam)) {
      detectedChannel = sourceParam;
    } else if (formData.referralCode.trim()) {
      detectedChannel = 'referral';
    }

    const res = registerStudent({
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      college: chosenCollege,
      branch: formData.branch,
      yearOfStudy: formData.yearOfStudy,
      referralCode: formData.referralCode.trim().toUpperCase() || undefined,
      acquisitionChannel: detectedChannel,
    });

    setIsSubmitting(false);

    if (res.success && res.student) {
      navigate('/success', { state: { student: res.student } });
    } else {
      setErrors({ form: res.error || 'Registration failed. Please check your inputs.' });
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-[#0F172A]">
      <div className="max-w-6xl mx-auto">
        
        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Workshop Information & Value Props */}
          <div className="lg:col-span-5 space-y-6 pt-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>30-Second Student Registration</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Build Your First AI Project in 60 Minutes
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              Reserve your seat for the free live online workshop. You'll build, code, and deploy an AI application with classmates in a focused 1-hour session.
            </p>

            {/* Quick Session Details */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-3 text-xs text-slate-700">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Duration:</strong> {WORKSHOP_DETAILS.duration} Live Session</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-700">
                <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Date:</strong> {WORKSHOP_DETAILS.date}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Cost:</strong> 100% Free for Engineering Students</span>
              </div>
            </div>

            {/* Bullet Highlights */}
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Immediate unique referral link generated upon registration.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Climb your campus leaderboard as classmates register.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Code-along format with starter repository provided.</span>
              </div>
            </div>

            {/* Referral Banner Notification */}
            {referrerPreview && referrerPreview.found && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-xl bg-white border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="text-emerald-900 font-semibold">
                    Referred by classmate: <span className="text-emerald-950 font-bold">{referrerPreview.name}</span>
                  </div>
                  <div className="text-emerald-600 font-mono text-[11px] mt-0.5">
                    Code: {referrerPreview.code} applied!
                  </div>
                </div>
              </div>
            )}

            {sourceParam && !referrerPreview?.found && (
              <div className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
                <Tag className="w-3.5 h-3.5 text-emerald-600" />
                <span>Attribution source: <strong className="text-slate-800 uppercase">{sourceParam}</strong></span>
              </div>
            )}

          </div>

          {/* Right Column: Clean Registration Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">Student Registration</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your details to secure your live workshop seat.
                </p>
              </div>

              {errors.form && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-800 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errors.form}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Vivek Anand"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full bg-white border ${
                        errors.fullName ? 'border-rose-400 ring-1 ring-rose-400' : 'border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                      } rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition`}
                    />
                  </div>
                  {errors.fullName && <p className="text-rose-600 text-xs mt-1">{errors.fullName}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    College / Personal Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      placeholder="e.g. vivek.anand@college.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-white border ${
                        errors.email ? 'border-rose-400 ring-1 ring-rose-400' : 'border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                      } rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition`}
                    />
                  </div>
                  {errors.email && <p className="text-rose-600 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    WhatsApp Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      placeholder="e.g. 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full bg-white border ${
                        errors.phone ? 'border-rose-400 ring-1 ring-rose-400' : 'border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                      } rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition`}
                    />
                  </div>
                  {errors.phone && <p className="text-rose-600 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* College / Institution */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Engineering College / Institute <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <School className="w-4 h-4" />
                    </div>
                    <select
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className={`w-full bg-white border ${
                        errors.college ? 'border-rose-400 ring-1 ring-rose-400' : 'border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                      } rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none transition cursor-pointer`}
                    >
                      <option value="" className="text-slate-400">Select your college...</option>
                      {POPULAR_COLLEGES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                      <option value="OTHER">+ Other College (Type Name)</option>
                    </select>
                  </div>

                  {formData.college === 'OTHER' && (
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Enter your college / institute name"
                        value={formData.customCollege}
                        onChange={(e) => setFormData({ ...formData, customCollege: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                  )}
                  {errors.college && <p className="text-rose-600 text-xs mt-1">{errors.college}</p>}
                </div>

                {/* Branch and Year Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Branch <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 cursor-pointer"
                    >
                      {ENGINEERING_BRANCHES.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    {errors.branch && <p className="text-rose-600 text-xs mt-1">{errors.branch}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Year of Study <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.yearOfStudy}
                      onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 cursor-pointer"
                    >
                      {YEARS_OF_STUDY.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                    {errors.yearOfStudy && <p className="text-rose-600 text-xs mt-1">{errors.yearOfStudy}</p>}
                  </div>

                </div>

                {/* Referral Code (Optional) */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Referral Code <span className="text-slate-400 font-normal">(Optional — If invited by a classmate)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AI60-VIVEK7"
                    value={formData.referralCode}
                    onChange={(e) => setFormData({ ...formData, referralCode: e.target.value.toUpperCase() })}
                    className={`w-full bg-white border ${
                      errors.referralCode ? 'border-rose-400 ring-1 ring-rose-400' : 'border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                    } rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 uppercase font-mono placeholder-slate-400 focus:outline-none transition`}
                  />

                  {referrerPreview && !referrerPreview.found && formData.referralCode && (
                    <p className="text-amber-600 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Referral code not found in current database.</span>
                    </p>
                  )}

                  {errors.referralCode && (
                    <p className="text-rose-600 text-xs mt-1">{errors.referralCode}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition shadow-xs hover:shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Registering...</span>
                    ) : (
                      <>
                        <span>Complete Free Registration</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center text-xs text-slate-500 mt-2.5">
                    Free registration &bull; No payment required
                  </div>
                </div>

              </form>

            </div>

            {/* Existing user link */}
            <div className="mt-4 text-center text-xs text-slate-500">
              Already registered?{' '}
              <Link to="/dashboard" className="text-emerald-600 hover:text-emerald-700 font-semibold underline">
                Access your Student Dashboard
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
