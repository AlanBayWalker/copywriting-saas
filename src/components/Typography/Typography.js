import React from 'react';
import styled from 'styled-components';
import { Typography as Text } from '@material-ui/core';

const colorHandler = color => {
  switch (true) {
    case color === 'light':
      return '#b7c0c6';
    case color === 'bold':
      return '#3f4a4d';
    case color === 'contrast':
      return '#fff';
    case color && color.length > 0:
      return color;
    default:
      return '#6d7383';
  }
};

const gutterHandler = values => {
  if (values) {
    const [topMargin, bottomMargin] = values.split(' ');
    return `${topMargin} 0 ${bottomMargin || ''}`;
  }
  return '1rem 0';
};

const Typography = styled(Text)`
  color: ${({ color }) => colorHandler(color)};
  margin: ${({ gutter }) => gutterHandler(gutter)};
`;

const TextElement = ({ component: Component, color, ...rest }) => (
  <Typography color={color} {...rest} />
);

export default TextElement;
