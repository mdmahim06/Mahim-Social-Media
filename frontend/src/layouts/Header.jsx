import styled from 'styled-components';
import Logo from '../assets/images/layouts/logo.png';
import Nav from '../components/layouts/Nav';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <Wrapper>
            <header>
                <div className="logo">
                    <NavLink to="/">
                        <img src={Logo} alt="app logo" />
                    </NavLink>
                </div>
                <Nav />
            </header>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        /* width: 65rem;
        margin: auto; */

        .logo {
            img {
                margin-left: 8rem;
                width: 20rem;
            }
        }
    }
`;

export default Header;
