import { useState, useCallback } from 'react';

export interface TourStep {
  target: string;
  content: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    target: '[data-tour="numbers"]',
    content: "Welcome to Number Balance! Your goal is to create the highest possible equal total on both sides using mathematical operations. Start by selecting a number from either side.",
  },
  {
    target: '[data-tour="operators"]',
    content: "After selecting your first number, choose an operator (+, -, *, /) to combine it with another number. Try to maximize your total!",
  },
  {
    target: '[data-tour="current-operation"]',
    content: "Select a second number to complete the operation. Then click the play button to add it to your side. Each operation contributes to your side's total.",
  },
  {
    target: '[data-tour="operations-list"]',
    content: "Your operations will appear here. You can remove them anytime by clicking the trash icon if you want to try a different combination.",
  },
  {
    target: '[data-tour="total"]',
    content: "This is your current total. Remember, the goal is to make both sides equal with the highest possible value. Strategy is key!",
  },
  {
    target: '[data-tour="check-balance"]',
    content: "When you think you've achieved the highest possible equal total on both sides, click here to check your balance and win the game!",
  },
];

export const useTour = () => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [showTour, setShowTour] = useState(false);

  const startTour = useCallback(() => {
    setCurrentStep(0);
    setShowTour(true);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev === null || prev >= TOUR_STEPS.length - 1) {
        return null;
      }
      return prev + 1;
    });
  }, []);

  const endTour = useCallback(() => {
    setCurrentStep(null);
    setShowTour(false);
  }, []);

  return {
    currentStep,
    showTour,
    startTour,
    nextStep,
    endTour,
    steps: TOUR_STEPS,
  };
};