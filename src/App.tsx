import { Outlet } from "react-router"
import Navbar from "./components/Navbar"

function App() {

  return (
    <main className="flex w-screen h-screen m-0 px-6 py-8 text-primaryBlack">
      <Navbar/>

      <Outlet/>
    </main>
  )
}

export default App
