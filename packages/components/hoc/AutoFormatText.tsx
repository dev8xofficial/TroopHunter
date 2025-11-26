import React from 'react';
import { FormattedText } from '../utils/helpers';

export const AutoFormatText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const formatNode = (node: any): any => {
    if (typeof node === 'string') {
      return FormattedText(node);
    }

    if (Array.isArray(node)) {
      return node.map((child, i) => <React.Fragment key={i}>{formatNode(child)}</React.Fragment>);
    }

    if (React.isValidElement(node)) {
      const newChildren = formatNode(node.props.children);

      return React.cloneElement(node, {
        ...node.props,
        children: newChildren
      });
    }

    return node;
  };

  return <>{formatNode(children)}</>;
};
