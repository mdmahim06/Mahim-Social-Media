import React, { useCallback, useEffect, useState } from 'react';
import { useProfileContext } from '../../../../context/profile.context';
import { PROFILE_NAME_AND_BIO } from '../../../../constants/Profile.constants';
import axios from 'axios';
import Loading from '../../../../assets/images/layouts/Loading';
import styled from 'styled-components';

const SettingProfileName = () => {
    const { loading, profile } = useProfileContext();

    const [name, setName] = useState({ fname: '', lname: '' });
    const [nameSaveBtn, setNameSaveBtn] = useState(false);
    const [loadingNameSave, setLoadingNameSave] = useState(false);
    const [nameMessage, setNameMessage] = useState({ error: false, message: '' });

    const handelSaveBio = async () => {
        setLoadingNameSave(true);
        setNameMessage({
            ...nameMessage,
            error: false,
            message: ''
        });
        await axios.post(PROFILE_NAME_AND_BIO + '?token=' + profile.token, name).then((res) => {
            setNameSaveBtn(false);
            setLoadingNameSave(false);

            if (res.data.status === 200) {
                setNameMessage({
                    ...nameMessage,
                    error: false,
                    message: res.data.message
                });
                setTimeout(() => {
                    setNameMessage({
                        ...nameMessage,
                        error: false,
                        message: ''
                    });
                }, 1000);
            } else {
                setNameMessage({
                    ...nameMessage,
                    error: true,
                    message: res.data.message
                });
                setTimeout(() => {
                    setNameMessage({
                        ...nameMessage,
                        error: false,
                        message: ''
                    });
                }, 1000);
            }
        });
    };

    const handelNameChange = (e) => {
        setNameSaveBtn(true);
        setName({
            ...name,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        if (loading === false) {
            setName({ ...name, fname: profile.fname, lname: profile.lname });
        }
    }, [loading, profile]);
    return (
        <Wrapper>
            <div className="Name">
                <h1 className="title">Full Name</h1>
                <div className="inputs">
                    <label htmlFor="fname">Fast Name : </label>
                    <input type="text" value={name.fname} name="fname" onChange={handelNameChange} />
                    <label htmlFor="fname">Last Name : </label>
                    <input type="text" value={name.lname} name="lname" onChange={handelNameChange} />
                </div>
                {nameSaveBtn === true && (
                    <>
                        {loadingNameSave === true ? (
                            <Loading className="loading" />
                        ) : (
                            <div className="btns">
                                <button
                                    className="cancel"
                                    onClick={() => {
                                        setName({ ...name, fname: profile.fname, lname: profile.lname });
                                        setNameSaveBtn(false);
                                    }}>
                                    cancel
                                </button>
                                <button onClick={handelSaveBio}>Save</button>
                            </div>
                        )}
                    </>
                )}
                {nameMessage.message.length > 0 && <span className="message">{nameMessage.message}</span>}
            </div>
        </Wrapper>
    );
};
const Wrapper = styled.section`
    width: 46rem;
    margin: 3rem 0 6rem 0;

    .Name {
        position: relative;

        .title {
            margin-bottom: 1.5rem;
        }
        .inputs {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;

            input {
                font-size: 1.1rem;
                margin: 0 1.2rem;
                padding: 0.3rem 0.4rem;
                border: none;
                outline: none;
            }
        }

        .btns {
            display: block;
        }
    }
    .loading {
        width: 15rem;
    }
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
    span.message {
        background: #008000a8;
        padding: 0.5rem 2rem;
        display: block;
    }
`;
export default SettingProfileName;
