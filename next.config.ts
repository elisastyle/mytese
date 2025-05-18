import withNextIntl from 'next-intl/plugin';

const withIntl = withNextIntl('src/i18n/request'); // بدون dot یا slash اول

export default withIntl({
  reactStrictMode: true
});
