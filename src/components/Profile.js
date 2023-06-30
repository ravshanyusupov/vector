import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import MyBtn from "../ui-components/MyBtn";
import axios from "axios";
import {useEffect, useState} from "react";
import Loader from "./Loader";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import BasicModal from "./Modal";

export default function Profile() {
    const [userInfo, setUserInfo] = useState({})
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loader, setLoader] = useState(true)
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()
    const getUser = async () => {
        try {
            const users = await axios.get('https://api.xatp13.devdata.uz/api/auth/user/',
                {headers: {'Authorization': `Bearer ${token}`}})
            setUserInfo(users.data.data)
        } catch (e) {
            toast.error(e.message)
        }
        setLoader(false)
    }
    const logout = async () => {
        try{
            const logout = await axios.delete('https://api.xatp13.devdata.uz/api/auth/logout',
                {headers: {'Authorization': `Bearer ${token}`}})
            navigate('/')
            localStorage.removeItem('token')
        }catch (e) {
            toast.error(e.message)
        }
    }
    const openModelFunction = () => setOpen(true)
    useEffect(() => {
        getUser()
    }, [])
    return (
        <>
            {loader ? <Loader/>
                :
                <section style={{backgroundColor: '#eee'}}>
                    <MDBContainer className="py-5">
                        <MDBRow>
                            <MDBCol lg="4">
                                <MDBCard className="mb-4">
                                    <MDBCardBody className="text-center">
                                        <MDBCardImage
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                            alt="avatar"
                                            className="rounded-circle"
                                            style={{width: '150px'}}
                                            fluid/>
                                        <p className="text-muted mb-1">Name: {userInfo.name}</p>
                                        <p className="text-muted mb-4">Email: {userInfo.email}</p>
                                        <div className="d-flex justify-content-between">
                                            <MyBtn
                                                className='btn btn-primary w-50'
                                            ><Link
                                                style={{textDecoration:'none', color: 'white'}}
                                                to='/update'>Update Profile</Link></MyBtn>
                                            <MyBtn
                                                className="btn btn-danger"
                                                onClick={logout}
                                            >Log Out</MyBtn>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>

                                <MDBCard className="mb-4 mb-lg-0">
                                    <MDBCardBody className="p-0">
                                        <MDBListGroup flush className="rounded-3">
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fas icon="globe fa-lg text-warning"/>
                                                <MDBCardText>https://mdbootstrap.com</MDBCardText>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fab icon="github fa-lg" style={{color: '#333333'}}/>
                                                <MDBCardText>mdbootstrap</MDBCardText>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fab icon="twitter fa-lg" style={{color: '#55acee'}}/>
                                                <MDBCardText>@mdbootstrap</MDBCardText>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fab icon="instagram fa-lg" style={{color: '#ac2bac'}}/>
                                                <MDBCardText>mdbootstrap</MDBCardText>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fab icon="facebook fa-lg" style={{color: '#3b5998'}}/>
                                                <MDBCardText>mdbootstrap</MDBCardText>
                                            </MDBListGroupItem>
                                        </MDBListGroup>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol lg="8">
                                <MDBCard className="mb-4">
                                    <MDBCardBody>
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Full Name</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{userInfo.name}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr/>
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Email</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{userInfo.email}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr/>
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Firm</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                {userInfo.firm ? <MDBCardText className="text-muted">{userInfo.firm}</MDBCardText>
                                                : <MDBCardText className="text-muted">No firms yet</MDBCardText>}
                                            </MDBCol>
                                        </MDBRow>
                                        <hr/>
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Created at:</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{userInfo.created_at.substr(0,10)}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr/>
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Role</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{userInfo.role_name}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>

                                <MDBRow>
                                    <MDBCol md="6">
                                        <MDBCard className="mb-4 mb-md-0">
                                            <MDBCardBody>
                                                <MDBCardText className="mb-4"><span
                                                    className="text-primary font-italic me-1">assigment</span> Project
                                                    Status</MDBCardText>
                                                <MDBCardText className="mb-1" style={{fontSize: '.77rem'}}>Web
                                                    Design</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={80} valuemin={0} valuemax={100}/>
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Website
                                                    Markup</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={72} valuemin={0} valuemax={100}/>
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{fontSize: '.77rem'}}>One
                                                    Page</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={89} valuemin={0} valuemax={100}/>
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Mobile
                                                    Template</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={55} valuemin={0} valuemax={100}/>
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Backend
                                                    API</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={66} valuemin={0} valuemax={100}/>
                                                </MDBProgress>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>

                                    <MDBCol md="6">
                                        <MDBCard className="mb-4 mb-md-0">
                                            <MDBCardBody>
                                                <MDBCardText className="mb-4"><span
                                                    className="text-primary font-italic me-1">assigment</span> Project
                                                    Status</MDBCardText>
                                                <MDBCardText className="mb-1" style={{fontSize: '.77rem'}}>Web
                                                    Design</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={80} valuemin={0} valuemax={100}/>
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Website
                                                    Markup</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={72} valuemin={0} valuemax={100}/>
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{fontSize: '.77rem'}}>One
                                                    Page</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={89} valuemin={0} valuemax={100}/>
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Mobile
                                                    Template</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={55} valuemin={0} valuemax={100}/>
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Backend
                                                    API</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={66} valuemin={0} valuemax={100}/>
                                                </MDBProgress>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <BasicModal/>
                </section>
            }
        </>
    );
}