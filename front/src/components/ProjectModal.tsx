import { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import CreateActivityModal from './CreateActivityModal'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { ProjectDetails } from '../types'

interface ProjectModalProps {
  open: boolean
  onClose: () => void
  projectId: string | null
  onProjectConcluded: () => void
}

function ProjectModal({ open, onClose, projectId, onProjectConcluded }: ProjectModalProps) {
  const [project, setProject] = useState<ProjectDetails | null>(null)
  const [createActivityOpen, setCreateActivityOpen] = useState(false)

  const concludeProject = async (projectId: string) => {
    try {
      await axios.patch(`http://localhost:3000/api/conclude-project/${projectId}`)
      onClose()
      onProjectConcluded()
    } catch (error) {}
  }

  const concludeActivity = async (activityId: string) => {
    try {
      await axios.patch(`http://localhost:3000/api/conclude-activity/${activityId}`)
      if (project) {
        const { data } = await axios.get(`http://localhost:3000/api/project/${project.projectId}`)
        setProject(data.value)
      }
    } catch (error) {}
  }

  const handleActivityCreated = () => {
    if (project) {
      const fetchProject = async () => {
        try {
          const { data } = await axios.get(`http://localhost:3000/api/project/${project.projectId}`)
          setProject(data.value)
        } catch (error) {}
      }
      fetchProject()
    }
    setCreateActivityOpen(false)
  }

  useEffect(() => {
    const fetchProject = async () => {
      if (projectId) {
        try {
          const { data } = await axios.get(`http://localhost:3000/api/project/${projectId}`)
          setProject(data.value)
        } catch (error) {}
      }
    }

    if (open) {
      fetchProject()
    }
  }, [open, projectId])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullWidth>
      <DialogTitle>Detalhes do Projeto</DialogTitle>
      <DialogContent>
        {project ? (
          <div className='font-mono'>
            <p><strong>Nome:</strong> {project.name}</p>
            <p><strong>Data de início:</strong> {format(new Date(project.startDate), 'dd/MM/yyyy')}</p>
            <p><strong>Data final:</strong> {format(new Date(project.endDate), 'dd/MM/yyyy')}</p>
            <p><strong>Progresso:</strong> {project.progress}%</p>
            <p><strong>Atrasado?</strong> {project.overdue ? 'Sim' : 'Não'}</p>

            <Divider orientation="horizontal" flexItem className='py-2' />

            <div className='flex justify-between items-center my-2'>
              <h2 className='text-bold text-lg'>Atividades do projeto</h2>
              {
                project.completed
                ? <></>
                : <button 
                    className="bg-teal-300 hover:bg-teal-400 text-white font-bold px-2 py-1 rounded-lg"
                    onClick={() => setCreateActivityOpen(true)}
                  >+ Adicionar atividade</button>
              }
            </div>
            <CreateActivityModal
              open={createActivityOpen}
              onClose={() => setCreateActivityOpen(false)}
              projectId={project.projectId}
              onActivityCreated={handleActivityCreated}
            />
            {project.activities.length
              ? <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Título</TableCell>
                      <TableCell align="left">Data de início</TableCell>
                      <TableCell align="left">Data final</TableCell>
                      <TableCell align="left">Finalizado</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {project.activities.map((activity) => (
                      <TableRow
                        key={activity.activityId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                      >
                        <TableCell component="th" scope="row">
                          {activity.name}
                        </TableCell>
                        <TableCell align="left">{format(new Date(activity.startDate), 'dd/MM/yyyy')}</TableCell>
                        <TableCell align="left">{format(new Date(activity.endDate), 'dd/MM/yyyy')}</TableCell>
                        <TableCell align="left">{activity.completed ? 'Sim ✅' : 'Não ❌'}</TableCell>
                        <TableCell align="center">
                          {
                            activity.completed
                            ? <span>-</span>
                            : <span
                                className='cursor-pointer hover:underline'
                                onClick={() => concludeActivity(activity.activityId)}
                            >Finalizar atividade</span>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </TableContainer>
              : <div className='flex justify-center py-4'>
                  Nenhuma atividade criada para este projeto.
                </div>
            }

            <Divider orientation="horizontal" flexItem className='py-2' />

            <div className='flex justify-end mt-3'>
              {
                project.completed 
                ? <span>Projeto finalizado! 👏</span>
                : <button 
                    className='text-teal-500 hover:underline self-end'
                    onClick={() => concludeProject(project.projectId)}
                  >Finalizar projeto 🚀</button>
              }
            </div>
          </div>
        ) : (
          <p>Carregando...</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          <span className='text-gray-500'>Fechar</span>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProjectModal
