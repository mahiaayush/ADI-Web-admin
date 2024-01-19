import type { FC } from 'react';
import { useState, useReducer } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Tab,
    Tabs,
    Container,
    Grid,
    Typography,
    Link,
    Breadcrumbs,
    Tooltip,
    IconButton,
} from '@material-ui/core';
import AddCircleOutlineSharp from '@material-ui/icons/AddCircleOutlineSharp';
import Internal from "./internal/list/Internal";
import External from "./external/list/External";
import ActiveUserListing from "./ActiveUserListing";
import InActiveUserListing from './InActiveUserListing';
import AddUser from "./add/AddUser";
import './userList.css';
import { useSelector } from 'src/store';
import { GET_ACTIVE_USERS, GET_ACTIVE_USERS_EXPIRED } from 'src/store/RbacConstants';

const tabs = [
    {
        label: 'Subscribed',
        value: 'subscribed'
    },
    {
        label: 'Expired',
        value: 'unsubscribed'
    }
];

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
    }
});

const PremiumUser: FC = () => {
    const classes = useStyles();
    const [addDialog, setAddDialog] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<number>(0)
    const [newUsers, forceUpdate] = useReducer(x => x + 1, 0);
    
    const tabHandler = (id: number) => {
        setActiveTab(id)
    }
    /**
   * GET ALL ALLOWED API List
   */
    const roleAllowedApis = useSelector(
        (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    )

    const disabledTab = (tab: string) => {
        if (tab === 'Subscribed' && roleAllowedApis.filter(itm => itm?.apiKey === GET_ACTIVE_USERS).length > 0) {
            return false
        } 
        if (tab === 'Expired' && roleAllowedApis.filter(itm => itm?.apiKey === GET_ACTIVE_USERS_EXPIRED).length > 0) {
            return false
        } 
        return true;
    }

    return (
        <div>
            <Container className="userIndex">
                {addDialog && <AddUser
                    open={addDialog}
                    onClose={() => setAddDialog(false)}
                    onSubmit={() => forceUpdate()}
                />}
                <Grid item xs={12} position="relative" className={classes.topheader}>
                    <Typography
                        color="textPrimary"
                        variant="h5"
                    >
                        Premium Users List
                    </Typography>
                    {/* <Tooltip title="Add" className={classes.usertooltip}>
                        <IconButton
                            aria-label="add"
                            size="small"
                            onClick={() => setAddDialog(true)}
                        >
                            <AddCircleOutlineSharp
                                color="primary"
                                fontSize="large"
                            />
                        </IconButton>
                    </Tooltip> */}
                </Grid>
                <Grid item xs={12} sx={{ mb: 2 }} className={classes.tablebackground}>
                    <Tabs className={classes.tableTab} indicatorColor="primary" scrollButtons="auto" textColor="primary" value={tabs[activeTab].value} variant="scrollable">
                        {tabs.map((tab, ind) => (
                            <Tab
                                key={tab.value}
                                label={tab.label}
                                value={tab.value}
                                disabled={disabledTab(tab.label)}
                                className={activeTab === ind ? classes.active : classes.tabbing}
                                onClick={() => tabHandler(ind)}
                            />
                        ))}
                    </Tabs>
                    {activeTab === 0 && <ActiveUserListing />}
                    {activeTab === 1 && <InActiveUserListing />}
                </Grid>
            </Container>
        </div>
    )
}

export default PremiumUser;