import { useEffect, useState } from 'react';
import classnames from 'classnames';
import glitchText from 'helpers/glitch';

const alertTime = 1500;
const alertLimit = 20;

export default function Calendar(props) {
  const [notifications, setNotifications] = useState({alerts: []});
  useEffect(() => {
    const glitchArr = glitchText.split('');
    let alertsArr = [];
    setInterval(() => {
      let str = '';
      for (let j = 0; j < 1600; j++) {
        str += `${glitchArr[Math.floor(Math.random() * glitchArr.length)]} `;
      }
      alertsArr.push({
        description: str,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      });
      if (alertsArr.length === alertLimit) {
        alertsArr.slice(1, alertLimit);
      }
      setNotifications({alerts: alertsArr});
    }, alertTime);
  }, []);
  return (
    <ul className="Popup-notifications absolute w-100 h-100">
      {notifications.alerts.map((notification, index) => {
        return (
          <li
            key={index}
            className="Popup-notifications__item absolute pa3 pt4 ba flex justify-center align-items"
            style={{left: `${notification.x}px`, top: `${notification.y}px`}}
          >
            <span className="Popup-notifications__top absolute bb w-100"></span>
            <span className="Popup-notifications__close absolute bl bb flex items-center justify-center">×</span>
            <p>{notification.description}</p>
          </li>
        )
      })}
    </ul>
  )
}
