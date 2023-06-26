"use client"

import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getAllProjects,fetchProjects } from "../redux/features/projectSlice"
import { getUser,auth,fetchAllUsers } from "../redux/features/userSlice"
import {AiOutlinePlus} from "react-icons/ai"
import Link from "next/link"
import Project from "./Project"

export default function Projects() {
  const projects=useSelector(getAllProjects);
  const dispatch=useDispatch();
  const user=useSelector(getUser);

  useEffect(()=>{
    dispatch(fetchProjects())
    dispatch(auth())
    dispatch(fetchAllUsers())
  },[dispatch])


  return (
    <section className="projects">
      {projects.map((project)=><Project role={user.role} key={project.id} project={project}/>)}
      {user.role === "ADMIN" && (
        <Link className="projects__skeleton" href="/modal">
          <AiOutlinePlus size="3rem" />
        </Link>
      )}
    </section>
  )
}

export const revalidate = 1;
