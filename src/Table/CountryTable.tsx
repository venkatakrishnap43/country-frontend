import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

export interface Column {
  id: 'countryName' | 'countryCode' | 'countryContinent' | 'countryPopulation' ;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'countryName', label: 'Country Name', minWidth: 100 },
  { id: 'countryCode', label: 'Country Code', minWidth: 100 },
  {
    id: 'countryContinent',
    label: 'Country Continent',
    minWidth: 100
  },
  {
    id: 'countryPopulation',
    label: 'Country Population',
    minWidth: 100
  }
];

export interface Data {
  countryName: string;
  countryCode: string;
  countryPopulation: string;
  countryContinent: string;
}

function createData(countryName: string, countryCode: string, countryContinent: string,  countryPopulation: string): Data {
  return { countryName, countryCode, countryContinent,  countryPopulation};
}

const rows = [
  createData('India', 'IN', "1324171354", "3287263"),
  createData('China', 'CN', "1403500365", "9596961"),
  createData('Italy', 'IT', "60483973", "301340"),
  createData('United States', 'US', "327167434", "9833520"),
  createData('Canada', 'CA', "37602103", "9984670"),
  createData('Australia', 'AU', "25475400", "7692024"),
  createData('Germany', 'DE', "83019200", "357578"),
  createData('Ireland', 'IE', "4857000", "70273"),
  createData('Mexico', 'MX', "126577691", "1972550"),
  createData('Japan', 'JP', "126317000", "377973"),
  createData('France', 'FR', "67022000", "640679"),
  createData('United Kingdom', 'GB', "67545757", "242495"),
  createData('Russia', 'RU', "146793744", "17098246"),
  createData('Nigeria', 'NG', "200962417", "923768"),
  createData('Brazil', 'BR', "210147125", "8515767"),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '150%',
    marginTop: '50px'
  },
  head: {
    backgroundColor: '#000000',
    color: '#ffffff',
  },
  container: {
    maxHeight: 800,
  },
});



const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#045f7a',
      fontWeight: 'bold',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
        backgroundColor: '#ffffff',
    },
    hover:{
      color: theme.palette.action.hover,
      fontWeight: 'bold',
      cursor: 'hand' 
    }
  }),
)(TableRow);

export const StickyHeadTable = (
    {columns, rows}
    :{ columns: Column[], rows: Data[]}) => {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClicked = (row:any)=>{
    console.log(row);
    history.push(`country/details/${row.countryName}/country/${row.countryCode}/code`);
  }
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.countryCode} onClick={()=> handleRowClicked(row)}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}