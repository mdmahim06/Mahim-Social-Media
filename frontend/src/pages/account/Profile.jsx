import React from 'react';
import { useProfileContext } from '../../context/profile.context';
import AppHelmet from '../../Helpers/AppHelmet';
import { styled } from 'styled-components';
import Loading from '../../assets/images/layouts/Loading';
import AccountData from '../../components/account/AccountData';
import PostData from '../../components/account/PostData';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { username } = useParams();
    const { loading, profile } = useProfileContext();

    return (
        <>
            <AppHelmet title="Profile" />
            <Wrapper>
                {loading === true ? <Loading /> : <AccountData data={profile} view={username !== undefined ? username : false} />}
                {loading === true ? <Loading /> : <PostData data={profile} view={username !== undefined ? username : false} />}
            </Wrapper>
        </>
    );
};

const Wrapper = styled.section`
    display: grid;
    grid-template-columns: 0.28fr auto;
    margin: 3rem 4rem;

    .loading {
        width: 14rem;
    }
`;

export default Profile;
