import React from 'react';
import ErrorImage from '../assets/images/layouts/ErrorImage';
import { styled } from 'styled-components';

const Error = () => {
    return (
        <Wrapper>
            <ErrorImage />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2.5rem 0;
`;

export default Error;
