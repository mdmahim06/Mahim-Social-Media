import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../assets/styles/Button';
import { useProfileContext } from '../../context/profile.context';
import { FaCircleChevronDown } from 'react-icons/fa6';
import { IoMdSettings } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';
import Cookies from 'js-cookie';

const Nav = () => {
    const { login, profile } = useProfileContext();
    const [profileMenuShow, setProfileMenuShow] = useState(false);

    const handelLogOut = () => {
        Cookies.remove('login');
        Cookies.remove('token');

        setInterval(() => {
            window.location.href = 'http://localhost:3000/signin';
        }, 400);
    };

    return (
        <Wrapper>
            <ul>
                <li>
                    <NavLink to="/" onClick={() => setProfileMenuShow(false)}>
                        Home
                    </NavLink>
                </li>
                {login === false && (
                    <>
                        <li>
                            <NavLink to="/about" onClick={() => setProfileMenuShow(false)}>
                                About
                            </NavLink>
                        </li>
                    </>
                )}

                {login && profile && (
                    <>
                        <li>
                            <NavLink to="/contact" onClick={() => setProfileMenuShow(false)}>
                                Contact
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/posts" onClick={() => setProfileMenuShow(false)}>
                                Posts
                            </NavLink>
                        </li>
                    </>
                )}
                {login && profile ? (
                    <li>
                        <button
                            type="button"
                            className="profile"
                            onClick={() => {
                                setProfileMenuShow(!profileMenuShow);
                            }}>
                            <img src={profile.avatar} alt={profile.username} title={profile.username} />
                            <div className="icon">
                                <FaCircleChevronDown />
                            </div>
                        </button>
                        <div className={`profileMenu ${profileMenuShow === true ? 'profileMenuShow' : ''}`}>
                            <div className="profile">
                                <NavLink to="/profile" onClick={() => setProfileMenuShow(!profileMenuShow)}>
                                    <img src={profile.avatar} alt={profile.username} />
                                    <span className="username">{profile.username !== undefined && profile.username.length >= 10 ? profile.username.slice(0, 10) + '...' : profile.username}</span>
                                </NavLink>
                            </div>
                            <hr />
                            <ul>
                                <li>
                                    <NavLink to="/Setting/profile" onClick={() => setProfileMenuShow(!profileMenuShow)}>
                                        <IoMdSettings className="profileMenuIcons" />
                                        Settings & privacy
                                    </NavLink>
                                </li>
                                <li>
                                    <button type="button" className="logOut" onClick={handelLogOut}>
                                        <IoLogOut className="profileMenuIcons" />
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </li>
                ) : (
                    <li>
                        <NavLink to="/signin">
                            <Button>Sign In</Button>
                        </NavLink>
                    </li>
                )}
            </ul>
        </Wrapper>
    );
};

const Wrapper = styled.nav`
    ul {
        display: flex;
        justify-content: space-between;
        align-items: center;

        li {
            margin: 0 2.8rem;
            position: relative;

            .profile {
                width: 3rem;
                height: 3rem;
                cursor: pointer;
                border: none;
                border-radius: 100%;
                background: transparent;
                transition: all 0.2s;
                position: relative;

                &:active {
                    transform: scale(0.95);
                    filter: brightness(0.6);
                }

                img {
                    width: 100%;
                    border-radius: 100%;
                    width: 3rem;
                    height: 3rem;
                }
                .icon {
                    color: #444;
                    position: absolute;
                    top: 33px;
                    right: 3px;
                    border-radius: 100%;
                    pointer-events: none;
                }
            }
            .profileMenu {
                position: absolute;
                background: #444;
                border-radius: 0.5rem;
                left: -17.1rem;
                top: 3.6rem;
                padding: 0.5rem 0;
                width: 20rem;
                z-index: 999999999;
                transition: all 0.1s;
                transform: translateY(-2rem);
                opacity: 0;
                pointer-events: none;

                ul {
                    margin-top: 0.8rem;
                    flex-direction: column;
                    li {
                        display: block;
                        width: 100%;
                        margin: 0.5rem 0rem;

                        a {
                            display: flex;
                            justify-content: start;
                            align-items: center;
                            color: white;
                            font-size: 1.1rem;
                            width: 86%;
                            margin: auto;
                            padding: 0.8rem 1rem;
                            border-radius: 1rem;
                            transition: all 0.1s;
                            border: 1px solid;
                            border-color: transparent;

                            &:hover {
                                border-color: white;
                            }
                            &:active {
                                filter: brightness(0.6);
                                transform: scale(0.97);
                            }
                        }
                        button {
                            color: white;
                            background: transparent;
                            display: flex;
                            justify-content: start;
                            align-items: center;
                            font-size: 1.1rem;
                            width: 86%;
                            margin: auto;
                            padding: 0.8rem 1rem;
                            border-radius: 1rem;
                            transition: all 0.1s;
                            border: 1px solid;
                            border-color: transparent;
                            cursor: pointer;

                            &:hover {
                                border-color: white;
                            }
                            &:active {
                                filter: brightness(0.6);
                                transform: scale(0.97);
                                background: red;
                            }
                        }
                    }
                    .profileMenuIcons {
                        font-size: 1.5rem;
                        background: #666;
                        margin-right: 1rem;
                        padding: 0.4rem;
                        box-sizing: content-box;
                        border-radius: 100%;
                    }
                }
                hr {
                    width: 65%;
                    margin: auto;
                }
                .profile {
                    display: flex;
                    width: 100%;
                    justify-content: center;
                    align-items: center;
                    margin: 1rem 0 2rem 0;

                    a {
                        display: flex;
                        justify-content: start;
                        align-items: center;
                        width: 90%;
                        color: white !important;
                        border: 1px solid transparent;
                        border-radius: 1rem;
                        padding: 0.5rem 2rem;

                        &:hover {
                            border: 1px solid #ddd;
                        }
                        img {
                            width: 3rem;
                            height: 3rem;
                            margin-right: 1rem;
                        }
                    }
                    span.username {
                        overflow: hidden;
                    }
                }
            }
            .profileMenuShow {
                transform: translateY(2rem) !important;
                opacity: 1 !important;
                pointer-events: all;
            }

            a {
                color: white;
                transition: all 0.2s;
                font-size: 1.2rem;
                font-weight: bold;

                &:hover {
                    color: #b7b3b3;
                }
            }
            .active {
                color: greenyellow;
            }
        }
    }
`;

export default Nav;
