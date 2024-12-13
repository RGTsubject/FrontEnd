import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// styles
import { IDConainer } from '@/styles/id/styles';

// hooks
import useGetBookSpecificData from '@/hooks/home/useGetBookSpecificData';

// constants
import { sortingDatas } from '@/constants/imgSorting';

// imgs
import basicImg from '@/assets/img/BasicBookCover.jpg';

// types
import { BookBooleanType, BookType } from '@/types/home';
import usePutBookData from '@/hooks/home/usePutBookData';

const detailPage = () => {
  const { id } = useParams();

  // 수정 데이터
  const [modifyData, setModifyData] = useState<BookType>({
    id: Number(id),
    bookTitle: '',
    author: '',
    salesQuantity: 0,
    price: 0,
    detail: '',
  });

  // boolean array
  const [booleanArr, setBooleanArr] = useState<BookBooleanType>({
    bookTitle: false,
    author: false,
    salesQuantity: false,
    price: false,
    detail: false,
  });

  const { bookTitle, author, salesQuantity, price, detail } = booleanArr;

  // 특정 데이터 GET
  const {
    data: bookSpecificData,
    isSuccess: SuccessSpecificData,
    refetch: refetchData,
  } = useGetBookSpecificData({ id });

  const { mutate: modifyBookData } = usePutBookData({
    modifyData,
    refetchData,
  });

  // img sort
  function sortingImg(bookTitle: string) {
    const filtering = sortingDatas.filter((data) =>
      data.bookTitle.includes(bookTitle)
    );

    const imgSrc = filtering.length > 0 ? filtering[0].img : basicImg; // 조건에 따른 src 선택

    const options = {
      className: 'bookCover',
      alt: '책 이미지',
      width: 400,
      height: 360,
    };

    return <Image src={imgSrc} {...options} />;
  }

  // DOM => Input 변환
  function ChangeDOM(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    const { id } = e.currentTarget;
    setBooleanArr((prev) => ({
      ...prev,
      [id as keyof BookBooleanType]: !prev[id as keyof BookBooleanType],
    }));
  }

  // input
  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setModifyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function putData(sorting: string) {
    setBooleanArr((prev) => ({ ...prev, [sorting]: false }));
    modifyBookData();
  }

  useEffect(() => {
    if (bookSpecificData) {
      setModifyData((prev) => ({
        ...prev,
        bookTitle: bookSpecificData?.bookTitle,
        author: bookSpecificData?.author,
        salesQuantity: bookSpecificData?.salesQuantity,
        price: bookSpecificData?.price,
        detail: bookSpecificData?.detail,
      }));
    }
  }, [SuccessSpecificData]);

  useEffect(() => {
    console.log('modifyData: ', modifyData);
  }, [modifyData]);

  return (
    <IDConainer>
      <main>
        {bookSpecificData && sortingImg(bookSpecificData.bookTitle)}
        <div className="bookInfoContainer">
          {bookTitle ? (
            <input
              name="bookTitle"
              onChange={handleInputChange}
              value={modifyData.bookTitle}
              onBlur={() => {
                putData('bookTitle');
              }}
            />
          ) : (
            <span
              className="bookTitle"
              onDoubleClick={(e) => ChangeDOM(e)}
              id="bookTitle"
            >
              {modifyData.bookTitle}
            </span>
          )}
          {author ? (
            <input
              name="author"
              onChange={handleInputChange}
              value={modifyData.author}
              onBlur={() => {
                putData('author');
              }}
            />
          ) : (
            <>
              <span
                className="bookAuthor"
                onDoubleClick={(e) => ChangeDOM(e)}
                id="author"
              >
                {modifyData.author} 저
              </span>
            </>
          )}

          <div className="priceRow">
            <span className="bookPriceTitle">판매가</span>
            {price ? (
              <input
                name="price"
                onChange={handleInputChange}
                value={modifyData.price}
                onBlur={() => {
                  putData('price');
                }}
              />
            ) : (
              <span
                className="bookPrice"
                onDoubleClick={(e) => ChangeDOM(e)}
                id="price"
              >
                {modifyData.price} 원
              </span>
            )}
          </div>

          <div className="salesQuantityRow">
            <span className="bookPriceTitle">판매 수량</span>
            {salesQuantity ? (
              <input
                name="salesQuantity"
                onChange={handleInputChange}
                value={modifyData.salesQuantity}
                onBlur={() => {
                  putData('salesQuantity');
                }}
              />
            ) : (
              <span
                className="bookSalesQuantity"
                onDoubleClick={(e) => ChangeDOM(e)}
                id="salesQuantity"
              >
                {modifyData.salesQuantity} 개
              </span>
            )}
          </div>

          <div className="detailRow">
            <span
              className="bookPriceTitle"
              style={{ width: '170px', marginBottom: '1rem' }}
            >
              책소개
            </span>
            <div>
              {detail ? (
                <textarea
                  className="detail"
                  name="detail"
                  onChange={handleInputChange}
                  value={modifyData.detail}
                  onBlur={() => {
                    putData('detail');
                  }}
                />
              ) : (
                <div
                  className="bookDetail"
                  onDoubleClick={(e) => ChangeDOM(e)}
                  id="detail"
                >
                  {modifyData.detail}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </IDConainer>
  );
};

export default detailPage;
