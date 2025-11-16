export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`
        px-4 py-2 rounded-xl font-semibold text-white shadow-md
        bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90
        transition-all ${className}
      `}
    >
      {children}
    </button>
  );
}
