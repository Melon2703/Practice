import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "7a4475d9-bbe8-49bd-9ca1-2d9462c93288"
    },
    baseURL: `https://social-network.samuraijs.com/api/1.0/`
});

//Запросы на сервер, связанные с веткой users
export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },

    deleteFollowing(id) {
        return instance.delete(`follow/${id}`)
    },

    follow(id) {
        return instance.post(`follow/${id}`)
    },

    getFollowing(id) {
        return instance.get(`follow/${id}`)
    }
}

//Запросы на сервер, связанные с веткой profile
export const profileAPI = {
    setUser(id) {
        return instance.get(`profile/${id}`).then(response => response.data);
    },

    getStatus(id) {
        return instance.get(`profile/status/${id}`);
    },

    setStatus(status) {
        return instance.put(`profile/status`, {
            status
        });
    },

    loadPhoto(photoFile) {
        let formData = new FormData();
        formData.append(`image`, photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': `multipart/form/data`
            }
        })
    },

    changeMyData(myData) {
        return instance.put(`profile`, Object.assign({AboutMe: `1`}, myData));
    }

}

//Запросы на сервер, связанные с веткой auth
export const AuthAPI = {
    logIn() {
        return instance.get(`auth/me`).then(response => response.data);
    },

    getLogIn(logData) {
        return instance.post(`/auth/login`, logData)
    },
    getLogOut() {
        return instance.delete(`/auth/login`)
    },

    getCaptcha() {
        return instance.get(`/security/get-captcha-url`).then(response => response.data.url)
    }

}


