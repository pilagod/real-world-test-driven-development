import { twoSum } from "./index"

/**
 * Two Sum (https://leetcode.com/problems/two-sum/description/)
 *
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 *
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 *
 * You can return the answer in any order.
 */
describe("Two Sum", () => {
  test("given nums = [2, 7, 11, 15] and target = 9, the output should be [0, 1]", () => {
    const result = twoSum([2, 7, 11, 15], 9)

    expect(result).toEqual([0, 1])
  })

  test("given nums = [3, 2, 4] and target = 6, the output should be [1, 2]", () => {
    const result = twoSum([3, 2, 4], 6)

    expect(result).toEqual([1, 2])
  })

  test("given nums = [3, 3] and target = 6, the output should be [0, 1]", () => {
    const result = twoSum([3, 3], 6)

    expect(result).toEqual([0, 1])
  })
})
