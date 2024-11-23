import { BrowserRouter, Routes,Route } from "react-router"
import ProctectedRoute from "../auth"
import App from "../App"
import Dashboard from "../pages/Dashboard"
import Turmas from "../pages/Turmas"
import Login from "../pages/Login"

function RouterComponent() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<ProctectedRoute/>}>
                <Route element={<App/>}>
                    <Route index element={<Dashboard/>} />
                    <Route path="turmas" element={<Turmas/>} />
                </Route>
            </Route>
            <Route path="login" element={<Login/>}/>
        </Routes>
    </BrowserRouter>
  )
}
export default RouterComponent