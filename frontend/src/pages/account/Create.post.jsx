import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../assets/styles/Button';
import postForm from '../../assets/images/Account/postForm.png';
import Loading from '../../assets/images/layouts/Loading';
import axios from 'axios';
import { POST_API } from '../../constants/Post.constants';
import Cookies from 'js-cookie';

const Createpost = () => {
    const postInitialVal = {
        title: '',
        content: '',
        image: {
            url: '',
            data: {}
        },
        token: ''
    };
    const [inputs, setInputs] = useState(postInitialVal);
    const [loading, setLoading] = useState(false);

    const handelInputsChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };
    const handelImageChange = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setInputs({
            ...inputs,
            image: {
                ...inputs.image,
                url,
                data: file
            }
        });
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios({
            method: 'POST',
            url: POST_API,
            data: inputs,
            headers: {
                'x-device-id': 'stuff',
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res.data === 200) {
                window.location.href = 'http://localhost:3000/profile';
            } else {
                alert('Something went wrong');
            }
        });
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setInputs({
                ...inputs,
                token
            });
        }
    }, []);

    return (
        <Wrapper>
            <h1 className="title">Create Post</h1>
            <br />
            <form className="form" onSubmit={handelSubmit}>
                {loading === true && (
                    <div className="loading">
                        <Loading />
                    </div>
                )}
                <div className="txtData">
                    <input
                        type="text"
                        placeholder="Title"
                        title="Enter your post title"
                        name="title"
                        value={inputs.title}
                        onChange={handelInputsChange}
                        required
                        autoComplete="off"
                        autoFocus
                        maxLength={150}
                    />
                </div>
                <div className="txtData">
                    <textarea
                        name="content"
                        placeholder="Content"
                        title="Enter you content"
                        value={inputs.content}
                        onChange={handelInputsChange}
                        required
                        autoComplete="off"
                        maxLength={400}></textarea>
                </div>
                <div className="image">
                    <input type="file" name="image" accept="image/*" onChange={handelImageChange} required />
                    <br />
                    {inputs.image.url.length > 0 ? (
                        <img className="viewImg" src={inputs.image.url} alt={inputs.image.data.name} />
                    ) : (
                        <img className="viewImg" src={postForm} alt="Enter img" title="Please select a image" />
                    )}
                </div>
                <div className="submit">
                    <Button type="submit">Post</Button>
                </div>
            </form>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem 0;

    .form {
        background: #1b1be2;
        padding: 1.2rem 2.5rem;
        border-radius: 0.5rem;
        text-align: left;
        width: 40rem;
        position: relative;

        .txtData {
            margin: 1rem 0;

            input,
            textarea {
                width: 100%;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                border: none;
                outline: none;
                font-size: 1.2rem;
                font-weight: 600;
                color: #fff;
                background: #333;
                resize: none;
            }

            textarea {
                height: 8rem !important;
                width: 100% !important;

                &::-webkit-scrollbar {
                    width: 1rem;
                }

                &::-webkit-scrollbar-track {
                    background-color: transparent;
                }

                &::-webkit-scrollbar-thumb {
                    background: #fff;
                    border: 5px solid transparent;
                    border-radius: 9px;
                    background-clip: content-box;
                }
            }
        }
        .image {
            width: 20rem;
            width: 20rem;
            height: auto;
            margin: auto;
            position: relative;
            input {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
            }
            .viewImg {
                width: 100%;
                object-fit: cover;
                object-position: center;
            }
        }

        .submit {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 1rem;

            button {
                background: #26840f;
            }
        }
        .loading {
            position: absolute;
            width: 100%;
            height: 100%;
            background: #00000072;
            border-radius: 0.5rem;
            z-index: 999;
            top: 0;
            left: 0;
        }
    }
    .title {
        font-size: 2rem;
        font-weight: 600;
    }
`;

export default Createpost;
