import {
  Box,
  Container,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { FaEnvelope, FaTwitter } from 'react-icons/fa';
import Logo from './Logo';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <Box as="footer" bg={useColorModeValue('white', 'gray.700')} px={4} py={16}>
      <Container maxW="5xl">
          <VStack align="start" spacing={3}>
            <Logo />
            <HStack>
              <IconButton
                aria-label="Twitter"
                as="a"
                href="mailto:contact@supastarter.dev"
                colorScheme="primary"
                variant="ghost"
                fontSize="xl"
              >
                <FaEnvelope />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                as="a"
                href="https://twitter.com/supastarter"
                colorScheme="twitter"
                variant="ghost"
                fontSize="xl"
              >
                <FaTwitter />
              </IconButton>
            </HStack>
            <Text color="gray.400">© by SupaCommerce. {t('footer.allRightsReserved')}</Text>
          </VStack>
      </Container>
    </Box>
  );
}
