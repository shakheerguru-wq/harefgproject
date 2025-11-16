'use client';
export const dynamic = "force-dynamic";

import { useState } from "react";
import { signIn } from "next-auth/react";
import React from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/"; // redirect to home
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      
      {/* Gold vignette glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 pointer-events-none"></div>

      {/* Golden spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-yellow-500/20 to-transparent blur-[160px] opacity-50"></div>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md p-10 rounded-2xl border border-yellow-600/20 bg-gradient-to-b from-zinc-900 to-black shadow-2xl shadow-black/80">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-6 text-yellow-500 tracking-wider font-[Cinzel]">
          Welcome Back
        </h1>
        <p className="text-center text-yellow-300/80 mb-8 font-light tracking-wide">
          Log in to your Noir Press account
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-center mb-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-yellow-500 font-semibold mb-2 tracking-wide">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-700/40 text-yellow-100 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/40 outline-none transition-all"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-yellow-500 font-semibold mb-2 tracking-wide">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-700/40 text-yellow-100 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/40 outline-none transition-all"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-black bg-yellow-500 hover:bg-yellow-400 transition-all text-lg shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:shadow-[0_0_25px_rgba(255,215,0,0.6)]"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-yellow-300/70 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-yellow-400 hover:text-yellow-200 transition font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
