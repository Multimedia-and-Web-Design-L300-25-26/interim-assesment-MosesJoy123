import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import coinbaseLogo from "../assets/coinbase_logo@2x.png";
import { validateEmail, validateName, validatePassword, validatePasswordMatch } from "../utils/validation";

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

function SignUp() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedAccountType = searchParams.get("type") ?? "";
  const isCreateStep = searchParams.get("step") === "create" && Boolean(selectedAccountType);
  const isVerifyStep = searchParams.get("step") === "verify" && Boolean(selectedAccountType);
  const savedEmail = searchParams.get("email") ?? "";
  const [emailInput, setEmailInput] = useState(savedEmail);
  const [fullNameInput, setFullNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [resendCountdown, setResendCountdown] = useState(30);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  useEffect(() => {
    if (isVerifyStep) {
      setResendCountdown(30);
    }
  }, [isVerifyStep, selectedAccountType, savedEmail]);

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

  const handleContinue = async (event) => {
    event.preventDefault();
    
    // Validate all fields
    const nameVal = validateName(fullNameInput);
    const emailVal = validateEmail(emailInput);
    const passwordVal = validatePassword(passwordInput);
    const passwordConfirmVal = validatePasswordMatch(passwordInput, passwordConfirmInput);
    
    setNameError(nameVal.error);
    setEmailError(emailVal.error);
    setPasswordError(passwordVal.error);
    setPasswordConfirmError(passwordConfirmVal.error);
    
    // If any validation fails, don't proceed
    if (!nameVal.isValid || !emailVal.isValid || !passwordVal.isValid || !passwordConfirmVal.isValid) {
      setErrorMessage("Please fix all errors before continuing");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullNameInput.trim(),
          email: emailInput.trim(),
          password: passwordInput,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setErrorMessage(payload.message ?? "Sign up failed");
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
          aria-label="Back to create account"
          onClick={() => setSearchParams({ step: "create", type: selectedAccountType, email: savedEmail })}
        >
          <img src={coinbaseLogo} alt="Coinbase" className="h-8 w-auto brightness-0 invert" />
        </button>

        <div className="mx-auto mt-16 w-full max-w-[560px]">
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

  if (isCreateStep) {
    return (
      <section className="relative min-h-screen bg-[#05080f] px-5 py-8 text-slate-100">
        <button
          type="button"
          className="inline-block"
          aria-label="Back to account type"
          onClick={() => setSearchParams({})}
        >
          <img src={coinbaseLogo} alt="Coinbase" className="h-8 w-auto brightness-0 invert" />
        </button>

        <div className="mx-auto mt-16 w-full max-w-[580px]">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Create your account</h1>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">Access all that Coinbase has to offer with a single account.</p>

          <form className="mx-auto mt-8 w-full max-w-[460px] space-y-4" onSubmit={handleContinue}>
            <label className="block text-lg font-semibold text-white">
              Full name
              <input
                type="text"
                value={fullNameInput}
                onChange={(event) => setFullNameInput(event.target.value)}
                onBlur={() => setNameError(validateName(fullNameInput).error)}
                placeholder="Your full name"
                className={`mt-2 h-12 w-full rounded-2xl border px-5 text-base text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500 bg-[#1f2430] ${
                  nameError ? "border-red-500" : "border-slate-700"
                }`}
              />
              {nameError && <p className="mt-1 text-sm text-red-400">{nameError}</p>}
            </label>

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

            <label className="block text-lg font-semibold text-white">
              Password
              <input
                type="password"
                value={passwordInput}
                onChange={(event) => setPasswordInput(event.target.value)}
                onBlur={() => setPasswordError(validatePassword(passwordInput).error)}
                placeholder="At least 6 characters"
                className={`mt-2 h-12 w-full rounded-2xl border px-5 text-base text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500 bg-[#1f2430] ${
                  passwordError ? "border-red-500" : "border-slate-700"
                }`}
              />
              {passwordError && <p className="mt-1 text-sm text-red-400">{passwordError}</p>}
            </label>

            <label className="block text-lg font-semibold text-white">
              Confirm Password
              <input
                type="password"
                value={passwordConfirmInput}
                onChange={(event) => setPasswordConfirmInput(event.target.value)}
                onBlur={() => setPasswordConfirmError(validatePasswordMatch(passwordInput, passwordConfirmInput).error)}
                placeholder="Confirm your password"
                className={`mt-2 h-12 w-full rounded-2xl border px-5 text-base text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500 bg-[#1f2430] ${
                  passwordConfirmError ? "border-red-500" : "border-slate-700"
                }`}
              />
              {passwordConfirmError && <p className="mt-1 text-sm text-red-400">{passwordConfirmError}</p>}
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-[999px] bg-[#1555e8] text-lg font-semibold text-white transition-colors hover:bg-[#1b5ef9] disabled:opacity-50"
            >
              {isSubmitting ? "Creating account..." : "Continue"}
            </button>

            {errorMessage ? <p className="text-sm text-rose-400">{errorMessage}</p> : null}
          </form>

          <div className="mx-auto my-7 flex w-full max-w-[460px] items-center gap-4 text-sm font-semibold text-slate-500">
            <span className="h-px flex-1 bg-slate-700" />
            <span>OR</span>
            <span className="h-px flex-1 bg-slate-700" />
          </div>

          <div className="mx-auto w-full max-w-[460px] space-y-4">
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-3 rounded-[999px] border border-slate-700 bg-[#1f2430] text-lg font-semibold text-white transition-colors hover:bg-[#262d3a]"
            >
              <GoogleLogo />
              <span>Sign up with Google</span>
            </button>

            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-3 rounded-[999px] border border-slate-700 bg-[#1f2430] text-lg font-semibold text-white transition-colors hover:bg-[#262d3a]"
            >
              <AppleLogo />
              <span>Sign up with Apple</span>
            </button>
          </div>

          <p className="mt-7 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/signin" className="font-semibold text-[#0b5cff] hover:text-[#2d74ff]">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center px-5 py-10 text-slate-100">
      <Link
        to="/"
        className="absolute right-7 top-5 text-5xl font-light leading-none text-slate-400 transition-colors hover:text-slate-100"
        aria-label="Close"
      >
        ×
      </Link>

      <div className="w-full max-w-[760px]">
        <h1 className="mx-auto max-w-[520px] text-center text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          What kind of account are you creating?
        </h1>

        <div className="mt-10 space-y-5">
          <button
            type="button"
            onClick={() => setSearchParams({ step: "create", type: "personal" })}
            className="mx-auto flex w-full max-w-[610px] items-center gap-5 rounded-[22px] border border-slate-800 bg-[#151922] px-7 py-6 text-left shadow-[0_0_0_1px_rgba(148,163,184,0.06)] transition-colors hover:bg-[#1a1f2a]"
          >
            <span className="relative h-10 w-10 shrink-0">
              <span className="absolute left-1 top-3 h-7 w-10 rounded-[10px] bg-[#202635]" />
              <span className="absolute left-3 top-0 h-7 w-7 rounded-full bg-[#0b5cff]" />
            </span>
            <span>
              <strong className="block text-[32px] font-semibold leading-none text-white">Personal</strong>
              <span className="mt-1.5 block text-[11px] text-slate-400">Trade crypto as an individual.</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSearchParams({ step: "create", type: "business" })}
            className="mx-auto flex w-full max-w-[610px] items-center gap-5 rounded-[22px] border border-slate-800 bg-[#151922] px-7 py-6 text-left shadow-[0_0_0_1px_rgba(148,163,184,0.06)] transition-colors hover:bg-[#1a1f2a]"
          >
            <span className="relative h-10 w-10 shrink-0">
              <span className="absolute left-0 top-5 h-6 w-6 rounded-full bg-slate-500" />
              <span className="absolute left-7 top-5 h-6 w-6 rounded-full bg-[#0b5cff]" />
              <span className="absolute left-9 top-7 h-2.5 w-2.5 rounded-full bg-[#f5c100]" />
              <span className="absolute left-2 top-9 h-4 w-8 rounded-[9px] bg-[#202635]" />
            </span>
            <span>
              <strong className="block text-[32px] font-semibold leading-none text-white">Business</strong>
              <span className="mt-1.5 block text-[11px] text-slate-400">Manage teams and portfolios, accept crypto payments, access APIs, and more</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSearchParams({ step: "create", type: "developer" })}
            className="mx-auto flex w-full max-w-[610px] items-center gap-5 rounded-[22px] border border-slate-800 bg-[#151922] px-7 py-6 text-left shadow-[0_0_0_1px_rgba(148,163,184,0.06)] transition-colors hover:bg-[#1a1f2a]"
          >
            <span className="relative h-10 w-10 shrink-0">
              <span className="absolute left-2 top-12 h-4 w-8 -translate-y-full rounded-[8px] bg-[#202635]" />
              <span className="absolute left-2 top-2 h-7 w-8 rounded-md bg-[#0b5cff]" />
              <span className="absolute left-4 top-4 h-2 w-4 rounded-sm bg-[#cde0ff]" />
            </span>
            <span>
              <strong className="block text-[32px] font-semibold leading-none text-white">Developer</strong>
              <span className="mt-1.5 block text-[11px] text-slate-400">Build onchain using developer tooling.</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SignUp; 