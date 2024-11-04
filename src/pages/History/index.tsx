import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { HisoryContainer, HistoryList, Status } from './styles'
import { CyclesContext } from '../../contexts/CycleContexts'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HisoryContainer>
      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(cycle => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>{formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                  </td>
                  <td>
                    {
                      cycle.completedDate &&
                        <Status statusColor="green">Concluído</Status>
                    }
                    {
                      cycle.interruptedDate &&
                        <Status statusColor="red">Interrompido</Status>
                    }
                    {
                      !cycle.interruptedDate && !cycle.completedDate &&
                        <Status statusColor="yellow">Em Andamento</Status>
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HisoryContainer>
  )
}
