import React, { Component } from 'react';
import { Card } from '../card';
import './style.css';
const toDate = (strDate) => {
  var dateObj = new Date(strDate);
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var time = dateObj.getUTCHours();
  var minute = dateObj.getUTCMinutes();
  var second = dateObj.getUTCSeconds();
  return `${year}-${month}-${day} ${time + 8}:${minute}:${second}`;
};
export default class CardList extends Component {
  render() {
    if (this.props.number_of_lott === 1) {
      var sec = Date.parse(this.props.lottery_list[0]['date']);
      var date = new Date(sec);
      return (
        <div style={{ color: 'white' }}>
          <h1>Ялагч</h1>
          <h3>Нэр: {this.props.lottery_list[0]['name']}</h3>
          <h3>Машины дугаар: {this.props.lottery_list[0]['plate_number']}</h3>
          <h3>
            Сугалааны дугаар: {this.props.lottery_list[0]['lottery_number']}
          </h3>
          <h3>Утасны дугаар: {this.props.lottery_list[0]['phone_number']}</h3>
          <h3>Огноо: {toDate(date)}</h3>
        </div>
      );
    } else if (this.props.number_of_lott === 0) {
      return (
        <div style={{ color: 'white' }}>
          <h1>Ялагч тодорсонгүй</h1>
        </div>
      );
    } else {
      return (
        <div>
          <p className='lottery-num'>
            Нийт сугалааны тоо:{' '}
            <strong className='number-of-lottery'>{this.props.count}</strong>
          </p>
          <div className='card-list'>
            {this.props.lottery_list.map((el) => (
              <Card lottery={el} />
            ))}
          </div>
        </div>
      );
    }
  }
}
