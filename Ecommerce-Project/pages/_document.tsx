import { ColorModeScript } from '@chakra-ui/react';
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import { customTheme } from '../config/chakra-ui';

class MyDocument extends Document {
  static getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> =>
    await Document.getInitialProps(ctx);

  render() {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
