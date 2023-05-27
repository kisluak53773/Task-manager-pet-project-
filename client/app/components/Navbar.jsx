import Link from 'next/link'
import UserBar from './UserBar'


export default function Navbar() {
  return (
      <nav className="navbar">
        <Link className="navbar__main" href="/">TaskManager</Link>
        <UserBar/>
      </nav>
  )
}
