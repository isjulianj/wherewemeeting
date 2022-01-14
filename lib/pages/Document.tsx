import React from 'react';
import NextDocument, {
    DocumentContext,
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document';
import {ServerStyleSheets} from "@mui/styles";
// import { getEnvironmentVariable } from '@dc3/utils/constants';



// const getFavicon = (icon: string) => `${mediaServer}/favicon/${icon}`;

class Document extends NextDocument {
    static async getInitialProps(ctx: DocumentContext) {
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
            });

        const initialProps = await NextDocument.getInitialProps(ctx);

        return {
            ...initialProps,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: [
                ...React.Children.toArray(initialProps.styles),
                sheets.getStyleElement(),
            ],
        };
    }

    render() {
        return (
            <Html>
                <Head >
                    <link
                        href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined"
                    />
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.6.1/css/ol.css" type="text/css"/>
                    <title>Where we meeting?</title>

                    {/*<link*/}
                    {/*    rel="apple-touch-icon"*/}
                    {/*    sizes="180x180"*/}
                    {/*    href={getFavicon('apple-touch-icon.png')}*/}
                    {/*/>*/}
                    {/*<link*/}
                    {/*    rel="icon"*/}
                    {/*    type="image/png"*/}
                    {/*    sizes="32x32"*/}
                    {/*    href={getFavicon('favicon-32x32.png')}*/}
                    {/*/>*/}
                    {/*<link*/}
                    {/*    rel="icon"*/}
                    {/*    type="image/png"*/}
                    {/*    sizes="16x16"*/}
                    {/*    href={getFavicon('favicon-16x16.png')}*/}
                    {/*/>*/}
                    {/*<link*/}
                    {/*    rel="mask-icon"*/}
                    {/*    href={getFavicon('safari-pinned-tab.svg')}*/}
                    {/*    color="#5bbad5"*/}
                    {/*/>*/}

                </Head>

                <body>
                <div id="root-modal" />
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export { Document };
