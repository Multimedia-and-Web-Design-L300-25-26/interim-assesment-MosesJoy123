import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import coinbaseLogo from "../assets/coinbase_logo@2x.png";
import { validateEmail, validatePassword } from "../utils/validation";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.65z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.88-3c-1.07.72-2.45 1.15-4.05 1.15-3.11 0-5.75-2.1-6.69-4.93H1.3v3.1A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.31 14.32A7.2 7.2 0 0 1 4.94 12c0-.8.14-1.58.37-2.32V6.58H1.3A12 12 0 0 0 0 12c0 1.93.46 3.75 1.3 5.42l4.01-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.45-3.45C17.95 1.15 15.24 0 12 0A11.99 11.99 0 0 0 1.3 6.58l4.01 3.1c.94-2.83 3.58-4.91 6.69-4.91z"
      />
    </svg>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
      <path d="M16.9 12.8c0-2.3 1.9-3.4 2-3.4-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.7.8-3.4.8-.7 0-1.7-.8-2.8-.8-1.4 0-2.8.8-3.5 2-1.5 2.6-.4 6.5 1.1 8.7.8 1.1 1.6 2.4 2.8 2.4 1.1 0 1.5-.7 2.8-.7 1.3 0 1.7.7 2.9.7 1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.6 1.2-2.7 0 0-2.5-1-2.5-3zM14.5 6.1c.6-.7 1.1-1.7 1-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1.1 1.6-1 2.6 1 0 1.9-.5 2.5-1.2z" />
    </svg>
  );
}

function PasskeyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="8" r="3" />
      <path d="M5 19a7 7 0 0 1 14 0" />
      <path d="M18 14l3 3" />
      <path d="M19.5 15.5l-1.5 1.5" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UserBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="8" r="3" />
      <path d="M6 19a6 6 0 0 1 12 0" />
    </svg>
  );
}

