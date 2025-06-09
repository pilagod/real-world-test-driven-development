export function twoSum(nums: number[], target: number): number[] {
  const diff: { [diff: number]: number } = {}

  for (const [i, num] of nums.entries()) {
    if (num in diff) {
      return [diff[num], i]
    }
    diff[target - num] = i
  }

  return []
}
