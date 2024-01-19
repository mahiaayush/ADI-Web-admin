import {
    Grid,
    Box
} from '@material-ui/core';

const CounsellorStatusData = (props) => {  
return (<Box sx={{ mt: 3 }}>
    <Grid
        container
        spacing={3}
    >
        <Grid
        item
        md={3}
        xl={3}
        xs={6}
        >
            <Grid
                item
                xs={12}
                className="headerBoxes"
            >
                <h2>Applications</h2>
                <p>Submitted : <span>
                { props.finalData.Applications?.Submitted }</span>
                </p>
                <p>Approved : <span>
                { props.finalData.Applications?.Approved }</span>
                </p>
                <p>Denied : <span>
                { props.finalData.Applications?.Denied }</span>
                </p>
            </Grid>
        </Grid>
        <Grid
        item
        md={3}
        xl={3}
        xs={6}
        >
            <Grid
                item
                xs={12}
                className="headerBoxes"
            >
                <h2>Interviews</h2>
                <p>Not Initiated : <span>
                { props.finalData.Interviews?.Not_Initiated }</span>
                </p>
                <p>Initiated : <span>
                { props.finalData.Interviews?.Initiated }</span>
                </p>
                <p>Passed : <span>
                { props.finalData.Interviews?.Passed }</span>
                </p>
                <p>Failed : <span>
                { props.finalData.Interviews?.Failed }</span>
                </p>
            </Grid>
        </Grid>
        <Grid
        item
        md={3}
        xl={3}
        xs={6}
        >
            <Grid
                item
                xs={12}
                className="headerBoxes"
            >
                <h2>E-Acceptance</h2>
                <p>Pending : <span>
                { props.finalData.E_Acceptance?.Pending }</span>
                </p>
                <p>Completed : <span>
                { props.finalData.E_Acceptance?.Completed }</span>
                </p>
            </Grid>
        </Grid>
        <Grid
        item
        md={3}
        xl={3}
        xs={6}
        >
            <Grid
                item
                xs={12}
                className="headerBoxes"
            >
                <h2>In Training</h2>
                <p>Not Initiated : <span>
                { props.finalData.In_Training?.Not_Initiated }</span>
                </p>
                <p>Initiated : <span>
                { props.finalData.In_Training?.Initiated }</span>
                </p>
                <p>Passed : <span>
                { props.finalData.In_Training?.Passed }</span>
                </p>
                <p>Failed : <span>
                { props.finalData.In_Training?.Failed }</span>
                </p>
            </Grid>
        </Grid>
        <Grid
        item
        md={3}
        xl={3}
        xs={6}
        >
            <Grid
                item
                xs={12}
                className="headerBoxes"
            >
                <h2>Profiles</h2>
                <p>Initiated : <span>
                { props.finalData.Profiles?.Not_Initiated }</span>
                </p>
                <p>Approved : <span>
                { props.finalData.Profiles?.Approved }</span>
                </p>
                <p>Submitted : <span>
                { props.finalData.Profiles?.Failed }</span>
                </p>
                <p>Denied : <span>
                { props.finalData.Profiles?.Submitted }</span>
                </p>
                <p>Saved : <span>
                { props.finalData.Profiles?.Saved }</span>
                </p>
            </Grid>
        </Grid>
        <Grid
        item
        md={3}
        xl={3}
        xs={6}
        >
            <Grid
                item
                xs={12}
                className="headerBoxes"
            >
                <h2>Availability</h2>
                <p>Not Initiated : <span>
                { props.finalData.Availability?.Not_Initiated }</span></p>
                <p>Approved : <span>
                { props.finalData.Availability?.Approved }</span></p>
                <p>Submitted : <span>
                { props.finalData.Availability?.Submitted }</span></p>
                <p>Denied : <span>
                { props.finalData.Availability?.Denied }</span></p>
                <p>Saved : <span>
                { props.finalData.Availability?.Saved }</span></p>
            </Grid>
        </Grid>
    </Grid>
    </Box>)
}

export default CounsellorStatusData;
