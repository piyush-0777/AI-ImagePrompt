import { Heart, Bookmark } from "lucide-react";
import { useSelector , useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function PromptCard({ prompt }) {
  const dispatch = useDispatch();
  
  return (
    <div
      className="
      overflow-hidden
      rounded-2xl
      bg-white
      dark:bg-zinc-900
      border
      dark:border-zinc-800
      shadow-sm
      hover:shadow-lg
      transition-all
      duration-300
      "
    >
      {/* Image */}

      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={
            prompt?.image_url?.prompt_image ||
            "https://images.unsplash.com/photo-1682687982501-1e58ab814714"
          }
          alt={prompt?.title}
          className="
          w-full
          h-full
          object-cover
          hover:scale-105
          transition-transform
          duration-500
          "
        />
      </div>

      {/* Content */}

      <div className="p-5">
        <h3
          className="
          font-semibold
          text-lg
          line-clamp-1
          "
        >
          {prompt?.title}
        </h3>

        <p
          className="
          text-sm
          text-zinc-500
          mt-2
          line-clamp-2
          "
        >
          {prompt?.prompt_text}
        </p>

        {/* Footer */}

        <div
          className="
          flex
          justify-between
          items-center
          mt-5
          "
        >
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <Heart size={16} />
              <span>
                {prompt?.likes_count}
              </span>
            </div>

            <div 
            className="flex items-center gap-1 hover:cursor-pointer"
            
            >
              <Bookmark size={16} />
              <span>
                {prompt?.saves_count}
              </span>
            </div>
          </div>

            <div className="flex items-center gap-4">
    <Link
      to={`promptDetal/${prompt?.id}`}
      className="text-sm text-blue-600 hover:underline"
    >
      Read More
    </Link>

    <span className="text-sm text-zinc-500">
      @{prompt?.author || "piyiush"}
    </span>
  </div>
        </div>
      </div>
    </div>
  );
}

export default PromptCard;