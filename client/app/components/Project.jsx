"use client"

import { useCallback,useState,useMemo } from "react"
import { useDispatch,useSelector } from "react-redux"
import { destroyProject,setBeingDeleted } from "../redux/features/projectSlice"
import {AiOutlineDelete} from "react-icons/ai"
import Link from "next/link"
import UserImage from "./UserImage"
import {AiOutlinePlus} from "react-icons/ai"
import { getAllUsers,getUser } from "../redux/features/userSlice"
import DropdownItem from "./DropDownItem"


export default function Project({project,role}) {
    const dispatch=useDispatch()
    const [dropdown,setDropdown]=useState(false)
    const users=useSelector(getAllUsers)
    const user = useSelector(getUser)

    const filterUsers=()=>{
      var filtered=[...users]
     for(const user of project.users){
      const data=filtered.filter(userPicked=>userPicked.id !== user.id)
      filtered=data
     }
     return filtered
    }

    const userAppointed=()=>{
      if(project.users.find(projectUser=>projectUser.id === user.id)){
        return true
      }else{
        return false
      }
    }

    const isUserAppointed=useMemo(userAppointed,[user,project])
    const filteredUsers=useMemo(filterUsers,[users,project])

    const handleDelete = useCallback(()=>{
      dispatch(setBeingDeleted(project.id))  
      dispatch(destroyProject({id:project.id}))
    },[dispatch]);

    const handleDropDown=useCallback((e) => {
      e.preventDefault()
      setDropdown(!dropdown)
    },[dropdown])

  return (
    <>
    {isUserAppointed | role==="ADMIN" && <Link href={`/tasks/${project.id}/`} className="projects__item">
        <div className="projects__item-title">
          <h1>{project.title} </h1> 
          {role==="ADMIN" && <AiOutlineDelete size="2rem" onClick={handleDelete} className="projects__item-title-deleteSign"/>}
        </div>
        <p>{project.description}</p>
        {project.users.length !==0 &&
         <div className="projects__item-users">
         {project.users.map((user)=>{
          return(
            <>
              <UserImage key={user.id} projectId={project.id} user={user}/>
            </>
          )
        })}
        {project.users.length <6 && role==="ADMIN"  && (
          <>
            <span onClick={handleDropDown} className="projects__item-users-add"><AiOutlinePlus/></span>
            <div>
              <ul className={dropdown ? "dropdown" : "dropdown dropdown__hidden"}>
                {filteredUsers.map(user=><DropdownItem key={user.id} user={user} setDropdown={setDropdown} project={project}/>)}
              </ul>
            </div>
          </>
        )} 
         </div>
        }
    </Link>}
    </>
  )
}
