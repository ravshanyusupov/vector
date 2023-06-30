import React, {useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader'

import {useNavigate} from 'react-router-dom'
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import axios from "axios";
import MyBtn from "../ui-components/MyBtn";
import MyInput from "../ui-components/MyInput";

function App() {

    const [justifyActive, setJustifyActive] = useState('tab1');
    const [loginEmail, setLoginEmail] = useState('');

    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPasswordConfirmation, setRegisterPasswordConfirmation] = useState('');


    const [loginpassword, setLoginPassword] = useState('');
    const [token, setToken] = useState('')
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()
    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };
    const logIn = async (e) => {
        e.preventDefault()
        setLoader(true)
        try {
            const user = await axios.post('https://api.xatp13.devdata.uz/api/auth/login',
                {email: loginEmail, password: loginpassword})
            localStorage.setItem('token', user.data.token)
            navigate('/profile')
        } catch (e) {
            toast.error('did\'nt match')
            setLoginEmail('')
            setLoginPassword('')
        }
        setLoader(false)
    }
    const register = async (e) => {
        e.preventDefault()
        setLoader(true)
        try {
            const data = await axios.post('https://api.xatp13.devdata.uz/api/auth/register',
            {name: registerName, email: registerEmail,
                password: registerPassword, password_confirmation: registerPasswordConfirmation})
            const user = await axios.post('https://api.xatp13.devdata.uz/api/auth/login',
                {email: registerEmail, password: registerPassword})
            localStorage.setItem('token', user.data.token)
            navigate('/profile')
        }catch (e) {
            toast.error('already exists')
            setRegisterName('');
            setRegisterEmail('');
            setRegisterPassword('');
            setRegisterPasswordConfirmation('');
        }
        setLoader(false)
    }
    return (
        <>
            {loader ? <Loader/>
                :
                <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

                    <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                                Login
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                                Register
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>

                    <MDBTabsContent>

                        <MDBTabsPane show={justifyActive === 'tab1'}>

                            <form action="" onSubmit={logIn}>
                                <MyInput
                                    placeholder='Enter your email'
                                    required
                                    value={loginEmail}
                                    type='email'
                                    onInput={e => setLoginEmail(e.target.value)}
                                /><br/>
                                <MyInput
                                    placeholder='Enter your password'
                                    required
                                    value={loginpassword}
                                    type='password'
                                    onInput={e => setLoginPassword(e.target.value)}
                                /><br/>
                                <div className="d-flex justify-content-between mb-4">
                                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me'/>
                                    <a href="#">Forgot password?</a>
                                </div>

                                <MyBtn className='btn btn-primary w-100' type='submit'>Sign in</MyBtn>
                            </form><br/>
                            <p className="text-center">Not a member? <a href='#' onClick={() => handleJustifyClick('tab2')}>Register</a></p>

                        </MDBTabsPane>

                        <MDBTabsPane show={justifyActive === 'tab2'}>

                            <form action="" onSubmit={register}>
                                <MyInput
                                    type='text'
                                    requred
                                    placeholder='Enter your name'
                                    value={registerName}
                                    onInput={e => setRegisterName(e.target.value)}
                                /><br/>
                                <MyInput
                                    type='email'
                                    required
                                    placeholder='Enter your email'
                                    value={registerEmail}
                                    onInput={e => setRegisterEmail(e.target.value)}
                                /><br/>
                                <MyInput
                                    type='password'
                                    required
                                    placeholder='Enter your password'
                                    value={registerPassword}
                                    onInput={e => setRegisterPassword(e.target.value)}
                                /><br/>
                                <MyInput
                                    type='password'
                                    required
                                    placeholder='Enter your password-confirmation'
                                    value={registerPasswordConfirmation}
                                    onInput={e => setRegisterPasswordConfirmation(e.target.value)}
                                /><br/>

                                <MyBtn className='btn btn-primary w-100' type='submit'>Sign up</MyBtn>
                            </form>

                        </MDBTabsPane>

                    </MDBTabsContent>
                    <ToastContainer/>
                </MDBContainer>
            }
        </>
    );
}

export default App;