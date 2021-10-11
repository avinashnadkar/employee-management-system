import React from "react";
import style from "./Home.module.css";
import EmployeeForm from "../../Components/EmployeeForm/EmployeeForm";
import Navbar from "../../Components/Navbar/Navbar";
import EmployeeList from "../../Components/EmployeeList/EmployeeList";
import Button from '@mui/material/Button';
import axios from 'axios';

const Home = () => {

     //States
     const [data, setData] = React.useState({ name: "", email: "", phone: "", dob: "", gender: "", hobbies: { dancing: false, cooking: false, sports: false, painting: false } })
     const [open, setOpen] = React.useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
  
     //change the data on events
     const handleChange = (e) => {
 
         let [name, value] = [e.target.name, e.target.value];
 
         if (name == "dancing" || name == "cooking" || name == "sports" || name == "painting") {
             let isTrue = (value === 'false')
             setData({
                 ...data,
                 hobbies: { ...data.hobbies, [name]: isTrue}
             }) 
         }else{
             setData({
                 ...data,
                 [name]: value
             })
         }
     }
 
     //Add the data
     const handleSubmit = (e) => {
        //  e.preventDefault()
         axios.post('http://localhost:3001/employees',{
             ...data
         }).then((res)=>{
             console.log(res)
         }).catch((err)=>{
             console.log(err)
         })
     }

    return(
        <div>
            <Navbar/>
            <div className={style.addEmployeeBtn} onClick={handleOpen} >
                <Button> Add new employee </Button>
            </div>
            <EmployeeForm {...data} handleChange={handleChange} handleSubmit={handleSubmit} formAction={"Add"} handleClose={handleClose} open={open}/>
            <div className={style.employeeListContainer}>
               <EmployeeList/>
            </div>
        </div>
    )
}

export default Home;