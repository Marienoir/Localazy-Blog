import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
} from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaAt } from 'react-icons/fa';
import { redirectPath } from '../../config/auth';
import { useAuthRedirectUrl } from '../../lib/auth';
import AuthFormWrapper from './AuthFormWrapper';

function ForgotPasswordForm() {
  const { t } = useTranslation('auth');
  const { user } = useUser();
  const router = useRouter();
  const redirectTo = useAuthRedirectUrl('/auth/reset-password');
  const { register, handleSubmit, formState } = useForm<{ email: string }>();
  const { isSubmitting, isSubmitted, isSubmitSuccessful } = formState;

  useEffect(() => {
    if (user) router.push(redirectPath);
  }, [user, router]);

  const onSubmit = handleSubmit(async ({ email }) => {
    const { error } = await supabaseClient.auth.api.resetPasswordForEmail(email, { redirectTo });
    if (error) throw new Error(error.message);
  });

  return (
    <AuthFormWrapper title={t('forgotPassword.pageTitle')}>
      <form onSubmit={(e) => onSubmit(e).catch(() => {})}>
        <Stack spacing={5}>
          {isSubmitted &&
            (isSubmitSuccessful ? (
              <Alert status="success" rounded="lg">
                <AlertIcon />
                <AlertTitle>{t('forgotPassword.linkSent')}</AlertTitle>
              </Alert>
            ) : (
              <Alert status="error" rounded="lg">
                <AlertIcon />
                <AlertTitle>{t('forgotPassword.errorMessage')}</AlertTitle>
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

              {/* Submit button */}
              <Button colorScheme="primary" type="submit" isLoading={isSubmitting}>
                {t('forgotPassword.sendLink')}
              </Button>
            </>
          )}

          <NextLink href="/auth/signin" passHref>
            <Link color="primary.500">&larr; {t('backToSignIn')}</Link>
          </NextLink>
        </Stack>
      </form>
    </AuthFormWrapper>
  );
}

export default ForgotPasswordForm;
