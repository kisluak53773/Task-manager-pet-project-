import LoginForm from './components/LoginForm'

export function generateMetadata(){
  return{
    title:"Login"
  }
}

export default function Login() {
  return (
    <main className="auth">
     <h1>Войти</h1>
     <LoginForm/>
    </main>
  )
}