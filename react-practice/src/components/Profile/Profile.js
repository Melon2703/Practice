import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../Common/Preloader/Proloader";

const Profile = (props) => {


    if(!props.user) {
        return (
            <div>
                <Preloader/>
            </div>
        )
    } else {
        return (
            <main>
                <ProfileInfo isAuth={props.isAuth} setPhoto={props.setPhoto} isOwner={props.isOwner} user={props.user}
                             status={props.status} setStatus={props.setStatus} setMyData={props.setMyData}/>

                {props.isAuth && props.isOwner ? <MyPostsContainer/> : null}
            </main>
        );
    }
}

export default Profile;