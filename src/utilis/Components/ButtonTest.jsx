import styles from '../css/buttoTest.module.css';
import styled from 'styled-components';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';



const ButtonTest = () => {

    return (
        <>
            <button className={styles.button} onClick={()=>console.log("button css externe")}>
                Click me!
            </button>
        </>
    );
};
const StyledButton = styled.button`
    background-color: #64ff6c;
    color: #c02020;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #25e773;
    }`
const ButtonTest2 = () => {

    return (
        <StyledButton >
            Click me!
        </StyledButton>
    );
};
const buttonStyle = css`
  background-color: brown;
  color: white;
  padding: 10px 20px;
`;
const ButtonTest3 = () => {

    return (
        <>
            <button className={buttonStyle} onClick={()=>console.log("button css externe")}>
                Click me2dddd!
            </button>
        </>
    );
};
const ButtonTest4 = () => {

    return (
        <>
            <button>Click Me</button>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <style jsx>{`
        button {
          background-color: darkgray;
          color: white;
          padding: 10px 20px;
        }
      `}</style>
        </>
    );
};
export { ButtonTest2, ButtonTest3 ,ButtonTest4 };
export default ButtonTest;