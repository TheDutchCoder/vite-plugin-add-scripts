import { hasErrors, filterByPosition, sortScripts } from '../index'
import type { Script } from '../../index'

describe('hasErrors', () => {
  it('returns `false` when all entries are correct', () => {
    const items: Script[] = [
      { position: 'head', content: '1' },
      { position: 'body', content: '2' },
      { position: 'body', content: '3' },
      { position: 'head', content: '4' },
      { position: 'head', content: '5' },
    ]

    const result = hasErrors(items)

    expect(result).toBe(false)
  })

  it('returns `true` when a script is missing content', () => {
    const items: Script[] = [
      { position: 'head', content: '1' },
      { position: 'body' } as unknown as Script,
      { position: 'body', content: '3' },
      { position: 'head', content: '4' },
      { position: 'head', content: '5' },
    ]

    const result = hasErrors(items)

    expect(result).toBe(true)
  })

  it('returns `true` when no scripts are provided', () => {
    const items: Script[] = []

    const result = hasErrors(items)

    expect(result).toBe(true)
  })

  it('returns `true` when invalid positions are provided', () => {
    const items: Script[] = [
      { position: 'head', content: '1' },
      { position: 'script', content: '2' } as unknown as Script,
      { position: 'body', content: '3' },
      { position: 'head', content: '4' },
      { position: 'head', content: '5' },
    ]

    const result = hasErrors(items)

    expect(result).toBe(true)
  })
})

describe('filterByPosition', () => {
  it('filters scripts by their position', () => {
    const items: Script[] = [
      { position: 'head', content: '1' },
      { position: 'body', content: '2' },
      { position: 'body', content: '3' },
      { content: '4' },
      { content: '5' },
    ]

    const filteredHeadItems: Script[] = [
      { position: 'head', content: '1' },
      { position: 'head', content: '4' },
      { position: 'head', content: '5' },
    ]

    const filteredBodyItems: Script[] = [
      { position: 'body', content: '2' },
      { position: 'body', content: '3' },
    ]

    const headResult = filterByPosition(items, 'head')
    const bodyResult = filterByPosition(items, 'body')

    expect(headResult.length).toBe(3)
    expect(headResult).toEqual(filteredHeadItems)
    
    expect(bodyResult.length).toBe(2)
    expect(bodyResult).toEqual(filteredBodyItems)
  })
})

describe('sortScripts', () => {
  it('sorts scripts by their sort key', () => {
    const items: Script[] = [
      { position: 'head', content: '1', sort: 5 },
      { position: 'head', content: '2', sort: 2 },
      { position: 'head', content: '3' },
      { position: 'head', content: '4', sort: -1 },
      { position: 'head', content: '5', sort: 1 },
    ]

    const sortedItems: Script[] = [
      { position: 'head', content: '4', sort: -1 },
      { position: 'head', content: '3', sort: 0 },
      { position: 'head', content: '5', sort: 1 },
      { position: 'head', content: '2', sort: 2 },
      { position: 'head', content: '1', sort: 5 },
    ]

    const result = sortScripts(items)

    expect(result.length).toBe(5)
    expect(result).toEqual(sortedItems)
  })
})
