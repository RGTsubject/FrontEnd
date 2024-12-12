import styled from 'styled-components';

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
        transition: 0.3s transform;
        transform: translateY(-10px);
        box-shadow: 0px 1px 3px 1px gray;
        border-radius: 0.3rem;
      }
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
