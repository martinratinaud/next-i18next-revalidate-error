import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
const Home: NextPage = (props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <h1>{t('common:test')}</h1>
      <div>
        <small>
          Switch locale: <Link href="/fr">🇫🇷</Link> - <Link href="/en">🇬🇧</Link>
        </small>
      </div>

      <h2>Props</h2>
      <pre className="mb-5" style={{ fontSize: '0.6em', height: '300px', overflow: 'auto' }}>
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
};

export default Home;
