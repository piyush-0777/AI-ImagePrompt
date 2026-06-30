import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { loginUser } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
function LoginPage() {
   const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, accessToken , loading , error  } = useSelector((state) => state.auth);

  useEffect(() => {
      if (user && accessToken) {
        navigate("/");
      }
    }, [user, accessToken, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div
      className=" min-h-screen  flex
      justify-center items-center
      bg-gradient-to-br
      from-zinc-100
      to-zinc-300
      dark:from-zinc-950
      dark:to-black
      px-4
      "
    >
      <div
        className="
        w-full
        max-w-md
        backdrop-blur-xl
        bg-white/70
        dark:bg-zinc-900/70
        p-8
        rounded-3xl
        shadow-xl
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-center
          mb-2
          "
        >
          Welcome Back
        </h1>

        <p
          className="
          text-center
          text-gray-500
          mb-8
          "
        >
          Login to MyPrompt
        </p>

        <form
          onSubmit={handleSubmit(
            submit
          )}
          className="space-y-5"
        >
          <Input
            label="Email"
            type="email"
            error={
              errors.email?.message
            }
            {...register("email", {
              required:
                "Email required",
            })}
          />

          <Input
            label="Password"
            type="password"
            error={
              errors.password
                ?.message
            }
            {...register(
              "password",
              {
                required:
                  "Password required",
              }
            )}
          />

        <Button
              type="submit"
              disabled={loading.login}
            >
              {loading.login ? (
                <>
                  <span className="animate-spin mr-2 inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
        </form>

        <p className="mt-6 text-center">
          Don't have account?

          <Link
            to="/register"
            className="font-bold ml-2"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;