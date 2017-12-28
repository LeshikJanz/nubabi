let notificationsCenter;

export const setNotificationsCenter = obj => {
  notificationsCenter = obj;
};

export const addNotification = obj =>
  notificationsCenter ? notificationsCenter.addNotification(obj) : undefined;

export const clearNotifications = () =>
  notificationsCenter ? notificationsCenter.clearNotifications() : undefined;
