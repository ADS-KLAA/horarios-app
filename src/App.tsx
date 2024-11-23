import { Outlet } from "react-router"
import Navbar from "./components/Navbar"

function App() {

  return (
    <main className="flex w-screen h-screen m-0 px-4 py-2 text-primaryBlack">
      <Navbar/>

      <Outlet/>
    </main>
  )
}

export default App
