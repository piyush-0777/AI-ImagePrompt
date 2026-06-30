import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate ,useParams } from "react-router-dom";
import {
  Heart,
  Bookmark,
  Copy,
  User,
  Calendar,
  ArrowLeft ,
  Check,
} from "lucide-react";

import { getPromptDetail } from "../../features/prompt/promptThunks";
import Spinner from "../common/Spinner";
import ErrorMessage from "../common/ErrorMessage";
import { likePrompt , unlikePrompt   } from "../../features/like/likeThunks";
import {savePrompt , removeSave} from "../../features/save/saveThunks"
import {resetLoadingState} from "../../features/like/likeSlice"
import {getLikeorSavePrompt} from "../../features/like/likeThunks"



function PromptDetealCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { currentPrompt, loading, error } = useSelector(
    (state) => state.prompt
  );
  const LikeLoadingState = useSelector((state) => state.like);
  const SaveDetail = useSelector((state)=> state.save)
  const loginUser = useSelector((state) => state.auth.user);
  const [isCopyText , setisCopyText] = useState(false);



  useEffect(() => {
    dispatch(getPromptDetail(id));
    dispatch(getLikeorSavePrompt(id))
  }, [dispatch, id]);

  useEffect(()=>{
    if(LikeLoadingState.success == true) {
      resetLoadingState();
    }
  }, [])


  //for like and unlike

  const HendleLkieClick= async () =>{
    if(loginUser == null) {
      alert('login first');
    } else {
      if(LikeLoadingState.isLike == true) {
        await dispatch(unlikePrompt(currentPrompt.prompt.id))
        
      } else {
     await dispatch(likePrompt(currentPrompt.prompt.id))
     
      }
    }
  }

  //for save and unsave

   const HendleSaveClick= async () =>{

     if(loginUser == null) {
      alert('login first');
    } else {
      
      if(SaveDetail.isSave == true) {
        await dispatch(removeSave(currentPrompt.prompt.id))
        
      } else {
     await dispatch(savePrompt(currentPrompt.prompt.id))
      
      }
    }
  }


  // control copyPrompt text
 const copyPrompt = () => {
    navigator.clipboard.writeText(prompt.prompt_text);
    setisCopyText(true);
    setTimeout(()=>{
      setisCopyText(false);
    } , 2000);
  };

if (!currentPrompt) return null;

  const { prompt, user } = currentPrompt;
  const goToUserProfile = ()=>{
    navigate(`/profile/${user.id}`);
  }

  if (loading.currentPrompt) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spinner />
      </div>
    );
  }

  if (error.currentPrompt) {
    return (
      <div className="mt-10">
        <ErrorMessage message={error.currentPrompt} />
      </div>
    );
  }

  

 

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="max-w-7xl mx-auto px-4 py-6">
  <button
    onClick={() => navigate(-1)}
    className="mb-6 inline-flex items-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
  >
    <ArrowLeft size={18} />
    Back
  </button>

  {/* Your existing card */}
  <div
    className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
  >
    {/* Rest of your component */}
  </div>
</div>
      <div
        className="
        bg-white
        dark:bg-zinc-900
        rounded-3xl
        shadow-xl
        overflow-hidden
        border
        border-zinc-200
        dark:border-zinc-800
      "
      >
        <div className="grid lg:grid-cols-2">
          {/* IMAGE */}

          <div className="bg-zinc-100 dark:bg-zinc-950">
            <img
              src={prompt.image_url.prompt_image}
              alt={prompt.title}
              className="w-full h-full object-cover min-h-[500px]"
            />
          </div>

          {/* CONTENT */}

          <div className="p-8 flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
                {prompt.title}
              </h1>
            </div>

            {/* USER */}

            <div className="flex items-center gap-4">
              {user?.profile_image?.profile_image ? (
                <img
                  src={user?.profile_image?.profile_image}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center">
                  <User className="text-white" />
                </div>
              )}

              <div>
                <h3 onClick={goToUserProfile} className="font-semibold text-lg text-zinc-900 dark:text-white hover:cursor-pointer">
                  @{user.username}
                </h3>

                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Calendar size={15} />

                  {new Date(prompt.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* STATS */}

            <div className="flex gap-8">
              <div className={`flex items-center gap-2 hover:cursor-pointer 
              ${LikeLoadingState.loading.like == true || LikeLoadingState.loading.unlike == true ? 'pointer-events-none': 'pointer-events-auto'}`}
              onClick={HendleLkieClick}
              >
                <Heart
                  className={`text-red-500 ${LikeLoadingState.isLike==true ? 'fill-red-500':''}`}
                  size={22}
                  
                />
                <span className="font-semibold  text-zinc-800 dark:text-white"
                >
                  {LikeLoadingState.likesCount}
                </span>
              </div>

              <div className={`flex items-center gap-2 hover:cursor-pointer
              ${SaveDetail.loading.save == true || SaveDetail.loading.remove == true ? 'pointer-events-none': 'pointer-events-auto'}
              `}
               onClick={HendleSaveClick}
              >
                <Bookmark
                  className={`"text-blue-500" ${SaveDetail.isSave== true ? 'fill-blue-500':''}`}
                  size={22}
                />
                <span className="font-semibold text-zinc-800 dark:text-white">
                  {SaveDetail.saveCount}
                </span>
              </div>
            </div>

            {/* PROMPT */}

            <div>
              <h2 className="font-semibold text-xl mb-3 dark:text-white">
                Prompt
              </h2>

              <div
                className="
                bg-zinc-950
                  text-zinc-100
                  rounded-xl
                  p-5
                  max-h-[400px]
                  overflow-y-auto
                  scroll-smooth
                  whitespace-pre-wrap
                  break-words
                  font-mono
                  text-sm
                  md:text-base
                  leading-7
                  border border-zinc-700
                  shadow-inner

                  scrollbar-thin
                  scrollbar-thumb-zinc-400
                  dark:scrollbar-thumb-zinc-600
                  scrollbar-track-transparent
  "
              >
                {prompt.prompt_text}
              </div>
            </div>

            {/* BUTTON */}

            <button
              onClick={copyPrompt}
              className="
              mt-auto
              flex
              items-center
              justify-center
              gap-2
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              py-3
              rounded-xl
              font-semibold
              transition
            "
            >
              {isCopyText == true ? <Check size={18}/>:<Copy size={18} />}
              Copy Prompt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptDetealCard;