
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import TagSelector from "./TagSelector";
import ImageUpload from "./ImageUpload";
import { useSelector, useDispatch } from "react-redux";
import {
  createPrompt,
  updatePrompt,
} from "../../features/prompt/promptThunks";
import { clearPromptErrorsAndLoading } from "../../features/prompt/promptSlice";
import toast from "react-hot-toast";

const CreatePromptCard = ({ mod = "create", Promptdata }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const promptDetail = useSelector((state) => state.prompt);

  const isUpdate = mod === "update";

  const [formData, setFormData] = useState(() => {
    if (isUpdate && Promptdata) {
      return {
        title: Promptdata.title || "",
        prompt_text: Promptdata.prompt_text || "",
        tagIds: Promptdata.tagIds || [],
        image: Promptdata?.image_url?.prompt_image || null,
      };
    }

    return {
      title: "",
      prompt_text: "",
      tagIds: [],
      image: null,
    };
  });

  const loading = isUpdate
    ? promptDetail.loading.update
    : promptDetail.loading.create;

  useEffect(() => {
    if (promptDetail?.complate?.create) {
      dispatch(clearPromptErrorsAndLoading());
      toast.success("Prompt created successfully!");
      navigate("/");
    }

    if (promptDetail?.complate?.update) {
      dispatch(clearPromptErrorsAndLoading());
      toast.success("Prompt updated successfully!");
      navigate("/");
    }
  }, [
    promptDetail?.complate?.create,
    promptDetail?.complate?.update,
    dispatch,
    navigate,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return toast.error("Enter title");
    }

    if (!formData.prompt_text.trim()) {
      return toast.error("Prompt text is required");
    }

    if (!formData.image) {
      return toast.error("Image is required");
    }

    if (formData.tagIds.length === 0) {
      return toast.error("Must add one tag");
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append("prompt_text", formData.prompt_text);
    data.append("image", formData.image);
    data.append("tagIds", JSON.stringify(formData.tagIds));

    if (isUpdate) {
      dispatch(
        updatePrompt({
          promptId: Promptdata.id,
          data,
        })
      );
    } else {
      dispatch(createPrompt(data));
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 dark:bg-zinc-950/80 flex justify-center items-center p-5">
        <div className="w-full max-w-11/12 bg-white dark:bg-zinc-900/55 rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            {isUpdate ? "Update Prompt" : "Create Prompt"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />

            <ImageUpload
            isUpdate = {isUpdate}
              image={formData.image}
              setImage={(file) =>
                setFormData({
                  ...formData,
                  image: file,
                })
              }
            />

            <TextareaField
              label="Prompt Text"
              value={formData.prompt_text}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  prompt_text: e.target.value,
                })
              }
            />

            {!isUpdate && <TagSelector
              selectedTags={formData.tagIds}
              setSelectedTags={(tags) =>
                setFormData({
                  ...formData,
                  tagIds: tags,
                })
              }
            />}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold ${
                loading
                  ? "pointer-events-none opacity-70"
                  : "pointer-events-auto"
              }`}
            >
              {loading
                ? isUpdate
                  ? "Updating..."
                  : "Saving..."
                : isUpdate
                ? "Update Prompt"
                : "Create Prompt"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePromptCard;

