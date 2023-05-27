import RegisterForm from './components/RegisterForm'

export function generateMetadata(){
  return{
    title:"Registration"
  }
}

export default function Register() {
  return (
    <main className="auth">
     <h1>Регистрация</h1>
     <RegisterForm/>
    </main>
  )
}