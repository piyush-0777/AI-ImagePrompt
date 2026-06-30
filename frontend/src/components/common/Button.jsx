export default function Button({
  children,
  loading,
  ...props
}) {
  return (
    <button
      {...props}
      disabled={loading}
      className="
      w-full
      bg-black
      dark:bg-white
      text-white
      dark:text-black
      py-3
      rounded-xl
      font-semibold
      transition
      hover:scale-[1.02]
      disabled:opacity-50
      "
    >
      {loading
        ? "Please wait..."
        : children}
    </button>
  );
}