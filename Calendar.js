import moment from 'moment';
import React from 'react';

export default React.createClass({
  getInitialState() {
    moment.locale('EN-uk');// ('FR-fr');
    const date = moment();
    return {
      week: this._initWeek(),
      month: this._initMonth({ date }),
      date: date
    };
  },

  render() {
    const weekNodes = this.state.week.map(function map(data) {
      return (
        <li key={ data.key } className="day">{ data.dayOfWeek }</li>
      );
    });

    const monthNodes = this.state.month.map(function map(data, index) {
      return (
        <li key={ index } className="day">
          <span className={ data.className }
            data-date={ data.dayOfMonth }>{ data.label }</span>
        </li>
      );
    });

    return (
      <section className="calendar">
        <h1 className="month-label">{ this.state.date.format('MMMM YYYY') }</h1>
        <nav className="calendar-nav">
          <span className="nav-previous-month" onClick={ this._getPreviousMonth }>Prev</span>
          <span className="nav-next-month" onClick={ this._getNextMonth }>Next</span>
        </nav>
        <div className="month">
          <ul className="week">
          { weekNodes }
          </ul>
          <ul className={ 'days lines' + this._getLines() }>
          { monthNodes }
          </ul>
        </div>
      </section>
    );
  },

  _initWeek() {
    const week = [];
    const date = moment();
    const firstDay = moment.localeData().firstDayOfWeek();

    for (let n = 0; n < 7; n++) {
      week.push({
        dayOfWeek: date.day(n + firstDay).format('dd'),
        key: n
      });
      date.add(1, 'days');
    }

    return week;
  },

  _initMonth(opt = {}) {
    const month = [];
    const date = opt.date.startOf('month').clone();
    const days = date.daysInMonth();

    let previousMonthDate = 0;

    if (date.isoWeekday() < 7) {
      previousMonthDate = date.isoWeekday() - moment.localeData().firstDayOfWeek();
    }

    for (let n = 0; n < days + previousMonthDate; n++) {
      const isoWeekday = date.isoWeekday();
      const isPreviousMonthDate = n < previousMonthDate;
      month.push({
        key: n,
        dayOfMonth: date.format('YYYY-MM-DD'),
        label: date.format('D'),
        isWeekEnd: isoWeekday >= 6,
        className: this._getClassName(date) + (isPreviousMonthDate ? ' previous-month' : '')
      });
      if (!isPreviousMonthDate) {
        date.add(1, 'days');
      }
    }
    return month;
  },

  _getClassName(date) {
    const formattedDate = date.format('YYYY-MM-DD');
    if (this.props.events.includes(formattedDate)) {
      return 'day-of-month available';
    }
    return 'day-of-month';
  },

  _getLines() {
    return (Math.floor(this.state.month.length / 7) + 1) || 5;
  },

  _getPreviousMonth() {
    const previousDate = this.state.date.subtract(1, 'months');
    this.setState({ month: this._initMonth({ date: previousDate })});
  },

  _getNextMonth() {
    const nextDate = this.state.date.add(1, 'months');
    this.setState({ month: this._initMonth({ date: nextDate })});
  }
});
