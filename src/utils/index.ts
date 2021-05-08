import { positions } from '../index'
import type { Script, Position } from '../index'

export const hasErrors = (scripts: Script[]): Boolean => {
  const hasNoScripts = scripts.length === 0
  const hasInvalidPositions = scripts.filter(script => script.position && !positions.includes(script.position)).length > 0
  const hasMissingContent = scripts.filter(script => !script.hasOwnProperty('content')).length > 0

  return hasNoScripts || hasInvalidPositions || hasMissingContent
}

export const filterByPosition = (scripts: Script[], position: Position): Script[] => {
  return scripts.filter(script => {
    if (!script.position) {
      script.position = 'head'
    }
    
    return script.position === position
  })
}

export const sortScripts = (scripts: Script[]): Script[] => {
  return scripts.sort((first, second) => {
    if (!first.sort) {
      first.sort = 0
    }

    if (!second.sort) {
      second.sort = 0
    }

    if (first.sort < second.sort) {
      return -1
    }

    if (first.sort > second.sort) {
      return 1
    }

    return 0
  })
}
