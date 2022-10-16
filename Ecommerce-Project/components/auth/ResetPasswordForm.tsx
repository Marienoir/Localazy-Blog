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
  InputRightElement,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { redirectPath } from '../../config/auth';
import { defaultToastOptions } from '../../config/chakra-ui';
import AuthFormWrapper from './AuthFormWrapper';

function ResetPasswordForm() {
  const { t } = useTranslation('auth');
  const router = useRouter();
  const toast = useToast(defaultToastOptions);
  const { register, handleSubmit, formState } = useForm<{ password: string }>();
  const { isSubmitting, isSubmitted, isSubmitSuccessful } = formState;
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const onSubmit = handleSubmit(async ({ password }) => {
    const { error } = await supabaseClient.auth.update({ password });

    if (error) throw new Error(error.message);

    await router.push(redirectPath);
    toast({
      status: 'success',
      title: t('resetPassword.successMessage'),
    });
  });

  const togglePassword = useCallback(() => setPasswordVisible(!isPasswordVisible), [isPasswordVisible]);

  return (
    <AuthFormWrapper title={t('resetPassword.pageTitle')}>
      <form onSubmit={(e) => onSubmit(e).catch(() => {})}>
        <Stack spacing={5}>
          {isSubmitted && !isSubmitSuccessful && (
            <Alert status="error" rounded="lg">
              <AlertIcon />
              <AlertTitle>{t('resetPassword.errorMessage')}</AlertTitle>
            </Alert>
          )}

          {/* Password field */}
          <FormControl>
            <FormLabel>{t('fields.newPassword')}</FormLabel>
            <InputGroup>
              <InputLeftElement color="gray.300">
                <FaLock />
              </InputLeftElement>
              <Input
                required
                type={isPasswordVisible ? 'text' : 'password'}
                autoComplete="new-password"
                {...register('password', { required: true })}
              />
              <InputRightElement color="primary.500" as="button" type="button" onClick={togglePassword}>
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {/* Submit button */}
          <Button colorScheme="primary" type="submit" isLoading={isSubmitting}>
            {t('resetPassword.submitButton')}
          </Button>
        </Stack>
      </form>
    </AuthFormWrapper>
  );
}

export default ResetPasswordForm;
