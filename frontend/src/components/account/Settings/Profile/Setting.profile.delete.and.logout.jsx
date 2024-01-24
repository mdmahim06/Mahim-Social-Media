import React from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';
import { PROFILE_DELETE_ACCOUNT } from '../../../../constants/Profile.constants';

const SettingProfileDeleteAndLogout = () => {
    const handelLogOut = () => {
        const confirm = window.confirm('Are you sure to log out your account?');
        if (confirm) {
            Cookies.remove('login');
            Cookies.remove('token');
            setInterval(() => {
                window.location.href = 'http://localhost:3000/signin';
            }, 400);
        }
    };
    const handelDeleteAccount = async () => {
        const confirm = window.confirm('Are you sure to Delete your account?Once you delete your account, there is no going back. Please be certain.');
        if (confirm) {
            const token = Cookies.get('token');
            const url = PROFILE_DELETE_ACCOUNT + '?token=' + token;
            await axios.get(url).then((res) => {
                if (res.data === 202) {
                    Cookies.remove('login');
                    Cookies.remove('token');
                    setInterval(() => {
                        window.location.href = 'http://localhost:3000/signin';
                    }, 400);
                } else {
                    alert('Server Error!');
                }
            });
        }
    };
    return (
        <Wrapper>
            <h2>Account</h2>
            <div className="btns">
                <button type="button" onClick={handelLogOut}>
                    Log Out
                </button>
                <br />
                <button type="button" title="Once you delete your account, there is no going back. Please be certain." onClick={handelDeleteAccount}>
                    Delete account
                </button>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    width: 30rem;
    margin-bottom: 2.5rem;

    h2 {
        margin-bottom: 0.6rem;
        color: red;
    }
    .btns {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: 1.2rem;

        button {
            margin: 0 1rem;
            padding: 0.5rem 1rem;
            border-radius: 0.2rem;
            border: 2px solid;
            border-color: red;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 1.2rem;
            font-weight: bold;
            color: red;
            background: transparent;

            &:hover {
                background: red;
                color: black;
                border-radius: 1rem;
            }
            &:active {
                filter: brightness(0.6);
                transform: scale(0.97);
                background: red;
                color: black;
                border-radius: 1rem;
            }
        }
    }
`;

export default SettingProfileDeleteAndLogout;
