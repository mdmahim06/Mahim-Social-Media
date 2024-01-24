import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useProfileContext } from '../../../context/profile.context';
import Loading from '../../../assets/images/layouts/Loading';
import { FcCancel } from 'react-icons/fc';
import { FaRegCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { EMAIL_API } from '../../../constants/Account.constants';
import { VALIDEDEMAILS } from '../../../constants/App.constants';
import Cookies from 'js-cookie';

const SettingEmail = () => {
    const { loading, profile } = useProfileContext();

    const [email, setEmail] = useState('');
    const [emailSaveBtn, setEmailSaveBtn] = useState(false);
    const [loadingEmailSave, setLoadingEmailSave] = useState(false);
    const [emailMessage, setEmailMessage] = useState({ error: false, message: '' });
    const [icons, setIcons] = useState({
        loading: false,
        cancel: false,
        check: false
    });
    const [valid, setValid] = useState(false);

    const handelSaveEmail = async (e) => {
        e.preventDefault();
        if (valid === true) {
            setLoadingEmailSave(true);
            await axios.post(EMAIL_API, { token: profile.token, email }).then((res) => {
                setLoadingEmailSave(false);
                if (res.data === 202) {
                    setEmailMessage({
                        ...emailMessage,
                        error: false,
                        message: res.data.message
                    });
                    setTimeout(() => {
                        setEmailMessage({
                            ...emailMessage,
                            error: false,
                            message: ''
                        });
                        Cookies.remove('login');

                        window.location.href = 'http://localhost:3000/signin';
                    }, 1000);
                } else {
                    setEmailMessage({
                        ...emailMessage,
                        error: true,
                        message: res.data.message
                    });
                    setTimeout(() => {
                        setEmailMessage({
                            ...emailMessage,
                            error: false,
                            message: ''
                        });
                    }, 1000);
                }
            });
        } else {
            setEmailMessage({
                ...emailMessage,
                error: true,
                message: 'Email not valid!'
            });
            setTimeout(() => {
                setEmailMessage({
                    ...emailMessage,
                    error: false,
                    message: ''
                });
            }, 1000);
        }
    };

    const getEmail = async (emailAddr) => {
        setIcons({
            ...icons,
            loading: true,
            cancel: false,
            check: false
        });
        await axios.get(EMAIL_API + '?email=' + emailAddr).then((res) => {
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

    const handelChangeEmail = useCallback(
        (e) => {
            const value = e.target.value;
            setEmail(value);
            setEmailSaveBtn(true);
            if (VALIDEDEMAILS(value)) {
                getEmail(value);
            } else {
                setIcons({
                    ...icons,
                    loading: false,
                    cancel: true,
                    check: false
                });
            }
        },
        [email]
    );

    useEffect(() => {
        if (loading === false) {
            setEmail(profile.email);
        }
        setIcons({
            ...icons,
            loading: false,
            cancel: false,
            check: false
        });
    }, []);

    useEffect(() => {
        if (loading === false) {
            setEmail(profile.email);
        }
    }, [loading, profile]);
    return (
        <Wrapper>
            <h1 className="title">Change Email</h1>
            <div className="inputs">
                <input type="tel" className="email" value={email} onChange={handelChangeEmail} autoFocus autoComplete="off" />
                <label style={{ color: `${icons.check === true ? 'green' : 'red'}` }}>
                    {icons.loading === true && <Loading />}
                    {icons.cancel === true && <FcCancel />}
                    {icons.check === true && <FaRegCheckCircle />}
                </label>
            </div>
            {emailSaveBtn === true && (
                <>
                    {loadingEmailSave === true ? (
                        <Loading className="loading" />
                    ) : (
                        <div className="btns">
                            <button
                                className="cancel"
                                onClick={() => {
                                    setEmail(profile.bio);
                                    setEmailSaveBtn(false);
                                }}>
                                cancel
                            </button>
                            <button onClick={handelSaveEmail}>Save</button>
                        </div>
                    )}
                </>
            )}
            {emailMessage.message.length > 0 && <span className="message">{emailMessage.message}</span>}
        </Wrapper>
    );
};

const Wrapper = styled.section`
    h1.title {
        margin-bottom: 1.5rem;
    }
    .inputs {
        position: relative;
        width: 25rem;

        input.email {
            font-size: 1.1rem;
            margin: 0 1.2rem;
            padding: 0.5rem 0.6rem;
            background: #444;
            border: 1px solid white;
            border-radius: 0.4rem;
            color: #ddd;
            width: 20rem;
            transition: all 0.2s;

            &:focus {
                color: #fff;
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

    .loading {
        width: 2rem;
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
        background: #008000a8;
        padding: 0.5rem 2rem;
        display: block;
    }
`;

export default SettingEmail;
