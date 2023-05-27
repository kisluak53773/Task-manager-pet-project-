"use client"

export default function ProgressBar({progress,changeProgress,role}) {
  return (
    <div className="progress">
      <a>Процент выполнения</a>
      {role ==="ADMIN" && <input className="progress__input" value={progress} onChange={changeProgress}/>}
        <div className="progress__bar">
            <div className="progress__bar-fill" style={{width:`${progress}%`}}></div>
        </div>
        <div className="progress__label">{progress}%</div>
    </div>
  )
}
