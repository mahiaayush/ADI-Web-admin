import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from './dataTableStyle';
import {
  Grid
} from '@material-ui/core';
import "../../CounselloApplication/DetailScreen.css"

const GlobalFilter = ({
  globalFilter,
  setGlobalFilter,
  headerGroups,
  isAssignUser
}) => {
  const classes = useStyles()
  const url = window.location.pathname;
  const lastSegment = url.split("/").pop();
  const secondLastSegment = url.split("/")
  localStorage.setItem('lastSegment', lastSegment);
  window.pageName = localStorage.getItem('lastSegment');
  const DataCurrectnRoute = ["college-event", "collegeevent-dates", "eventtype", "entity-courses", "course-eligibility"];
  return (
    <div className={classes.search}>
      {
        lastSegment === "entity"
          ? headerGroups.map(headerGroup => (
              <Grid
                container
                spacing={3}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map(column => (
                  column.canFilter ? <Grid item sm={2} xs={12} {...column.getHeaderProps()}>
                    {column.render('Filter')}
                  </Grid>
                  : null
                ))}
              </Grid>
            ))
          : lastSegment === "counsellor-application-list" || lastSegment === "Counsellors" ? <TextField
            className={classes.textField}
            id="outlined-basic"
            size="small"
            label="Filter"
            variant="outlined"
            value={globalFilter || ''}
            placeholder="Search Counsellor"
            onChange={e => {
              setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          /> : <TextField
            className={classes.textField}
            id="outlined-basic"
            size="small"
            label="Filter"
            variant="outlined"
            value={globalFilter || ''}
            placeholder={lastSegment === 'ItemListing' ? "Item Name" : lastSegment === 'SessionSlotsOverride' ? "Date" : lastSegment === 'feedback' ? "Name, Plan Name" : lastSegment === 'premiumuser' ? 'Learner Name, Plan Name' : secondLastSegment[secondLastSegment.length - 2] === 'entity' && !isAssignUser ? "Transaction ID, Zoho Plan ID" : secondLastSegment[secondLastSegment.length - 2] === 'entity' && isAssignUser ? "Student Name" : lastSegment === "learning-hub" ? "Order No, Invoice No, Course Title, Email" : lastSegment === "Logistic" ? "Card Lot, Card Serial" : lastSegment === "region" ? "Region Name" : lastSegment === "city" ? "City Name" : lastSegment === "vpa" ? "Vpa Acc No., IFSC Code, Bank Name" : lastSegment === "offers" ? "Coupon Code, Coupon Desc, Coupon Name" : lastSegment === "states" ? "State Name" : lastSegment === "sales-meta" ? "Seller Name, Seller Email" : lastSegment === "financial-approval" ? "Item, Item Type, Agent Name, Sold To" : lastSegment === "college" ? "Search" : lastSegment === "accomodation-type" ? "Search" : lastSegment === "ranking-org" ? "Search" : lastSegment === "accrediation" ? "Search" : lastSegment === "affiliation" ? "Search" : lastSegment === "city-master" ? "Search" : lastSegment === "degree" ? "Search" : lastSegment === "stream" ? "Search" : lastSegment === "subject" ? "Search" : lastSegment === "task-stmt" ? "Search" : lastSegment === "employment-status" ? "Search" : lastSegment === "discipline" ? "Search" : lastSegment === "academic" ? "Search" : lastSegment === "program" ? "Search" : lastSegment === "category" ? "Search" : lastSegment === "college-event" ? "Search" : lastSegment === "publisher-master" ? "Search" : lastSegment === "collegeevent-dates" ? "Search" : lastSegment === "eventtype" ? "Search" : lastSegment === "course-faq" ? "Search" : lastSegment === "course-asset" ? "Search" : lastSegment === "section-content" ? "Search" : lastSegment === "course-section" ? "Search" : lastSegment === "course-details" ? "Search" : lastSegment === "entity-courses" ? "Search" : lastSegment === "course-eligibility" ? "Search" : lastSegment === "course-examination" ? "Search" : lastSegment === "course-master" ? "Search" : lastSegment === "courselevel-master" ? "Search" : lastSegment === "coursetype-master" ? "Search" : lastSegment === "entity-master" ? "Search" : lastSegment === "accomodationmapper" ? "Search" : lastSegment === "accreditationmapper" ? "Search" : lastSegment === "campus-entity" ? "Search" : lastSegment === "rankingmapper-entity" ? "Search" : lastSegment === "examination-master" ? "Search" : lastSegment === "examstype-master" ? "Search" : lastSegment === "occupation-employmentstatus" ? "Search" : lastSegment === "occupation-master" ? "Search" : lastSegment === "regional-occupation" ? "Search" : lastSegment === "occupation-benchmarkhour" ? "Search" : lastSegment === "occupation-course" ? "Search" : lastSegment === "occupation-exam" ? "Search" : lastSegment === "occupation-expenses" ? "Search" : lastSegment === "occupation-meta" ? "Search" : lastSegment === "occupation-progression" ? "Search" : lastSegment === "occupation-qualification" ? "Search" : lastSegment === "occupation-salary" ? "Search" : lastSegment === "occupation-studyroute" ? "Search" : lastSegment === "occupation-studyroutepath" ? "Search" : lastSegment === "category" ? "Category-Id, Name, Order, Status" : "Name, Phone Number, Email"}
            onChange={e => {
              setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
      }
    </div>
  )
}

GlobalFilter.propTypes = {
  setGlobalFilter: PropTypes.func.isRequired,
}

export default GlobalFilter;
