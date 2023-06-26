"use client"

import { useCallback,useState } from "react";
import { RxCrossCircled } from "react-icons/rx"
import { useForm } from "react-hook-form"
import { addTask,fetchTasksByProjectId } from "@/app/redux/features/taskSlice";
import { useDispatch } from "react-redux";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

export default function AddModal({isAddActive,setIsAddActive,projectId}) {
    const {register,handleSubmit,formState:{errors},reset}=useForm({mode:"onChange"})
    const [date,setDate]=useState(new Date())
    const dispatch = useDispatch()

    const onDismiss = useCallback(() => {
      setIsAddActive(false)
      }, [isAddActive]);

    const onSubmit=(data)=>{
      dispatch(addTask({id:projectId,...data,endDate:date})).then( () => {
        dispatch(fetchTasksByProjectId({projectId}))
      })
      onDismiss();
      reset();
    }

    const handleDate=(e)=>{
      setDate(date)
    }

  return (
    <div className={isAddActive ? "modal" : "modal modal_disabled"} onSubmit={handleSubmit(onSubmit)} >
        <div className="modal__wrapper">
          <RxCrossCircled className="modal__wrapper-close" onClick={onDismiss}/>
          <form className="form modal__wrapper-form">
            <label>Название Задачи<span className="form__star">*</span></label>
            <input className="form__input" placeholder="Название..." {...register("name",{required:"Название не должно быть пустым"})}/>
            {errors.name && (<div style={{color:"red"}}>{errors.name.message}</div>)}
            <label>Описание Задачи<span className="form__star">*</span></label>
            <input className="form__input" placeholder="Описание..." {...register("description",{required:"Название не должно быть пустым"})}/>
            {errors.description && (<div style={{color:"red"}}>{errors.description.message}</div>)}
            <DatePickerComponent value={date} format="dd-MMM-yy" onChange={handleDate} min={new Date()} placeholder="Выберите сроки срок выполнения задачи"/>
            <input className="form__submit" type="submit" value="Добавить" />
          </form>
        </div>
    </div>
  )
}
