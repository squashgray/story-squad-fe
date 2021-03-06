import React from 'react';
import { Link } from 'react-router-dom';
import { ListCohorts } from '../../../../components';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    loading: {
        marginLeft: '1ch',
    },
}));

const ManageCohortPage: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography variant='h4' gutterBottom>
                    Cohort Management
                </Typography>

                <Link to='/admin/dashboard/cohort/create'>
                    <Button>Create Cohort</Button>
                </Link>
            </div>
            <ListCohorts />
        </div>
    );
};

export { ManageCohortPage };
