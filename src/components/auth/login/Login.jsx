import { useRef } from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import FullButton from '../../buttons/FullButton';

function Login({ updateToken }) {

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let body = JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value
        });

        const url = 'http://localhost:4000/user/login';

        try {

            const res = await fetch(url, {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": 'application/json'
                }),
                body: body
            })

            const data = await res.json();

            if (data.message === "Logged in!") {
                updateToken(data.token)
                navigate('/movie');
            } else {
                alert(data.message);
            }

        } catch (err) {
            console.error(err)
        }

    }

    return (
        <>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Input
                        placeholder='Email'
                        innerRef={emailRef}
                        type="email"
                        autoComplete="off"
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        placeholder='Password'
                        innerRef={passwordRef}
                        type="password"
                        autoComplete="off"
                    />
                </FormGroup>
                <FullButton>
                    <Button type='submit'>Login</Button>
                </FullButton>
            </Form>
        </>
    )
}

export default Login