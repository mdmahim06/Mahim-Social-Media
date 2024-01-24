import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useProfileContext } from '../../../../context/profile.context';
import Loading from '../../../../assets/images/layouts/Loading';
import axios from 'axios';
import { PROFILE_NAME_AND_BIO } from '../../../../constants/Profile.constants';

const SettingProfileb = () => {
    const { loading, profile } = useProfileContext();

    const [bio, setBio] = useState('');
    const [bioSaveBtn, setBioSaveBtn] = useState(false);
    const [loadingBioSave, setLoadingBioSave] = useState(false);
    const [bioMessage, setBioMessage] = useState({ error: false, message: '' });

    const handelBioChange = useCallback(
        (e) => {
            setBio(e.target.value);
            setBioSaveBtn(true);
        },
        [bio]
    );

    const handelSaveBio = async () => {
        setLoadingBioSave(true);
        setBioMessage({
            ...bioMessage,
            error: false,
            message: ''
        });
        await axios.get(PROFILE_NAME_AND_BIO + '?token=' + profile.token + '&&bio=' + bio).then((res) => {
            if (res.data.status === 200) {
                setBioSaveBtn(false);
                setLoadingBioSave(false);
                setBioMessage({
                    ...bioMessage,
                    error: false,
                    message: res.data.message
                });
                setTimeout(() => {
                    setBioMessage({
                        ...bioMessage,
                        error: false,
                        message: ''
                    });
                }, 1000);
            } else {
                setBioSaveBtn(false);
                setLoadingBioSave(false);
                setBioMessage({
                    ...bioMessage,
                    error: true,
                    message: res.data.message
                });
                setTimeout(() => {
                    setBioMessage({
                        ...bioMessage,
                        error: false,
                        message: ''
                    });
                }, 1000);
            }
        });
    };

    useEffect(() => {
        if (loading === false) {
            setBio(profile.bio);
        }
    }, [loading, profile]);

    return (
        <Wrapper>
            <div className="bio">
                <h1 className="title">Bio</h1>
                <textarea className="bio" maxLength={150} onChange={handelBioChange} value={bio}></textarea>
                {bioSaveBtn === true && (
                    <>
                        <span className="length">{bio.length}</span>
                        {loadingBioSave === true ? (
                            <Loading className="loading" />
                        ) : (
                            <>
                                <button
                                    className="cancel"
                                    onClick={() => {
                                        setBio(profile.bio);
                                        setBioSaveBtn(false);
                                    }}>
                                    cancel
                                </button>
                                <button onClick={handelSaveBio}>Save</button>
                            </>
                        )}
                    </>
                )}
                {bioMessage.message.length > 0 && <span className="message">{bioMessage.message}</span>}
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    width: 35rem;

    .bio {
        position: relative;

        .title {
            margin-bottom: 1.5rem;
        }
        textarea.bio {
            width: 100%;
            height: 8rem;
            border-radius: 0.5rem;
            border: none;
            padding: 1rem;
            font-size: 1.2rem;
            margin-bottom: 1rem;
            resize: none;
            text-align: left;
        }
        .length {
            position: absolute;
            right: 1rem;
            top: 11.2rem;
            font-size: 1rem;
            color: white;
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

export default SettingProfileb;
