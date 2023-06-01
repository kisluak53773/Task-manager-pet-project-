"use client"

import { useDispatch } from "react-redux"
import { appointmentToProject } from "../redux/features/userSlice"

export default function DropdownItem({user,setDropdown,project}) {
  const dispatch=useDispatch()

  const handleAppointment=(e)=>{
    e.preventDefault()
    e.stopPropagation()
    setDropdown(false)
    dispatch(appointmentToProject({ userId:user.id, projectId:project.id }))
  }

  return (
    <li key={user.id} className="dropdown__item">
        <a onClick={handleAppointment}>{user.name}</a>
    </li>
  )
}