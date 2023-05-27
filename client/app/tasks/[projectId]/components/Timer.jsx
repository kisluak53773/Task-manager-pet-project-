"use client"

import {useRef,useState,useCallback,useEffect} from 'react'
import { saveTime } from '@/app/redux/features/taskSlice';
import { useDispatch,useSelector } from 'react-redux';
import { getUser } from '@/app/redux/features/userSlice';

export default function Timer({taskId,spentTime}) {
    console.log(spentTime)
    const [start,setStart]=useState(false);
    const [changedSeconds,setSeconds]=useState(spentTime[2]);
    const [changedMinutes,setMinutes]=useState(spentTime[1]);
    const [changedHours,setHours]=useState(spentTime[0]);
    const seconds=useRef(spentTime[2]);
    const minutes = useRef(spentTime[1]);
    const hours=useRef(spentTime[0]);
    const dispatch=useDispatch()
    const userId=useSelector(getUser).id


    useEffect(()=>{
        if(start){
           let timer=setInterval(()=>{
                seconds.current=seconds.current+1;
                setSeconds(seconds.current)
                if(seconds.current === 59){
                    seconds.current=0;
                    setSeconds(0)
                    minutes.current=minutes.current+1;
                    setMinutes(minutes.current);
                    if(minutes.current === 59){
                        minutes.current=0;
                        setMinutes(0);
                        hours.current=hours.current+1;
                        setHours(hours.current)
                    }
                }
            },1000)
    
            return ()=>clearInterval(timer)
        }
    },[start])

    const handleStart=useCallback(()=>{
        setStart(true)
    },[start])

    const handleStop=useCallback(()=>{
        setStart(false)
    },[start])

    const handleSubmit=()=>{
        setStart(false);
        dispatch(saveTime({taskId, userId, spentTime:`${changedHours}:${changedMinutes}:${changedSeconds}`}))
    }

  return (
    <div className='timer'>
        <h1>Фиксация времени</h1>
        <div className='timer__time'>
            <h1>{changedHours<10 ? "0"+changedHours : changedHours}:{changedMinutes<10 ? "0"+changedMinutes : changedMinutes}:{changedSeconds<10 ? "0"+changedSeconds : changedSeconds}</h1>
        </div>
        <div className='timer__buttons'>
            <button onClick={handleStart} className='timer__buttons-start'>Начать</button>
            <button onClick={handleStop} className='timer__buttons-pause'>Остановить</button>
            <button onClick={handleSubmit} className='timer__buttons-commit'>Зафиксировать</button>
        </div>
    </div>
  )
}
