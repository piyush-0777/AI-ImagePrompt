import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { registerUser } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";



function RegisterPage() {
   const navigate = useNavigate();
  const dispatch = useDispatch();
   const { user, accessToken , loading , error  } = useSelector((state) => state.auth);
    console.log({loading , error })


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
    dispatch(registerUser(data));
  };

  return (
    <div
      className="
      min-h-screen
      flex
      justify-center
      items-center
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
          mb-8
          "
        >
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit(
            submit
          )}
          className="space-y-5"
        >
          <Input
            label="Username"
            error={
              errors.username
                ?.message
            }
            {...register(
              "username",
              {
                required:
                  "Username required",
              }
            )}
          />

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
                minLength: {
                  value: 8,
                  message:
                    "Minimum 8 chars",
                },
              }
            )}
          />

          <Button
      type="submit"
      disabled={loading.register}
    >
      {loading.register ? (
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
          Already have account?

          <Link
            to="/login"
            className="font-bold ml-2"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;