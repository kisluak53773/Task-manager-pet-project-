import Projects from './components/Projects'


export default function Home() {
  return (
    <main className="main">
     <h1>Доступные проекты</h1>
     <Projects/>
    </main>
  )
}

export const revalidate = 60
