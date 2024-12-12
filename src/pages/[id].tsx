import { useParams } from 'next/navigation';
// styles
import { IDConainer } from '@/styles/id/styles';

// hooks
import useGetBookSpecificData from '@/hooks/home/useGetBookSpecificData';
import Image from 'next/image';
const detailPage = () => {
  const { id } = useParams();

  const { data: bookSpecificData } = useGetBookSpecificData({ id });

  return (
    <IDConainer>
      <main>
        {bookSpecificData && (
          <Image
            src={bookSpecificData?.img}
            alt="책표지"
            width={300}
            height={450}
            style={{ objectFit: 'contain' }}
          />
        )}
        <div className="bookInfoContainer">
          <span className="bookTitle">{bookSpecificData?.bookTitle}</span>
          <span className="bookAuthor">{bookSpecificData?.author} 저</span>

          <div className="priceRow">
            <span className="bookPriceTitle">판매가</span>
            <span className="bookPrice">{bookSpecificData?.price} 원</span>
          </div>

          <div className="salesQuantityRow">
            <span className="bookPriceTitle">판매 수량</span>
            <span className="bookSalesQuantity">
              {bookSpecificData?.salesQuantity} 개
            </span>
          </div>

          <div className="detailRow">
            <span
              className="bookPriceTitle"
              style={{ width: '170px', marginBottom: '1rem' }}
            >
              책소개
            </span>
            <div>
              {bookSpecificData &&
                bookSpecificData?.detail.split('\n').map((line, index) => (
                  <div className="bookDetail" key={index}>
                    {line}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </IDConainer>
  );
};

export default detailPage;
