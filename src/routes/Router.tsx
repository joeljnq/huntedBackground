import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LandingPage } from "../components/LandingPage"
import UploadImage from "../components/UploadImage"
import { Demo } from "../components/Demo"

export const Router= () =>{
    return(
      <BrowserRouter>
      <Routes>
        <Route path="/" >
        <Route index element={<LandingPage />} />
        <Route path="drag-and-drop" element={<UploadImage />} />
        <Route path="demo" element={<Demo />} /> 
        </Route>
        <Route path="*" element={<h1>A donde vas </h1>} />
      </Routes>
      </BrowserRouter>
    )   
}