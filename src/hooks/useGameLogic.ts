import { useState } from 'react';

interface Operation {
  id: string;
  num1: number;
  num2: number;
  operator: string;
  result: number;
}

interface NumberWithId {
  id: string;
  value: number;
}

const generateRandomNumbers = () => {
  return Array.from({ length: 6 }, () => ({
    id: Math.random().toString(36).substr(2, 9),
    value: Math.floor(Math.random() * 9) + 1
  }));
};

const calculateResult = (num1: number, num2: number, operator: string): number => {
  switch (operator) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case '*': return num1 * num2;
    case '/': return num1 / num2;
    default: return 0;
  }
};

export const useGameLogic = () => {
  const [leftNumbers, setLeftNumbers] = useState<NumberWithId[]>(generateRandomNumbers());
  const [rightNumbers, setRightNumbers] = useState<NumberWithId[]>(generateRandomNumbers());
  const [leftOperations, setLeftOperations] = useState<Operation[]>([]);
  const [rightOperations, setRightOperations] = useState<Operation[]>([]);
  const [selectedNumber1, setSelectedNumber1] = useState<NumberWithId | null>(null);
  const [selectedNumber2, setSelectedNumber2] = useState<NumberWithId | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [selectedSide, setSelectedSide] = useState<'left' | 'right'>('left');

  const leftTotal = leftOperations.reduce((sum, op) => sum + op.result, 0);
  const rightTotal = rightOperations.reduce((sum, op) => sum + op.result, 0);

  const handleNumberClick = (numWithId: NumberWithId, side: 'left' | 'right') => {
    setSelectedSide(side);
    
    if (selectedNumber1?.id === numWithId.id) {
      setSelectedNumber1(null);
    } else if (selectedNumber2?.id === numWithId.id) {
      setSelectedNumber2(null);
    } else if (!selectedNumber1) {
      setSelectedNumber1(numWithId);
    } else if (!selectedNumber2) {
      setSelectedNumber2(numWithId);
    }
  };

  const handleOperatorClick = (op: string) => {
    setSelectedOperator(op);
  };

  const handleAddOperation = (side: 'left' | 'right') => {
    if (!selectedNumber1 || !selectedNumber2 || !selectedOperator) return;

    const result = calculateResult(selectedNumber1.value, selectedNumber2.value, selectedOperator);
    const operation: Operation = {
      id: Date.now().toString(),
      num1: selectedNumber1.value,
      num2: selectedNumber2.value,
      operator: selectedOperator,
      result,
    };

    if (side === 'left') {
      setLeftOperations([...leftOperations, operation]);
      setLeftNumbers(leftNumbers.filter(n => n.id !== selectedNumber1.id && n.id !== selectedNumber2.id));
    } else {
      setRightOperations([...rightOperations, operation]);
      setRightNumbers(rightNumbers.filter(n => n.id !== selectedNumber1.id && n.id !== selectedNumber2.id));
    }

    setSelectedNumber1(null);
    setSelectedNumber2(null);
    setSelectedOperator(null);
  };

  const handleRemoveOperation = (id: string, side: 'left' | 'right') => {
    if (side === 'left') {
      const operation = leftOperations.find(op => op.id === id);
      if (operation) {
        setLeftNumbers([
          ...leftNumbers,
          { id: Math.random().toString(36).substr(2, 9), value: operation.num1 },
          { id: Math.random().toString(36).substr(2, 9), value: operation.num2 }
        ]);
        setLeftOperations(leftOperations.filter(op => op.id !== id));
      }
    } else {
      const operation = rightOperations.find(op => op.id === id);
      if (operation) {
        setRightNumbers([
          ...rightNumbers,
          { id: Math.random().toString(36).substr(2, 9), value: operation.num1 },
          { id: Math.random().toString(36).substr(2, 9), value: operation.num2 }
        ]);
        setRightOperations(rightOperations.filter(op => op.id !== id));
      }
    }
  };

  const resetGame = () => {
    setLeftNumbers(generateRandomNumbers());
    setRightNumbers(generateRandomNumbers());
    setLeftOperations([]);
    setRightOperations([]);
    setSelectedNumber1(null);
    setSelectedNumber2(null);
    setSelectedOperator(null);
  };

  return {
    leftNumbers,
    rightNumbers,
    leftOperations,
    rightOperations,
    selectedNumber1,
    selectedNumber2,
    selectedOperator,
    selectedSide,
    leftTotal,
    rightTotal,
    handleNumberClick,
    handleOperatorClick,
    handleAddOperation,
    handleRemoveOperation,
    resetGame,
  };
};