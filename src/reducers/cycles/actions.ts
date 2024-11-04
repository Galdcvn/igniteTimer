/* eslint-disable no-unused-vars */
import { Cycle } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_COMPLETED = 'MARK_CURRENT_CYCLE_AS_COMPLETED',
}

export function markCurrentCycleAsCompletedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_COMPLETED,
  }
}

export function createNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}
