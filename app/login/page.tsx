"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import localFont from "next/font/local";

// ✅ CORRECT FONT PATHS FOR VERCEL
const CarpetFont = localFont({
  src: "/fonts/ltcarpet.ttf",
  variable: "--font-carpet",
});

const EpoqueFont = localFont({
  src: "/fonts/1927 epoque.otf",
  variable: "--font-epoque",
});

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setValidationError("");

    if (!email.trim() || !password.trim()) {
      setValidationError("Please enter your email and password.");
      return;
    }

    const res: any = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Incorrect email or password.");
      return;
    }

    window.location.href = "/";
  };

  const triggerUnderline = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.classList.add("underline-sweep");
    setTimeout(() => el.classList.remove("underline-sweep"), 450);
  };

  return (
    <div
      className={`${CarpetFont.variable} ${EpoqueFont.variable} min-h-screen w-full bg-white flex justify-center px-4 py-10`}
      style={{ fontFamily: "var(--font-carpet)" }}
    >
      <style jsx global>{`
        .underline-sweep {
          position: relative;
          overflow: hidden;
        }
        .underline-sweep::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: gold;
          transform: translateX(-100%);
          animation: sweep 0.45s ease-out forwards;
        }
        @keyframes sweep {
          to {
            transform: translateX(0%);
          }
        }

        .show-toggle {
          transition:
            background-color 0.25s ease,
            color 0.25s ease,
            border-color 0.25s ease,
            transform 0.25s ease;
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid transparent;
        }

        .show-toggle:active {
          background-color: black !important;
          color: white !important;
          border-color: black !important;
          transform: scale(0.9);
        }
      `}</style>

      <div className="w-full max-w-md bg-white border border-black/10 shadow-[0_0_40px_rgba(0,0,0,0.05)] rounded-3xl p-10">

        {/* LOGO */}
        <div className="w-full flex justify-center mb-8">
          <a href="/" onClick={triggerUnderline as any} className="cursor-pointer">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={280}
              height={280}
              className="object-contain"
            />
          </a>
        </div>

        {/* TITLE */}
        <h1
          className="text-5xl text-center mb-3 text-black tracking-wide"
          style={{ fontFamily: "var(--font-carpet)" }}
        >
          Welcome Boss
        </h1>

        {/* SUBTITLE */}
        <p
          className="text-center text-black/60 mb-6 text-lg"
          style={{ fontFamily: "var(--font-epoque)" }}
        >
          Log in to your account
        </p>

        {/* WRONG EMAIL/PASSWORD ERROR */}
        {error && (
          <p
            className="text-red-600 text-center text-sm mb-4"
            style={{ fontFamily: "var(--font-epoque)" }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* EMAIL */}
          <div>
            <label className="block text-black font-semibold mb-1">Email</label>

            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-black/20 bg-white text-black focus:ring-2 focus:ring-black/20 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {validationError && (
              <p
                className="text-red-600 text-sm mt-1"
                style={{ fontFamily: "var(--font-epoque)" }}
              >
                {validationError}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-black font-semibold mb-1">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 pr-16 rounded-lg border border-black/20 bg-white text-black focus:ring-2 focus:ring-black/20 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer show-toggle text-black"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            onClick={triggerUnderline as any}
            className="w-full py-3 mt-4 bg-black text-white text-lg rounded-lg shadow-md hover:bg-black/85 active:scale-[0.98] cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* FOOTER */}
        <p
          className="text-center mt-6 text-black/70 text-sm"
          style={{ fontFamily: "var(--font-epoque)" }}
        >
          Don’t have an account?{" "}
          <a
            href="/signup"
            onClick={triggerUnderline as any}
            className="text-black underline font-semibold cursor-pointer hover:text-black/60"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

