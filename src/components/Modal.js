import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MyInput from "../ui-components/MyInput";
import MyBtn from "../ui-components/MyBtn";
import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import Loader from "./Loader";
import {useNavigate, useParams} from "react-router-dom";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal() {
    const navigate = useNavigate()
    const {update} = useParams()
    const token = localStorage.getItem('token')


    const [updateName, setUpdateName] = useState('')
    const [updateEmail, setUpdateEmail] = useState('')
    const [updatePassword, setUpdatePassword] = useState('')
    const [loader, setLoader] = useState(false)

    const updateProfile = async () => {
        setLoader(true)
        try {
            const updateUser = await axios.patch('https://api.xatp13.devdata.uz/api/auth/profile',
                {
                    name: updateName,
                    email: updateEmail,
                    password: updatePassword
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log(updateUser)
        } catch (e) {
            toast.error(e.message)
        }
        setLoader(false)
        navigate('/profile')
        toast.success('Successfully updated')
    }
    return (
        <div>
            {loader ? <Loader/>
                : <>
                    <Modal
                        open={update ? true : false}
                        onClose={() => navigate('/profile')}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" sx={{fontSize: '30px', textAlign: 'center'}}>Update your
                                profile</Typography><br/>
                            <form action="" onSubmit={updateProfile}>
                                <MyInput
                                    required="required"
                                    type='text'
                                    placeholder='Enter your name'
                                    value={updateName}
                                    onInput={e => setUpdateName(e.target.value)}
                                /><br/>
                                <MyInput
                                    type='email'
                                    required="required"
                                    placeholder='Enter your email'
                                    value={updateEmail}
                                    onInput={e => setUpdateEmail(e.target.value)}
                                /><br/>
                                <MyInput
                                    type='password'
                                    required="required"
                                    placeholder='Enter your password'
                                    value={updatePassword}
                                    onInput={e => setUpdatePassword(e.target.value)}
                                /><br/>
                                <MyBtn className='btn btn-primary w-100'>Update</MyBtn>
                            </form>
                        </Box>
                    </Modal>
                </>
            }
        </div>
    );
}