import { ReactElement } from 'react';
import { Main } from '../components/Main';
import { MainLayout } from '@/layouts/MainLayout';
import { GetServerSideProps } from 'next';
import { FIRST_PAGE_NUMBER } from '@/components/Main/constants';
import { getBooksData } from '@/services/getBooksData';
import { Book } from '@/services/bookApi/types';
import { getBookDetails } from '@/services/getBookDetails';

type MainPageProps = {
  books: Book[];
  totalElements: number;
  bookDetails: Book | null;
};

const MainPage = ({ books, totalElements, bookDetails }: MainPageProps) => {
  return <Main books={books} totalElements={totalElements} bookDetails={bookDetails} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page, search, details } = context.query;
  const pageNumber = parseInt((page as string) || `${FIRST_PAGE_NUMBER}`, 10);

  try {
    let bookDetails = null;

    if (details) {
      bookDetails = await getBookDetails(details as string);
    }

    const data = await getBooksData(pageNumber, search as string);
    const books = data ? data.books : [];
    const totalElements = data ? data.page.totalElements : 0;

    return {
      props: {
        totalElements,
        books,
        bookDetails,
      },
    };
  } catch (error) {
    console.error('Error fetching books:', error);

    return {
      notFound: true,
    };
  }
};

MainPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default MainPage;
