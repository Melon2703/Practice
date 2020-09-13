import React from "react";
import TestRenderer from 'react-test-renderer';
import APPContainer from "./APPContainer";
import {Provider} from "react-redux";
import store from "../../Redux/Store";
import {createERROR, getUsers} from "../../Redux/Reducers/UsersReducer";
import App from "./App";

describe(`all tests of APP`, () => {

        test(`does APP shows table ? (if we have Users)`, () => {
            //На основе массива пользователей проверяю, появилась ли таблица
            let users = [{
                id: 479,
                firstName: "Haidi",
                lastName: "Heppelmann",
                email: "JLeeman@morbi.ly",
                phone: "(270)854-7624",
                address: {streetAddress: "9678 Ac Rd", city: "Manchester", state: "TN", zip: "88875"},
                description: "vitae ac rutrum vitae nec vel vitae in tincidunt tincidunt magna rutrum aliquam convallis sollicitudin pulvinar dui dui convallis at nunc egestas tempor aliquam aliquam egestas augue sit sit egestas lectus amet"
            }];
            const APP = TestRenderer.create(
                <Provider store={store}>
                    <App Users={users}/>
                </Provider>
            );
            const root = APP.root;
            const table = root.findByType(`table`);
            expect(table).toBeTruthy();
        })

        test(`Fake request`, () => {
            //Делаем фейковый запрос пользователей, который возвращает Error ( вручную прописл Promise с reject )
            let fakeMethod = () => {
                return getUsers(() => new Promise(function (resolve, reject) {
                        reject(new Error("ERROR"));
                    })
                )
            }
            store.dispatch(fakeMethod()).catch(response => {
                expect(store.getState().Users.error).toBeTruthy();
            });
        })

        test(`does the h2 of APPContainer contains error ?`, () => {
            //Вручную добавляю ошибку в Store и проверяю, отрисовалась ли она
            store.dispatch(createERROR("SOME ERROR"));
            const APPCont = TestRenderer.create(
                <Provider store={store}>
                    <APPContainer/>
                </Provider>
            );
            const root = APPCont.root;
            const h2 = root.findByType(`h2`);
            expect(h2.children[0]).toBe(`SOME ERROR`);
        })
    }
)