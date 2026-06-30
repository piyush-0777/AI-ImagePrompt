import { Camera } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { uploadProfileImage } from "../../features/user/userThunks";
import { useState } from "react";
import { toast } from "react-toastify";


 const ImageUpload = ({ preview }) =>{

    const disatch = useDispatch() 
    const [image , setimage] = useState(null);
    const imgStatus = useSelector(state => state.user)
    const [imgPreview , setimgPreview] = useState('');
    console.log(imgPreview);
    function handleChange(e) {
        const file = e.target.files?.[0];
        if (file) {
            // onChange(file);
            setimage(file);
            setimgPreview(URL.createObjectURL(file));
        }
    }

    const UploadImg = () => {
        const data = new FormData();
        if(image === null) {
            toast.error("add profile image");
        } else {
        data.append('image' , image)
        disatch(uploadProfileImage(data))
        }
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative group">
                <img
                    src={
                        imgPreview || preview ||
                        "https://placehold.co/200x200?text=Profile"
                    }
                    alt="Profile"
                    className="
                        w-32
                        h-32
                        rounded-full
                        object-cover
                        border-4
                        border-white
                        dark:border-zinc-800
                        shadow-lg
                    "
                />

                <label
                    className="
                        absolute
                        inset-0
                        rounded-full
                        bg-black/40
                        opacity-0
                        group-hover:opacity-100
                        transition
                        cursor-pointer
                        flex
                        items-center
                        justify-center
                    "
                >
                    <Camera className="text-white" size={30} />

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleChange}
                    />
                </label>
            </div>

            <label
            
            onClick={UploadImg}
                className={`
                    text-sm
                    text-blue-600
                    dark:text-blue-400
                    cursor-pointer
                    hover:underline
                    font-medium
                    ${imgStatus.loading.updateImg == true ? 'pointer-events-none' : 'pointer-events-auto'}
                `}
            >
                {imgStatus.loading.updateImg == true ? 'loading....' : 'change profile photo' }
                

                {/* <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                /> */}
            </label>
        </div>
    );
}

export default ImageUpload;