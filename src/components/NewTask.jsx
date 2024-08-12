import { useState } from "react"

export default function NewTask({onAdd}){
    const [enterdTask, setEnterdTask] =useState("");

    function handleChange(event){
        setEnterdTask(event.target.value);
    }
    function handleClick(){
        onAdd(enterdTask);
        setEnterdTask('');
    }
    return <div className="flex items-center gap-4">
        <input value={enterdTask} type="text" onChange={handleChange} className="h-8 w-64 px-2 py-1 rounded-sm bg-stone-200 focus:outline-0 focus:border-b-2 focus:border-stone-500"/>
        <button onClick={handleClick} className="text-stone-700 hover:text-stone-950">Add Task</button>
    </div>
}