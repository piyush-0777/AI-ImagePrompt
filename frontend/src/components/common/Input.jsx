export default function Input({
  label,
  error,
  ...props
}) {
  return (
    <div className="space-y-2">
      <label className="font-medium">
        {label}
      </label>

      <input
        {...props}
        className="
        w-full
        px-4
        py-3
        rounded-xl
        border
        outline-none
        bg-white
        dark:bg-zinc-900
        focus:ring-2
        focus:ring-black
        dark:focus:ring-white
        "
      />

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}