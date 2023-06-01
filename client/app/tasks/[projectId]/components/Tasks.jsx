"use client"

import { useDispatch, useSelector } from "react-redux"
import { getAllTasks,fetchTasksByProjectId } from "@/app/redux/features/taskSlice"
import { useEffect, useState,useCallback,useMemo } from "react"
import { getUser } from "@/app/redux/features/userSlice"
import Task from "./Task"
import AddModal from "./AddModal"

export default function Tasks({projectId}) {
    const dispatch=useDispatch()
    const tasks=useSelector(getAllTasks)
    const role=useSelector(getUser).role
    const[isAddActive,setIsAddActive] = useState(false);
    const filteredTasks=useMemo(()=>tasks.filter(task =>task.projectId === Number(projectId)),[tasks])

    useEffect(()=>{
        dispatch(fetchTasksByProjectId({projectId}))
    },[dispatch,projectId])

    const handleClick=useCallback(()=>{
        setIsAddActive(true);
    },[isAddActive])
    
  return (
    <section className="tasks">
        <AddModal isAddActive={isAddActive} setIsAddActive={setIsAddActive} projectId={projectId}/>
        <h1>Задачи</h1>
        {filteredTasks.length>0  ? filteredTasks.map((task)=>{
            return <Task key={task.id} role={role} task={task} />
        }) : (
            <h1>Задачи отсутствуют</h1>
        )}
        {role ==="ADMIN" && <button onClick={handleClick} className="tasks__button">Добавить новую задачу</button>}
    </section>
  )
}
