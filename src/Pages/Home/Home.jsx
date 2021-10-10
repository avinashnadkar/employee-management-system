import React from "react";
import EmployeeForm from "../../Components/EmployeeForm/EmployeeForm";
import Navbar from "../../Components/Navbar/Navbar"

const Home = () => {

     //States
     const [data, setData] = React.useState({ name: "", email: "", phone: "", dob: "", gender: "", hobbies: { dancing: false, cooking: false, sports: false, painting: false } })

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
         e.preventDefault()
         console.log(data)
     }

    return(
        <div>
            <Navbar/>
            <EmployeeForm {...data} handleChange={handleChange} handleSubmit={handleSubmit} formAction={"Add"}/>
        </div>
    )
}

export default Home;