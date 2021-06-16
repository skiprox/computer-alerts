import { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import glitchText from 'helpers/glitch';

const alertLimit = 22;

export default function Calendar(props) {
  const [notifications, setNotifications] = useState({alerts: []});
  const notificationsRef = useRef([]);
  const alertTime = useRef(1200);

  const removeElement = (index) => {
    notificationsRef.current.splice(index, 1);
    setNotifications({alerts: notificationsRef.current});
    alertTime.current = Math.max(alertTime.current - 10, 200);
  }

  useEffect(() => {
    const glitchArr = glitchText.split('');
    let alertsArr = [];
    setInterval(() => {
      let str = '';
      for (let j = 0; j < 1600; j++) {
        str += `${glitchArr[Math.floor(Math.random() * glitchArr.length)]} `;
      }
      alertsArr = notificationsRef.current;
      alertsArr.push({
        description: str,
        x: Math.min(window.innerWidth - 250, Math.max(250, Math.random() * window.innerWidth)),
        y: Math.min(window.innerHeight - 100, Math.max(100, Math.random() * window.innerHeight))
      });
      if (alertsArr.length === alertLimit) {
        alertsArr = alertsArr.slice(1, alertLimit);
      }
      notificationsRef.current = alertsArr;
      setNotifications({alerts: notificationsRef.current});
    }, alertTime.current);
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
            <span
              className="Popup-notifications__close absolute bl bb flex items-center justify-center"
              onClick={() => {
                removeElement(index);
              }}
            >×</span>
            <p>{notification.description}</p>
          </li>
        )
      })}
    </ul>
  )
}
