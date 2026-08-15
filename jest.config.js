module.exports = {
    transform: {
        '^.+\\.ts?$': ['ts-jest', {tsconfig: 'tsconfig.test.json'}]
    },
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
