import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ImageUpload from "./ImageUpload";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import { useSelector , useDispatch } from "react-redux";
import { updateUserProfile } from "../../features/user/userThunks";
import { toast } from "react-toastify";

import { clearUserState } from "../../features/user/userSlice";

const ProfileEditModal = ({
    open,
    onClose,
    profile,
    onSave,
   
}) => {
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user)
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [preview, setPreview] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (!profile) return;

        setUsername(profile.username || "");
        setBio(profile.bio || "");
        console.log(profile?.profile_image?.profile_image);
        setPreview(profile?.profile_image?.profile_image || "");
        setImage(null);
    }, [profile]);

    useEffect(() => {
    console.log("preview state:", preview);
}, [preview]);
    console.log(preview);

    useEffect(() => {
        const esc = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (open) {
            document.addEventListener("keydown", esc);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", esc);
            document.body.style.overflow = "auto";
        };
    }, [open]);

    if (!open) return null;

    
useEffect(()=> {
if(user.complate.update == true) {
    console.log(user.complate.update)
    toast.done('profile updated successfuly');
    dispatch(clearUserState());
    onClose();

}

},[user.complate.update , user.complate])


    function submit(e) {
        e.preventDefault();

        const data = new URLSearchParams()
        data.append('username' , username);
        data.append('bio', bio);
        console.log(data);
        dispatch(updateUserProfile({userId:profile.id , data:data}));
    }

    return (
        <div
            onClick={onClose}
            className="
            fixed
            inset-0
            z-[999]
            bg-black/40
            backdrop-blur-md
            flex
            items-center
            justify-center
            p-4
            animate-fadeIn
        "
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
                w-full
                max-w-lg
                rounded-3xl
                bg-white
                dark:bg-zinc-900
                border
                border-zinc-200
                dark:border-zinc-800
                shadow-2xl
                overflow-hidden
                animate-scaleIn
            "
            >
                <div
                    className="
                    flex
                    items-center
                    justify-between
                    px-6
                    py-5
                    border-b
                    border-zinc-200
                    dark:border-zinc-800
                "
                >
                    <h2
                        className="
                        text-xl
                        font-bold
                        text-zinc-900
                        dark:text-white
                    "
                    >
                        Edit Profile
                    </h2>

                    <button
                        onClick={onClose}
                        className="
                        p-2
                        rounded-full
                        hover:bg-zinc-100
                        dark:hover:bg-zinc-800
                    "
                    >
                        <X size={22} />
                    </button>
                </div>

                <form
                    onSubmit={submit}
                    className="p-6 space-y-6"
                >
                    <ImageUpload
                        preview={preview}
                    />

                    <InputField
                        label="Username"
                        value={username}
                        onChange={setUsername}
                    />

                    <TextareaField
                        label="Bio"
                        value={bio}
                        onChange={setBio}
                    />

                    <div className="flex gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="
                            flex-1
                            py-3
                            rounded-xl
                            font-semibold
                            border
                            border-zinc-300
                            dark:border-zinc-700
                            hover:bg-zinc-100
                            dark:hover:bg-zinc-800
                        "
                        >
                            Cancel
                        </button>

                        <button
                            disabled={user.loading.update}
                            className={`
                            flex-1
                            py-3
                            rounded-xl
                            bg-gradient-to-r
                            from-blue-500
                            to-indigo-600
                            text-white
                            font-semibold
                            hover:opacity-90
                            disabled:opacity-50
                            ${user.loading.update ? 'pointer-events-none' : 'pointer-events-auto'}
                            `}
                        
                        >
                            {user.loading.update ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProfileEditModal;