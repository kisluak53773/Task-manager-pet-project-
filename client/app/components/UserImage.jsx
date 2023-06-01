"use client"

import { REACT_APP_API_URL } from "@/app/constants"; 
import Image from "next/image";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { dismissProject } from "../redux/features/projectSlice";

const UserImage=memo(({user,projectId})=>{
    const src=()=>REACT_APP_API_URL+user.img
    const dispatch=useDispatch()

    const dismissUser=(e)=>{
      e.preventDefault()
      e.stopPropagation()
      dispatch(dismissProject({userId:user.id,projectId}))
    }

  return (
    <div onClick={dismissUser} data-title={user.name} className="projects__item-users-image">
    <Image
    className="projects__item-users-image-border"
       loader={src}
       src={REACT_APP_API_URL+user.img}
       width={30}
       height={30}
       alt="Picture of the appointed user"
    />
    </div>
  )
})

export default UserImage