import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, CyclesReducer } from '../reducers/cycles/reducer'
import {
  createNewCycleAction,
  interruptCycleAction,
  markCurrentCycleAsCompletedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns';

interface CreatedCycleData {
  task: string;
  minutesAmount: number;
}
interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsCompleted: () => void
  createNewCycle: (data: CreatedCycleData) => void
  interruptCycle: () => void
  handleSetAmountSecondsPassedEqual: (differenceSeconds: number) => void
}
interface CyclesContextsProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext(
  {} as CyclesContextType,
)

export function CyclesContextProvider(
  { children }: CyclesContextsProviderProps,
) {
  const [cyclesState, dispatch] = useReducer(CyclesReducer,
    { cycles: [], activeCycleId: null },
    (initialState) => {
      const storageStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      if (storageStateAsJSON) {
        return JSON.parse(storageStateAsJSON)
      }

      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate),
      )
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function markCurrentCycleAsCompleted() {
    dispatch(markCurrentCycleAsCompletedAction())
  }

  function handleSetAmountSecondsPassedEqual(differenceSeconds: number) {
    setAmountSecondsPassed(differenceSeconds)
  }

  function createNewCycle(data: CreatedCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch(createNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCycle() {
    dispatch(interruptCycleAction())
  }

  return (

    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsCompleted,
        createNewCycle,
        interruptCycle,
        handleSetAmountSecondsPassedEqual,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
