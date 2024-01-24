import styled from "styled-components";

const Button = styled.button`
  font-size: 1.5rem;
  color: white;
  padding: 0.5rem 2.8rem;
  border: none;
  cursor: pointer;
  background: #006fff;
  transition: all 0.2s;
  border-radius: unset;
  font-family: "Salsa", cursive;

  &:hover {
    border-radius: 0.5rem;
    transform: scale(0.95);
  }
`;

export default Button;
