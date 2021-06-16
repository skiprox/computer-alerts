import { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import glitchText from 'helpers/glitch';

const alertLimit = 9;

export default function Calendar(props) {
  const [notifications, setNotifications] = useState({alerts: []});
  const notificationsRef = useRef([]);
  const alertTime = useRef(3300);

  const removeElement = (index) => {
    notificationsRef.current.splice(index, 1);
    setNotifications({alerts: notificationsRef.current});
    alertTime.current = Math.max(alertTime.current - 10, 800);
  }

  useEffect(() => {
    let alertsArr = [];
    setInterval(() => {
      alertsArr = notificationsRef.current;
      const glitchArr = glitchText.split('');
      let str = '';
      for (let j = 0; j < 440; j++) {
        str += `${glitchArr[Math.floor(Math.random() * glitchArr.length)]} `;
      }
      alertsArr.push(str);
      if (alertsArr.length === alertLimit) {
        console.log('we have a match for limit');
        alertsArr = alertsArr.slice(1, alertLimit);
      }
      notificationsRef.current = alertsArr;
      setNotifications({alerts: notificationsRef.current});
    }, alertTime.current);
  }, []);
  return (
    <ul className="Calendar-notifications absolute flex flex-column mr2 mt2">
      {notifications.alerts.map((notification, index) => {
        return (
          <li key={index} className="Calendar-notifications__item pa3 pt4 ba mv1">
            <span className="Calendar-notifications__top absolute bb w-100"></span>
            <span
              className="Calendar-notifications__close absolute bl bb flex items-center justify-center"
              onClick={() => {
                removeElement(index);
              }}
            >×</span>
            <p>{notification}</p>
          </li>
        )
      })}
    </ul>
  )
}
