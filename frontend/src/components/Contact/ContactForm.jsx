import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../assets/styles/Button';
import axios from 'axios';
import { CONTACT_POST_API } from '../../constants/App.constants';
import { useProfileContext } from '../../context/profile.context';
import Loading from '../../assets/images/layouts/Loading';

const ContactForm = () => {
    const { loading, profile, login } = useProfileContext();
    const [data, setData] = useState({
        username: '',
        email: '',
        message: ''
    });
    const [ContactLoading, setLoading] = useState(false);
    const [resMessage, setResMessage] = useState('');
    const [error, setError] = useState(false);

    const changeValue = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (data.message.length > 0) {
            setLoading(true);
            await axios.post(CONTACT_POST_API, data).then((res) => {
                console.log("🚀 ~ file: ContactForm.jsx:32 ~ awaitaxios.post ~ res:  ", res);
                if ((res.data.status = 201)) {
                    setData({
                        ...data,
                        message: ''
                    });
                    setLoading(false);
                    setError(false);
                    setResMessage(res.data.message);
                    setInterval(() => {
                        window.location.reload();
                    }, 1500);
                } else {
                    setLoading(false);
                    setError(true);
                    setResMessage(res.data.message);
                    setInterval(() => {
                        window.location.reload();
                    }, 1500);
                }
            });
        }
    };

    useEffect(() => {
        setData({
            ...data,
            username: profile.username,
            email: profile.email
        });
    }, [loading, profile]);

    return (
        <Wrapper className="form_section" >
            <h2>Contact Us</h2>
            <hr />
            {resMessage && (
                <h3 className="resMessage" style={{ color: `${error ? 'red' : '#080a36'}` }}>
                    {resMessage}
                </h3>
            )}
            {login === true ? (
                loading === true ? (
                    <Loading className="loading" />
                ) : (
                    <form className="form" onSubmit={handelSubmit}>
                        <div className="message">
                            <label htmlFor="Message :">Message :</label>
                            <br />
                            <textarea type="text" name="message" value={data.message} onChange={changeValue} placeholder="Enter you Message" required></textarea>
                        </div>
                        <div className="submit">
                            <Button type="submit">{ContactLoading ? 'Loading...' : 'Submit'}</Button>
                        </div>
                    </form>
                )
            ) : (
                <a href="http://localhost:3000/signin">
                    <Button type="button">Please Sign In</Button>
                </a>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background: #015eff;
    padding: 1.5rem 3.5rem;
    border-radius: 1rem;

    h2 {
        margin-bottom: 0.5rem;
        text-align: center;
        width: 100%;
    }
    hr {
        margin-bottom: 0.6rem;
    }
    .form {
        width: 22rem;
        div {
            position: relative;
            margin: 2.5rem 0;

            .inputLbl {
                position: absolute;
                color: black;
                pointer-events: none;
                margin: 0.5rem 1rem;
                font-size: 1.2rem;
                transition: all 0.2s;
                top: 0;
                left: 0;
            }
            input {
                width: 100%;
                font-size: 1.2rem;
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 0.1rem;
                background: transparent;
                border-bottom: 2px solid black;

                &:focus ~ .inputLbl,
                &:valid ~ .inputLbl {
                    top: -33px;
                    left: -17px;
                }
            }
        }
        .message {
            label {
                color: black;
                pointer-events: none;
                font-size: 1.2rem;
                margin-bottom: 1.2rem;
                display: inline-block;
            }
            textarea {
                width: 100%;
                height: 10rem;
                font-size: 1rem;
                padding: 0.5rem 1rem;
                border: none;
                resize: none;
                border-radius: 0.1rem;
                transition: all 0.5s;

                &:focus,
                &:valid {
                    border-radius: 0.5rem;
                }

                &::-webkit-scrollbar {
                    width: 1rem;
                }

                &::-webkit-scrollbar-track {
                    background-color: white;
                }

                &::-webkit-scrollbar-thumb {
                    background: #333;
                    border: 5px solid transparent;
                    border-radius: 9px;
                    background-clip: content-box;
                }
            }
        }
        .submit {
            text-align: center;
            button {
                background: #fff;
                color: black;
            }
        }
    }

    .resMessage {
        margin: 2rem;
        font-weight: bold;
        text-transform: capitalize;
    }
`;

export default ContactForm;
