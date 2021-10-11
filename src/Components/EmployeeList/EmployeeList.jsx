import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import EmployeeForm from '../EmployeeForm/EmployeeForm';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}



const EmployeeList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data,setData] = React.useState([])
  const [updateData,setUpdateData] = React.useState({ name: "", email: "", phone: "", dob: "", gender: "", hobbies: { dancing: false, cooking: false, sports: false, painting: false } })
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) =>{
     setOpen(true);
     let element = data.filter(el=>{
       return el.id == id;
     })
     setUpdateData(element[0])
     console.log(element[0])
  }
  const handleClose = () => setOpen(false);

  //Get data from server
  React.useEffect(()=>{
      axios.get('http://localhost:3001/employees')
      .then(res=>{
        //console.log(res.data)
        setData(res.data)
      }).catch(err=>{
        console.log(err)
      })
  },[])

  //Change the input state
  const handleChangeUpdate = (e) => {
    var [name, value] = [e.target.name, e.target.value];
 
      if (name == "dancing" || name == "cooking" || name == "sports" || name == "painting") {
        let isTrue = (value === 'false')
        setUpdateData({
            ...updateData,
            hobbies: { ...updateData.hobbies, [name]: isTrue}
        }) 
      }else{
        setUpdateData({
          ...updateData,
            [name]: value
        }) 
      }
  }

  //Delete employee
  const handleDelete = (id) => {
      // console.log(id)
      axios.delete(`http://localhost:3001/employees/${id}`)
      .then(res=>{
        console.log("employee delted successfully")
      }).catch(err=>{
        console.log("Error" + ":" + err)
      })
  }

  //Update employee
  const handleUpdate = (e) => {
        //  e.preventDefault()
         axios.patch(`http://localhost:3001/employees/${updateData.id}`, {
              ...updateData
         }).then((res)=>{
           console.log(res)
         }).catch(err=>{
           console.log(err)
         })
        // console.log(updateData)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
       <EmployeeForm {...updateData} handleChange={handleChangeUpdate}  handleSubmit={handleUpdate}  handleClose={handleClose} open={open} formAction={"Update Data"}/>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" style={{ width: 160 }}>
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.email}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.phone}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.gender}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.dob}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
               <p> {row.hobbies.cooking ? "Coocking" : ""} </p>
               <p> {row.hobbies.dancing ? "Dancing" : ""} </p>
               <p> {row.hobbies.sports ? "Sports" : ""} </p>
               <p> {row.hobbies.painting ? "Painting" : ""} </p>
              </TableCell>
              <TableCell  style={{ width: 100 }} align="right"> 
                   <div onClick={()=>handleDelete(row.id)}> <DeleteIcon/> </div>
              </TableCell>
              <TableCell  style={{ width: 100 }} align="center"> 
                <div onClick={()=>handleOpen(row.id)} > <CreateIcon /></div>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default EmployeeList;