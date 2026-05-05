import { Link } from "react-router-dom";

const styles = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600 border border-blue-600",
  secondary:
    "bg-white text-slate-900 hover:bg-slate-100 focus-visible:outline-slate-600 border border-slate-300",
  ghost:
    "bg-transparent text-blue-700 hover:bg-blue-50 focus-visible:outline-blue-600 border border-blue-200",
};

function Button({ children, to, variant = "primary", className = "", type = "button", ...rest }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-bold tracking-tight whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

  if (to) {
    return (
      <Link to={to} className={`${base} ${styles[variant]} ${className}`} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
