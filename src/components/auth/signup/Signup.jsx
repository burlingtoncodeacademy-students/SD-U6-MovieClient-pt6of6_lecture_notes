import React, { useRef } from 'react'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import FullButton from '../../buttons/FullButton';
import { useNavigate } from 'react-router-dom';

function Signup({ updateToken }) {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        let bodyObj = JSON.stringify({
            firstName, lastName, email, password
        })

        const url = 'http://localhost:4000/user/signup';
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            headers,
            body: bodyObj,
            method: 'POST'
        }

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();

            console.log(data)
            if (data.message === "Success") {
                updateToken(data.token)
                navigate('/movie')
            } else {
                alert(data.message)
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <h2>Signup</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>First Name:</Label>
                    <Input
                        innerRef={firstNameRef}
                        autoComplete='off'
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Last Name:</Label>
                    <Input
                        innerRef={lastNameRef}
                        autoComplete='off'
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Email:</Label>
                    <Input
                        innerRef={emailRef}
                        autoComplete='off'
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password:</Label>
                    <Input
                        innerRef={passwordRef}
                        autoComplete='off'
                    />
                </FormGroup>
                <FullButton>
                    <Button type='submit'>Signup</Button>
                </FullButton>
            </Form>
        </>
    )
}

export default Signup