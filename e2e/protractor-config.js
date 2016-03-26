import path from "path";

export default {
  specs: [path.join(__dirname, '../e2e/**/*.spec.js')],
  capabilities: {
    browserName: 'chrome'
  },
  baseUrl: 'http://localhost:3000',
  frameworks: ['jasmine'],
  onPrepare: () => {
  },
};
