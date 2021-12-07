/** @type {import('next').NextConfig} */
const { i18n } = require('./modules/I18n/next-i18next.config');

module.exports = {
  i18n,
  staticPageGenerationTimeout: 360,
  reactStrictMode: true,
};

