import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Work Sans", sans-serif;
}


html {
  /* font-size: 62.5%; */
  scroll-behavior: smooth;
  /* 1rem = 10px */
  overflow-x: hidden;
}

body {
  overflow-x: hidden;
   scrollbar-color: rgb(98 84 243);
    scrollbar-width: thin;
  width: 100vw;
  height: 100vh;
  background: #001a25;
  color: white;

}

body::-webkit-scrollbar {
  width: 1rem;
}

body::-webkit-scrollbar-track {
   background-color: rgb(24 24 29);
}

body::-webkit-scrollbar-thumb {
 
  background: #fff;
    border: 5px solid transparent;
    border-radius: 9px;
    background-clip: content-box;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

input,a,textarea,button{
  outline: none;
}

${"" /* reusable code section  */}

.container {
  max-width: 63rem;
  margin: 0 auto;
}

.loading_spinner{    
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    padding: 8.5rem 0;
  }

  @keyframes scrolleb {
      0% {
        opacity: 0;
        transform: translatey(3rem);
        transform-origin: right;
      }
      100% {
        opacity: 1;
        transform: translatey(0rem);
        transform-origin: right;
      }
    }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
  .container {
    max-width: 130rem;
    padding: 0 3.2rem;
  }
}

@media (max-width: ${({ theme }) => theme.media.mobile}) {
   html {
    font-size: 50%;
  } 
  
    }

`;
