import Tasks from "./components/Tasks"

export function generateMetadata(){
    return{
      title:"Tasks"
    }
  }
  

export default function TasksPage({params:{projectId}}) {
  return (
    <main>
      <Tasks projectId={projectId}/>
    </main>
  )
}
