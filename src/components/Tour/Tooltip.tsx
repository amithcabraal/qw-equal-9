import React from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  FloatingArrow,
} from '@floating-ui/react';

interface TooltipProps {
  content: string;
  isOpen: boolean;
  onClose?: () => void;
  onNext?: () => void;
  isLastStep?: boolean;
  targetElement: HTMLElement | null;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  isOpen,
  onClose,
  onNext,
  isLastStep = false,
  targetElement,
}) => {
  const arrowRef = React.useRef(null);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    elements: {
      reference: targetElement ?? undefined,
    },
    middleware: [
      offset(12),
      flip(),
      shift(),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
    placement: 'bottom',
  });

  React.useEffect(() => {
    if (targetElement) {
      targetElement.style.outline = '3px solid rgb(239 68 68)';
      return () => {
        targetElement.style.outline = '';
      };
    }
  }, [targetElement]);

  if (!isOpen || !targetElement) return null;

  return (
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      className="z-50 bg-indigo-600 text-white p-4 rounded-lg shadow-lg max-w-xs"
    >
      <FloatingArrow
        ref={arrowRef}
        context={context}
        className="fill-indigo-600"
      />
      <p className="mb-3">{content}</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm bg-indigo-500 hover:bg-indigo-700 rounded"
        >
          {isLastStep ? 'Finish' : 'Skip'}
        </button>
        {!isLastStep && (
          <button
            onClick={onNext}
            className="px-3 py-1 text-sm bg-white text-indigo-600 hover:bg-indigo-50 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}