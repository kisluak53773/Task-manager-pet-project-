"use client"

import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getIsAuth,getUser,logoutUser } from "../redux/features/userSlice"
import Image from "next/image"
import Link from 'next/link'
import {REACT_APP_API_URL} from "../constants/index"

export default function UserBar() {
  const isAuth=useSelector(getIsAuth)
  const user=useSelector(getUser)
  const dispatch=useDispatch()

  const src=useCallback(()=>REACT_APP_API_URL+user.img,[user])
  const handleClick=()=>{
    dispatch(logoutUser())
  }

  return (
    <>
    {isAuth ? (
    <div className="user">
      <Image
      className="user__image"
      loader={src}
      src={REACT_APP_API_URL+user.img}
      width={30}
      height={30}
      alt="Picture of the user"
     />
     <span className="user__name">{user.name}</span>
     <span style={{margin:"10px"}}>/</span>
     <button className="user__button" onClick={handleClick}>Выйти</button>
     {user.role ==="ADMIN" && <Link className="user__admin" href="/admin">Админ панель</Link>}
    </div>
    ):(
    <>
      <Link className="navbar__link" href="/login">Войти</Link>
      <Link className="navbar__link" href="/register">Зарегестрироваться</Link>
    </>
    )}
    </>
  )
}
