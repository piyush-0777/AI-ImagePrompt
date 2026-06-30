import { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { getTags } from "../../features/tag/tagThunks";
import Spinner from "../common/Spinner";


const TagSelector=({
  selectedTags,
  setSelectedTags,
}) => {
const dispatch = useDispatch()
const tag = useSelector((state)=>state.tag);

  const toggleTag = (id) => {
    if (selectedTags.includes(id)) {
      setSelectedTags(
        selectedTags.filter((tag) => tag !== id)
      );
    } else {
      setSelectedTags([...selectedTags, id]);
    }
  };
  useEffect(()=>{
    dispatch(getTags());
  },[])

  return (
    <div>
    <label className="block mb-2 text-gray-700 dark:text-gray-300">
      Tags
    </label>
    {tag?.loading?.list && <Spinner/>}
    {!tag?.loading?.list && <div className="max-h-40 overflow-y-auto rounded-lg border border-gray-200 dark:bg-zinc-800/75 p-2">
      <div className="flex flex-wrap gap-2 m-1">
        {tag?.tags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => toggleTag(tag.id)}
            className={`px-3 py-2 rounded-lg border transition ${
              selectedTags.includes(tag.id)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>}
  </div>
  );
}

export default TagSelector;