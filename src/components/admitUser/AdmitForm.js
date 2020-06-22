import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { addPatient } from '../../actions/addPatient';
import UserDetails from './UserDetails';
// import { setAlert } from '../../actions/alert';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const initialState = {
  name: '',
  disease: 'corona',
  date: '2017-05-24',
  treatement: '',
  status: 'admitted',
};

const AdmitForm = (props) => {
  const [formData, setFormData] = useState(initialState);

  const { name, disease, date, treatement, status } = formData;

  const classes = useStyles();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addPatient(name, disease, date, treatement, status);
    e.target.reset();
  };
  return (
    <Fragment>
      <div
        className='form'
        style={{ maxWidth: '500px', margin: '5rem 0 0 680px' }}
      >
        <h1 className='text-center'>Patient Admission Form</h1>
        <form
          className='form'
          style={{ border: '2px solid black' }}
          onSubmit={handleSubmit}
        >
          <div className='form-group p-1'>
            <input
              type='text'
              name='name'
              // value={name}
              placeholder='Enter the name...'
              onChange={handleChange}
            />
          </div>
          <div className='form-group p-1'>
            <select name='disease' onChange={handleChange}>
              <option value='corona'>Corona</option>
              <option value='malaria'>Malaria</option>
              <option value='cancer'>Cancer</option>
            </select>
          </div>
          <div className='form-group p-1'>
            <TextField
              id='date'
              // value={date}
              label='Date'
              name='date'
              type='date'
              defaultValue='2017-05-24'
              onChange={handleChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className='form-group p-1'>
            <TextareaAutosize
              aria-label='minimum height'
              // value={treatement}
              rowsMin={3}
              name='treatement'
              placeholder='Treatement Description'
              onChange={handleChange}
            />
          </div>
          <div className='text-center'>
            <input type='submit' className='btn btn-primary my-1' />
          </div>
        </form>
      </div>
      <UserDetails />
    </Fragment>
  );
};

AdmitForm.PropType = {
  addPatient: PropTypes.func.isRequired,
  // setAlert: PropTypes.func.isRequired,
};

export default connect(null, { addPatient })(AdmitForm);
