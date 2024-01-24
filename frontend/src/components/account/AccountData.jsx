import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { FUllName } from '../../constants/Profile.constants';
import axios from 'axios';

const AccountData = ({ data, view }) => {
    const [user, setUser] = useState(null);
    const { username, fname, lname, avatar, bio, date } = data;

    const getUser = async (username) => {
        await axios.get(`http://localhost/mahim-social/backend/account/accountView.php?username=${username}`).then((res) => {
            res.data !== 500 && setUser(res.data);
        });
    };

    useEffect(() => {
        if (view !== false) {
            getUser(view);
        } else {
            setUser(null);
        }
    }, [view]);

    return (
        <Wrapper>
            {user === null ? (
                <>
                    <div className="img">
                        <img src={avatar} alt={username} />
                    </div>
                    <div className="info">
                        <h2>{FUllName(fname, lname)}</h2>
                        <p className="username">{username}</p>
                        <p className="bio">{bio}</p>
                        <div className="edit">
                            <NavLink to="/setting/profile">
                                <button>Edit Profile</button>
                            </NavLink>
                        </div>
                        <span className="date">
                            <BsFillCalendarDateFill className="icon" />
                            {date && date.length > 0 && date.slice(0, 10)}
                        </span>
                    </div>
                </>
            ) : (
                <>
                    <div className="img">
                        <img src={user.avatar} alt={user.username} />
                    </div>
                    <div className="info">
                        <h2>{FUllName(user.fname, user.lname)}</h2>
                        <p className="username">{user.username}</p>
                        <p className="bio">{user.bio}</p>
                    </div>
                </>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.section`
    overflow: hidden;
    background: transparent;
    width: 16rem;

    .info {
        h2 {
            margin: 0.6rem 0 1rem 0;
        }
        .username {
            margin-bottom: 1rem;
            color: #888;
        }
        .bio {
            width: 100%;
            padding: 0.8rem 1rem;
            font-size: 0.8rem;
            margin-bottom: 0.5rem;
        }
        .edit {
            a {
                width: 100%;
                display: flex;
                flex-direction: columns;
                justify-content: center;
                align-items: center;
                margin-bottom: 0.8rem;

                button {
                    width: 65%;
                    font-size: 1rem;
                    padding: 0.5rem 0;
                    font-weight: bold;
                    border: 1px solid;
                    border-color: transparent;
                    background: #555;
                    color: white;
                    border-radius: 0.4rem;
                    cursor: pointer;
                    transition: all 0.2s;

                    &:hover {
                        border-color: white;
                        box-shadow: -5px 4px 5px white;
                    }
                    &:active {
                        transform: scale(0.96);
                        filter: brightness(0.8);
                    }
                }
            }
        }
        .date {
            margin: 2rem 0;
            display: block;

            .icon {
                margin-right: 1.2rem;
                font-size: 1.2rem;
                transform: translateY(0.2rem);
            }
        }
    }

    .img {
        img {
            width: 15rem;
            height: 15rem;
            border-radius: 100%;
        }
    }
`;

export default AccountData;
