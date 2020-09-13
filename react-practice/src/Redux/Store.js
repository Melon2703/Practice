import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

let store = {
    _state: {
        dialogsPage: {
            dialogsData: [
                {id: 1, name: `Oleg`},
                {id: 2, name: `Dima`},
                {id: 3, name: `Pasha`},
                {id: 4, name: `Kristina`}
            ],

            messagesData: [
                {id: 1, text: `Hi`},
                {id: 2, text: `How are you ?`},
                {id: 3, text: `Oke`},
            ],
            newMessage: ``,
        },

        profilePage: {
            postsData: [
                {id: 1, message: `It is my first React-project!`, like_counts: 15},
                {id: 2, message: `Oh, it is cool!`, like_counts: 25},
                {id: 3, message: `Let's do smth new`, like_counts: 20},
                {id: 4, message: `It is interesting)`, like_counts: 5},
                {id: 5, message: `Really`, like_counts: 8}
            ],
            newPostText: ``,
        },

        friendsPage: {
            mainFriend: {},

            prev_Friends: [
                {id: 1, name: `Andrew`},
                {id: 2, name: `Sasha`},
                {id: 3, name: `Sveta`},
            ]
        }
    },
    get getState() {
        return this._state;
    },

    _render() {
    },

    subscribe(observer) {
        this._render = observer;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._render(this);

    },

};


window.store = store;