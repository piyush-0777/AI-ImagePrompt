import Container from "../common/Container";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import  toast from "react-hot-toast"

function HeroSection() {
  const navigate = useNavigate()
const user = useSelector((state)=>state.auth.user)
  const hendleOncreate = () =>  {
    if(user){
      navigate('/createPrompt')
    } else {
      toast.error('login fist.');
    }
  }
  return (
    <section className="py-20">
      <Container>
        <div className="text-center">
          <h1
            className="
            text-5xl
            md:text-7xl
            font-bold
            "
          >
            Discover Powerful
            <br />
            AI Prompts
          </h1>

          <p
            className="
            mt-6
            text-lg
            text-zinc-500
            max-w-2xl
            mx-auto
            "
          >
            Explore, save and share
            the best AI prompts
            from creators around
            the world.
          </p>

          <div
            className="
            mt-8
            flex
            justify-center
            gap-4
            "
          >
            <button
              className="
              px-6
              py-3
              rounded-xl
              bg-black
              text-white
              dark:bg-white
              dark:text-black
              "
            >
              Explore Prompts
            </button>

            <button
            onClick={hendleOncreate}
              className="
              px-6
              py-3
              rounded-xl
              border
              "
            >
              Create Prompt
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;