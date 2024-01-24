import { NavLink } from "react-router-dom";
import styled from "styled-components";

const FooterNav = () => {
  return (
    <Wrapper>
      <h2>Menu</h2>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;

  ul {
    margin-left: 1.5rem;
    display: flex;
    flex-direction: column;

    li {
      margin: 0.5rem 0;

      a {
        color: white;
        font-size: 1.2rem;
        transition: all 0.2s;

        &:hover {
          color: #ddd;
          text-decoration: underline;
        }
      }
    }
  }
  h2 {
    margin-bottom: 1.5rem;
  }
`;

export default FooterNav;
