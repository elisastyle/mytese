import path from 'path';
import withNextIntl from 'next-intl/plugin';

const withIntl = withNextIntl(path.resolve(__dirname, 'src/i18n/request'));

export default withIntl({
  reactStrictMode: true,
});
