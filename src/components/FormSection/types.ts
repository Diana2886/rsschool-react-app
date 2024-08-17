import { StateValues } from '../../store/types';
import { FormType } from '../Main/constants';

export type FormSectionProps = {
  formType: FormType;
  submissions: StateValues[];
  highlightedId: number | null;
};
