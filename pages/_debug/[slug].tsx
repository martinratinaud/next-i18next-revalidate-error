import type { NextPage, GetStaticProps, GetStaticPaths, GetStaticPathsResult } from 'next';
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Coin: NextPage<any> = ({ _nextI18Next, slug, ...params }) => {
  const { t, ...rest } = useTranslation();

  return (
    <>
      <main className="mx-4">
        <h1>
          {t('common:test')} {slug}
        </h1>
        <div>
          <small>
            Switch locale:{' '}
            <Link href={`/_debug/${slug}`} locale="fr">
              🇫🇷
            </Link>{' '}
            -{' '}
            <Link href={`/_debug/${slug}`} locale="en">
              🇬🇧
            </Link>
          </small>
        </div>
        <small>
          <em>In order to test, use another number between 0 and 300 in the url</em>
        </small>
        <hr />
        <h2>Params</h2>
        <pre className="mb-5" style={{ fontSize: '0.6em', height: '300px', overflow: 'auto' }}>
          {JSON.stringify(params, null, 2)}
        </pre>
        <hr />
        <h2>Rest</h2>
        <pre className="mb-5" style={{ fontSize: '0.6em', height: '300px', overflow: 'auto' }}>
          {JSON.stringify(rest, null, 2)}
        </pre>
        <hr />
        <h2>_nextI18Next</h2>
        <pre className="mb-5" style={{ fontSize: '0.6em', height: '300px', overflow: 'auto' }}>
          {JSON.stringify(_nextI18Next, null, 2)}
        </pre>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  return {
    // @ts-ignore
    paths: [...Array(300).keys()].reduce(
      (acc, index) => [...acc, ...(locales || []).map((locale) => ({ params: { slug: `${index}` }, locale }))],
      [] as GetStaticPathsResult['paths']
    ),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, ...props }) => {
  const slug = (params?.slug as string) || '1';

  return {
    props: {
      slug,
      ...(await serverSideTranslations(props.locale || 'es', ['common'])),
    },
    notFound: !slug,
    revalidate: 1,
  };
};

export default Coin;
