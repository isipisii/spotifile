import { useState } from "react";

export const useNotify = () => {
  const [notificationMessage, setNotificationMessage] = useState(null);

  function makeNotification(message) {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 4000);
  }

  return [notificationMessage, makeNotification];
};
