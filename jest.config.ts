import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 90000,
  moduleNameMapper: {
    // this is a custom jest config to allow for the use of absolute imports
    // in our tests
    "^@/(.*)$": "<rootDir>/src/$1",
    "^config$": "<rootDir>/src/config/index.ts",
    "^models$": "<rootDir>/src/models/index.ts",
    "^services$": "<rootDir>/src/services/index.ts",
    "^utils$": "<rootDir>/src/utils/index.ts",
    "^middlewares$": "<rootDir>/src/middlewares/index.ts",
    "^types$": "<rootDir>/src/types/index.ts",
    "^controllers$": "<rootDir>/src/controllers/index.ts",
    "^routes$": "<rootDir>/src/routes/index.ts",
    "@/(.*)": "<rootDir>/src/$1",
    "@/config/(.*)": "<rootDir>/src/config/$1",
    "@/controllers/(.*)": "<rootDir>/src/controllers/$1",
    "@/models/(.*)": "<rootDir>/src/models/$1",
    "@/routes/(.*)": "<rootDir>/src/routes/$1",
    "@/services/(.*)": "<rootDir>/src/services/$1",
    "@/utils/(.*)": "<rootDir>/src/utils/$1",
    "@/middlewares/(.*)": "<rootDir>/src/middlewares/$1",
    "@/types/(.*)": "<rootDir>/src/types/$1",
  },
  globals: {
    // when we are testing we want to use a slightly different config
    // to allow for jest types
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
      useESM: true,
    },
  },
};

export default config;
