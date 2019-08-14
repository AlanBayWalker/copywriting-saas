import React from 'react';
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import Link from '../Link/Link';
import MainNav from '../MainNav/MainNav';

const createData = (name, itemCount, created) => ({ name, itemCount, created });

const rows = [
  createData('Newspaper Copy', 159, '09/24/19'),
  createData('Call to Action', 237, '09/24/19'),
  createData('Unique', 262, '09/24/19'),
  createData('Direct Marketing', 305, '09/24/19'),
  createData('Slogans', 356, '09/24/19'),
];

const SwipeFolder = () => (
  <>
    <MainNav />
    <Container style={{ paddingTop: '4rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Item Count</TableCell>
            <TableCell align="right">Created</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ name, itemCount, created }) => (
            <TableRow key={name}>
              <Link
                to="/swipe-folder/newspaper-copy"
                //   style={{ display: '', width: '100%' }}
              >
                <TableCell component="th" scope="row">
                  <FolderIcon style={{ margin: '0 1rem -.5rem 0' }} />
                  {name}
                </TableCell>
              </Link>
              <TableCell align="right">{itemCount}</TableCell>
              <TableCell align="right">{created}</TableCell>
              <TableCell align="right">
                <DeleteIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  </>
);

export default SwipeFolder;
