import { vi } from 'vitest';
import { ThemeContextType } from '../../context/ThemeContext/types';
import { ReactNode } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const mockThemeContextValue: ThemeContextType = {
  theme: 'light',
  toggleTheme: vi.fn(),
};

export const MockThemeContextProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeContext.Provider value={mockThemeContextValue}>{children}</ThemeContext.Provider>;
};
