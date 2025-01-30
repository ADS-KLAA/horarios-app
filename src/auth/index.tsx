import { Navigate, Outlet } from "react-router"
import { useAuth } from "./AuthProvider"
import LoadingScreen from "../pages/LoadingScreen";

function ProctectedRoute() {
  
  const {session,isLoading,} = useAuth();

  if(isLoading) return <LoadingScreen/>
  const loggedIn = session != null;

  return (
    <>
        { loggedIn ? <Outlet/> :  <Navigate to={"login"}/>}
    </>
  )
}
export default ProctectedRoute