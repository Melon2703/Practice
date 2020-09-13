import React, {useState} from 'react';
import './App.scss';
import InfoAboutUser from "../InfoAboutUser/InfoAboutUser";
import Preloader from "../Preloader/Preloader";
import Paginator from "../Paginator/Paginator";
import Table from "../Table/Table";
import {FormForFilter} from "../Forms/FormForFilter/FormForFilter";
import {FormForAdding} from "../Forms/FormForAdding/FormForAdding";

function App(props) {

    let onSubmitFilter = (formData) => {
        props.setFilterUsers(formData.filterOps);
    }
    let onSubmitAdding = (formData) => {
        props.addUserInTable(formData);
    }

    let [adding, setAdding] = useState(false);

    return (
        <div className="App">
            <header className="App-header">

                <h1>ТЕСТОВОЕ ЗАДАНИЕ</h1>
            </header>
            <div>
                <button disabled={props.isLoading} onClick={props.getSmallData}>Маленькая таблица</button>
                <button disabled={props.isLoading} onClick={props.getLargeData}>Большая таблица</button>
            </div>
            <main>
                {props.isLoading && <Preloader/>}
                <div>
                    {props.Users &&
                    <div>
                        <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                                   currentPage={props.currentPage} isFiltered={props.isFiltered}
                                   changeCurrentPage={props.changeCurrentPage} portionSize={5}/>
                        <button onClick={() => setAdding(!adding)}>Добавить</button>
                        {adding &&
                        <div>
                            <FormForAdding onSubmit={onSubmitAdding}/>
                        </div>
                        }
                        <FormForFilter onSubmit={onSubmitFilter}/>
                        <Table columnName={props.columnName} Users={props.Users} isLoading={props.isLoading}
                               currentPage={props.currentPage}
                               sortTable={props.sortTable} setUser={props.setUser} pageSize={props.pageSize}
                               sorted={props.sorted}/>
                        {props.User && <InfoAboutUser User={props.User}/>}
                    </div>
                    }
                </div>
            </main>
        </div>
    );
}

export default App;
