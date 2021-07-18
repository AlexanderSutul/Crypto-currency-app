import { normalize } from './normalization'

describe('normalization', () => {
  it('should be empty when argument is empty', () => {
    expect(normalize([])).toEqual([])
  })

  it('should be normalized array', () => {
    const arr = [-10, 0, 10]
    expect(normalize(arr)).toEqual([0, 0.5, 1])
  })
})
