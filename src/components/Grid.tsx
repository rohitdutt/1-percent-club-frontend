import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { ITEM_HEIGHT, PRIORITY, TASK_STATUS } from '../constant';
import Chip from '@mui/material/Chip';
import { Menu, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EditTaskModal from './EditTaskModal';

const Grid: React.FC<any> = ({rows, setRows, shouldCallAPI, setShouldCallAPI}) => {

  const [anchorEls, setAnchorEls] = useState<Record<number, HTMLElement | null>>({});
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const getTasksByUserId= async (): Promise<void> => {
    const res = await axios.post('https://one-percent-club-b818.onrender.com/getTasksByUserId',{
        userId: 'par@gmail.com'
    });
    setRows(res.data.tasks);
  }

  useEffect(() => {
    getTasksByUserId();
  },[shouldCallAPI]);

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEls((prev) => ({
      ...prev,
      [id]: event.currentTarget,
    }));
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleClose = (id: number) => {
    setAnchorEls((prev) => ({
      ...prev,
      [id]: null,
    }));
  };

  const handleRowSelect = (row: any) => {
    setSelectedRow(row);
    setOpen(true);
  } 

  
  const handleStatusChange = async (id: any, newStatus: TASK_STATUS) : Promise<void> => {
    await axios.post('https://one-percent-club-b818.onrender.com/updateSatusByTaskId',{
        userId: 'par@gmail.com',
        taskId: id,
        taskStatus: newStatus
    });
    setShouldCallAPI(!shouldCallAPI);
    handleClose(id);
  };

  const columns = [
    { 
      field: 'title',
      headerName: 'Title',
      width: 150,
      renderCell: (params: GridCellParams) => {
        return <p style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => handleRowSelect(params.row)}>{params.row?.title}</p>;
      }
    },
    { field: 'description', headerName: 'Description', width: 200 },
    { 
      field: 'priority', 
      headerName: 'Priority', 
      width: 150,
      renderCell: (params: GridCellParams) => {
        return PRIORITY[params.value as number];
      }
    },
    { 
      field: 'createdAt', 
      headerName: 'Date', 
      width: 150,
      renderCell: (params: GridCellParams) => {
        return new Date(params.value as Date).toLocaleDateString('en-GB');
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params: GridCellParams) => {
        const status = params.value as TASK_STATUS;

        let chipColor;
        let chipLabel;

        switch (status) {
          case TASK_STATUS.IN_PROGRESS:
            chipColor = '#F8E473';
            chipLabel = 'In Progress';
            break;
          case TASK_STATUS.COMPLETED:
            chipColor = '#00CC99';
            chipLabel = 'Completed';
            break;
          case TASK_STATUS.PENDING:
            chipColor = 'red';
            chipLabel = 'Not Started';
            break;
          default:
            chipColor = 'default';
            chipLabel = '';
        }

        return(
          <>
            <Chip label={chipLabel} style={{ backgroundColor: chipColor, color: 'white' }} onClick={(e) => handleClick(e, params.row._id as number)}/>
            <div style={{height: '25px', width: '30px'}}>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEls[params.row._id as number]}
                open={Boolean(anchorEls[params.row._id as number])}
                onClose={() => handleClose(params.row._id as number)}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}
              >
                {Object.values(TASK_STATUS).map((status: TASK_STATUS) =>{
                return(
                  <MenuItem key={status} onClick={() => handleStatusChange(params.row._id as any, status)}>
                    {status}
                  </MenuItem>
                )})}
              </Menu>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div style={{width: '100%', padding: '1% 1% 1% 0.5%'}}>
      <div style={{ height: 350,backgroundColor: 'white'}}>
        <DataGrid getRowId={row => row._id} rows={rows} columns={columns}  editMode="row"/>
      </div>
      <EditTaskModal open={open} handleClose={handleCloseModal} shouldCallAPI={shouldCallAPI} setShouldCallAPI={setShouldCallAPI} selectedRow={selectedRow}/>
    </div>
  );
};

export default Grid;