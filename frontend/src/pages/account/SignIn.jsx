import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from '../../assets/images/Account/SignInImage';
import Button from '../../assets/styles/Button';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import AppHelmet from '../../Helpers/AppHelmet';
import { VALIDEDEMAILS } from '../../constants/App.constants';
import Loading from '../../assets/images/layouts/Loading';
import axios from 'axios';
import { ACCOUNT_LOGIN_API } from '../../constants/Account.constants';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import Cookies from 'js-cookie';

const SignIn = () => {
    const initialVal = { email: '', password: '' };
    const [inputs, setInputs] = useState(initialVal);
    const [messageErr, setMessageErr] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordShow, setPasswordShow] = useState(false);

    const message = useSearchParams()[0].get('message');
    const navigate = useNavigate();

    const handelChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (VALIDEDEMAILS(inputs.email)) {
            setLoading(true);

            await axios.post(ACCOUNT_LOGIN_API, inputs).then((res) => {
                if (res.data.status === 200) {
                    Cookies.set('code', res.data.code, { expires: 99999 });
                    if (res.data.active === 'false') {
                        Cookies.set('token', res.data.token, { expires: 99999 });
                        setLoading(false);
                        setInputs(initialVal);
                        navigate('/verify');
                    } else {
                        Cookies.set('login', 'true', { expires: 99999 });
                        Cookies.set('token', res.data.token, { expires: 99999 });
                        Cookies.remove('code');
                        window.location.href = 'http://localhost:3000/profile';
                    }
                }
                if (res.data.status === 404) {
                    setMessageErr(res.data.message);
                    setLoading(false);
                    setInputs(initialVal);
                    setLoading(false);
                }
                if (res.data.status === 402) {
                    setMessageErr(res.data.message);
                    setLoading(false);
                    setInputs(initialVal);
                    setLoading(false);
                }
                if (res.data.status === 500) {
                    setMessageErr(res.data.message);
                    setLoading(false);
                    setInputs(initialVal);
                    setLoading(false);
                }
            });
        } else {
            setMessageErr('Enter a valid Email');
        }
    };
    useEffect(() => {
        if (sessionStorage.getItem('login') === 'true') {
            setMessageErr('You are already login');
        }
    }, []);

    return (
        <>
            <AppHelmet title="Sign In " />
            <Wrapper>
                <div className="img">
                    <Image />
                </div>
                <div className="form_Section">
                    <h2>Sign In</h2>
                    <hr />
                    {message && <span className="message">{message}</span>}
                    {messageErr && <span className="messageErr">{messageErr}</span>}
                    <form onSubmit={handelSubmit}>
                        <div className="email">
                            <input type="tel" name="email" required autoComplete="off" onChange={handelChange} value={inputs.email} />
                            <label className="label" htmlFor="email">
                                Email :
                            </label>
                        </div>
                        <div className="password">
                            <input type={passwordShow ? 'tel' : 'password'} name="password" required autoComplete="off" onChange={handelChange} value={inputs.password} />
                            <label className="label" htmlFor="password">
                                Password :
                            </label>
                            <button type="button" className="icons" onClick={() => setPasswordShow(!passwordShow)}>
                                {passwordShow ? <IoIosEyeOff /> : <IoIosEye />}
                            </button>
                        </div>
                        <div className="submit">
                            <Button type="submit" style={{ background: `${loading ? '#444' : '#ddd'}` }}>
                                {loading ? <Loading className="loading_spinner" /> : 'Sign In'}
                            </Button>
                        </div>
                        <div className="otherAccount">
                            <NavLink to="/signup">I have not a Account</NavLink>
                        </div>
                    </form>
                </div>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.section`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 3.5rem 0;

    .form_Section {
        background: #006fff;
        padding: 0.8rem 2.8rem;
        border-radius: 1rem;
        transition: all 0.5s;
        width: 30rem;

        h2 {
            margin-bottom: 0.6rem;
            text-align: center;
        }
        hr {
            margin-bottom: 0.8rem;
        }
        .message {
            display: flex;
            justify-content: center;
            background: green;
            color: #000;
            padding: 0.4rem 0;
            border-radius: 0.1rem;
            margin-bottom: 0.8rem;
        }
        .messageErr {
            display: flex;
            justify-content: center;
            background: #b80303;
            color: #ddd;
            padding: 0.4rem 0;
            border-radius: 0.1rem;
            margin-bottom: 0.8rem;
        }
        div {
            padding: 2rem 0;
            position: relative;

            .label {
                position: absolute;
                color: black;
                pointer-events: none;
                font-size: 1.2rem;
                transition: all 0.2s;
                top: 2.2rem;
                left: 2.2rem;
            }
            input {
                width: 100%;
                font-size: 1.2rem;
                padding: 0.4rem 2rem;
                background: transparent;
                border: none;
                border-bottom: 2px solid #333;

                &:focus ~ .label,
                &:valid ~ .label {
                    top: 0;
                    left: 0;
                }
            }
            .icons {
                padding: 0;
                position: absolute;
                top: 2.5rem;
                right: 0;
                font-size: 1.5rem;
                cursor: pointer;
                background: transparent;
                border: none;
            }
        }
        .submit {
            text-align: center;
            button {
                color: #333;

                svg {
                    width: 2rem;
                }

                &:hover {
                    background: #ddd;
                }
            }
        }
        .otherAccount {
            a {
                color: black;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
`;

export default SignIn;
