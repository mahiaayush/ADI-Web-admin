import {
    Container,
    Grid,
    Typography,
    Box,
    Card,
  } from "@material-ui/core";
  import { makeStyles } from "@material-ui/core/styles";
  import { useDispatch, useSelector } from "src/store";
  import { useEffect, useState, useMemo } from "react";
  import EnhancedTable from "../common/dataTable/EnhancedTable";
import { getBlogsVideos } from "src/store/actions/BlogsVideosAction";
  
  const useStyles = makeStyles({
    topheader: {
      paddingTop: "16px",
      position: "relative",
    },
    tablebackground: {
      background: "#fff",
      border: "1px solid #eee",
      borderRadius: "4px",
      position: "relative",
      boxShdow: "0px 1px 2px #ddd",
      marginTop: "24px",
    },
    tableTab: {
      width: "100%",
      borderBottom: "1px solid rgba(224, 224, 224, 1)",
    },
    tabbing: {
      borderBottom: "2px solid #fff",
    },
    active: {
      borderBottom: "2px solid #5664d2",
      color: "#5664d2",
    },
    usertooltip: {
      position: "absolute",
      right: "0px",
      top: "16px",
    },
    clickable: {
      cursor: "pointer",
      background: "transparent",
      textDecoration: "none !important",
      textAlign: "left",
      fontSize: "14px",
      textTransform: "capitalize",
      padding: "0",
    }, 
    tfoottop: {
      "& table": {
        "& tfoot": {
          position: "absolute",
          top: "0px",
          right: "0px"
        }
      }
    }
  });
  
  export const BlogsVideoCorrection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [filters, setFilters] = useState([])
    const [isLoading, setIsLoading] = useState(false);
      
    useEffect(() => {
      setIsLoading(true)
        dispatch(getBlogsVideos(page + 1, limit)).then(() => setIsLoading(false));
    }, [page, limit])
  
    const blogsVideosData = useSelector(
      (state: any) => state?.getBlogsVideosReducer?.blogsVideosResponse?.data
    );  
      
    const columns = useMemo(
      () => [
        {
          Header: "Id",
          accessor: "id",
          width: 30,
        },
        {
          Header: "Title",
          accessor: "title",
          width: 60,
        },
        {
          Header: "Description",
          accessor: "description",
          width: 60,
        },
        {
          Header: "ThumbnailUrl",
          accessor: "thumbnailUrl",
          width: 60,
        },
        {
          Header: "VideoUrl",
          accessor: "videoUrl",
          width: 60,
        },
        {
          Header: "BlogUrl",
          accessor: "blogUrl",
          width: 60,
        }
      ],
      []
    );
  
    return (
      <div>
        <Container className="userIndex">
          <Grid item xs={12} position="relative" className={classes.topheader}>
            <Typography color="textPrimary" variant="h5">
              BlogsVideos
            </Typography>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Card>
              <Grid
                item
                className="counsellorApplicationListTable filterdataContner"
              >
                {blogsVideosData && blogsVideosData?.rows && blogsVideosData?.rows?.length > 0 && (
                  <div className={`${classes.tfoottop} itemListSorting`}>
                    <EnhancedTable
                      isLoading={isLoading}
                      columns={columns}
                      data={blogsVideosData?.rows}
                      totalCount={blogsVideosData?.count}
                      limit={limit}
                      currentPage={page}
                      setPage={setPage}
                      setLimit={setLimit}
                      searchFilters={filters}
                      setFilters={setFilters}
                      manualPagination={true}
                      manualGlobalFilter={true}
                      manualSortBy={true}
                    />
                  </div>
                )}
              </Grid>
            </Card>
          </Box>
        </Container>
      </div>
    );
  };