module.exports = {
  defaultNS: 'common',
  i18n: {
    defaultLocale: 'en',
    locales: ['en','fr'],
    localePath: "translations",
    reloadOnPrerender: true,
  },
  // ns:["common"],
  // https://github.com/vercel/next.js/issues/22508
  react: {
    useSuspense: false,
  },
};