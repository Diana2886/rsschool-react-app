import { ReactElement } from 'react';
import { Main } from '../views/MainPage/Main';
import { MainLayout } from '@/layouts/MainLayout';
import { GetServerSideProps } from 'next';
import { FIRST_PAGE_NUMBER } from '@/views/MainPage/Main/constants';
import { getBooksData } from '@/services/getBooksData';
import { Book } from '@/services/bookApi/types';

type MainPageProps = {
  books: Book[];
  totalElements: number;
};

const MainPage = ({ books, totalElements }: MainPageProps) => {
  return <Main books={books} totalElements={totalElements} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page, search } = context.query;
  const pageNumber = parseInt((page as string) || `${FIRST_PAGE_NUMBER}`, 10);

  try {
    const data = await getBooksData(pageNumber, search as string);
    const books = data ? data.books : [];
    const totalElements = data ? data.page.totalElements : 0;

    return {
      props: {
        totalElements,
        books,
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
