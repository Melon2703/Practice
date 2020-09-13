import {usersAPI} from "../../API/API";

const SET_USERS = "Users/SET-USERS";
const CHANGE_IS_LOADING = "Users/CHANGE-IS-LOADING";
const SORT_TABLE = "Users/SORT-TABLE";
const SET_USER = "Users/SET-USER";
const CHANGE_CURRENT_PAGE = "Users/CHANGE-CURRENT-PAGE";
const ADD_USER_IN_TABLE = "Users/ADD-USER-IN-TABLE";
const SET_FILTER_USERS = "Users/FILTER-USERS";
const DO_IT_NULL = "Users/DO-IT-NULL";
const CREATE_ERROR = "Users/CREATE-ERROR";
const DELETE_ERROR = "Users/DELETE-ERROR"

const initial = {
    //Количество отображаемых пользователей в таблице
    pageSize: 50,
    //Текущая страниа
    currentPage: 1,
    //Пользователи с сервера
    users: [],
    //Фильтрованные пользователи но основе users +
    filteredUsers: null,
    //Статус фильтрации
    isFiltered: false,
    //Параметр фильрации ( необходим при добавлении пользователя )
    filteredBy: null,
    //Статус загрузки
    isLoading: false,
    //При инициализации и при каждой новой загрузке пользователей (смотреть в thunk) сортировка null,
    // но в момент клика мы меняем его на true (по возрастанию) или на false(убывание).
    sorted: null,
    //Отслеживаем столбец сортировки, если он отличен от того, что стоит в state, то зануляем значение
    // sorted и меняем column
    columnName: null,
    //Количество users/filteredUsers
    totalUsersCount: null,
    //Отображаемый пользователь
    user: null,
    //Отображаемые пользователи на данный момент ( определяются на основе currentPage, pageSize
    // + users ( нет фильтрации ) / filteredUsers ( есть фильтрация )
    showedUsers: null,
    //Ошибка
    error: null
}

const UsersReducer = (state = initial, action) => {
    switch (action.type) {
        //СОхранение пользователей с сервера
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users],
                totalUsersCount: action.users.length,
                showedUsers: [...action.users].filter((item, index) => index < state.pageSize)
            }
        }
        //Изменение статуса загрузки
        case CHANGE_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        //Сортировка таблицы ( showedUsers )
        case SORT_TABLE: {
            //Сортируются сами пользователи, а потом на основе изменившегося state перерисовывается таблица
            // ( в columnName указываем столбец сортровки ( на основе чего сортировать ) )
            let usersCopy = [...state.showedUsers];
            let SortedCopy;
            //Если пытаемся изменить уже существующую сортировку столбца
            if (action.columnName === state.columnName) {
                if (!state.sorted) {
                    usersCopy.sort((user1, user2) => {
                        if (user1[action.columnName] > user2[action.columnName]) return 1;
                        if (user1[action.columnName] === user2[action.columnName]) return 0;
                        if (user1[action.columnName] < user2[action.columnName]) return -1;
                    })
                    SortedCopy = true;
                } else {
                    usersCopy.reverse();
                    SortedCopy = false;
                }
            }
            //Если сортируем впервые или новый столбец
            else {
                usersCopy.sort((user1, user2) => {
                    if (user1[action.columnName] > user2[action.columnName]) return 1;
                    if (user1[action.columnName] === user2[action.columnName]) return 0;
                    if (user1[action.columnName] < user2[action.columnName]) return -1;
                })
                SortedCopy = true;
            }
            return {
                ...state,
                showedUsers: usersCopy,
                sorted: SortedCopy,
                columnName: action.columnName
            }

        }
        //Определяем пользователя для отображения
        case SET_USER: {
            return {
                ...state,
                user: state.showedUsers.find((item, id) => id === action.id)
            }
        }
        //Изменение страницы
        case CHANGE_CURRENT_PAGE: {
            //Если фильтрации нет, то определяем showedUsers по users
            if (!state.isFiltered) {
                return {
                    ...state,
                    sorted: null,
                    currentPage: action.currentPage,
                    columnName: null,
                    showedUsers: state.users.filter((item, id) => (id >= (action.currentPage - 1) * state.pageSize) && (id <= action.currentPage * state.pageSize - 1))
                }
            }
            //Если фильтрация есть, то определяем showedUsers по filteredUsers
            else {
                return {
                    ...state,
                    sorted: null,
                    currentPage: action.currentPage,
                    columnName: null,
                    showedUsers: state.filteredUsers.filter((item, id) => (id >= (action.currentPage - 1) * state.pageSize) && (id <= action.currentPage * state.pageSize - 1))
                }
            }

        }
        //Добавление пользователя в таблицу
        case ADD_USER_IN_TABLE: {
            let copyOfUsers = [...state.users];
            copyOfUsers.unshift(action.user);
            //Если филитрация осутствует, то добавляем только в users
            if (!state.isFiltered) {
                return {
                    ...state,
                    totalUsersCount: ++state.totalUsersCount,
                    users: copyOfUsers,
                    showedUsers: copyOfUsers.filter((item, id) => (id >= (state.currentPage - 1) * state.pageSize) && (id <= state.currentPage * state.pageSize - 1))
                }
            }
            //Если есть фильтрация и новый пользователь подходит под фильтр, то добавлем в users и filteredUsers
            else if (state.isFiltered && (action.user.id + action.user.lastName + action.user.firstName + action.user.email + action.user.phone).includes(state.filteredBy)) {
                let copyOfFiltredUsers = [...state.filteredUsers];
                copyOfFiltredUsers.unshift(action.user);
                return {
                    ...state,
                    totalUsersCount: ++state.totalUsersCount,
                    users: copyOfUsers,
                    filteredUsers: copyOfFiltredUsers,
                    showedUsers: copyOfFiltredUsers.filter((item, id) => (id >= (state.currentPage - 1) * state.pageSize) && (id <= state.currentPage * state.pageSize - 1))
                }
            }
            //Если есть фильтрация и новый пользователь не подходит под фильтр, то добавлем только в users
            else {
                return {
                    ...state,
                    users: copyOfUsers,
                    filteredUsers: [...state.filteredUsers],
                    showedUsers: [...state.filteredUsers].filter((item, id) => (id >= (state.currentPage - 1) * state.pageSize) && (id <= state.currentPage * state.pageSize - 1))
                }
            }
        }
        //Фильтрация пользователей
        case SET_FILTER_USERS: {
            //Пришли параметры фильтрации
            if (action.filterOps) {
                let filtered = state.users.filter(item => (item.id + item.lastName + item.firstName + item.email + item.phone).includes(action.filterOps));
                return {
                    ...state,
                    filteredUsers: filtered,
                    currentPage: 1,
                    showedUsers: filtered.filter((item, index) => index < state.pageSize),
                    totalUsersCount: filtered.length,
                    isFiltered: true,
                    filteredBy: action.filterOps
                }
            } else {
                //Сброс фильтрации
                if (state.isFiltered) {
                    return {
                        ...state,
                        currentPage: 1,
                        totalUsersCount: state.users.length,
                        showedUsers: state.users.filter((item, index) => index < state.pageSize),
                        isFiltered: false,
                        filteredUsers: null,
                        filteredBy: null
                    }
                } else {
                    return state;
                }
            }
        }
        //Зануление после загрузки новых пользователей ( или при ошибке )
        case DO_IT_NULL: {
            return {
                ...state,
                users: [],
                filteredUsers: null,
                isFiltered: false,
                filteredBy: null,
                sorted: null,
                columnName: null,
                totalUsersCount: null,
                user: null,
                showedUsers: null
            }
        }
        //Создание ошибке после
        case CREATE_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        //Пользователь увидел ошибку, нажал ОК -> удаление ошибки
        case DELETE_ERROR: {
            return {
                ...state,
                error: null
            }
        }
        default:
            return state;
    }
}

