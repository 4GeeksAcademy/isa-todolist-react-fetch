import React, { useState, useEffect } from "react";

const TodoList = () => {
    const [task, setTask] = useState("");
    const [newTask, setNewTask] = useState([]);

    // Al iniciar el componente, quiero cargar las tareas guardadas en localStorage
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setNewTask(storedTasks);
    }, []);

    // Cada vez que cambie newTask, lo guardo en localStorage para que no se pierda
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(newTask));
    }, [newTask]);

    const handleSubmit = (e) => { 
        if (e.key === "Enter") {
            if (task.trim()) {
                setNewTask([...newTask, task]);
                setTask('');
            }
        }
    };
    
    const deleteItem = (index) => {
        setNewTask(newTask.filter((_, i) => i !== index));
    };

    // Esta función es para obtener tareas de una API, si es que quiero implementarla
    const fetchTasks = async () => {
        try {
            const response = await fetch("https://api.example.com/tasks");
            const data = await response.json();
            setNewTask(data.tasks); // Asumiendo que la API devuelve un objeto con un array de tareas
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Llamo a fetchTasks cuando el componente se monta para cargar tareas de la API
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div style={{width: "500px", margin:"auto"}}>
            <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>TODO LIST ISA</h1> 
            <ul className="list-group ">
                <input 
                    type="text" 
                    value={task} 
                    onKeyDown={handleSubmit} 
                    onChange={(e) => setTask(e.target.value)} 
                    placeholder={task === "" ? "Escribe tu Tarea" : task} 
                />
                {newTask.map((item, index) => (  
                    <li 
                        className="list list-group-item list-group-item-light text-start" 
                        key={index} 
                        style={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                        {item}
                        <button 
                            className="btn btn-sm delete-button"
                            onClick={() => deleteItem(index)}
                        >
                            x
                        </button>
                    </li>
                ))}
                <li 
                    className="count list-group-item text-start"
                    style={{color: "gray"}}
                >
                    {newTask.length} items left
                </li>
            </ul>
        </div>
    );
};

export default TodoList;