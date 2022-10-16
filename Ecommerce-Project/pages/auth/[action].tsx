import { Box, Container, Flex, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';
import SigninForm from '../../components/auth/SigninForm';
import SignupForm from '../../components/auth/SignupForm';
import ColorModeSwitch from '../../components/common/ColorModeSwitch';
import LanguageSwitch from '../../components/common/LanguageSwitch';
import Logo from '../../components/layout/Logo';
import { redirectPath } from '../../config/auth';

enum AuthAction {
  Signin = 'signin',
  Signup = 'signup',
  ForgotPassword = 'forgot-password',
  ResetPassword = 'reset-password',
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const action = params?.action as AuthAction;
  if (!action || !Object.values(AuthAction).includes(action)) return { redirect: '/', props: {} };

  return {
    props: {
      action,
      ...(await serverSideTranslations(locale!, ['common', 'auth'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = ({ locales }) => ({
  paths:
    locales?.map((locale) => Object.values(AuthAction).map((action) => ({ params: { action }, locale }))).flat() ?? [],
  fallback: true,
});

export default function AuthPage({ action }: { action: AuthAction }) {
  const { t } = useTranslation(['auth', 'common']);
  const { user } = useUser();
  const router = useRouter();

  const actionTitles: Record<string, string> = useMemo(
    () => ({
      signup: t('signup.pageTitle'),
      signin: t('signin.pageTitle'),
      forgotPassword: t('forgotPassword.pageTitle'),
      resetPassword: t('resetPassword.pageTitle'),
    }),
    [t]
  );
  const title = useMemo(() => actionTitles[action as string], [action, actionTitles]);

  useEffect(() => {
    if (action !== AuthAction.ResetPassword && user) router.push(redirectPath);
  }, [user, router, action]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Box bg={useColorModeValue('gray.50', 'gray.900')} w="full">
        <Flex
          align="center"
          justify="center"
          px={6}
          py={12}
          bg={useColorModeValue('white', 'gray.800')}
          maxW={{ base: 'full', lg: '50%' }}
          minH="100vh"
        >
          <Container maxW="lg">
            <VStack align="stretch" spacing={12}>
              <Logo />
              {action === 'signup' && <SignupForm />}
              {action === 'signin' && <SigninForm />}
              {action === 'forgot-password' && <ForgotPasswordForm />}
              {action === 'reset-password' && <ResetPasswordForm />}

              <HStack justify="space-between">
                <HStack>
                  <ColorModeSwitch />
                  <LanguageSwitch />
                </HStack>

                <Text py={1} color="gray.500">
                  © by yourapp. {t('footer.allRightsReserved', { ns: 'common' })}
                </Text>
              </HStack>
            </VStack>
          </Container>
        </Flex>
      </Box>
    </>
  );
}
