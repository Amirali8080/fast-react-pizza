import { Link } from "react-router-dom";

function Button({ children, to, disabled, type, onClick }) {
  const base =
    "inline-block text-sm rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 transition-colors hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring   focus:ring-yellow-300 focus:ring-offset-2  disabled:cursor-not-allowed ";
  const style = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 text-xs md:px-5 md:py-2.5",
    secondary:
      "text-sm inline-block rounded-full border-2 border-stone-300  font-semibold uppercase tracking-wide text-stone-400 transition-colors hover:bg-stone-300 focus:bg-stone-300 focus:text-stone-800 hover:text-stone-800 focus:outline-none focus:ring   focus:ring-stone-300 focus:ring-offset-2  disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
    round:
      "w-8 h-8 px-1 py-1 md:w-10 md:h-10 text-sm rounded-full inline-block text-sm rounded-full bg-yellow-400  font-semibold text-stone-800 transition-colors hover:bg-yellow-300 disabled:cursor-not-allowed flex justify-center items-center",
  };
  if (to)
    return (
      <Link className={style[type]} to={to}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={style[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={style[type]}>
      {children}
    </button>
  );
}

export default Button;
