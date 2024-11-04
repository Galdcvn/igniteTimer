import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../contexts/CycleContexts'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

interface newCycleFormData {
  task: string;
  minutesAmount: number;
}

export function Home() {
  const {
    activeCycle,
    createNewCycle,
    interruptCycle,
  } = useContext(CyclesContext)
  const newCycleForm = useForm<newCycleFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm
  const taskValue = watch('task')
  const minutesAmountValue = watch('minutesAmount')

  function handleCreateNewCycle(data: newCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle
          ? (
            <StopCountdownButton type="button" onClick={interruptCycle}>
              <HandPalm size={24} />  Interromper
            </StopCountdownButton>
            )
          : (
            <StartCountdownButton
              disabled={!taskValue || !minutesAmountValue}
              type="submit"
            >
              <Play size={24} />  Começar
            </StartCountdownButton>
            )}
      </form>
    </HomeContainer>
  )
}
