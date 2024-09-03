import { useEffect, useState } from 'react'
import './App.css'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

function App() {

  useEffect(() => {
    fetch("http://localhost:3333/api/project")
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  })

  return (
    <>
      <div>
        <h1>Listagem de projetos</h1>
        <TableContainer>
          <Table variant='simple' size='lg'>
            <Thead>
              <Tr>
                <Th>Título</Th>
                <Th>Início</Th>
                <Th>Prazo</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default App
