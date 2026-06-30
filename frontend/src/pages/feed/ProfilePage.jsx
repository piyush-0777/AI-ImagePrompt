import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileTabs from "../../components/profile/ProfileTabs";
import PostGrid from "../../components/profile/PostGrid";
import { getUserProfile } from '../../features/user/userThunks'
import MainLayout from "../../layouts/MainLayout";
import Spinner from "../../components/common/Spinner";
import ErrorMessage from "../../components/common/ErrorMessage";



const ProfilePage = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginUser = useSelector((state) => state.auth.user);
    const { id } = useParams();

    useEffect(() => {

        dispatch(getUserProfile(id))
    }, [])
    const user = useSelector((state) => state.user)
   

    const isMyProfile = useMemo(() => {
        return loginUser?.id === user?.profile?.id;
    }, [loginUser, user.profile]);


    return (
        <MainLayout>

        {user?.loading.profile && <Spinner />}

        {user?.error?.profile && <ErrorMessage message={user?.error?.profile} />}

        {!user?.loading?.profile && !user?.error?.profile && 
       <ProfileHeader
                profile={user?.profile}
                isMyProfile={isMyProfile}
            />
            }

            

            {isMyProfile ? (
                <ProfileTabs/>
            ) : (
                <PostGrid  myPost={isMyProfile} />
            )}


        </MainLayout>
    );
};

export default ProfilePage;