"use client"

import { useState,useCallback } from "react";
import {RxCrossCircled} from "react-icons/rx"
import Select from 'react-select'
import ProgressBar from "./ProgressBar"; 
import Timer from "./Timer";
import { modifyTask,getAppointedUser,dismiss } from "@/app/redux/features/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers,getUser } from "@/app/redux/features/userSlice";
import DropdownItem from "./DropdownItem";
import Image from "next/image";
import { REACT_APP_API_URL,TASK_OPTIONS } from "@/app/constants"; 

  

export default function EditModal({task,isEditActive,setIsEditActive,role}) {
    const [progress,setProgress]=useState(task.progress);
    const [status,setStatus]=useState(task.status);
    const [name,setName]=useState(task.name);
    const [description,setDescription]=useState(task.description);
    const dispatch=useDispatch()
    const [dropdown,setDropdown]=useState(false)
    const users=useSelector(getAllUsers)
    const appointedUser=useSelector(getAppointedUser)
    const user=useSelector(getUser)
    const src=useCallback(()=>REACT_APP_API_URL+appointedUser.img,[appointedUser])

    const onDismiss = useCallback(() => {
        setIsEditActive(false)
      }, [isEditActive,setIsEditActive]);

    const changeProgress=useCallback((progress)=>{
      if(progress.target.value>100){
        setProgress(100)
      }else{
        setProgress(progress.target.value)
      }
    },[progress])

    const handleSubmit=(e)=>{
      e.preventDefault();
      dispatch(modifyTask({ id:task.id, name, description, progress, status }))
      onDismiss();
    }

    const handleDropDown=useCallback((e) => {
      e.preventDefault()
      setDropdown(!dropdown)
    },[dropdown])

    const handleDismiss=useCallback(e=>{
      e.preventDefault()
      dispatch(dismiss({ taskId:task.id, userId:appointedUser.id }))
    },[appointedUser])

  return (
    <div className={isEditActive ? "modal" : "modal modal_disabled"}>
        <div className="editModal">
          <RxCrossCircled className="editModal__close" onClick={onDismiss} />
          {role==="ADMIN" ? (
          <>
          <form onSubmit={handleSubmit} className="editForm">
            <div className="editForm__top">
              <Select className="editForm__top-select" options={TASK_OPTIONS} placeholder={status} onChange={(data)=>setStatus(data.value)}/>
              {JSON.stringify(appointedUser) !== JSON.stringify({}) ? 
              <div style={{marginLeft:"10px", marginTop:"7px"}} className="user user__edit">
                <Image
                 className="user__image"
                 loader={src}
                 src={REACT_APP_API_URL+appointedUser.img}
                 width={30}
                 height={30}
                 alt="Picture of the appointed user"
                />
                <span className="user__name">{appointedUser.name}</span>
                <button onClick={handleDismiss} className="user__dismiss">Снять с задачи</button>
              </div>
              :
              <div className="editForm__top-wrapper">
                <button onClick={handleDropDown} className="editForm__top-button">Назначить задачу</button>
                <div>
                  <ul className={dropdown ? "dropdown" : "dropdown dropdown__hidden"}>
                    {users.map(user=><DropdownItem key={user.id} user={user} setDropdown={setDropdown} taskId={task.id}/>)}
                  </ul>
                </div>
              </div>}
            </div>
            <input className="editForm__title" value={name} onChange={(e)=>setName(e.target.value)}/>
            <textarea className="editForm__description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <ProgressBar role={role} progress={progress} changeProgress={changeProgress}/>
            <button className="form__submit" onSubmit={handleSubmit} >Сохранить</button>
          </form>
          {appointedUser.id === user.id && <Timer spentTime={appointedUser.spentTime.split(":")} taskId={task.id}/>}
          </>
          ):(
            <div className="userModal">
              <h1 className="userModal__status">Статус: {status}</h1>
              <h1 className="userModal__name">{name}</h1>
              <p className="userModal__description">{description}</p>
              <ProgressBar role={role} progress={progress} changeProgress={changeProgress}/>
            </div>
          )}
        </div>
    </div>
  )
}
