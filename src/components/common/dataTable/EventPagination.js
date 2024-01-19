import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import {
  usePagination,
  useTable
} from 'react-table';
import './eventPaginationStyle.css';

const EventPagination = ({
  columns,
  data
}) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  )

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage)
  }

  // Render the UI for your table
  return (
    <TableContainer component={Paper}>
      <MaUTable
        size="small"
        {...getTableProps()}
      >
        <TableHead className="tableHead">
          {headerGroups.map((headerGroup) => ( 
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (                
                <TableCell key={column.id}>
                  <div className="sortArrow">
                    {column.render('Header')}
                    {column.id !== 'selection' ? (
                      <TableSortLabel
                        className="st-sort-default"
                        active={column.isSorted}
                        // react-table has a unsorted state which is not treated here
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />

                    ) : null}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row) => {
            prepareRow(row)
            return (
              <TableRow 
                hover
                {...row.getRowProps()}
              >
                {row.cells.map(cell => {
                  return (
                    <TableCell key={cell.row.id} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              count={data.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              value={pageSize}
              onPageChange={handleChangePage}
            />
          </TableRow>
        </TableFooter>
      </MaUTable>
    </TableContainer>
  )
}

EventPagination.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
}

export default EventPagination;
