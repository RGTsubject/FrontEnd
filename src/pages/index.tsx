import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// styles
import { HomeContainer, SearchInput } from '@/styles/styles';

// icons
import { FiSearch } from 'react-icons/fi';

// types
import { BookType } from '@/types/home';

// hooks
import useGetBookAllData from '@/hooks/home/useGetBookAllData';

const Home = () => {
  const [allBookInfo, setAllBookInfo] = useState<BookType[]>([
    {
      id: 0,
      bookTitle: '',
      author: '',
      salesQuantity: 0,
      price: 0,
      detail: '',
      img: '',
    },
  ]);

  const [selectedBookInfo, setSelectedBookInfo] = useState<BookType>({
    id: 0,
    bookTitle: '',
    author: '',
    salesQuantity: 0,
    price: 0,
    detail: '',
    img: '',
  });

  const { data: bookAllInfo, refetch: refetchBookAllInfo } =
    useGetBookAllData(); // 모든 데이터 GET
  return (
    <HomeContainer>
      <div className="container">
        <span className="title">RGT 면접 전 과제</span>
        <nav>
          <SearchInput /> <FiSearch size={25} color="#c1c2c2" />
        </nav>
        <main>
          {bookAllInfo?.map((info, i) => {
            return (
              <Link key={i} href={`/${info.id}`}>
                <div className="bookShow" style={{ cursor: 'pointer' }}>
                  {' '}
                  {/* 스타일로 커서 포인터 설정 */}
                  <Image
                    className="bookCover"
                    src={info.img}
                    alt="책 이미지"
                    width={150}
                    height={270}
                  />
                  <span className="bookTitle">{info.bookTitle}</span>
                  <span className="bookAuthor">저자: {info.author}</span>
                  <span className="bookPrice">{info.price}원</span>
                </div>
              </Link>
            );
          })}
        </main>
      </div>
    </HomeContainer>
  );
};

export default Home;
