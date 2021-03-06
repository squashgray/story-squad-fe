import React from 'react';

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Fab,
    FormControlLabel,
    Icon,
    Switch,
    TextField,
    Typography,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import { useAPI, useForm } from '../../../../hooks';

const useStyles = makeStyles((theme) => ({
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
    },
    header: {
        'backgroundColor': theme.palette.primary.main,
        'color': theme.palette.primary.contrastText,
        '& > .MuiCardHeader-action': {
            margin: 0,
        },
    },
    actionButton: {
        height: theme.spacing(4),
    },
    form: {
        display: 'grid',
        gridGap: theme.spacing(3),
    },
    preferences: {
        display: 'grid',
        gridGap: theme.spacing(3),
        gridTemplateColumns: 'repeat(auto-fit, 250px)',
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

interface ChildEdit {
    id: string | number;
    onUpdate?: () => void;
}

const ChildEdit: React.FC<ChildEdit> = ({ id, onUpdate }) => {
    const classes = useStyles();

    const [fetched, fetching, fetch] = useAPI(`/children/list/${id}`);
    const [updated, updating, update] = useAPI(`/children/list/${id}`, 'PUT');
    const [removed, removing, remove] = useAPI(`/children/list/${id}`, 'DELETE');

    const { state: child, setState: setChild, handleInputChange: handleChildChange } = useForm({
        username: '',
        grade: 0,
    });

    const {
        state: preferences,
        setState: setPreferences,
        handleBoolChange: handlePreferenceChange,
    } = useForm({
        dyslexia: false,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        update({
            ...child,
            preferences: {
                ...preferences,
            },
        });
    };

    React.useEffect(() => {
        fetch();
    }, [fetch]);

    React.useEffect(() => {
        if (!fetched) return;
        const { id, subscription, ...child } = fetched.child;
        setChild({ ...child });
        setPreferences({ ...child.preferences });
    }, [fetched, setChild, setPreferences]);

    React.useEffect(() => {
        if (updated && onUpdate) onUpdate();
    }, [onUpdate, updated]);

    React.useEffect(() => {
        if (removed && onUpdate) onUpdate();
    }, [onUpdate, removed]);

    if (fetching)
        return (
            <section className={classes.loading}>
                <CircularProgress size={56} />
            </section>
        );

    const { username, grade } = child;
    const { dyslexia } = preferences;
    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader
                    className={classes.header}
                    title={<Typography variant='h5'>{username}</Typography>}
                    action={
                        <Button
                            className={classes.actionButton}
                            size='small'
                            color='inherit'
                            onClick={() => remove()}>
                            Cancel Membership
                        </Button>
                    }
                />
                <CardContent className={classes.form}>
                    <TextField
                        type='number'
                        label='Grade'
                        required
                        value={grade}
                        onChange={handleChildChange('grade')}
                    />
                    <Typography variant='overline'>Preferences</Typography>
                    <section className={classes.preferences}>
                        <FormControlLabel
                            label='Dyslexia'
                            labelPlacement='bottom'
                            control={
                                <Switch
                                    checked={dyslexia}
                                    onChange={handlePreferenceChange('dyslexia')}
                                />
                            }
                        />
                    </section>
                </CardContent>
            </Card>

            <Fab className={classes.fab} type='submit' color='primary'>
                <Icon>save</Icon>
            </Fab>
        </form>
    );
};

export { ChildEdit };
