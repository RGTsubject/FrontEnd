import { useCallback, useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

// styles
import { HomeContainer, SearchInput } from '@/styles/styles';

// icons
import { FiSearch } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';

// types
import { BookType } from '@/types/home';

// hooks
import useGetBookAllData from '@/hooks/home/useGetBookAllData';
import useDeleteBook from '@/hooks/home/useDeleteBook';

// imgs
import basicImg from '@/assets/img/BasicBookCover.jpg';

// libraries

// apis
import { sortingDatas } from '@/constants/imgSorting';
import Modal from '@/components/Modal';
import usePostData from '@/hooks/home/usePostData';

const Home = () => {
  // 검색 단어
  const [searchData, setSearchData] = useState<string>('');

  // 전체 데이터
  const [allBookInfo, setAllBookInfo] = useState<BookType[]>([
    {
      id: 0,
      bookTitle: '',
      author: '',
      salesQuantity: 0,
      price: 0,
      detail: '',
    },
  ]);

  // 선택된 데이터
  const [selectedBookInfo, setSelectedBookInfo] = useState<BookType>({
    id: 0,
    bookTitle: '',
    author: '',
    salesQuantity: 0,
    price: 0,
    detail: '',
  });

  // imgSrc 상태 정의
  const [imgSrc, setImgSrc] = useState<StaticImageData | string>(basicImg);

  // 책 아이디
  const [bookId, setBookId] = useState<number>(0);

  // modal boolean
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { refetch: refetchBookAllInfo } = useGetBookAllData({
    setAllBookInfo,
  }); // 모든 데이터 GET

  const { mutate: deleteBookQuery, isSuccess: SucessDelete } = useDeleteBook({
    id: bookId,
    refetchBookAllInfo,
  }); // 책 Delete

  const { isSuccess: SucessPost, mutate: enrollBookData } = usePostData({
    selectedBookInfo,
  });

  useEffect(() => {
    refetchBookAllInfo();
  }, [SucessDelete, SucessPost]);

  // 책 검색
  const inputSearchData = useCallback(
    (word: string) => {
      setSearchData(word);
      if (word.length === 0) {
        refetchBookAllInfo();
      }
    },
    [refetchBookAllInfo]
  );

  // 검색 필터링
  const filteringBook = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') {
        const searchTerm = searchData.toLowerCase();

        const filteredBooks = allBookInfo.filter(
          (book) =>
            book.bookTitle.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm)
        );

        if (filteredBooks.length !== allBookInfo.length) {
          setAllBookInfo(filteredBooks);
        }
      }
    },
    [searchData, allBookInfo]
  );

  // 삭제
  function deleteBook(id: number) {
    setBookId(id);
    deleteBookQuery();
  }

  // 이미지 sort
  function sortingImg(bookTitle: string) {
    const filtering = sortingDatas.filter(
      (data) => data.bookTitle === bookTitle
    );

    const imgSrc = filtering.length > 0 ? filtering[0].img : basicImg; // 조건에 따른 src 선택

    const options = {
      className: 'bookCover',
      alt: '책 이미지',
      width: 150,
      height: 270,
    };

    return <Image src={imgSrc} {...options} />;
  }

  // modal hanlder
  function handleModal() {
    setIsOpen(!isOpen);
  }

  // 데이터 입력
  function inputData(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setSelectedBookInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function submitData() {
    enrollBookData();
    setIsOpen(false);
  }

  useEffect(() => {
    console.log(selectedBookInfo);
  }, [selectedBookInfo]);

  return (
    <HomeContainer>
      <div id="modal-container"></div>
      {isOpen && <div className="background" onClick={handleModal}></div>}
      <div className="container">
        <span className="title">RGT 면접 전 과제</span>
        <nav>
          <SearchInput
            value={searchData}
            onChange={(e) => inputSearchData(e.target.value)}
            onKeyDown={(e) => filteringBook(e)}
          />{' '}
          <FiSearch size={25} color="#c1c2c2" />
        </nav>
        <div style={{ textAlign: 'end', width: '60%' }}>
          <button onClick={() => handleModal()}>등록</button>
          {isOpen && (
            <Modal openModal={handleModal} modal={isOpen}>
              <div className="inputContainer">
                <span>책 제목</span>
                <input
                  name="bookTitle"
                  className="input"
                  onChange={(e) => inputData(e)}
                />
                <span>저자</span>
                <input
                  name="author"
                  className="input"
                  onChange={(e) => inputData(e)}
                />
                <span>판매 수량</span>
                <input
                  name="salesQuantity"
                  className="input"
                  onChange={(e) => inputData(e)}
                />
                <span>가격</span>
                <input
                  name="price"
                  className="input"
                  onChange={(e) => inputData(e)}
                />
                <span>책 소개</span>
                <textarea name="detail" onChange={(e) => inputData(e)} />

                <div style={{ textAlign: 'end' }}>
                  <button onClick={() => submitData()}>완료</button>
                </div>
              </div>
            </Modal>
          )}
        </div>
        <main>
          {allBookInfo &&
            allBookInfo?.map((info, i) => {
              return (
                <div className="bookShow" key={i} style={{ cursor: 'pointer' }}>
                  <Link href={`/${info.id}`} passHref>
                    <div className="bookCol">
                      <div className="bookCoverRow">
                        {sortingImg(info.bookTitle)}
                      </div>

                      <span className="bookTitle">{info.bookTitle}</span>
                      <span className="bookAuthor">저자: {info.author}</span>
                      <span className="bookPrice">{info.price}원</span>
                    </div>
                  </Link>
                  <div className="deleteRow">
                    <FaTrashAlt
                      onClick={(e) => {
                        e.stopPropagation(); // 이벤트 전파 방지
                        deleteBook(info.id); // 삭제 함수 호출
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </main>
      </div>
    </HomeContainer>
  );
};

export default Home;