function SignIn() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") ?? "";
  const isPasswordStep = step === "password";
  const isVerifyStep = step === "verify";
  const savedEmail = searchParams.get("email") ?? "";
  const [emailInput, setEmailInput] = useState(savedEmail);
  const [passwordInput, setPasswordInput] = useState("");
  const [resendCountdown, setResendCountdown] = useState(30);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (isVerifyStep) {
      setResendCountdown(30);
    }
  }, [isVerifyStep, savedEmail]);

  useEffect(() => {
    if (!isVerifyStep || resendCountdown <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setResendCountdown((previous) => {
        if (previous <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isVerifyStep, resendCountdown]);

  const handleEmailContinue = (event) => {
    event.preventDefault();
    const emailVal = validateEmail(emailInput);
    setEmailError(emailVal.error);
    
    if (!emailVal.isValid) {
      return;
    }

    setErrorMessage("");
    setSearchParams({ step: "password", email: emailInput.trim() });
  };

  const handlePasswordContinue = async (event) => {
    event.preventDefault();
    const passwordVal = validatePassword(passwordInput);
    setPasswordError(passwordVal.error);
    
    if (!passwordVal.isValid) {
      return;
    }

    if (!savedEmail) {
      setErrorMessage("Email not found. Please try again.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: savedEmail,
          password: passwordInput,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setErrorMessage(payload.message ?? "Sign in failed");
        return;
      }

      localStorage.setItem("cb_auth_token", payload.token);
      localStorage.setItem("cb_auth_user", JSON.stringify(payload.user));
      navigate("/");
    } catch {
      setErrorMessage("Unable to reach the server. Check that backend is running on port 5000.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendClick = () => {
    if (resendCountdown > 0) {
      return;
    }

    setResendCountdown(30);
  };

  if (isVerifyStep) {
    return (
      <section className="relative min-h-screen bg-[#05080f] px-5 py-8 text-slate-100">
        <button
          type="button"
          className="inline-block"
          aria-label="Back to password step"
          onClick={() => setSearchParams({ step: "password", email: savedEmail })}
        >
          <img src={coinbaseLogo} alt="Coinbase" className="h-8 w-auto brightness-0 invert" />
        </button>

        <div className="mx-auto mt-10 w-full max-w-[560px]">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Enter the code we emailed you</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
            Check your email <strong className="text-slate-100">{savedEmail || "your@email.com"}</strong>. This helps us keep your account secure by verifying that it's really you.
          </p>

          <p className="mt-8 text-lg font-semibold text-white">Enter 6-digit code</p>

          <div className="mt-4 flex gap-3 sm:gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="h-16 w-14 rounded-2xl border border-slate-700 bg-[#1f2430] text-center text-xl text-white outline-none focus:border-blue-500"
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleResendClick}
            disabled={resendCountdown > 0}
            className={`mt-10 h-12 w-full max-w-[460px] rounded-[999px] text-lg font-semibold transition-colors ${
              resendCountdown > 0
                ? "border border-slate-700 bg-[#1f2430] text-slate-500"
                : "border border-[#1555e8] bg-[#1555e8] text-white hover:bg-[#1b5ef9]"
            }`}
          >
            {resendCountdown > 0 ? `Resend code in ${resendCountdown}` : "Resend code"}
          </button>

          <p className="mt-8 text-center text-sm text-slate-300">
            Can't access?{" "}
            <button type="button" className="font-semibold text-[#0b5cff] hover:text-[#2d74ff]">
              Update your 2FA
            </button>
          </p>
        </div>
      </section>
    );
  }

  if (isPasswordStep) {
    return (
      <section className="relative min-h-screen bg-[#05080f] px-5 py-8 text-slate-100">
        <button type="button" className="inline-block" aria-label="Back to email step" onClick={() => setSearchParams({})}>
          <img src={coinbaseLogo} alt="Coinbase" className="h-8 w-auto brightness-0 invert" />
        </button>

        <div className="mx-auto mt-8 w-full max-w-[460px]">
          <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Sign in to Coinbase</h1>

          <div className="mt-7 w-full rounded-2xl border border-slate-700 bg-[#1f2430] px-4 py-3">
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-slate-700/40 text-slate-400">
                <UserBadgeIcon />
              </span>
              <p className="text-xl font-semibold tracking-tight text-slate-100">{savedEmail || "your@email.com"}</p>
            </div>
          </div>

          <form className="mt-8 w-full space-y-4" onSubmit={handlePasswordContinue}>
            <label className="block text-base font-semibold text-white">
              Password
              <div className={`mt-2 flex h-12 items-center rounded-2xl border bg-[#1f2430] px-5 ${
                passwordError ? "border-red-500" : "border-[#1555e8]"
              }`}>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(event) => setPasswordInput(event.target.value)}
                  onBlur={() => setPasswordError(validatePassword(passwordInput).error)}
                  className="w-full bg-transparent text-sm text-slate-100 outline-none"
                  placeholder=""
                />
                <span className="text-slate-500">
                  <EyeIcon />
                </span>
              </div>
              {passwordError && <p className="mt-1 text-sm text-red-400">{passwordError}</p>}
            </label>

            <button type="button" className="text-base font-semibold text-[#0b5cff] hover:text-[#2d74ff]">
              Forgot password?
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 h-12 w-full rounded-[999px] bg-[#4052d2] text-base font-semibold text-white transition-colors hover:bg-[#4a5de2] disabled:opacity-50"
            >
              {isSubmitting ? "Signing in..." : "Continue"}
            </button>

            {errorMessage ? <p className="text-sm text-rose-400">{errorMessage}</p> : null}
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-[#05080f] px-5 py-8 text-slate-100">
      <Link to="/" className="inline-block" aria-label="Coinbase home">
        <img src={coinbaseLogo} alt="Coinbase" className="h-8 w-auto brightness-0 invert" />
      </Link>

      <div className="mx-auto mt-6 w-full max-w-[460px]">
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Sign in to Coinbase</h1>

        <form className="mt-8 w-full space-y-4" onSubmit={handleEmailContinue}>
          <label className="block text-lg font-semibold text-white">
            Email
            <input
              type="email"
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
              onBlur={() => setEmailError(validateEmail(emailInput).error)}
              placeholder="Your email address"
              className={`mt-2 h-12 w-full rounded-2xl border px-5 text-base text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500 bg-[#1f2430] ${
                emailError ? "border-red-500" : "border-slate-700"
              }`}
            />
            {emailError && <p className="mt-1 text-sm text-red-400">{emailError}</p>}
          </label>

          <button
            type="submit"
            className="h-12 w-full rounded-[999px] bg-[#4052d2] text-lg font-semibold text-white transition-colors hover:bg-[#4a5de2] disabled:opacity-50"
          >
            Continue
          </button>

          {errorMessage ? <p className="text-sm text-rose-400">{errorMessage}</p> : null}
        </form>

        <div className="my-7 flex w-full items-center gap-4 text-sm font-semibold text-slate-500">
          <span className="h-px flex-1 bg-slate-700" />
          <span>OR</span>
          <span className="h-px flex-1 bg-slate-700" />
        </div>

        <div className="w-full space-y-4">
          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-[999px] border border-slate-700 bg-[#1f2430] text-lg font-semibold text-white transition-colors hover:bg-[#262d3a]"
          >
            <PasskeyIcon />
            <span>Sign in with Passkey</span>
          </button>

          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-[999px] border border-slate-700 bg-[#1f2430] text-lg font-semibold text-white transition-colors hover:bg-[#262d3a]"
          >
            <GoogleLogo />
            <span>Sign in with Google</span>
          </button>

          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-[999px] border border-slate-700 bg-[#1f2430] text-lg font-semibold text-white transition-colors hover:bg-[#262d3a]"
          >
            <AppleLogo />
            <span>Sign in with Apple</span>
          </button>
        </div>

        <p className="mt-7 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-[#0b5cff] hover:text-[#2d74ff]">
            Sign up
          </Link>
        </p>

        <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">
          Not your device? Use a private window. See our <a href="#" className="underline hover:text-slate-300">Privacy Policy</a> for more info.
        </p>
      </div>
    </section>
  );
}

export default SignIn;
