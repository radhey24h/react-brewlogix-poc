import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        backgroundColor: "#003b71",
        width: 110,
        overflowX: 'hidden',
        overflowY: 'hidden',
    },
    listItemText: {
        color: '#fff'
    }
}));

const sidebarList = [
    { logoPath: `${process.env.PUBLIC_URL}/assets/images/sidebar/Layer4.png`, label: 'Home' },
    { logoPath: `${process.env.PUBLIC_URL}/assets/images/sidebar/Layer5.png`, label: 'Products' },
    { logoPath: `${process.env.PUBLIC_URL}/assets/images/sidebar/Layer6.png`, label: 'Templates' },
    { logoPath: `${process.env.PUBLIC_URL}/assets/images/sidebar/Layer7.png`, label: 'Customize' },
    { logoPath: `${process.env.PUBLIC_URL}/assets/images/sidebar/Layer8.png`, label: 'Specials' },
    { logoPath: `${process.env.PUBLIC_URL}/assets/images/sidebar/Layer9.png`, label: 'Special Media' },
    { logoPath: `${process.env.PUBLIC_URL}/assets/images/sidebar/Layer10.png`, label: 'Ticker' },
    { logoPath: `${process.env.PUBLIC_URL}/assets/images/sidebar/Layer11.png`, label: 'Publish' },
];

export default function Sidebar() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Drawer variant="permanent"
            classes={{ paper: classes.paper }}>

            <div className={classes.toolbar}>
                <IconButton>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {sidebarList.map((sidebarItem, index) => (
                    <ListItem button key={index}>
                        <Grid container direction="row" alignItems="center">
                            <img src={sidebarItem.logoPath} alt={index}/>
                            <li className={classes.listItemText}> {sidebarItem.label}</li>
                        </Grid>
                    </ListItem>
                ))}

            </List>
            {/* <Divider />
             */}
        </Drawer>
    )
}
