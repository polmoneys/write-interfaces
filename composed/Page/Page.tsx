import { Fragment, ElementType, ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DefaultProps } from '@/core/types';
import { is } from '@/utils/is';
import { clxs } from '@/utils/className';
import styles from './Page.module.css';

export interface SeoProps {
    contact?: string;
    copyright?: string;
    description?: string;
    keywords?: string;
    subtitle?: string;
    title?: string;
}
interface Props extends Pick<DefaultProps, 'children' | 'className'>, SeoProps {
    /** html element defaults to section */
    as?: keyof JSX.IntrinsicElements;
    /** slot for navigation and breadcrumbs */
    navigation?: ReactNode;
    /** 3 main layouts of the app */
    variant?: 'landing' | 'public' | 'private' | 'sidebar';
}

const Page = (props: Props) => {
    const { className, as, navigation, children, variant = 'public', title, description, contact, copyright, keywords } = props;
    const router = useRouter();
    const Tag = as || ('main' as ElementType);

    const isLanding = is(variant, 'landing');
    const isPublic = is(variant, 'public');
    const isPrivate = is(variant, 'private');
    const isSideBar = is(variant, 'sidebar');

    const pageUrl = router.asPath;
    const pageTitle = title ?? `You are on ${router.pathname.replace('/', '').toUpperCase()}`;
    const rootStyles = clxs(className, isLanding && styles.landing, isPublic && styles.public, isPrivate && styles.private, isSideBar && styles.sidebar);

    return (
        <Fragment>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={description} />
                <meta name="contact" content={contact} />
                <meta name="copyright" content={copyright} />
                <meta name="keywords" content={keywords} />
                <link rel="canonical" href={pageUrl} />
                <meta name="og:url" content={pageUrl} />
                <meta name="twitter:url" content={pageUrl} />
                <meta name="og:title" content={pageTitle} />
                <meta name="og:description" content={description} />
                <meta name="og:type" content="website" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:alt" content={pageTitle} />
                <link rel="icon" href="/favicon.png" />
                {/* 
                <meta name="color-scheme" content="dark light" />
                <meta name="og:image" content={pageImage} /> 
                <meta name="twitter:image" content={pageImage} />
                <meta name="twitter:card" content={pageImage ? "summary_large_image" : "summary"/>
                */}
            </Head>
            {navigation && navigation}
            <Tag className={rootStyles}>{children}</Tag>
        </Fragment>
    );
};

export default Page;
