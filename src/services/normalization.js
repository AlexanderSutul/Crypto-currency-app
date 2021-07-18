export const normalize = (array) => {
  const normalizedArray = []
  if (!array || !array.length) return normalizedArray

  const max = Math.max(...array)
  const min = Math.min(...array)

  for (const value of array) {
    const normalizedValue = (value - min) / (max - min)
    normalizedArray.push(normalizedValue)
  }

  return normalizedArray
}
