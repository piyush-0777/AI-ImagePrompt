import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../common/ThemeToggle";
import Container from "../common/Container";
import { logoutUser } from "../../features/auth/authThunks";

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    setOpen(false);
  };

  const closeMenu = () => setOpen(false);

  return (
    <header
      className="
        sticky top-0 z-50
        backdrop-blur-md
        bg-white/80 dark:bg-zinc-950/80
        border-b dark:border-zinc-800
      "
    >
      <Container>
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            MyPrompt
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/">For You</NavLink>
            <NavLink to="/trending">Trending</NavLink>
            <NavLink to="/filter">Filter</NavLink>

            {user && <NavLink to="/create">Create</NavLink>}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            {!user ? (
              <>
                <Link to="/login">Login</Link>

                <Link
                  to="/register"
                  className="
                    px-4 py-2 rounded-xl
                    bg-black text-white
                    dark:bg-white dark:text-black
                  "
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <img
                  src={
                    user.profile_image?.public_url ||
                    `https://ui-avatars.com/api/?name=${user.username}`
                  }
                  alt={user.username}
                  className="w-10 h-10 rounded-full border"
                />

                <p className="font-medium">
                  {user.username}
                </p>

                <Link
                  to={`/profile/${user.id}`}
                  className="px-3 py-2 rounded-lg border"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-lg border"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Right */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />

            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg border dark:border-zinc-700"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div
            className="
              md:hidden py-4 border-t
              dark:border-zinc-800
              flex flex-col gap-3
            "
          >
            <NavLink to="/" onClick={closeMenu}>
              For You
            </NavLink>

            <NavLink to="/trending" onClick={closeMenu}>
              Trending
            </NavLink>

            <NavLink to="/filter" onClick={closeMenu}>
              Filter
            </NavLink>

            {user && (
              <>
                <NavLink to="/create" onClick={closeMenu}>
                  Create
                </NavLink>

                <NavLink
                  to={`/profile/${user.id}`}
                  onClick={closeMenu}
                >
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="
                    text-left
                    py-2
                    border
                    rounded-lg
                    px-3
                  "
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <>
                <Link to="/login" onClick={closeMenu}>
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="
                    py-2 px-3 rounded-lg
                    bg-black text-white
                    dark:bg-white dark:text-black
                  "
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </Container>
    </header>
  );
}

export default Navbar;