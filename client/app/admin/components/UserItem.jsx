"use client"

export default function UserItem({user}) {
  return (
    <li>{user.name}: Затраченое время на выполнение {user.spentTime}</li>
  )
}
