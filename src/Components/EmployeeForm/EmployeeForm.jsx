import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import style from "./EmployeeForm.module.css";

const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 450,
    bgcolor: 'background.paper',
    border: '1px solid purple',
    boxShadow: 24,
    p: 4,
};

const EmployeeForm = (props) => {

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {props.formAction} Employee
                    </Typography>

                    <div>
                        <form onSubmit={props.handleSubmit}>
                            <div className={style.inputBox}>
                                <label className={style.textInputLabel}>Name</label> <br />
                                <input type="text" name="name" value={props.name} onChange={props.handleChange} placeholder="Name" />
                            </div>
                            <div className={style.inputBox}>
                                <label className={style.textInputLabel}>Email</label> <br />
                                <input type="text" name="email" value={props.email} onChange={props.handleChange} placeholder="email" />
                            </div>

                            <div className={style.inputRow}>
                                <div className={style.inputBox}>
                                    <label className={style.textInputLabel}>Phone</label> <br />
                                    <input type="text" name="phone" value={props.phone} onChange={props.handleChange} placeholder="phone" />
                                </div>
                                <div className={style.calendar}>
                                    <label className={style.textInputLabel}>Date of birth</label> <br />
                                    <input type="date" name="dob" onChange={props.handleChange} value={props.dob} />
                                </div>
                            </div>

                            <div className={style.selectors}>
                                <div className={style.gender}>
                                    <p className={style.title}>Gender</p>
                                    <input type="radio" name="gender" onChange={props.handleChange} value="Male" />
                                    <label>Male</label> <br />
                                    <input type="radio" name="gender" onChange={props.handleChange} value="Female" />
                                    <label>Female</label> <br />
                                    <input type="radio" name="gender" onChange={props.handleChange} value="Other" />
                                    <label>Other</label> <br />
                                </div>

                                <div className={style.hobbies}>
                                    <p className={style.title}>Hobbies</p>
                                    <input type="checkbox" name="dancing" checked={props.hobbies.dancing} value={props.hobbies.dancing}  onChange={props.handleChange} />
                                    <label>Dancing</label> <br />
                                    <input type="checkbox" name="cooking"  checked={props.hobbies.cooking}  value={props.hobbies.cooking}  onChange={props.handleChange} />
                                    <label>Coocking</label> <br />
                                    <input type="checkbox" name="sports"  checked={props.hobbies.sports} value={props.hobbies.sports}  onChange={props.handleChange} />
                                    <label>Sports</label> <br />
                                    <input type="checkbox" name="painting"  checked={props.hobbies.painting} value={props.hobbies.painting}  onChange={props.handleChange} />
                                    <label>Painting</label>
                                </div>
                            </div>

                            <button type="submit" className={style.btn}>
                                {props.formAction}
                            </button>
                        </form>
                    </div>

                </Box>
            </Modal>
        </div>
    )
}

export default EmployeeForm;