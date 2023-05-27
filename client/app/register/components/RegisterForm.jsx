"use client"

import { useEffect,useState } from "react"
import { redirect } from "next/navigation"
import {useForm} from "react-hook-form"
import {useDispatch, useSelector } from "react-redux"
import { registration,getIsAuth } from "@/app/redux/features/userSlice"
import {RxCrossCircled} from "react-icons/rx"

export default function RegisterForm() {
    const {register,handleSubmit,formState:{errors},reset}=useForm({mode:"onChange"})
    const dispatch=useDispatch()
    const isAuth=useSelector(getIsAuth)
    const [img,setImg]=useState("")

    const onSubmit=data=>{
        dispatch(registration({...data,img}));
        reset();
    }

    const handleImage=(e) => {
      setImg(e.target.files[0]);
    }

    const handleDeleteImage=(e)=>{
      setImg('')
    }

    useEffect(()=>{
      if(isAuth){
        redirect('/')
      }
    },[isAuth])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label>Email <span className="form__star">*</span></label>
        <input type="email" className="form__input" placeholder="some@gmail.com" {...register("email", { required: "Введите email", pattern:{
        value:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i ,
        message:"Введите коректный email"
      }})} />
      {errors.email && (<div style={{color:"red"}}>{errors.email.message}</div>)}
        <label>Пароль <span className="form__star">*</span></label>
        <input type="password" className="form__input" {...register("password",{required:"Введите пароль",minLength:{
            value:3,
            message:"Пароль должен содержать не менее 3 символов"
        }})}/>
        {errors.password && (<div style={{color:"red"}}>{errors.password.message}</div>)}
        <label>Номер телефона <span className="form__star">*</span></label>
        <input className="form__input" placeholder="+375290000000" {...register("phone",{required:"Введите номер телефона",pattern:{
            value:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
            message:"Некоректный номер телефона"
        }})}/>
        {errors.phone && (<div style={{color:"red"}}>{errors.phone.message}</div>)}
        <label>Имя <span className="form__star">*</span></label>
        <input className="form__input" placeholder="Федр Федоров" {...register("name",{required:"Введите имя"})} />
        {errors.name && (<div style={{color:"red"}}>{errors.name.message}</div>)}
        <div className="form__image">
          <label htmlFor="imgInput" className="form__image-fileButton">Выберите аватар</label>
          <input id="imgInput" multiple={false} className="form__image-fileInput" onChange={handleImage} type="file"/>
          {img !== "" && (
            <div className="form__image-wrapper">
            <RxCrossCircled onClick={handleDeleteImage} className="form__image-cross"/>
            <img className="form__image-img" src={URL.createObjectURL(img)}></img>
            </div>
          )}
        </div>
        <input type="submit" className="form__submit" value="Зарегестрироваться" />
    </form>
  )
}
