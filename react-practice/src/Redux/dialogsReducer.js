const ADD_MESSAGE = `dialogs/ADD-MESSAGE`;

let initialState = {
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
    };

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = {
                id: state.messagesData.length + 1, text: action.message
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
            };
        }
        default: return state;

    }

}

export const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        message
    }
}


export default dialogsReducer;
