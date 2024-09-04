import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Project } from '../types'
import { format } from 'date-fns'

interface ProjectsTableProps {
  projects: Project[]
  onRowClick: (projectId: string) => void
}

function ProjectsTable({ projects, onRowClick }: ProjectsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell align="right">Data de início</TableCell>
            <TableCell align="right">Data final</TableCell>
            <TableCell align="right">Finalizado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              className="cursor-pointer"
              key={project.projectId}
              sx={{ 
                '&:last-child td, &:last-child th': { border: 0 },
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
              onClick={() => onRowClick(project.projectId)}
            >
              <TableCell component="th" scope="row">
                {project.name}
              </TableCell>
              <TableCell align="right">{format(new Date(project.startDate), 'dd/MM/yyyy')}</TableCell>
              <TableCell align="right">{format(new Date(project.endDate), 'dd/MM/yyyy')}</TableCell>
              <TableCell align="right">{project.completed ? 'Sim ✅' : 'Não ❌'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProjectsTable
