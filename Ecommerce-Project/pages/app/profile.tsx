import { Box, Flex, Heading, useToast, VStack } from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCallback } from 'react';
import { FaUser } from 'react-icons/fa';
import EditableText from '../../components/common/EditableText';
import Layout from '../../components/layout/Layout';
import { defaultToastOptions } from '../../config/chakra-ui';
import { useUserName } from '../../lib/auth';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'app'])),
    },
  };
};

function ProfilePage() {
  const { t } = useTranslation('app');
  const userName = useUserName();
  const toast = useToast(defaultToastOptions);

  const updateUserName = useCallback(
    async (userName: string) => {
      const { error } = await supabaseClient.auth.update({ data: { full_name: userName } });

      if (error)
        return toast({
          status: 'error',
          title: t('profile.updateUserName.errorMessage'),
        });

      return toast({
        status: 'success',
        title: t('profile.updateUserName.successMessage'),
      });
    },
    [toast, t]
  );

  return (
    <Layout pageTitle={t('profile.pageTitle')} hideMenu>
      <Box textAlign="center" px={8} py={16}>
        <VStack spacing={4}>
          <Flex
            w={36}
            h={36}
            bg="white"
            rounded="full"
            fontSize="7xl"
            align="center"
            justify="center"
            color="primary.200"
          >
            <FaUser />
          </Flex>
          <Heading color="primary.900">
            <EditableText defaultValue={userName} onSubmit={updateUserName} />
          </Heading>
        </VStack>
      </Box>
    </Layout>
  );
}

export default ProfilePage;
