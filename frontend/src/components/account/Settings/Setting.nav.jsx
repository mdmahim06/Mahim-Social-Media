import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { MdManageAccounts, MdEmail, MdOutlineSecurity } from 'react-icons/md';

const SettingNav = () => {
    return (
        <Wrapper>
            <ul>
                <li>
                    <NavLink to="/setting/profile">
                        <MdManageAccounts className="icon" />
                        <span>Account</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/setting/email">
                        <MdEmail className="icon" />
                        <span>Email</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/setting/pwd">
                        <MdOutlineSecurity className="icon" />
                        <span>Password</span>
                    </NavLink>
                </li>
            </ul>
        </Wrapper>
    );
};

const Wrapper = styled.nav`
    padding: 0 0 0 1rem;
    width: 16rem;
    margin-right: 2rem;

    ul {
        li {
            width: 100%;

            a {
                color: white;
                display: flex;
                justify-content: start;
                align-items: center;
                font-size: 1.2rem;
                border-radius: 0.5rem;
                width: 100%;
                padding: 0.5rem 1.2rem;
                margin: 0.8rem 0;
                transition: all 0.1s;
                position: relative;

                &:hover {
                    background: #555;
                }

                .icon {
                    margin-right: 0.5rem;
                }
            }
            .active {
                background: #555;
                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0rem;
                    width: 0.3rem;
                    height: 100%;
                    background: #0399dd;
                    border-radius: 1rem;
                }
            }
        }
    }
`;

export default SettingNav;
