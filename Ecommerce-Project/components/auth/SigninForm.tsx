import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
} from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaAt, FaLock } from 'react-icons/fa';
import { redirectPath } from '../../config/auth';
import { useAuthRedirectUrl } from '../../lib/auth';
import AuthFormWrapper from './AuthFormWrapper';
import SigninModeSwitch, { SigninMode } from './SigninModeSwitch';

function SigninForm() {
  const { t } = useTranslation('auth');
  const [mode, setMode] = useState<SigninMode>(SigninMode.MagicLink);
  const router = useRouter();
  const redirectTo = useAuthRedirectUrl(mode === SigninMode.MagicLink ? '/auth/callback' : redirectPath);
  const { register, handleSubmit, formState, reset } = useForm<{ email: string; password?: string }>();
  const { isSubmitting, isSubmitted, isSubmitSuccessful } = formState;

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const payload = mode === SigninMode.Password ? { email, password } : { email };
    const { error } = await supabaseClient.auth.signIn(payload, { redirectTo });
    if (error) throw new Error('Signin failed');

    if (mode === SigninMode.Password) router.push(redirectPath);
  });

  useEffect(() => reset(), [mode]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthFormWrapper
      title={t('signin.pageTitle')}
      description={
        <>
          {`${t('signin.description')} ${t('signin.noAccount')} `}
          <NextLink href="/auth/signup" passHref>
            <Link display="inline-block" color="primary.500">
              {t('signin.signupButton')} &rarr;
            </Link>
          </NextLink>
        </>
      }
      showSocialButtons
    >
      <form onSubmit={(e) => onSubmit(e).catch(() => {})}>
        <Stack spacing={5} align="start">
          <SigninModeSwitch activeMode={mode} onChange={setMode} />

          {isSubmitted &&
            (isSubmitSuccessful ? (
              <Alert status="success" rounded="lg">
                <AlertIcon />
                <AlertTitle>{t('signin.linkSent')}</AlertTitle>
              </Alert>
            ) : (
              <Alert status="error" rounded="lg">
                <AlertIcon />
                <AlertTitle>{t('signin.errorMessage')}</AlertTitle>
              </Alert>
            ))}

          {(!isSubmitted || !isSubmitSuccessful) && (
            <>
              {/* Email field */}
              <FormControl>
                <FormLabel>{t('fields.email')}</FormLabel>
                <InputGroup>
                  <InputLeftElement color="gray.300">
                    <FaAt />
                  </InputLeftElement>

                  <Input
                    type="email"
                    autoComplete="email"
                    {...register('email', {
                      required: true,
                    })}
                  />
                </InputGroup>
              </FormControl>

              {/* Password field */}
              {mode === 'password' && (
                <FormControl>
                  <FormLabel>{t('fields.password')}</FormLabel>
                  <InputGroup>
                    <InputLeftElement color="gray.300">
                      <FaLock />
                    </InputLeftElement>
                    <Input type="password" autoComplete="password" {...register('password', { required: true })} />
                  </InputGroup>
                  <FormHelperText>
                    <NextLink href="/auth/forgot-password" passHref>
                      <Link color="primary.500">{t('signin.forgotPassword')}</Link>
                    </NextLink>
                  </FormHelperText>
                </FormControl>
              )}

              {/* Submit button */}
              <Button w="full" colorScheme="primary" type="submit" isLoading={isSubmitting}>
                {mode === 'password' ? t('signin.submitButton') : t('signin.sendLinkButton')}
              </Button>
            </>
          )}
        </Stack>
      </form>
    </AuthFormWrapper>
  );
}

export default SigninForm;
