import { useState } from 'react'
import axios from 'axios'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useAlert } from '../context/AlertContext'

export interface SimpleDialogProps {
  open: boolean
  onClose: () => void
  onProjectCreated: () => void
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, onProjectCreated } = props
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const { showAlert } = useAlert();

  const formatDateToISO = (dateString: string) => {
    return new Date(dateString).toISOString()
  }

  const resetForm = () => {
    setName('')
    setStartDate('')
    setEndDate('')
  }

  const handleCreateProject = async () => {
    try {
      await axios.post('http://localhost:3000/api/project', {
        name,
        startDate: formatDateToISO(startDate),
        endDate: formatDateToISO(endDate)
      })
      resetForm()
      onClose()
      onProjectCreated()
    } catch (error) {
      if(error.response.data.message === "The start date must be earlier than the end date") {
        showAlert('A data inicial deve ser anterior a final.', 'error');
      }
    }
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <DialogTitle className="text-xl font-bold">Criar Novo Projeto</DialogTitle>
        <DialogContent className='w-96'>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome do Projeto</label>
              <input
                required
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Nome do projeto"
              />
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Data de Início</label>
              <input
                required
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Data de Término</label>
              <input
                required
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="px-4 py-1 rounded-md bg-gray-400 text-white hover:bg-gray-500">Cancelar</button>
          <button onClick={handleCreateProject} className="px-4 py-1 rounded-md bg-teal-400 text-white hover:bg-teal-500">Criar</button>
        </DialogActions>
      </div>
    </Dialog>
  )
}

export default SimpleDialog
