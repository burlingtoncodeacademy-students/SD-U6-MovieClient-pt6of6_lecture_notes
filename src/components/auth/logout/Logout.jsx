import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap';

function Logout({setToken}) {

    const navigate = useNavigate();

    const style = {
        float: 'right',
        margin: '.5em'
    }

    const signout = () => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/')
    }

    return (
        <>
            <Button
                style={style}
                onClick={signout}
                color='danger'
                outline
            >Signout</Button>
        </>
    )
}

export default Logout