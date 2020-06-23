import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

const BarChart = (props) => {
  const data = props.addPatient.addPatient || null;
  let admitCount = 0;
  let healthyCount = 0,
    diedCount = 0;
  console.log('data', data);

  data.map((item) => {
    if (item.status === 'admitted') {
      admitCount += 1;
      return admitCount;
    } else if (item.status === 'healthy') {
      healthyCount += 1;
      return healthyCount;
    } else {
      diedCount += 1;
      return diedCount;
    }
  });

  let d = [
    { countcat: 'admitted', count: admitCount },
    { countcat: 'healthy', count: healthyCount },
    { countcat: 'died', count: diedCount },
  ];
  console.log(d);

  return (
    <Fragment>
      <Paper style={{ marginTop: '100px' }}>
        <Chart data={d}>
          <ArgumentAxis min={10} />
          <ValueAxis max={3} />
          <BarSeries valueField='count' argumentField='countcat' />
          <Title text='Patient Data' />
          <Animation />
        </Chart>
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { addPatient: state };
};

export default connect(mapStateToProps, null)(BarChart);
