import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Button from '../../assets/styles/Button';
import WelcomeImg from '../../assets/images/components/WelcomeSection';

const WelcomeSection = ({ title, about }) => {
    return (
        <Wrapper>
            <div className="img">
                <WelcomeImg />
            </div>
            <div className="content">
                <h3>Welcome to</h3>
                <h1>{title}</h1>
                <p>
                    Voluptate irure fugiat in ad ea qui excepteur. Nisi cillum velit aliqua anim ut ullamco sint velit incididunt incididunt id. Labore elit excepteur elit ad mollit fugiat pariatur
                    irure nostrud adipisicing qui. Lorem adipisicing dolor aliquip elit exercitation sint reprehenderit aliqua. Aliqua anim velit et magna. Labore amet est aliquip exercitation eiusmod
                    mollit ullamco officia deserunt. Anim voluptate aliqua quis exercitation reprehenderit sit pariatur adipisicing incididunt ipsum occaecat elit esse consectetur.
                </p>
                <div className="button">
                    <NavLink to={about ? '/signin' : '/about'}>
                        <Button>{about ? 'Sign In' : 'Get Starts'}</Button>
                    </NavLink>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .content {
        width: 38rem;
        text-align: right;
        margin-right: 8rem;

        h3 {
            color: #00f2ff;
            animation: scrolleb 0.2s forwards;
        }
        h1 {
            font-family: 'Lemon', serif;
            font-size: 3rem;
            margin: 1rem 0;
            animation: scrolleb 0.3s forwards;
        }
        p {
            text-align: justify;
            color: white;
            font-weight: lighter;
            animation: scrolleb 0.4s forwards;
        }
        .button {
            display: block;
            margin: 2rem 0;
            animation: scrolleb 0.4s forwards;
        }
    }
`;

export default WelcomeSection;
