import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../assets/styles/Button';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FcCancel } from 'react-icons/fc';
import axios from 'axios';
import { USERNAME_API } from '../../constants/Account.constants';
import { VALIDUSRNAMES } from '../../constants/App.constants';
import Loading from '../../assets/images/layouts/Loading';
import AppHelmet from '../../Helpers/AppHelmet';
import Cookies from 'js-cookie';

const UserName = () => {
    const [username, setUsername] = useState('');
    const [txtErr, setTxtErr] = useState('');
    const [valid, setValid] = useState(false);
    const [icons, setIcons] = useState({
        loading: false,
        cancel: false,
        check: false
    });

    const navigate = useNavigate();
    const usernamess = Cookies.get('username');
    const token = Cookies.get('token');
    !usernamess && navigate('/signup');

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (valid === true) {
            const data = { username, token };
            await axios.post(USERNAME_API, data).then((res) => {
                if (res.data === 202) {
                    Cookies.remove('username');
                    Cookies.remove('token');
                    window.location.href = 'http://localhost:3000/signin?message=Your account created please login';
                } else {
                    setTxtErr('server Error!');
                }
            });
        } else {
            setTxtErr('Enter valid username');
        }
    };

    const getUsername = async () => {
        setIcons({
            ...icons,
            loading: true,
            cancel: false,
            check: false
        });
        await axios.get(USERNAME_API + '?usrnm=' + username).then((res) => {
            if (res.data === 404) {
                setIcons({
                    ...icons,
                    loading: false,
                    cancel: false,
                    check: true
                });
                setValid(true);
            } else {
                setIcons({
                    ...icons,
                    loading: false,
                    cancel: true,
                    check: false
                });
                setValid(false);
            }
        });
    };
    useEffect(() => {
        if (username.length > 0) {
            if (username.length >= 4) {
                if (VALIDUSRNAMES(username)) {
                    getUsername();
                } else {
                    setIcons({
                        ...icons,
                        loading: false,
                        cancel: true,
                        check: false
                    });
                    setValid(false);
                }
            } else {
                setIcons({
                    ...icons,
                    loading: false,
                    cancel: true,
                    check: false
                });
            }
        } else {
            setIcons({
                ...icons,
                loading: false,
                cancel: false,
                check: false
            });
        }
    }, [username]);

    return (
        <>
            <AppHelmet title="User name F" />
            <Wrapper>
                <form onSubmit={handelSubmit}>
                    <h1>User Name</h1>
                    <hr />
                    {txtErr && <span className="errTxt">{txtErr}</span>}
                    <div className="username">
                        <input type="text" name="username" placeholder="Username" required autoComplete="off" autoFocus value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label style={{ color: `${icons.check === true ? 'green' : 'red'}` }}>
                            {icons.loading === true && <Loading />}
                            {icons.cancel === true && <FcCancel />}
                            {icons.check === true && <FaRegCheckCircle />}
                        </label>
                    </div>
                    <div className="submit">
                        <Button>Submit</Button>
                    </div>
                </form>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 5rem 0;

    form {
        background: #021b82;
        padding: 0.9rem 2.5rem;
        border: 2px solid #006fff;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 30rem;

        .username {
            margin-bottom: 1.5rem;
            position: relative;

            input {
                font-size: 1.4rem;
                border: 2px solid #ddd;
                padding: 0.5rem 2rem;
                border-radius: 1rem;
                background: #ddd;
                transition: all 0.2s;

                &:focus {
                    background: #333;
                    color: white;
                }
            }
            label {
                position: absolute;
                top: 0.5rem;
                right: -2.4rem;
                font-size: 2rem;
                pointer-events: none;
                width: 2rem;
            }
        }

        h1 {
            margin-bottom: 0.6rem;
        }
        hr {
            width: 100%;
            margin-bottom: 1rem;
        }
        .errTxt {
            margin-bottom: 0.8rem;
            font-weight: 600;
            font-size: 1.1rem;
            display: flex;
            justify-content: center;
            background: red;
            color: #000;
            padding: 0.4rem 2.2rem;
            border-radius: 0.1rem;
        }
    }
`;

export default UserName;
