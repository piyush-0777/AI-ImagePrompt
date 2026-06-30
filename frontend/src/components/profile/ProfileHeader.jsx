import React, { useState } from "react";
import profileImage from "../../assets/images/profileImage.jpg";
import ProfileEditModal from "./ProfileEditModal";

const ProfileHeader = ({ profile, isMyProfile }) => {

  
    const [ProfileImageUrl, setProfileImageUrl] = useState(() => {
        if (profile?.profile_image?.profile_image) {
            return profile?.profile_image?.profile_image
        } else {
            return profileImage
        }
    })
    console.log('profile ' , profile);
    const [openEdit, setopenEdit] = useState(false)
    const HendalEditProfile = () => {
        setopenEdit(true);
    }
    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden">

            {/* Cover */}
            <div className="h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            <div className="px-8 pb-8">

                {/* Image + Button */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between">

                    <div className="flex flex-col md:flex-row md:items-end gap-6">

                        <img
                            src={ProfileImageUrl}
                            alt="Profile"
                            className="
                                w-36
                                h-36
                                rounded-full
                                object-cover
                                border-4
                                border-white
                                dark:border-zinc-900
                                -mt-16
                                shadow-lg
                            "
                        />

                        <div className="mb-2">

                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                                {profile?.username}
                            </h1>

                            <p className="text-zinc-500 dark:text-zinc-400">
                                {profile?.email}
                            </p>

                        </div>

                    </div>

                    {isMyProfile && (
                        <button
                            onClick={HendalEditProfile}
                            className="
                                mt-6
                                md:mt-0
                                px-6
                                py-2.5
                                rounded-xl
                                bg-indigo-600
                                hover:bg-indigo-700
                                text-white
                                font-semibold
                                transition
                            "
                        >
                            Edit Profile
                        </button>
                    )}

                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">

                    <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-5 text-center">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                            {profile?.post_count || 0}
                        </h2>

                        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
                            Posts
                        </p>
                    </div>

                    

                </div>

                {/* Bio */}
                <div className="mt-8">

                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                        About
                    </h3>

                    <div className="mt-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 p-5">

                        <p className="leading-7 text-zinc-700 dark:text-zinc-300">
                            {profile?.bio || "No bio added yet."}
                        </p>

                    </div>

                </div>

            </div>

            {openEdit && <ProfileEditModal
                open={true}
                onClose={() => setopenEdit(false)}
                profile={profile}
                onSave={() => console.log('save')}
                loading={false}
            />}

        </div>
    );
};

export default ProfileHeader;