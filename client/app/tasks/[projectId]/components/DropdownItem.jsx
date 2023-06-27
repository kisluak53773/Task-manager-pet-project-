"use client"

import { useDispatch } from "react-redux"
import { appoint, fetchTasksByProjectId } from "@/app/redux/features/taskSlice"

export default function DropdownItem({user,setDropdown,taskId,projectId}) {
    const dispatch=useDispatch()

    const handleAppointment=()=>{
        setDropdown(false)
        dispatch(appoint({ userId:user.id, taskId })).then(() => {
          dispatch(fetchTasksByProjectId({projectId}))
        })
      }

  return (
    <li key={user.id} className="dropdown__item">
        <a onClick={handleAppointment}>{user.name}</a>
    </li>
  )
}
