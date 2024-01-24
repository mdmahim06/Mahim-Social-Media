import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useProfileContext } from '../../../../context/profile.context';
import Loading from '../../../../assets/images/layouts/Loading';
import { FUllName, PROFILE_IMAGE } from '../../../../constants/Profile.constants';
import { FaUserEdit } from 'react-icons/fa';
import axios from 'axios';

const SettingProfilePc = () => {    
    const { loading, profile } = useProfileContext();
    const [imgUrl, setImgUrl] = useState('');
    const [imgData, setImgData] = useState({});
    const [imgChange, setImgChange] = useState(false);
    const [loadingFormImgUpload, setLoadingImgUpload] = useState(false);
    const handelImageChange = (e) => {
        const file = e.target.files[0];
        setImgUrl(URL.createObjectURL(file));
        setImgData(file);
        setImgChange(true);
    };

    const handelImageSave = async () => {
        setLoadingImgUpload(true);
        const formData = new FormData();
        formData.append('image', imgData);
        const url = PROFILE_IMAGE + '?token=' + profile.token;
        await axios({
            method: 'POST',
            url: url,
            data: {
                imgData
            },
            headers: {
                'x-device-id': 'stuff',
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res.data === 200) {
                window.location.href = 'http://localhost:3000/profile';
            } else {
                setLoadingImgUpload(false);
                alert('Something went wrong');
            }
        });
    };

    useEffect(() => {
        if (loading === false) {
            setImgUrl(profile.avatar);
        }
    }, [loading, profile]);
  return (
    <Wrapper>
      {loading === true ? (
                <Loading />
            ) : (<div className="profilePc">
                        <div className="img">
                            <div className="iconDiv">
                                <FaUserEdit />
                            </div>
                            <img src={imgUrl} alt={FUllName(profile.fname, profile.lname)} />
                            <div className="avatar">
                                <input type="file" name="avatar" accept="image/*" onChange={handelImageChange} />
                            </div>
                        </div>
                        {imgChange === true && (
                            <div className="sc">
                                {loadingFormImgUpload === true ? (
                                    <Loading className="loading"/>
                                ) : (
                                    <>
                                        <button
                                            className="cancel"
                                            onClick={() => {
                                                setImgChange(false);
                                                setImgData({});
                                                setImgUrl(profile.avatar);
                                            }}>
                                            cancel
                                        </button>
                                        <button onClick={handelImageSave}>Save</button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
            )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
    width: 100%;

    .profilePc {
        margin-bottom: 5rem;
        width: 30rem;
        .img {
            position: relative;
            margin-left: 8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.2s;
            border-radius: 100%;
            width: 15rem;

            &:hover {
                box-shadow: 0 0 2rem black;
            }
            &:hover .iconDiv {
                opacity: 1;
            }
            .iconDiv {
                color: white;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 100%;
                background: #000000a6;
                font-size: 1.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all 0.2s;
                opacity: 0;
            }

            img {
                width: 100%;
                height: 100%;
                cursor: pointer;
                border-radius: 100%;
            }
            .avatar {
                opacity: 0;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 100%;

                input {
                    z-index: 99999;
                    width: 100%;
                    height: 100%;
                    position: sticky;
                    border-radius: 100%;
                    cursor: pointer;
                }
            }
        }
        .sc {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 2rem 0;

            .loading{
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
        }
    }
`;

export default SettingProfilePc
