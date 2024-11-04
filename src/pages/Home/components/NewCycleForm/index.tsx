import { useContext } from 'react'
import { FormContainer, TaskInput, MinutesAmount } from './styles'
import { CyclesContext } from '../../../../contexts/CycleContexts'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        list="taks-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id="taks-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
        <option value="Projeto 5" />
      </datalist>
      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmount
        type="number"
        id="minutesAmount"
        placeholder="0"
        disabled={!!activeCycle}
        step={5}
        max={60}
        min={5}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos</span>
    </FormContainer>
  )
}