export const setFilterUsers = (filterOps) => {
    return {
        type: SET_FILTER_USERS,
        filterOps
    }
}

export const addUserInTable = (user) => {
    return {
        type: ADD_USER_IN_TABLE,
        user
    }
}

export const changeCurrentPage = (currentPage) => {
    return {
        type: CHANGE_CURRENT_PAGE,
        currentPage
    }
}

export const setUser = (id) => {
    return {
        type: SET_USER,
        id
    }
}

export const sortTable = (columnName) => {
    return {
        type: SORT_TABLE,
        //columnName - столбец сортировки
        columnName
    }
}

const changeIsLoadingAC = (isLoading) => {
    return {
        type: CHANGE_IS_LOADING,
        isLoading
    }
}

const setUsersAC = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

const DoItNull = () => {
    return {
        type: DO_IT_NULL
    }
}

export const createERROR = (error) => {
    return {
        type: CREATE_ERROR,
        error
    }
}

export const deleteERROR = () => {
    return {
        type: DELETE_ERROR
    }
}

export const getUsers = (method) => {
    return async (dispatch) => {
        dispatch(changeIsLoadingAC(true));
        dispatch(changeCurrentPage(1));
        dispatch(DoItNull());
        method().then(response => {
            if (response.statusText === "OK") {
                dispatch(setUsersAC(response.data));
                dispatch(changeIsLoadingAC(false));
            } else {
                throw new Error();
            }
        }).catch(error => {
            dispatch(createERROR("ТЕХНИЧЕСКИЕ НЕПОЛАДКИ. ПРИНОСИМ СВОИ ИЗВИНЕНИЯ. ПОЖАЛУЙСТА, НАЖМИТЕ НА КНОПКУ НИЖЕ И ПОПРОБАЙТЕ СНОВА."));
            dispatch(changeIsLoadingAC(false));
            return "Error";
        });
    }
}

export const getSmallUsers = () => {
    return getUsers(usersAPI.getSmallData);
}

export const getLargeUsers = () => {
    return getUsers(usersAPI.getLargeData);
}


export default UsersReducer;