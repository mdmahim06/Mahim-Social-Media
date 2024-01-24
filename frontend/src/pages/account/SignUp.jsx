import { useState } from 'react';
import styled from 'styled-components';
import Image from '../../assets/images/Account/SignUpImage';
import Button from '../../assets/styles/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { VALIDEDEMAILS } from '../../constants/App.constants';
import axios from 'axios';
import { ACCOUNT_API } from '../../constants/Account.constants';
import AppHelmet from '../../Helpers/AppHelmet';
import Loading from '../../assets/images/layouts/Loading';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import Cookies from 'js-cookie';

const SignUp = () => {
    const initialValues = { fname: '', lname: '', email: '', password: '' };
    const [inputs, setInputs] = useState(initialValues);
    const [loading, setLoading] = useState(false);
    const [validSmg, setValidSmg] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);
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
            await axios.post(ACCOUNT_API, inputs).then((res) => {
                if ((res.data.status = 201)) {
                    Cookies.set('username', 'true');
                    Cookies.set('token', res.data.token);
                    navigate('/username');
                }
                if ((res.data.status = 404)) {
                    setValidSmg(res.data.message);
                } else {
                    setValidSmg(res.data.message);
                }
            });
        } else {
            setValidSmg('Enter a valid email!');
        }
    };

    return (
        <>
            <AppHelmet title="Sign Up " />
            <Wrapper>
                <div className="img">
                    <Image />
                </div>
                <div className="form_Section">
                    <h2>Sign Up</h2>
                    <hr />
                    {validSmg && <h2 className="err">{validSmg}</h2>}

                    <form onSubmit={handelSubmit}>
                        <div className="fname">
                            <input type="text" name="fname" required autoComplete="off" onChange={handelChange} />
                            <label className="label" htmlFor="fname">
                                Fast name :
                            </label>
                        </div>
                        <div className="lname">
                            <input type="text" name="lname" required autoComplete="off" onChange={handelChange} />
                            <label className="label" htmlFor="lname">
                                Last name :
                            </label>
                        </div>
                        <div className="email">
                            <input type="tel" name="email" required autoComplete="off" onChange={handelChange} />
                            <label className="label" htmlFor="email">
                                Email :
                            </label>
                        </div>
                        <div className="password">
                            <input type={passwordShow ? 'tel' : 'password'} name="password" required autoComplete="off" onChange={handelChange} maxLength={16} minLength={6} />
                            <label className="label" htmlFor="password">
                                Password :
                            </label>
                            <button type="button" className="icons" onClick={() => setPasswordShow(!passwordShow)}>
                                {passwordShow ? <IoIosEyeOff /> : <IoIosEye />}
                            </button>
                        </div>
                        <div className="submit">
                            <Button type="submit">{loading ? <Loading className="loading_spinner" /> : 'Sign Up'}</Button>
                        </div>
                        <div className="otherAccount">
                            <NavLink to="/signin">I have a Account...</NavLink>
                        </div>
                    </form>
                </div>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.section`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 2.5rem 0;

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
        h2.err {
            color: #ff6600;
            text-shadow: 0 0 1rem red;
            text-decoration: underline;
            margin-bottom: 1.6rem;
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
                background: #ddd;
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

export default SignUp;
