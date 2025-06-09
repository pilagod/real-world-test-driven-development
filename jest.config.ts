/** @type {import('ts-jest').JestConfigWithTsJest} **/

import { pathsToModuleNameMapper } from "ts-jest"

import { compilerOptions } from "./tsconfig.json"

export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  resetMocks: true,
}
