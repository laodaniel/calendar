import Calendar from './Calendar';
import React from 'react';
import ReactDOM from 'react-dom';
import './calendar.css';

ReactDOM.render(<Calendar events={['2016-02-20', '2016-03-24', '2016-03-26', '2016-03-30']}/>,
  document.getElementById('container'));
