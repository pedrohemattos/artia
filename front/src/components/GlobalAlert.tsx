import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

interface GlobalAlertProps {
  message: string
  severity: 'success' | 'error'
  onClose: () => void
}

const GlobalAlert = ({ message, severity, onClose }: GlobalAlertProps) => {
  return (
    <Snackbar 
      open={!!message} 
      autoHideDuration={3000} 
      onClose={onClose} 
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default GlobalAlert
