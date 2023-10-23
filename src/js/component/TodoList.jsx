import React, { useState, useEffect } from "react";


export const TodoList = () => {

    const [task, setTask] = useState("");
    const [listTask, setListTask] = useState([]);
    const [isActive, setIsActive] = useState(false);


    let base_url = "https://playground.4geeks.com/apis/fake";
    let user_name = "gonzalo";


    const handleTask = (e) => {
        setTask(e.target.value)
    };

    const addTask = (event) => {
        event.preventDefault();
        let newTask = { label: task, done: false }
        let newList = [...listTask, newTask]
        console.log(newList);
        addNewTask(newList);
        setListTask(newList);
        setTask("");
    };


    // 1. define una funcion asincrona que ejecutara el request, -- get 
    const getTodos = async () => {
        // 2. defino la variable con el endpoint
        let url = base_url + '/todos/user/' + user_name;
        // 3. defino el request option
        let options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        // 4. ejecuto el fecth el modo await (espera) y el resultado lo asigno a la variable response
        const response = await fetch(url, options);
        // 5. verifico que la respuesta sea buena o de un error
        if (response.ok) {
            // 5.1.1 si la respuesta es ok obtengo el json del response (body)
            const data = await response.json();
            // 5.1.2 realizo todo lo necesario con los datos obtenidos
            console.log('ok', data);
            setListTask(data);
            setIsActive(true);

        } else {
            // 5.2 hago todo lo necesario por un error en la consulta
            console.log('error', response.status, response.statusText)
        }
    };


    const createAccount = async () => {
        let url = base_url + '/todos/user/' + user_name;
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([])
        };
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            console.log('ok', data);
            getTodos();
            setIsActive(true);

        } else {
            console.log('error', response.status, response.statusText)
        };

    };


    const addNewTask = async (updateList) => {
        let url = base_url + '/todos/user/' + user_name;
        let options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateList)
        };
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            console.log('ok', data);
        } else {
            console.log('error', response.status, response.statusText)
        };
    };


    const deleteAccount = async () => {
        let url = base_url + '/todos/user/' + user_name;
        let options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        };
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setIsActive(false);
            setTask("");
            setListTask([]);

        } else {
            console.log('error', response.status, response.statusText)
        };

    };


    useEffect(() => {
        getTodos();
    }, []);


    return (
        <div className="container">
            <h1>To Do List</h1>
            <div className="paper mb-3">
                <ul className="list-group">
                    <li className="list-group-item">
                        <form onSubmit={addTask}>
                            <input type="text" onChange={handleTask} value={task} className="form-control border-0 text-center" id="exampleText" placeholder="What needs to be done?" />
                        </form>
                    </li>
                    {listTask.map((item, index) =>
                        <li className="list-group-item border border-top-0 text-start box">{item.label}
                            <i className="fas fa-times float-end opacity-50" onClick={() => setListTask(listTask.filter((t, currentIndex) => index != currentIndex))}></i>
                        </li>
                    )}
                    <li className="item text-start opacity-50 ">{listTask.length == 0 ? "No tasks, add a task" : `${listTask.length} item left`}</li>
                </ul>
            </div>
            <button type="button" className="btn btn-info mt-3" onClick={isActive ? deleteAccount : createAccount}>
                {isActive ? "Delete Account" : "Create Account"}
            </button>
        </div>
    )
};