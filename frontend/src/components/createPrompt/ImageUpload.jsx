import { Upload } from "lucide-react";
import { useRef } from "react";

const ImageUpload=({isUpdate , image, setImage, })=> {

    const inputRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
  };

  const imgUrl =
    image instanceof File
      ? URL.createObjectURL(image)
      : image;

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="hidden"
      />

      <div
        onClick={() => inputRef.current.click()}
        className="
          relative h-90 w-full cursor-pointer overflow-hidden rounded-3xl
          border-2 border-dashed border-gray-300 bg-gray-50
          dark:border-slate-700 dark:bg-zinc-800/75
          hover:border-indigo-500 dark:hover:border-indigo-400
          transition-all duration-300
        "
      >
        {image ? (
          <img
            src={imgUrl}
            alt="preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <div className="rounded-full bg-indigo-100 p-4 dark:bg-slate-800">
              <Upload className="text-indigo-600 dark:text-indigo-400" />
            </div>

            <p className="text-gray-500 dark:text-slate-400">
              Click to upload prompt image
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default ImageUpload;