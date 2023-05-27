"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import { login,getIsAuth } from "@/app/redux/features/userSlice"
import { redirect } from 'next/navigation';

export default function LoginForm() {
  const { register, handleSubmit,formState:{errors},reset } = useForm({mode:"onChange"});
  const dispatch=useDispatch();
  const isAuth=useSelector(getIsAuth)

  const onSubmit = data => {
    dispatch(login(data));
    reset();
  };

  useEffect(()=>{
    if(isAuth){
      redirect('/')
    }
  },[isAuth])
   
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <label>Email<span className="form__star">*</span></label>
      <input type="email" className="form__input" placeholder="some@gmail.com" {...register("email", { required: "Введите email", pattern:{
        value:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i ,
        message:"Введите коректный email"
      }})} />
      {errors.email && (<div style={{color:"red"}}>{errors.email.message}</div>)}
      <label>Пароль<span className="form__star">*</span></label>
      <input type="password" className="form__input" {...register("password" , { required: "Введите пароль", minLength:{
        value:3,
        message:"Пароль должен содержать не менее 3 символов"
      }})} />
      {errors.password && (<div style={{color:"red"}}>{errors.password.message}</div>)}
      <input className="form__submit" type="submit" value="Войти" />
    </form>
  );
}
