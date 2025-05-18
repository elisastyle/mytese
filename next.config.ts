import withNextIntl from 'next-intl/plugin';

const withIntl = withNextIntl('./src/i18n/request');

export default withIntl({
  reactStrictMode: true
});
