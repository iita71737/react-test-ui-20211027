import React from "react";
import { useState } from "react"
// import { useForm } from 'react-hook-form';
import { ReactComponent as Doctor } from '../assets/images/img_doctor_90@3x.svg'
import { ReactComponent as Patient } from '../assets/images/img_patient_90@3x.svg'
import { ReactComponent as X } from '../assets/images/img_town_370x170@3x.svg'
import { Form, Button } from 'react-bootstrap';
import { ReactComponent as Tick } from '../assets/images/img_nike.svg'

const Login = () => {

    const [user, setUser] = useState('user');

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const formData = new FormData(event.target),
            formDataObj = Object.fromEntries(formData.entries())
        const { email, password } = formDataObj
        const result = fuzzyQuery(password, email)

        if (result) {
            console.log('email:', email)
            console.log('pwd:', password)
            alert('密碼與帳號有部分重複')
            setValidated(false)
            event.preventDefault();
            event.stopPropagation();
        }

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    function fuzzyQuery(pwd, mail) {
        console.log(pwd, mail)
        // let cc = mail.match(/^.(\w{6})+.$/g);
        const arr_str = []
        for (let i = 0; i < mail.length; i++) {
            const _mail = mail.substring(i, i + 6)
            const result = pwd.match(_mail)
            if (result) {
                return result
            }
            if (_mail.length > 5) {
                arr_str.push(_mail)
            }
        }
        //console.log(arr_str)
    }

    return (
        <div className="App">
            <div className="container">
                <div className="top-section m-4">
                    <div className="header d-flex justify-content-center ">
                        <p>Choose Account Type</p>
                    </div>
                    <div className="account-type-section d-flex flex-row justify-content-center">
                        <div className="card card-doctor m-2 " tabIndex="1" onClick={() => setUser('Doctor')}>
                            <div className="card-body">
                                <h5 className="card-title"> </h5>
                                <h6 className="card-subtitle mb-2 text-muted"><Doctor /></h6>
                                <p className="card-text">Doctor</p>
                                <i className="icon-tick"><Tick /></i>
                            </div>
                        </div>
                        <div className="card card-patient m-2" tabIndex="1" onClick={() => setUser('Patient')}>
                            <div className="card-body">
                                <h5 className="card-title"> </h5>
                                <h6 className="card-subtitle mb-2 text-muted"> <Patient /></h6>
                                <p className="card-text">Patient</p>
                                <i className="icon-tick"><Tick /></i>
                            </div>
                        </div>
                    </div>

                    <Form.Text className="text-muted top-section-msg">
                        <p> Hello,{user}!</p>
                        <p> Please fill out the form below to get stated.</p>
                    </Form.Text>

                </div>
                <div className="below-section m-4">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" required />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" required />
                        </Form.Group>
                        <div className="form-btn-set">
                            <Form.Group className="mb-3 " controlId="formBasicCheckbox">
                                <Form.Label  >No account?</Form.Label>
                                <a href="/signup" className=""> Signup</a>
                            </Form.Group>
                            <Button className="login-submmit-btn" variant="primary" type="submit">
                                Login
                            </Button>
                        </div>
                    </Form>
                </div>


                <X />
            </div>
        </div>
    );
}

export default Login;