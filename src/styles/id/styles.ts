import styled from 'styled-components';

export const IDConainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  main {
    width: 60%;
    height: 90%;
    display: flex;
    flex-direction: row;

    &:hover {
      transition: 0.3s transform;
      transform: translateY(-10px);
      box-shadow: 0px 1px 3px 1px gray;
      border-radius: 0.5rem;
      padding: 2rem;
    }

    .bookInfoContainer {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      margin-left: 1rem;
    }

    .bookTitle {
      font-family: 'GmarketSansBold';
      font-size: 1.2rem;
    }

    .bookAuthor {
      font-family: 'GmarketSansMedium';
      font-size: 0.8rem;
      color: #b1b1b2;
      margin-top: 0.5rem;
    }

    .priceRow {
      width: 50%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 2rem;
    }

    .bookPriceTitle {
      font-family: 'GmarketSansMedium';
    }

    .bookPrice {
      font-family: 'GmarketSansBold';
      font-size: 1.3rem;
      color: #ff6666;
    }

    .salesQuantityRow {
      width: 50%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 1rem;
    }

    .bookSalesQuantity {
      font-family: 'GmarketSansBold';
      font-size: 1.3rem;
      color: #3f85f2;
    }

    .detailRow {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 1rem;

      textarea {
        font-family: 'GmarketSansLight';
        width: 100%;
        height: 20vh;
      }
    }

    .bookDetail {
      width: 100%;
      font-family: 'GmarketSansLight';
    }
  }
`;
