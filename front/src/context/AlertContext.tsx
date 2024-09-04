import React, { createContext, useState, useContext } from 'react'
import GlobalAlert from '../components/GlobalAlert'

interface AlertContextType {
  showAlert: (message: string, severity: 'success' | 'error') => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<{ message: string, severity: 'success' | 'error' } | null>(null)

  const showAlert = (message: string, severity: 'success' | 'error') => {
    setAlert({ message, severity })
  }

  const handleClose = () => {
    setAlert(null)
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <GlobalAlert
          message={alert.message}
          severity={alert.severity}
          onClose={handleClose}
        />
      )}
    </AlertContext.Provider>
  )
}

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return context
}
