import { Navigate, Outlet } from "react-router"

function ProctectedRoute() {
    const loggedIn = true
  return (
    <>
        { loggedIn ? <Outlet/> :  <Navigate to={"login"}/>}
    </>
  )
}
export default ProctectedRoute