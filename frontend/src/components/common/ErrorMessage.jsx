function ErrorMessage({
  message = "Something went wrong.",
}) {
  return (
    <div className="py-10 flex justify-center">
      <div
        className="
          max-w-md
          w-full
          rounded-xl
          border
          border-red-200
          bg-red-50
          dark:bg-red-950/20
          dark:border-red-900
          p-4
        "
      >
        <p
          className="
            text-center
            text-red-600
            dark:text-red-400
            font-medium
          "
        >
          {message}
        </p>
      </div>
    </div>
  );
}

export default ErrorMessage;