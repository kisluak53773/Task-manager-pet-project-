"use client"

import { useState,useCallback } from "react"
import {AiOutlineDelete} from "react-icons/ai"
import EditModal from "./EditModal"
import { useDispatch } from "react-redux"
import { destroyTask,getUserWithTask } from "@/app/redux/features/taskSlice"
import { fetchTasksByProjectId } from "@/app/redux/features/taskSlice"

export default function Task({task,role,projectId}) {
  const [isEditActive,setIsEditActive] = useState(false);
  const dispatch=useDispatch()

  const handleClick=useCallback(()=>{
    setIsEditActive(true)
    dispatch(getUserWithTask({task}))
  },[isEditActive])

  const handleDelete=useCallback(()=>{
    dispatch(destroyTask({id:task.id})).then( () => {
      dispatch(fetchTasksByProjectId({projectId}))
    })
  },[task]);

  return (
    <>
    <EditModal task={task} isEditActive={isEditActive} role={role} projectId={projectId} setIsEditActive={setIsEditActive}/>
    <div onClick={handleClick} className="tasks__item">
        <div className="tasks__item-title">
          <h1>{task.name}</h1>
          {role==="ADMIN" && <AiOutlineDelete onClick={handleDelete} size="2rem" className="tasks__item-title-deleteSign"/>}
        </div>
        <p>{task.description}</p>
        <p className="tasks__item-status">Статус: {task.status}</p>
    </div>
    </>
  )
}
