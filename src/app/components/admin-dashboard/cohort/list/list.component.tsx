import React from 'react';

import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Cohort } from '../../../../models';
import { useAPI } from '../../../../hooks';
import { CohortListItem } from './item.component';

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '35vh',
        width: '100%',
        maxWidth: '80ch',
    },
    loading: {
        marginLeft: '1ch',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

interface ListCohortsProps {
    className?: string;
}

const ListCohorts: React.FC<ListCohortsProps> = ({ className }) => {
    const classes = useStyles({});
    const { request, response } = useAPI<Cohort[]>('/cohorts');

    React.useEffect(() => {
        request();
    }, [request]);

    if (!response) return <h4 className={classes.loading}>Loading...</h4>;
    return (
        <div className={className}>
            <div className={classes.header}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Cohort Name</TableCell>
                            <TableCell>Cohort Week</TableCell>
                            <TableCell>Cohort Activity</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {response.map((cohort) => (
                            <CohortListItem
                                key={cohort.id}
                                cohort={cohort}
                                onUpdate={() => request()}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export { ListCohorts };
