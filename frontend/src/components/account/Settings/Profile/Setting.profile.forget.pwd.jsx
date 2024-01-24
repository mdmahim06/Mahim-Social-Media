import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PROFILE_FORGET_PASSWORD } from '../../../../constants/Profile.constants';
import { useProfileContext } from '../../../../context/profile.context';
import Loading from '../../../../assets/images/layouts/Loading';
import Button from '../../../../assets/styles/Button';

const SettingProfileForgetPwd = () => {
    const { loading, profile } = useProfileContext();
    const codeInitialVal = {
        codeConfirm: false,
        codeVal: ''
    };
    const inputsInitialVal = {
        newPassword: '',
        confirmPassword: ''
    };
    const [showForgetBtn, setShowForgetBtn] = useState(false);
    const [code, setCode] = useState(codeInitialVal);
    const [verifyCode, setVerifyCode] = useState('');
    const [inputs, setInputs] = useState(inputsInitialVal);
    const [loadingPwd, setLoadingPwd] = useState(false);
    const [errSmg, setErrSmg] = useState({
        error: false,
        message: ''
    });

    const handelCodeConfirm = async (e) => {
        setCode({ ...code, codeVal: e.target.value });
    };

    const handelSubmit = async () => {
        if (inputs.newPassword === inputs.confirmPassword) {
            setLoadingPwd(true);
            await axios.post(PROFILE_FORGET_PASSWORD, { password: inputs.confirmPassword, token: profile.token }).then((res) => {
                if (res.data === 202) {
                    setLoadingPwd(true);
                    setTimeout(() => {
                        setLoadingPwd(false);
                        window.location.href = 'http://localhost:3000/profile';
                    }, 1000);
                }
            });
        } else {
            setErrSmg({
                ...errSmg,
                error: true,
                message: 'New password and confirm password do not match!'
            });
        }
    };

    const sendCode = async () => {
        await axios.get(PROFILE_FORGET_PASSWORD + '?email=' + profile.email).then((res) => {
            if (res.data === 500) {
                setCode(codeInitialVal);
                setShowForgetBtn(false);
                alert('server error!');
            } else {
                setCode(codeInitialVal);
                setShowForgetBtn(true);
                setVerifyCode(res.data.code);
            }
        });
    };

    useEffect(() => {
        const verifyedCode = JSON.stringify(verifyCode);
        if (code.codeVal >= 4 && code.codeVal === verifyedCode) {
            setCode({ ...code, codeConfirm: true });
        }
    }, [verifyCode, code.codeVal]);
    return (
        <Wrapper>
            {loading === false ? (
                showForgetBtn === true ? (
                    <div className="forget">
                        <h2>Forget password</h2>
                        <br />
                        {code.codeConfirm === true ? (
                            <>
                                <div className="inputs">
                                    <input
                                        type="text"
                                        value={inputs.newPassword}
                                        onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                                        name="newPassword"
                                        placeholder="Enter New Password"
                                        autoComplete="off"
                                    />{' '}
                                    <br />
                                    <br />
                                    <input
                                        type="text"
                                        value={inputs.confirmPassword}
                                        onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                                        name="confirmPassword"
                                        placeholder="Confirm your Password"
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="submit">
                                    <Button type="submit" onClick={handelSubmit}>
                                        Submit
                                    </Button>
                                </div>
                                <br />
                                {errSmg.error === true && <span className="errSmg">{errSmg.message}</span>}
                                <br />
                                {loadingPwd === true && <Loading />}
                            </>
                        ) : (
                            <>
                                <div className="code">
                                    <input type="text" placeholder="Enter code" onChange={handelCodeConfirm} autoFocus autoComplete="off" />
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <button
                        className="forgetShowBtn"
                        onClick={() => {
                            setShowForgetBtn(true);
                            sendCode();
                        }}>
                        I forget my password
                    </button>
                )
            ) : (
                <Loading />
            )}
        </Wrapper>
    );
};

const Wrapper = styled.section`
    width: 27rem;
    margin: 2rem 1rem;

    .forget {
        width: 22rem;
        input {
            font-size: 1.4rem;
            border: 2px solid #ddd;
            padding: 0.5rem 2rem;
            border-radius: 1rem;
            background: #333;
            transition: all 0.2s;
            text-align: center;

            &:focus {
                background: #ddd;
                color: black;
            }
        }
        .submit {
            width: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
            margin: 2rem 0;
        }
        .errSmg {
            margin: 2rem 0;
            color: red;
            padding: 1.2rem 2.5rem;
            font-size: 1.2rem;
            width: 100%;
        }
    }

    .forgetShowBtn {
        cursor: pointer;
        background: transparent;
        border: none;
        color: blue;

        &:hover,
        &:focus {
            text-decoration: underline;
        }
    }
`;

export default SettingProfileForgetPwd;
