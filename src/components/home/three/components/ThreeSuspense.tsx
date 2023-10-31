import React, { useEffect, Suspense, PropsWithChildren } from 'react';

interface Props {
  onLoading: () => void;
  onFinish: () => void;
}

const ThreeSuspense: React.FC<Props & PropsWithChildren> = ({
  children,
  ...props
}) => {
  return (
    <Suspense fallback={<ThreeSuspenseFallback {...props} />}>
      {children}
    </Suspense>
  );
};

const ThreeSuspenseFallback: React.FC<Props> = ({ onLoading, onFinish }) => {
  useEffect(() => {
    onLoading();
    return () => {
      onFinish();
    };
  }, []);
  return null;
};

export default ThreeSuspense;
