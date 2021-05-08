import { positions } from '../index'
import type { Script, Position } from '../index'

export const hasErrors = (items: Script[]) => {
  const hasNoScripts = items.length === 0
  const hasInvalidPositions = items.filter(item => !positions.includes(item.position)).length > 0
  const hasMissingContent = items.filter(item => !item.hasOwnProperty('content')).length > 0

  return hasNoScripts || hasInvalidPositions || hasMissingContent
}

export const filterByPosition = (items: Script[], position: Position) => {
  return items.filter(item => item.position === position)
}
