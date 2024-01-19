import {
    Grid,
    Box,
    Card,
    Container,
    Tabs,
    Tab,
    Button,
    Table,
    Breadcrumbs,
    Link
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const DashboardHome = () => {
    return (<Box sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 2
    }}
    >   
     <Container>
        <Grid
            container
            justifyContent="space-between"
            spacing={3}
        >
            <Grid item>
                <Typography
                    color="textPrimary"
                    variant="h5"
                >
                   Dashboard
                </Typography>
            </Grid>
        </Grid>
        </Container>
        </Box>
    )
}

export default DashboardHome;