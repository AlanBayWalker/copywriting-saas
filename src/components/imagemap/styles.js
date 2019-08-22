import styled, { css } from 'styled-components';
import { Button } from '@material-ui/core';

import Delete from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';
import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import FormatStrikethrough from '@material-ui/icons/FormatStrikethrough';
import FormatUnderlined from '@material-ui/icons/FormatUnderlined';
import FormatAlignCenter from '@material-ui/icons/FormatAlignCenter';
import FormatAlignJustify from '@material-ui/icons/FormatAlignJustify';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRight from '@material-ui/icons/FormatAlignRight';
import FormatColorText from '@material-ui/icons/FormatColorText';

export const WorkspaceSideMenu = styled.div`
  border-left: gray solid 4px;
  height: 100vh;
  /* padding: 2rem; */
`;

export const FooterToolbarContainer = styled.div`
  background-color: #fff;
  border-radius: 15px;
  bottom: 50px;
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5000;
`;

export const VerticalDivider = styled.span`
  position: relative;
  :after {
    background-color: rgba(0, 0, 0, 0.4);
    content: '';
    height: 1rem;
    width: 1px;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 40px;
  justify-content: center;
`;

export const FormatButton = styled(Button)`
  ${({ active }) =>
    active
      ? css`
          background-color: rgb(46, 204, 113, 0.05);

          .font-format-icon {
            fill: rgb(46, 204, 113, 0.5);
          }
        `
      : null}
`;

const IconStyles = css`
  fill: rgba(0, 0, 0, 0.6);
`;

export const DeleteIcon = styled(Delete)`
  ${IconStyles}
`;
export const SaveIcon = styled(Save)`
  ${IconStyles}
`;
export const FormatBoldIcon = styled(FormatBold)`
  ${IconStyles}
`;
export const FormatItalicIcon = styled(FormatItalic)`
  ${IconStyles}
`;
export const FormatStrikethroughIcon = styled(FormatStrikethrough)`
  ${IconStyles}
`;
export const FormatUnderlinedIcon = styled(FormatUnderlined)`
  ${IconStyles}
`;
export const FormatAlignCenterIcon = styled(FormatAlignCenter)`
  ${IconStyles}
`;
export const FormatAlignLeftIcon = styled(FormatAlignLeft)`
  ${IconStyles}
`;
export const FormatAlignRightIcon = styled(FormatAlignRight)`
  ${IconStyles}
`;
export const FormatAlignJustifyIcon = styled(FormatAlignJustify)`
  ${IconStyles}
`;
export const FormatColorTextIcon = styled(FormatColorText)`
  ${IconStyles}
`;
