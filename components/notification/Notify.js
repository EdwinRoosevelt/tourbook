import React, {createContext, useContext, useState} from 'react'

import { Dialog, Notification } from "@mantine/core";
import { Check } from "tabler-icons-react";
import { useEffect } from 'react';

const NotifyContext = createContext();
export function useNotify() {
    return useContext(NotifyContext);
}

export function NotifyProvider({children}) {
    
    const [notification, setNotification] = useState();
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(false);
            setNotification();
        }, 5000)
    }, [notification])

    function addNotification (newNotification) {
        setNotification(newNotification);
        setShowNotification(true);
    }

    const store = {
        addNotification
    }

    return (
      <NotifyContext.Provider value={store}>
        <Dialog opened={showNotification} className="p-0">
          <Notification
            icon={<Check size={18} />}
            color="teal"
            title={notification && notification.title}
            onClose={() => setShowNotification(false)}
          >
            {notification && notification.message}
          </Notification>
        </Dialog>
        {children}
      </NotifyContext.Provider>
    );
}
