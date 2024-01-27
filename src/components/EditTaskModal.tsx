import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, TextField, Divider, CardActions } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TASK_STATUS } from '../constant';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const priorities = [
    {
        value: 1,
        label: 'Blocker'
    },
    {
        value: 2,
        label: 'Critical'
    },
    {
        value: 3,
        label: 'Major'
    },
    {
        value: 4,
        label: 'Lower'
    }
];

const EditTaskModal: React.FC<any> = ({ handleClose, open, shouldCallAPI, setShouldCallAPI, selectedRow }) => {

    const [values, setValues] = useState({
        _id: '',
        title: '',
        description: '',
        priority: 1,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues((prevState: any) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const currentDateTime: string = new Date(new Date().setSeconds(0, 0)).toISOString()
        const res = await axios.post('https://one-percent-club-b818.onrender.com/updateTask', {
            task: {
                _id: values._id,
                userId: 'par@gmail.com',
                title: values.title,
                description: values.description,
                priority: values.priority,
                // status: TASK_STATUS.PENDING,
                // createdAt: currentDateTime,
                updatedAt: currentDateTime
            },
            userId: 'par@gmail.com'
        });
        console.log(res);
        setShouldCallAPI(!shouldCallAPI);
        setValues({
            _id: '',
            title: '',
            description: '',
            priority: 1,
        });
        handleClose();
    };

    const handleDeleteTask = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const res: any = await axios.delete('https://one-percent-club-b818.onrender.com/deleteTask', {
            data: {
                taskId: values._id,
                userId: 'par@gmail.com'
            }
        });
        if(res.status === 200){
            setShouldCallAPI(!shouldCallAPI);
            setValues({
                _id: '',
                title: '',
                description: '',
                priority: 1,
            });
            handleClose();
        }
    };


    useEffect(() => {
        if (selectedRow) {
            setValues({
                _id: selectedRow._id,
                title: selectedRow.title,
                description: selectedRow.description,
                priority: selectedRow.priority,
            });
        }
    }, [selectedRow]);

    return (
        <div style={{ padding: '10%' }}>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Edit Your task
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <div>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Grid
                                container
                                spacing={1}
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', height: '15rem' }}
                            >
                                <TextField
                                    fullWidth
                                    label="Task title"
                                    name="title"
                                    onChange={handleChange}
                                    required
                                    value={values.title}
                                />
                                <TextField
                                    fullWidth
                                    label="Task Description"
                                    name="description"
                                    onChange={handleChange}
                                    required
                                    value={values.description}
                                />
                                <TextField
                                    fullWidth
                                    label="Select Priority"
                                    name="priority"
                                    onChange={handleChange}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.priority}
                                >
                                    {priorities.map((priority: any) => (
                                        <option
                                            key={priority.value}
                                            value={priority.value}
                                        >
                                            {priority.label}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                        </Box>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' style={{ backgroundColor: 'red', color: 'white' }} autoFocus onClick={handleDeleteTask}>
                        Delete
                    </Button>
                    <Button variant='contained' autoFocus onClick={handleSubmit}>
                        Update
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
};

export default EditTaskModal;
