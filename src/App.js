import React from "react";
import Form from "./components/Form";
import Profile from "./components/Profile";
import {Routes, Route, BrowserRouter} from "react-router-dom"
import BasicModal from "./components/Modal";
import PrivateRoute from "./Router/PrivateRoute";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<PrivateRoute/>}>
                        <Route path='/profile' element={<Profile/>}/>
                        <Route path='/:update' element={<BasicModal/>}/>
                    </Route>
                    <Route path='/' element={<Form/>} exact/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;


