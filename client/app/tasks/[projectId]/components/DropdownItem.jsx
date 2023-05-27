"use client"

import { useDispatch } from "react-redux"
import { appoint } from "@/app/redux/features/taskSlice"

export default function DropdownItem({user,setDropdown,taskId}) {
    const dispatch=useDispatch()

    const handleAppointment=()=>{
        setDropdown(false)
        dispatch(appoint({ userId:user.id, taskId }))
      }

  return (
    <li key={user.id} className="dropdown__item">
        <a onClick={handleAppointment}>{user.name}</a>
    </li>
  )
}
