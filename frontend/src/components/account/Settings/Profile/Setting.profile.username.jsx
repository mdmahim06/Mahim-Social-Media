import React, { useEffect, useState } from 'react';
import { useProfileContext } from '../../../../context/profile.context';
import styled from 'styled-components';
import Loading from '../../../../assets/images/layouts/Loading';
import axios from 'axios';
import { USERNAME_API } from '../../../../constants/Account.constants';
import { VALIDUSRNAMES } from '../../../../constants/App.constants';
import { FcCancel } from 'react-icons/fc';
import { FaRegCheckCircle } from 'react-icons/fa';
import Button from '../../../../assets/styles/Button';

const SettingProfileUsername = () => {
    const { loading, profile } = useProfileContext();
    const [showUserName, setShowUserName] = useState(false);
    const [username, setUsername] = useState('');
    const [txtErr, setTxtErr] = useState('');
    const [valid, setValid] = useState(false);
    const [icons, setIcons] = useState({
        loading: false,
        cancel: false,
        check: false
    });

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (valid === true) {
            await axios.post(USERNAME_API, { username, token: profile.token }).then((res) => {
                if (res.data === 202) {
                    alert('username is updated');
                    window.location.reload();
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
        <Wrapper>
            {loading === true ? (
                <Loading />
            ) : (
                <>
                    {showUserName === false ? (
                        <>
                            <button className="changeUsername" onClick={() => setShowUserName(true)}>
                                Change Username
                            </button>
                        </>
                    ) : (
                        <>
                            <h1>User Name</h1>
                            <div className="form">
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
                                    <Button onClick={handelSubmit}>Submit</Button>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20rem;
    margin: 5rem 0;

    .form {
        margin-top: 2rem;
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

    .changeUsername {
        font-size: 1.4rem;
        border: 2px solid transparent;
        border-color: transparent;
        padding: 0.5rem 2rem;
        border-radius: 1rem;
        background: #333;
        color: #ddd;
        transition: all 0.2s;
        text-align: center;
        cursor: pointer;

        &:hover {
            border-color: #ddd;
            background: #ddd;
            color: black;
        }
    }
`;

export default SettingProfileUsername;
