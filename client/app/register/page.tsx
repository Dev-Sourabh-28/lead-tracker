"use client";

import { useState } from "react";
import API from "@/app/lib/axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      alert("Registered Successfully");
      router.push("/login");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
      <div className="flex w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl">

        {/* Left Panel */}
        <div className="hidden md:flex w-[42%] bg-[#1a1814] flex-col justify-between p-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#d6b98c]" />
            <span className="text-[#d6b98c] text-xs tracking-widest uppercase font-light">
              Acme
            </span>
          </div>

          <div>
            <h2 className="text-[#f5f0e8] font-serif text-3xl leading-snug mb-3">
              Start your{" "}
              <em className="italic text-[#d6b98c]">journey</em>
              <br />today.
            </h2>
            <p className="text-[#f5f0e8]/40 text-sm font-light leading-relaxed">
              Join thousands of users who trust us to manage what matters most.
            </p>
          </div>

          <ul className="space-y-3">
            {["Free forever plan", "No credit card required", "Cancel anytime"].map(
              (item) => (
                <li key={item} className="flex items-center gap-3 text-xs text-[#f5f0e8]/50 font-light">
                  <span className="w-[18px] h-[18px] rounded-full border border-[#d6b98c]/40 flex items-center justify-center text-[#d6b98c] text-[9px]">
                    ✓
                  </span>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white px-10 py-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-2xl font-serif font-normal text-gray-900 mb-1">
              Create account
            </h1>
            <p className="text-sm text-gray-400 font-light">
              Fill in your details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-1.5">
                Full name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  👤
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Jane Doe"
                  onChange={handleChange}
                  className="w-full h-11 pl-9 pr-3 border border-gray-200 rounded-lg bg-gray-50 text-sm font-light text-gray-800 outline-none focus:border-[#d6b98c] focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  ✉️
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="jane@example.com"
                  onChange={handleChange}
                  className="w-full h-11 pl-9 pr-3 border border-gray-200 rounded-lg bg-gray-50 text-sm font-light text-gray-800 outline-none focus:border-[#d6b98c] focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  🔒
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Min. 8 characters"
                  onChange={handleChange}
                  className="w-full h-11 pl-9 pr-3 border border-gray-200 rounded-lg bg-gray-50 text-sm font-light text-gray-800 outline-none focus:border-[#d6b98c] focus:bg-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 mt-2 bg-[#1a1814] text-[#f5f0e8] text-xs font-medium tracking-widest uppercase rounded-lg hover:bg-[#2e2a25] transition-colors"
            >
              Create account
            </button>
          </form>

          <div className="flex items-center gap-3 my-5 text-[11px] text-gray-400 uppercase tracking-widest">
            <div className="flex-1 h-px bg-gray-100" />
            or
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <button className="w-full h-11 border border-gray-200 rounded-lg text-sm text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="mt-6 text-center text-xs text-gray-400 font-light">
            Already have an account?{" "}
            <a href="/login" className="text-[#b8925e] font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}