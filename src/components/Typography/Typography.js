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
    case color === 'primary':
      return '#74b9ff';
    case color === 'error':
      return '#ff0000';
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
  color: ${({ textcolor }) => colorHandler(textcolor)};
  margin: ${({ gutter }) => gutterHandler(gutter)};
`;

const TextElement = ({ color, ...rest }) => (
  <Typography textcolor={color} {...rest} />
);

export default TextElement;
