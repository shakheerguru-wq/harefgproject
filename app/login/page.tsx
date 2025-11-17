"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import localFont from "next/font/local";
import React from "react";

// Load custom font
const CarpetFont = localFont({
  src: "../../public/fonts/ltcarpet.ttf",
  variable: "--font-carpet",
});

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
    <div
      className={`${CarpetFont.variable} min-h-screen flex items-center justify-center bg-white px-6`}
      style={{ fontFamily: "var(--font-carpet)" }}
    >
      {/* Main container */}
      <div className="w-full max-w-md p-10 rounded-3xl border border-black/10 shadow-[0_0_40px_rgba(0,0,0,0.08)] bg-white">
        
        {/* Logo */}
        <div className="w-full flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl text-center mb-4 tracking-wide text-black"
            style={{ fontFamily: "var(--font-carpet)" }}>
          Welcome Back
        </h1>

        {/* Subtitle */}
        <p className="text-center text-black/60 mb-8 tracking-wide text-lg"
            style={{ fontFamily: "var(--font-carpet)" }}>
          Log in to your account
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-center mb-4 text-lg"
             style={{ fontFamily: "var(--font-carpet)" }}>
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="block text-black font-semibold mb-2 tracking-wide"
                   style={{ fontFamily: "var(--font-carpet)" }}>
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-black/20 text-black focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all bg-white"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
              style={{ fontFamily: "var(--font-carpet)" }}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-black font-semibold mb-2 tracking-wide"
                   style={{ fontFamily: "var(--font-carpet)" }}>
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-black/20 text-black focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all bg-white"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
              style={{ fontFamily: "var(--font-carpet)" }}
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white text-lg transition-all bg-black hover:bg-black/80 shadow-[0_0_15px_rgba(0,0,0,0.25)]"
            style={{ fontFamily: "var(--font-carpet)" }}
          >
            Login
          </button>

        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-black/70 text-sm"
           style={{ fontFamily: "var(--font-carpet)" }}>
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-black font-semibold underline hover:text-black/60 transition"
            style={{ fontFamily: "var(--font-carpet)" }}
          >
            Sign Up
          </a>
        </p>

      </div>
    </div>
  );
}
