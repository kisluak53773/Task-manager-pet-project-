"use client"

import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { destroyProject,setBeingDeleted } from "../redux/features/projectSlice"
import {AiOutlineDelete} from "react-icons/ai"
import Link from "next/link"


export default function Project({project,role}) {
    const dispatch=useDispatch()

    const handleDelete = useCallback(()=>{
      dispatch(setBeingDeleted(project.id))  
      dispatch(destroyProject({id:project.id}))
    },[dispatch]);

  return (
    <Link href={`/tasks/${project.id}/`} className="projects__item">
        <div className="projects__item-title">
          <h1>{project.title} </h1> 
          {role==="ADMIN" && <AiOutlineDelete size="2rem" onClick={handleDelete} className="projects__item-title-deleteSign"/>}
        </div>
        <p>{project.description}</p>
    </Link>
  )
}
