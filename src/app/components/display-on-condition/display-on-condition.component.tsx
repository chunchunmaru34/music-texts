import * as React from 'react';

type DisplayOnConditionProps = {
  children: React.ReactNode;
  condition: boolean;
}

export const DisplayOnCondition = ({ children, condition }: DisplayOnConditionProps) => {
  return condition && children;
}