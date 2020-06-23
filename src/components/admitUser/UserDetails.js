import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { TextField, TextareaAutosize } from '@material-ui/core';

import { changeStatus } from '../../actions/addPatient';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const UserDetails = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    disease: 'corona',
    date: '2017-05-24',
    treatement: '',
    status: 'admitted',
  });
  useEffect(() => {
    setFormData({
      name: !props.addPatient.addPatient.name
        ? ''
        : props.addPatient.addPatient.name,
      date: !props.addPatient.addPatient.date
        ? ''
        : props.addPatient.addPatient.date,
      disease: !props.addPatient.addPatient.disease
        ? ''
        : props.addPatient.addPatient.disease,
      treatement: !props.addPatient.addPatient.treatement
        ? ''
        : props.addPatient.addPatient.treatement,
      status: !props.addPatient.addPatient.status
        ? ''
        : props.addPatient.addPatient.status,
    });
  }, [props.addPatient]);

  const { date, treatement, status, id } = formData;
  let [pid, setPid] = useState(id);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    setPid((pid = id));
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const statusChange = (e, iid) => {
    e.preventDefault();
    const data = props.addPatient.addPatient;
    const d = data.map((item) => {
      console.log('aaaaa', iid, item.id);

      if (item.id === iid) {
        console.log('bbbb', iid, item.id);
        item.date = date;
        item.treatement = treatement;
        item.status = status;
        return item;
      } else {
        return item;
      }
    });
    console.log('store', d);
    props.changeStatus();
    handleClose();
  };

  const data = props.addPatient.addPatient || null;
  return (
    <Fragment>
      <h1 className='text-center' style={{ marginTop: '100px' }}>
        {' '}
        Patient Details
      </h1>
      <div className='container' style={{ margin: '1rem 0 0 600px' }}>
        <table className='table table-responsive'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>Id</th>
              <th scope='col'>Name</th>
              <th scope='col'>Disease</th>
              <th scope='col'>Date</th>
              <th scope='col'>Treatement</th>
              <th scope='col'>Status</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dt, index) => {
              return (
                (
                  <tr key={dt.id}>
                    <td scope='row'>{index + 1}</td>
                    <td scope='row'>{dt.name}</td>
                    <td scope='row'>{dt.disease}</td>
                    <td scope='row'>{dt.date}</td>
                    <td scope='row'>{dt.treatement}</td>
                    <td scope='row'>{dt.status}</td>
                    <td scope='row'>
                      <button
                        disabled={dt.status === 'admitted' ? false : true}
                        onClick={() => {
                          handleClickOpen(dt.id);
                        }}
                      >
                        Discharge
                      </button>
                      {data.map((di) => {
                        if (pid === di.id) {
                          return (
                            <Dialog
                              onClose={handleClose}
                              aria-labelledby='customized-dialog-title'
                              open={open}
                            >
                              <DialogTitle
                                id='customized-dialog-title'
                                onClose={handleClose}
                              >
                                Discharge Form
                              </DialogTitle>
                              <DialogContent dividers>
                                <form>
                                  <div className='form-group p-1'>
                                    <input
                                      type='text'
                                      name='name'
                                      value={di.name}
                                      placeholder='Enter the name...'
                                      onChange={handleChange}
                                      readOnly
                                    />
                                  </div>
                                  <div className='form-group p-1'>
                                    <select
                                      name='disease'
                                      value={di.disease}
                                      onChange={handleChange}
                                      readOnly
                                    >
                                      <option value='corona'>corona</option>
                                      <option value='maleria'>maleria</option>
                                      <option value='typhoid'>Typhoid</option>
                                    </select>
                                  </div>
                                  <div className='form-group p-1'>
                                    <TextField
                                      id='date'
                                      defaultValue='2017-05-24'
                                      onChange={handleChange}
                                      label='Date'
                                      name='date'
                                      type='date'
                                      className='textField'
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                    />
                                  </div>
                                  <div className='form-group p-1'>
                                    <TextareaAutosize
                                      aria-label='minimum height'
                                      // value={di.treatement}
                                      rowsMin={3}
                                      name='treatement'
                                      placeholder='Treatement Description'
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className='form-group p-1'>
                                    <select
                                      name='status'
                                      onChange={(e) => handleChange(e)} // value={dt.status}
                                    >
                                      <option value='admitted'>admitted</option>
                                      <option value='healthy'>healthy</option>
                                      <option value='died'>died</option>
                                    </select>
                                  </div>
                                </form>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  autoFocus
                                  onClick={(e) => statusChange(e, di.id)}
                                  color='primary'
                                >
                                  Save changes
                                </Button>
                              </DialogActions>
                            </Dialog>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </td>
                  </tr>
                ) || null
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    addPatient: state,
    changeStatus: state,
  };
};

UserDetails.PropType = {
  changeStatus: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { changeStatus })(UserDetails);
