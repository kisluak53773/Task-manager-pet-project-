"use client"

import { useCallback } from "react";
import {RxCrossCircled} from "react-icons/rx"
import { useRouter } from "next/navigation";
import {useForm} from "react-hook-form"
import { addProject } from "@/app/redux/features/projectSlice";
import { useDispatch } from "react-redux";

export default function ProjectModal() {
    const router=useRouter();
    const {register,handleSubmit,formState:{errors},reset}=useForm({mode:"onChange"})
    const dispatch = useDispatch()

    const onDismiss = useCallback(() => {
        router.back();
      }, [router]);

    const onSubmit=(data)=>{
      dispatch(addProject(data))
      onDismiss();
      reset();
    }

  return (
    <div className="modal" onSubmit={handleSubmit(onSubmit)} >
        <div className="modal__wrapper">
          <RxCrossCircled className="modal__wrapper-close" onClick={onDismiss}/>
          <form className="form modal__wrapper-form">
            <label>Название проекта<span className="form__star">*</span></label>
            <input className="form__input" placeholder="Название..." {...register("title",{required:"Название не должно быть пустым"})}/>
            {errors.title && (<div style={{color:"red"}}>{errors.title.message}</div>)}
            <label>Описание проекта<span className="form__star">*</span></label>
            <input className="form__input" placeholder="Описание..." {...register("description",{required:"Название не должно быть пустым"})}/>
            {errors.description && (<div style={{color:"red"}}>{errors.description.message}</div>)}
            <input className="form__submit" type="submit" value="Добавить" />
          </form>
        </div>
    </div>
  )
}
