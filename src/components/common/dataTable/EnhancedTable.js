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
import CircularProgress from '@material-ui/core/CircularProgress';
import { useEffect, useMemo } from 'react';
import { debounce, orderBy } from 'lodash'
import { Grid } from '@material-ui/core';
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  useFilters,
  useFlexLayout
} from 'react-table';
import TablePaginationActions from './TablePaginationActions';
import TablePaginationSingleStep from './TablePaginationSingleStep';
import TableToolbar from "./TableToolbar";

const EnhancedTable = ({
  columns,
  data,
  setFilter = (value) => value,
  setNewest = (value) => value,
  setOrderBy = (value) => value,
  setPrintStatus = (value) => value,
  setCardStatus = (value) => value,
  select = false,
  logisticSelect = false,
  isExpired = false,
  isAssignUser = false,
  dashboardSelect = false,
  counsellorApplicationSelect = false,
  filter = "Weekly",
  newest = "Newest",
  printStatus = "In Process",
  cardStatus = "Inactive",
  totalCount = 0,
  currentPage = 0,
  setPage = (value) => value,
  limit = 10,
  setLimit = (value) => value,
  search = '',
  setSearch = (value) => value,
  sortedBy = [],
  setSortedBy = (value) => value,
  isLoading = false,
  manualPagination = false,
  manualGlobalFilter = false,
  manualSortBy = false,
  singleStep = false,
  setFilters = (value) => value,
  searchFilters = [],
  rating = { label: "", value: "" },
  setRating = (value) => value,
  setStartDate = (value) => value,
  setEndDate = (value) => value,
  sessionStatus = { label: "", value: "" },
  setSessionStatus = (value) => value,
  sessionSubStatus = { label: "", value: "" },
  setSessionSubStatus = (value) => value,
  optionDisable = false,
  manualSearchCounsellor = '',
  setManualSearchCounsellor = (value) => value,
  manualSearchLearner = '',
  setManualSearchLearner = (value) => value,
  manualSearchMeeting = '',
  setManualSearchMeeting = (value) => value,
  setOpenGeneratePopup = (value) => value,
}) => {
  function DefaultColumnFilter() {
    return null
  }

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter, filters, sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: currentPage, pageSize: limit, globalFilter: search, filters: searchFilters, sortBy: sortedBy },
      pageCount: Math.ceil(totalCount / limit),
      manualPagination,
      manualGlobalFilter,
      manualSortBy,
      manualFilters: true,
      defaultColumn,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    useFlexLayout 
  )

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setPageSize(Number(event.target.value))
  }

  const handleSearch = useMemo(() =>
    debounce((searchText) => {
      setSearch(searchText)
      setPage(0)
    }, 1000),
    [])

  useEffect(() => {
    setFilters(filters);
    setPage(0);
  }, [filters]);

  useEffect(() => {
    setPage(pageIndex);
  }, [pageIndex]);

  useEffect(() => {
    setLimit(pageSize)
    setPage(0)
  }, [pageSize]);

  useEffect(() => {
    setSortedBy(sortBy)
  }, [sortBy]);

  useEffect(() => {
    handleSearch(globalFilter)
  }, [globalFilter])

  let cl = ""; 
  window.pageName === "Counsellors" ? cl = "" : cl = "";
  // Render the UI for your table
  return (
    <TableContainer component={Paper}>
      <TableToolbar
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
        headerGroups={headerGroups}
        select={select}
        logisticSelect={logisticSelect}
        isExpired={isExpired}
        isAssignUser={isAssignUser}
        dashboardSelect={dashboardSelect}
        counsellorApplicationSelect={counsellorApplicationSelect}
        printStatus={printStatus}
        setPrintStatus={setPrintStatus}
        cardStatus={cardStatus}
        setCardStatus={setCardStatus}
        setFilter={setFilter}
        filter={filter}
        setNewest={setNewest}
        setOrderBy={setOrderBy}
        newest={newest}
        rating={rating}
        setRating={setRating}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        sessionStatus={sessionStatus}
        setSessionStatus={setSessionStatus}
        sessionSubStatus={sessionSubStatus}
        setSessionSubStatus={setSessionSubStatus}
        optionDisable={optionDisable}
        manualSearchCounsellor={manualSearchCounsellor}
        setManualSearchCounsellor={setManualSearchCounsellor}
        manualSearchLearner={manualSearchLearner}
        setManualSearchLearner={setManualSearchLearner}
        manualSearchMeeting={manualSearchMeeting}
        setManualSearchMeeting={setManualSearchMeeting}
        setOpenGeneratePopup={setOpenGeneratePopup}
      />
     <Grid className={cl} item xl={12}>
      <MaUTable
        size="small"
        {...getTableProps()}
       
      >
        <TableHead className="tableHead">
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell
                  {...(column.id === 'selection'
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}
                >
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
        <TableBody className="fixedHeightTable">
        {isLoading ? <TableRow>
            <TableCell className="tableContent loaderClass" colSpan={columns?.length || 7}>
              <CircularProgress />
            </TableCell>
          </TableRow>
          : totalCount > 0
            ? page.length >= 0 && page.length === 0
              ? <TableRow>
                <TableCell className="tableContent" colSpan={columns?.length || 7}>
                  <h2> </h2>
                </TableCell>
              </TableRow>
              : page.map((row) => {
                prepareRow(row)
                return (
                  <TableRow
                    hover
                    {...row.getRowProps()}
                  >
                    {row.cells.map(cell => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            : <TableRow>
              <TableCell className="tableContent" colSpan={columns?.length || 7}>
                <h3>No record found.</h3>
              </TableCell>
            </TableRow>}
        </TableBody>
        <TableFooter>
          <TableRow>
            {window.pageName === "entity" ? <TablePagination
              rowsPerPageOptions={[
                10,
                25,
                50,
                100
              ]}
              /* colSpan={3} */
              count={totalCount}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              value={pageSize}
              onPageChange={handleChangePage}
              onChange={handleChangeRowsPerPage}
              ActionsComponent={singleStep ? TablePaginationSingleStep : TablePaginationActions}
            /> : window.pageName === "counsellor-application-list" ? <TablePagination
                rowsPerPageOptions={[
                  10,
                  25,
                  50,
                  100
                ]}
                /* colSpan={3} */
                count={totalCount}
                 rowsPerPage={pageSize} 
                // rowsPerPage={60}
                page={pageIndex}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                 value={pageSize} 
                // value={60}
                onPageChange={handleChangePage}
                onChange={handleChangeRowsPerPage}
                ActionsComponent={singleStep ? TablePaginationSingleStep : TablePaginationActions}
            /> : window.pageName === "Counsellors" ? <TablePagination
                rowsPerPageOptions={[
                  10,
                  25,
                  50,
                  100
                ]}
                /* colSpan={3} */
                count={totalCount}
                 rowsPerPage={pageSize} 
                // rowsPerPage={30}
                page={pageIndex}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                 value={pageSize} 
                // value={60}
                onPageChange={handleChangePage}
                onChange={handleChangeRowsPerPage}
                ActionsComponent={singleStep ? TablePaginationSingleStep : TablePaginationActions}
            /> : <TablePagination
                rowsPerPageOptions={[
                  10,
                  25,
                  50,
                  100
                ]}
                /* colSpan={3} */
                count={totalCount}
                rowsPerPage={pageSize}
                page={pageIndex}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                value={pageSize}
                onPageChange={handleChangePage}
                onChange={handleChangeRowsPerPage}
                ActionsComponent={singleStep ? TablePaginationSingleStep : TablePaginationActions}
            />}
          </TableRow>
        </TableFooter>
      </MaUTable>
      </Grid>
    </TableContainer>)
}

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  setPage: PropTypes.func,
  limit: PropTypes.number,
  setLimit: PropTypes.func,
  search: PropTypes.string,
  setSearch: PropTypes.func,
  isLoading: PropTypes.bool,
  manualPagination: PropTypes.bool,
  manualGlobalFilter: PropTypes.bool,
  singleStep: PropTypes.bool,
}

export default EnhancedTable;
