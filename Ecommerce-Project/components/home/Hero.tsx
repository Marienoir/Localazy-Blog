import { Button, Flex, Heading, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { useTranslation } from 'next-i18next';

export default function Hero() {
  const { t } = useTranslation('home');

  const { user } = useUser();
  return (
    <Flex
      direction="column"
      textAlign="center"
      bg={useColorModeValue('white', 'gray.900')}
      px={8}
      py={24}
      align="center"
      justify="center"
    >
      <VStack spacing={2}>
        <Heading fontSize={{ base: '4xl', lg: '5xl' }}>{t('hero.title')}</Heading>
        <Text fontSize="lg">{t('hero.description')}</Text>
      </VStack>
    </Flex>
  );
}
