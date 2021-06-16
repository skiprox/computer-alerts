import { useEffect, useState } from 'react';
import classnames from 'classnames';
import glitchText from 'helpers/glitch';

const alertTime = 3300;
const alertLimit = 10;

export default function Calendar(props) {
  const [notifications, setNotifications] = useState({alerts: []});
  useEffect(() => {
    let alertsArr = [];
    setInterval(() => {
      const glitchArr = glitchText.split('');
      let str = '';
      for (let j = 0; j < 440; j++) {
        str += `${glitchArr[Math.floor(Math.random() * glitchArr.length)]} `;
      }
      alertsArr.push(str);
      if (alertsArr.length === alertLimit) {
        alertsArr.slice(1, alertLimit);
      }
      setNotifications({alerts: alertsArr});
    }, alertTime);
  }, []);
  return (
    <ul className="Calendar-notifications absolute flex flex-column mr2 mt2">
      {notifications.alerts.map((notification, index) => {
        return (
          <li key={index} className="Calendar-notifications__item pa3 pt4 ba mv1">
            <span className="Calendar-notifications__top absolute bb w-100"></span>
            <span className="Calendar-notifications__close absolute bl bb flex items-center justify-center">×</span>
            <p>{notification}</p>
          </li>
        )
      })}
    </ul>
  )
}
