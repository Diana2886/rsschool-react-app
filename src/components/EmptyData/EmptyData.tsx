import { FC } from 'react';
import { EmptyDataProps } from './types';
import './EmptyData.css';

export const EmptyData: FC<EmptyDataProps> = ({ formType }) => {
  return <p className="empty-text">No data from {formType} form</p>;
};
