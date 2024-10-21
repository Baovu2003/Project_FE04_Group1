import React from 'react';
import './Notification.css'; // Import the custom CSS

const Notification = ({ message, type }) => {
    if (!message) return null;

    const getNotificationClass = () => {
        switch (type) {
            case 'success':
                return 'notification-info'; // Use notification-info for success messages
            case 'error':
                return 'notification-error';
            case 'warning':
                return 'notification-warning';
            default:
                return 'notification-info';
        }
    };

    return (
        <div className={`notification ${getNotificationClass()}`}>
            {message}
        </div>
    );
};

export default Notification;
