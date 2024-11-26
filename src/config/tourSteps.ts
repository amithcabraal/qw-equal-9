import { TourStep } from '../hooks/useTour';

export const TOUR_STEPS: TourStep[] = [
  {
    target: '[data-tour="numbers"]',
    content: "Welcome! Your goal is to create the highest possible total that's equal on both sides. Start by selecting numbers from either side to combine them with operations.",
  },
  {
    target: '[data-tour="operators"]',
    content: "Choose an operator (+, -, *, /) to perform calculations. Strategic use of multiplication can help achieve higher totals!",
  },
  {
    target: '[data-tour="current-operation"]',
    content: "Select a second number to complete your operation. Think carefully about which combinations will give you the highest results.",
  },
  {
    target: '[data-tour="operations-list"]',
    content: "Your operations appear here. You can remove and retry operations to optimize your total. Not all numbers need to be used!",
  },
  {
    target: '[data-tour="total"]',
    content: "Keep track of your total here. The challenge is to make both sides equal while maximizing this number. Higher totals = better score!",
  },
  {
    target: '[data-tour="check-balance"]',
    content: "When you've achieved the highest possible equal total on both sides, click here to check your balance and win!",
  },
];