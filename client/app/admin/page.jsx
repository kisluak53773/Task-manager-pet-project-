import UserList from "./components/UserList"

export default function Admin() {
    return (
      <main className="main">
       <h1 style={{marginBottom:"10px"}}>Список Задач</h1>
       <UserList/>
      </main>
    )
  }