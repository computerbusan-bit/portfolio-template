import { useContext } from 'react';
import { PortfolioContext } from '../context/portfolioContextInstance';

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio은 PortfolioProvider 내부에서만 사용할 수 있어요.');
  }
  return context;
}
