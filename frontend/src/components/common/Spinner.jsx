function Spinner({
  size = "md",
}) {
  const sizes = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div
        className={`
          ${sizes[size]}
          animate-spin
          rounded-full
          border-4
          border-zinc-300
          border-t-black
          dark:border-zinc-700
          dark:border-t-white
        `}
      />
    </div>
  );
}

export default Spinner;