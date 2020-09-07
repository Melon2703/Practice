import React, {useState} from "react";
import styles from './ProfileInfo.module.css';
import ProfileStatusWithHoocks from "../ProfileStatusWithHoocks";
import image from './../../../assets/images/pic_1171831236_1.png'
import ProfileForm from "./ProfileForm";
import cn from "classnames";

const ProfileInfo = (props) => {

    let [isMode, setIsMode] = useState(false);
    console.log(isMode)

    let sendData = (formData) => {
        props.setMyData(formData).then((response) => {
            setIsMode(!isMode)
        });
    }

        let loadFile = (e) => {
            if (e.target.files.length) {
                props.setPhoto(e.target.files[0])
            }
        };

    return (
        <div className={cn(styles.description)}>
                <div className={cn(styles.main_information)}>
                    <div className={cn(styles.photo_and_load)}>
                        <div><img src={props.user.photos.small || image} /></div>
                        {props.isAuth && props.isOwner && (
                        <div>
                            <label htmlFor="files">Изменить изображение</label>
                            <input className={cn(styles)} id="files" type="file" onChange={loadFile}/>
                        </div>
                    )}

                    </div>
                    <div className={cn(styles.userInfo)}>
                        <div className={cn(styles.line)}></div>
                        <div className={cn(styles.status_and_info)}>
                            <ProfileStatusWithHoocks isOwner={props.isOwner} isAuth={props.isAuth} status={props.status} setStatus={props.setStatus} />

                            <div>
                                {isMode && props.isOwner ?  <ProfileForm changeMode={() => setIsMode(!isMode)} initialValues={props.user} user={props.user} onSubmit={sendData}/> :
                                    <ProfileBox isOwner={props.isOwner} isAuth={props.isAuth} changeMode={() => setIsMode(!isMode)} user={props.user}/>}
                        </div>

                        </div>

                    </div>

                </div>

        </div>
    );
};

const ProfileBox = (props) => {
    //
    // let showContacts = (e) => {
    //     let elem = document.getElementsByClassName("profileBox");
    //     elem.querySelector("ul").style.display = 'block';
    // }
    return (
        <div className={cn(styles.profileBox)}>
            <div>
                <b>Информация о пользователе</b>
            </div>
                <span><b>Имя: </b> {props.user.fullName}</span>
                <span><b>В поиске работы: </b> {props.user.lookingForAJob ? `да` : `нет`}</span>
                {props.user.lookingForAJob && (<span><b>Описание работы: </b> {props.user.lookingForAJobDescription} </span>)}
            <div className={cn(styles.contacts)}>
                <b onClick={() => {}}>Контакты</b>
            </div>
                <ul>
                    {Object.keys(props.user.contacts).map(contact => {
                        return <Contact socialPlace={contact} contact={props.user.contacts[contact]}/>
                    })}
                </ul>
                {props.isAuth && props.isOwner ? <button onClick={props.changeMode}>Редактировать</button> : null}

        </div>
    )
}


export const Contact = (props) => {
    return (
        <li>
            <span><b>{props.socialPlace}: </b> {props.contact}</span>
        </li>
    )
}

export default ProfileInfo;