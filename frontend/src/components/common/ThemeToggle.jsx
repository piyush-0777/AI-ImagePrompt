import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/theme/themeSlice";

function ThemeToggle() {
  const dispatch = useDispatch();

  const mode = useSelector(
    (state) => state.theme.mode
  );

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="
      p-2
      rounded-xl
      border
      dark:border-zinc-700
      "
    >
      {mode === "dark" ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
}

export default ThemeToggle;