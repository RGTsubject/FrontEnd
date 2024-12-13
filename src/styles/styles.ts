import styled, { keyframes } from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    top: 5rem;
  }

  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }

  .inputContainer {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    padding: 9px;
    gap: 10px;

    input {
      width: 60%;
      height: 20px;
      outline: none;
      border: none;
      border-radius: 0.2rem;
      box-shadow: 0px 1px 3px 1px gray;
      border: 2px solid #ffffff;
      margin-right: 0.5rem;
      padding-left: 0.3rem;

      &:focus-within {
        border: 2px solid #3f85f2;
      }
    }

    textarea {
      width: 80%;
      height: 20vh;
      outline: none;
      border: none;
      border-radius: 0.2rem;
      box-shadow: 0px 1px 3px 1px gray;
      border: 2px solid #ffffff;
      margin-right: 0.5rem;
      padding-left: 0.3rem;

      &:focus-within {
        border: 2px solid #3f85f2;
      }
    }
  }

  .title {
    font-family: 'GmarketSansBold';
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }

  main {
    width: 70%;
    height: 500px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    a {
      text-decoration: none; /* 밑줄 제거 */
      color: inherit; /* 부모 요소의 색상으로 상속 */
    }

    .bookShow {
      width: 180px;
      display: flex;
      flex-direction: column;
      margin: 0.8rem;
      cursor: pointer;
      padding: 0.5rem;

      &:hover {
        box-shadow: 0px 1px 3px 1px gray;
        border-radius: 0.3rem;
      }
    }

    .bookCol {
      display: flex;
      flex-direction: column;
    }
    .bookCoverRow {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .bookCover {
      object-fit: contain;
    }

    .bookTitle {
      font-family: 'GmarketSansMedium';
      font-size: 0.8rem;
    }

    .bookAuthor {
      font-family: 'GmarketSansLight';
      font-size: 0.7rem;
      color: #c1c1c1;
    }

    .bookPrice {
      font-family: 'GmarketSansLight';
      font-size: 0.7rem;
    }

    .deleteRow {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
`;

export const SearchInput = styled.input`
  width: 30%;
  height: 30px;
  outline: none;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0px 1px 3px 1px gray;
  border: 2px solid #ffffff;
  margin-right: 0.5rem;
  padding-left: 0.3rem;

  &:focus-within {
    border: 2px solid #3f85f2;
  }
`;

const showModal = keyframes`
  0% {
    opacity: 0;
  }
  
  100% {
    opacity: 1;
  }
`;

export const ModalContainer = styled.div`
  width: 40vw;
  height: 80vh;
  background-color: white;
  border-radius: 0.2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 500;
  animation: 0.5s ${showModal};
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .modal {
    width: 100%;
    height: 45vh;
    display: flex;
    flex-direction: column;
  }

  .modalHeader {
    width: 100%;
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 0.2rem 0.2rem 0 0;
    margin-top: 0.3rem;
  }

  .close {
    margin-right: 0.4rem;
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: black;
  }
`;
