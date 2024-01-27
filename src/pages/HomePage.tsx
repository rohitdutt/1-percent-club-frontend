import React, { useEffect, useState } from 'react';
import CustomPieChart from '../components/charts/PieChart';
import Cards from '../components/cards';
import Grid from '../components/Grid';
import { Button, SvgIcon } from '@mui/material';
import AddTaskModal from '../components/AddTaskModal';
import { CREATE_TASK, TASK_STATUS } from '../constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {

    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [stats, setStats] = useState([]);
    const [shouldCallAPI, setShouldCallAPI] = useState(false);

    const navigate = useNavigate()


    const getStats = async () => {
        const res = await axios.post('https://one-percent-club-b818.onrender.com/getAnalyticsByUserId',{
            userId: 'par@gmail.com'
        });
        setStats(res.data.counts);
    }

    useEffect(()=> {
        getStats();
    },[shouldCallAPI]);

    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

      if(!localStorage.getItem("token")){
        navigate('/login')
      }

    return(
        <>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: "1%"}}>
                {
                    stats.map((stat: any) => <Cards key={stat.status} title={stat?.count?.label} count={stat?.count?.value as number}/>)
                }
                <Button
                    style={{height: '3.5rem'}}
                    startIcon={(
                        <SvgIcon fontSize="small">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                        </SvgIcon>
                    )}
                    variant="contained"
                    onClick={handleClickOpen}
                >
                    Create Task
                </Button>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}> 
                <CustomPieChart stats={stats.map((stat: any) => stat.count)}/>
                <Grid rows={rows} setRows={setRows} shouldCallAPI={shouldCallAPI} setShouldCallAPI={setShouldCallAPI}/>
            </div>
            <AddTaskModal handleClose={handleClose} open={open} title={CREATE_TASK} setRows={setRows} rows={rows} shouldCallAPI={shouldCallAPI} setShouldCallAPI={setShouldCallAPI}/>
        </>
    );
};

export default HomePage;