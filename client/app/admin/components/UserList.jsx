"use client"

import { useDispatch, useSelector } from "react-redux"
import { fetchModifiedTasks,getModifyTasks } from "@/app/redux/features/taskSlice"
import { useEffect,useState } from "react"
import UserItem from "./UserItem"
import { redirect } from 'next/navigation';
import { getUser } from "@/app/redux/features/userSlice"

export default function UserList() {
  const dispatch=useDispatch()
  const modifiedTasks=useSelector(getModifyTasks)
  const [search,setSearch]=useState("")
  const user=useSelector(getUser)

  useEffect(()=>{
    if(user.role!=="ADMIN"){
      redirect("/")
    }
    dispatch(fetchModifiedTasks())
  },[dispatch,user])

  const filteredTasks=modifiedTasks.filter(task=>{
    return task.name.toLowerCase().includes(search.toLowerCase())
  })
  

  return (
    <div className="modifiedTasks">
      <input value={search} className="modifiedTasks__search" placeholder="Поиск задач по названию" onChange={(e)=>setSearch(e.target.value)}/>
      {filteredTasks.map((task)=>{
        return(
          <div key={task.id} className="modifiedTasks__item">
            <div>
            <p>{task.name}</p>
            <p>{task.description}</p>
            </div>
            <div className="modifiedTasks__item-list">
            {task.users.map((user)=>
            <ul key={user.id} style={{listStyle:"none"}}>
            <UserItem key={user.id} user={user}/>
            </ul>)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
