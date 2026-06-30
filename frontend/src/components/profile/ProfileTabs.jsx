import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostGrid from "./PostGrid";
import Spinner from "../common/Spinner";
import {
  getUserPrompts,
  getLikedPrompts,
  getSavedPrompts,
} from "../../features/user/userThunks";

const ProfileTabs = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loginUser = useSelector((state) => state.auth.user);

  const [tab, setTab] = useState("posts");
   console.log(user?.prompts)
  useEffect(() => {
    if (!user?.profile?.id) return;

      dispatch(getUserPrompts({userId : user.profile.id , page:1 , limit: 20}));
      dispatch(getLikedPrompts(user.profile.id));
      dispatch(getSavedPrompts(user.profile.id));
  
  }, [dispatch, user?.profile?.id, loginUser?.id]);
  const activeTab =
    "border-b-2 border-black dark:border-white text-black dark:text-white";

  const inactiveTab =
    "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white";

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center border-b border-gray-300 dark:border-gray-700 mb-6">
        <button
          onClick={() => setTab("posts")}
          className={`px-5 py-3 font-medium transition-colors ${
            tab === "posts" ? activeTab : inactiveTab
          }`}
        >
          Posts
        </button>

        {user?.profile?.id === loginUser?.id && (
          <>
            <button
              onClick={() => setTab("saved")}
              className={`px-5 py-3 font-medium transition-colors ${
                tab === "saved" ? activeTab : inactiveTab
              }`}
            >
              Saved
            </button>

            <button
              onClick={() => setTab("liked")}
              className={`px-5 py-3 font-medium transition-colors ${
                tab === "liked" ? activeTab : inactiveTab
              }`}
            >
              Liked
            </button>
          </>
        )}
      </div>

      {/* Content */}
      {tab === "posts" &&
        (user.loading.prompts ? (
          <Spinner />
        ) : (
          <PostGrid posts={user?.prompts} myPost={true} />
        ))}

      {tab === "saved" &&
        (user.loading.saved ? (
          <Spinner />
        ) : (
          <PostGrid posts={user.savedPrompts}  myPost={true} />
        ))}

      {tab === "liked" &&
        (user.loading.liked ? (
          <Spinner />
        ) : (
          <PostGrid posts={user.likedPrompts}  myPost={true} />
        ))}
    </div>
  );
};

export default ProfileTabs;