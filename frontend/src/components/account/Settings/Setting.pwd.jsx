import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loading from '../../../assets/images/layouts/Loading';
import Cookies from 'js-cookie';
import axios from 'axios';
import { PROFILE_PASSWORD } from '../../../constants/Profile.constants';
import SettingProfileForgetPwd from './Profile/Setting.profile.forget.pwd';

const SettingPwd = () => {
    const initialVal = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    };
    const [passwords, setPasswords] = useState(initialVal);
    const [passwordSaveBtn, setPasswordSaveBtn] = useState(false);
    const [loadingPwdSave, setLoadingPwdSave] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState({ error: false, message: '' });
    const [valid, setValid] = useState(false);

    const token = Cookies.get('token');

    const handelChangePwd = (e) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });
    };
    const handelSavePwd = async () => {
        if (valid === true) {
            if (passwords.newPassword.length >= 6 && passwords.confirmPassword.length >= 6) {
                if (passwords.newPassword === passwords.confirmPassword) {
                    setLoadingPwdSave(true);
                    await axios.post(PROFILE_PASSWORD, { token, pwd: passwords.confirmPassword }).then((res) => {
                        setLoadingPwdSave(false);
                        if (res.data === 202) {
                            setPasswordMessage({
                                error: false,
                                message: 'Password updated'
                            });
                            setTimeout(() => {
                                setPasswordMessage({ error: false, message: '' });
                                window.location.reload();
                            }, 1500);
                        } else {
                            setPasswordMessage({
                                error: true,
                                message: 'Server Error!'
                            });
                            setTimeout(() => {
                                setPasswordMessage({ error: false, message: '' });
                            }, 1500);
                        }
                    });
                } else {
                    setPasswordMessage({
                        error: true,
                        message: 'New password and confirm password do not match!'
                    });
                    setTimeout(() => {
                        setPasswordMessage({ error: false, message: '' });
                    }, 1500);
                }
            } else {
                setPasswordMessage({
                    error: true,
                    message: 'New password must be at least 6 characters long!'
                });
                setTimeout(() => {
                    setPasswordMessage({ error: false, message: '' });
                }, 1500);
            }
        } else {
            setPasswordMessage({ error: true, message: 'Incorrect old password!' });
            setTimeout(() => {
                setPasswordMessage({ error: false, message: '' });
            }, 1500);
        }
    };

    const getPassword = async () => {
        if (passwords.oldPassword.length >= 6) {
            await axios.get(PROFILE_PASSWORD + '?token=' + token + '&&pwd=' + passwords.oldPassword).then((res) => {
                if (res.data === true) {
                    setValid(true);
                    setPasswordSaveBtn(true);
                } else {
                    setPasswordSaveBtn(false);
                    setValid(false);
                }
            });
        }
    };

    useEffect(() => {
        getPassword();
    }, [passwords.oldPassword]);
    return (
        <Wrapper>
            <h1 className="title">Password</h1>
            <p className="info">please enter minimum 6 characters</p>
            <div className="inputs">
                <div className="oldPassword">
                    <input
                        type="password"
                        name="oldPassword"
                        value={passwords.oldPassword}
                        onChange={handelChangePwd}
                        autoFocus
                        autoComplete="off"
                        placeholder="Enter Old Password"
                        minLength={6}
                        required
                    />
                </div>
                <div className="NewPassword">
                    <input type="password" name="newPassword" value={passwords.newPassword} onChange={handelChangePwd} autoComplete="off" placeholder="Enter New Password" minLength={6} required />
                </div>
                <div className="confirmPassword">
                    <input
                        type="password"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handelChangePwd}
                        autoComplete="off"
                        placeholder="Retype Password"
                        minLength={6}
                        required
                    />
                </div>
            </div>
            {passwordSaveBtn === true && (
                <>
                    {loadingPwdSave === true ? (
                        <Loading className="loading" />
                    ) : (
                        <div className="btns">
                            <button
                                className="cancel"
                                onClick={() => {
                                    setPasswords(initialVal);
                                    setPasswordSaveBtn(false);
                                }}>
                                cancel
                            </button>
                            <button onClick={handelSavePwd}>Save</button>
                        </div>
                    )}
                </>
            )}
            {passwordMessage.message.length > 0 && (
                <span className="message" style={{ background: `${passwordMessage.error === false ? '#008000a8' : '#cd1a1aa8'}` }}>
                    {passwordMessage.message}
                </span>
            )}

            <SettingProfileForgetPwd />
        </Wrapper>
    );
};

const Wrapper = styled.section`
    width: 27rem;
    margin: 2rem 3rem;

    h1.title {
        margin-bottom: 1rem;
    }
    p.info {
        margin-bottom: 1rem;
        font-size: small;
        font-weight: 400;
        color: #14ac14b5;

        &::first-letter {
            text-transform: capitalize;
        }
    }
    .inputs {
        position: relative;
        width: 25rem;

        div {
            input {
                font-size: 1.1rem;
                margin: 0.5rem 0.8rem;
                padding: 0.5rem 0.6rem;
                background: #444;
                border: 1px solid white;
                border-radius: 0.4rem;
                color: #ddd;
                width: 20rem;
                transition: all 0.2s;

                &:focus {
                    color: #333;
                    background: #ddd;
                }
            }
            label {
                position: absolute;
                top: 0.1rem;
                right: 1.2rem;
                font-size: 2rem;
                pointer-events: none;
                width: 2rem;
            }
        }
    }

    .loading {
        width: 15rem;
    }
    .btns {
        display: block;
        margin: 2.5rem 0;

        button {
            font-size: 1.2rem;
            padding: 0.4rem 2rem;
            text-transform: capitalize;
            margin: 0 1rem;
            border-radius: 0.4rem;
            border: none;
            transition: all 0.2s;
            cursor: pointer;

            &:hover {
                background: green;
            }
        }
        .cancel {
            &:hover {
                background: red;
            }
        }
    }

    span.message {
        padding: 0.5rem 2rem;
        display: block;
    }
`;

export default SettingPwd;
