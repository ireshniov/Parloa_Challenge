module.exports = {
    coveragePathIgnorePatterns: ['node_modules', 'dist', 'test'],
    coverageReporters: ['lcov', 'text', 'text-summary'],
    forceExit: true,
    modulePathIgnorePatterns: ['dist'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/test/**/*spec.ts'],
};
