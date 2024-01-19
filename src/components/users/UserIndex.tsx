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
import AddUser from "./add/AddUser";
import './userList.css';
import { useSelector } from 'src/store';
import { GET_EXTERNAL_USERS, GET_INTERNAL_USERS, POST_INTERNAL_USERS } from 'src/store/RbacConstants';

const tabs = [
    {
        label: 'Internal',
        value: 'internal'
    },
    {
        label: 'External',
        value: 'external'
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

const UserIndex: FC = () => {
    const classes = useStyles();
    const [addDialog, setAddDialog] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<number>(0)
    const [newUsers, forceUpdate] = useReducer(x => x + 1, 0);
    /**
   * GET ALL ALLOWED API List
   */
    const roleAllowedApis = useSelector(
        (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    )
    const tabHandler = (id: number) => {
        setActiveTab(id)
    }

    const isTabDisabled = (tab: string) => {
        if (tab === 'Internal' && roleAllowedApis.filter(itm => itm?.apiKey === GET_INTERNAL_USERS).length > 0) {
            return false
        } 
        if (tab === 'External' && roleAllowedApis.filter(itm => itm?.apiKey === GET_EXTERNAL_USERS).length > 0) {
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
                        Users List
                    </Typography>
                    <Tooltip title="Add" className={classes.usertooltip}>
                        <IconButton
                            aria-label="add"
                            size="small"
                            disabled={!(roleAllowedApis.filter(itm => itm.apiKey === POST_INTERNAL_USERS).length > 0)}
                            onClick={() => setAddDialog(true)}
                        >
                            <AddCircleOutlineSharp
                                color="primary"
                                fontSize="large"
                            />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={12} sx={{ mb: 2 }} className={classes.tablebackground}>
                    <Tabs className={classes.tableTab} indicatorColor="primary" scrollButtons="auto" textColor="primary" value={tabs[activeTab].value} variant="scrollable">
                        {tabs.map((tab, ind) => (
                            
                            <Tab
                                key={tab.value}
                                label={tab.label}
                                value={tab.value} // External
                                disabled={isTabDisabled(tab.label)}
                                className={activeTab === ind ? classes.active : classes.tabbing}
                                onClick={() => tabHandler(ind)}
                            />))}
                    </Tabs>
                    {activeTab === 0 && <Internal newUsers={newUsers} />}
                    {activeTab === 1 && <External newUsers={newUsers} />}
                </Grid>
            </Container>
        </div>
    )
}

export default UserIndex;