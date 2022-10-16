import { ChakraProvider, cookieStorageManagerSSR, createLocalStorageManager } from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
// import theme for prismjs to style code blocks
import 'prismjs/themes/prism-tomorrow.min.css';
import ProgressBar from '../components/layout/ProgressBar';
import { customTheme } from '../config/chakra-ui';
import '../styles/globals.css';

// Create a client
const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const { cookies } = pageProps;
  const colorModeManager =
    typeof cookies === 'string' ? cookieStorageManagerSSR(cookies) : createLocalStorageManager('color-mode');

  return (
    <>
      <ProgressBar />

      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={customTheme} colorModeManager={colorModeManager}>
          <UserProvider supabaseClient={supabaseClient}>
            <Component {...pageProps} />
          </UserProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default appWithTranslation(App);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      cookies: req.headers.cookie ?? '',
    },
  };
};
