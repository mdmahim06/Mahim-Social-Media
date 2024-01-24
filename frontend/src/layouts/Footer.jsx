import styled from 'styled-components';
import Logo from '../assets/images/layouts/logo.png';
import FooterNav from '../components/layouts/FooterNav';
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaGithub, FaRegCopyright, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <Wrapper>
            <footer className="container">
                <div className="logo">
                    <NavLink to="/">
                        <img src={Logo} alt="" />
                    </NavLink>
                </div>
                <div className="about">
                    <h2>Welcome</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus accusantium sapiente temporibus labore dolor vitae, corrupti saepe autem esse, earum, illo quas voluptatem?
                        Dolore doloremque quia tempora saepe possimus deserunt optio aspernatur unde consequuntur laboriosam quam dignissimos beatae iste ratione, vero at harum, totam provident
                        assumenda voluptatibus nihil incidunt eum?
                        <NavLink to="/about"> more...</NavLink>
                    </p>
                </div>
                <FooterNav />
            </footer>
            <hr className="container" />
            <div className="copyright container">
                <span>
                    <FaRegCopyright className="icon" /> copyright by MD Mahim All Saklain
                </span>
                <div className="social">
                    <div className="icons">
                        <a href="https://www.facebook.com/profile.php?id=100069803313908" target="_blank" rel="noreferrer">
                            <FaFacebook />
                        </a>
                    </div>
                    <div className="icons">
                        <a href="https://www.youtube.com/channel/UCS_gV4Og0Y90tuL2m5YshWA" target="_blank" rel="noreferrer">
                            <FaYoutube />
                        </a>
                    </div>
                    <div className="icons">
                        <a href="https://github.com/mdmahim06" target="_blank" rel="noreferrer">
                            <FaGithub />
                        </a>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    background: linear-gradient(45deg, #001a25, #051be488);
    margin-top: 2.8rem;
    padding: 3rem 0;

    footer {
        display: grid;
        grid-template-columns: auto auto auto;
        margin-bottom: 1.6rem;

        .logo {
            width: 20rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
                width: 100%;
            }
        }
        .about {
            width: 25rem;
            margin-right: 2.5rem;

            h2 {
                margin-bottom: 2rem;
            }
            p {
                a {
                    color: white;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
    hr.container {
        width: 50rem !important;
    }
    .copyright {
        width: 58rem !important;
        padding: 1.2rem 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        span {
            .icon {
                transform: translateY(0.2rem);
            }
        }
        .social {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            .icons {
                a {
                    font-size: 1.6rem;
                    color: white;
                    margin: 0 1rem;
                    display: block;

                    &:hover {
                        color: #777;
                    }
                }
            }
        }
    }
`;

export default Footer;
