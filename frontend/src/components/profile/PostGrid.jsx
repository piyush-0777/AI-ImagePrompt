import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { deletePrompt } from "../../features/prompt/promptThunks";


const PostGrid = ({ posts, myPost = false, }) => {
  const navigate = useNavigate()
  const [deleteId , setDeleteId] = useState(null);
   const dispatch = useDispatch();
   const PostLoading = useSelector((state)=> state.prompt)
  if (!posts?.length) {
    return (
      <div className="py-10 text-center text-gray-500 dark:text-gray-400">
        No Posts Found
      </div>
    );
  }
  const onDelete = (id)=>{
    setDeleteId(id);
    dispatch(deletePrompt(id));
  }
  const onEdit = (prompt) => {
    navigate(`/updatePrompt/${prompt.id}`);
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="
            overflow-hidden rounded-2xl
            border border-gray-200
            bg-white shadow-sm
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-lg
            dark:border-gray-700
            dark:bg-gray-900
          "
        >
          {/* Image */}
          <div className="aspect-square overflow-hidden">
            <img
              src={post.image_url?.prompt_image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="truncate text-lg font-semibold text-gray-900 dark:text-white">
              {post.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
              {post.prompt_text}
            </p>

            {/* Stats */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>❤️ {post.likes_count}</span>
              <span>🔖 {post.saves_count}</span>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-2">
              <Link
                to={`/promptDetal/${post.id}`}
                className="
                  flex-1 rounded-lg bg-blue-600 px-3 py-2
                  text-center text-sm font-medium text-white
                  transition hover:bg-blue-700
                "
              >
                Read More
              </Link>

              {myPost && (
                <>
                  <button
                    onClick={() => onEdit(post)}
                    className="
                      rounded-lg bg-yellow-500 px-3 py-2
                      text-sm font-medium text-white
                      transition hover:bg-yellow-600
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(post.id)}
                    className="
                      rounded-lg bg-red-500 px-3 py-2
                      text-sm font-medium text-white
                      transition hover:bg-red-600
                    "
                  >
                    {PostLoading.loading.delete==true && deleteId == post.id ? 'Deleting....' : 'Delete'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostGrid;