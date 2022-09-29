const jestConfig = {
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
};

module.exports = jestConfig;
