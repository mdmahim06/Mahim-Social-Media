import { styled } from 'styled-components';
import SettingNav from '../../components/account/Settings/Setting.nav';
import { useEffect, useState } from 'react';
import SettingProfile from '../../components/account/Settings/Profile/Setting.profile';
import SettingEmail from '../../components/account/Settings/Setting.email';
import SettingPwd from '../../components/account/Settings/Setting.pwd';
import { useProfileContext } from '../../context/profile.context';
import Loading from '../../assets/images/layouts/Loading';
import { NavLink } from 'react-router-dom';
import AppHelmet from '../../Helpers/AppHelmet';
import { FUllName } from '../../constants/Profile.constants';

const Setting = ({ settingType }) => {
    const { loading, profile } = useProfileContext();

    const [profileSh, setProfile] = useState(false);
    const [email, setEmail] = useState(false);
    const [pwd, setPwd] = useState(false);

    useEffect(() => {
        if (settingType === 'profile') {
            setProfile(true);
            setEmail(false);
            setPwd(false);
        }
        if (settingType === 'email') {
            setProfile(false);
            setEmail(true);
            setPwd(false);
        }
        if (settingType === 'pwd') {
            setProfile(false);
            setEmail(false);
            setPwd(true);
        }
    }, [settingType]);

    return (
        <>
            <AppHelmet title={`${profileSh ? 'profile' : email ? 'email' : pwd ? 'password' : 'account'} setting`} />
            <Wrapper>
                <div className="account">
                    {loading === true && profile ? (
                        <Loading className="loading" />
                    ) : (
                        <div className="main">
                            <div className="img">
                                <img src={profile.avatar} alt={profile.username} />
                            </div>
                            <div className="info">
                                <NavLink to="/profile">
                                    <h1 className="name">
                                        {FUllName(profile.fname, profile.lname)} <span className="username">({profile.username})</span>{' '}
                                    </h1>
                                </NavLink>
                                <span className="email">{profile.email}</span>
                            </div>
                        </div>
                    )}
                    <div className="goToProfile">
                        <NavLink to="/profile">
                            <button className="goProfile">Go to profile</button>
                        </NavLink>
                    </div>
                </div>
                <div className="settings">
                    <SettingNav />
                    <div className="setting">
                        {profileSh && <SettingProfile />}
                        {email && <SettingEmail />}
                        {pwd && <SettingPwd />}
                    </div>
                </div>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.section`
    margin-top: 2rem;
    .account {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;

        .main {
            display: flex;
            justify-content: start;
            align-items: center;

            .info {
                a {
                    color: white;

                    .name {
                        margin-bottom: 0.4rem;
                        .username {
                            filter: brightness(0.7);
                        }
                    }

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            .img {
                margin-right: 1rem;
                img {
                    width: 4rem;
                    height: 4rem;
                }
            }
        }

        .goToProfile {
            cursor: pointer;

            &:hover {
                filter: brightness(0.6);
            }

            a {
                cursor: pointer;

                button {
                    cursor: pointer;
                    font-size: 1.1rem;
                    text-transform: capitalize;
                    padding: 0.4rem 2.6rem;
                    border-radius: 1rem;
                    transition: all 0.1s;
                }
            }
        }

        .loading {
            width: 10rem;
        }
    }

    .settings {
        display: grid;
        grid-template-columns: 0.2fr auto;
        width: 100%;
        margin: auto;
        margin-top: 3rem;
        margin-bottom: 2rem;
    }
`;

export default Setting;
