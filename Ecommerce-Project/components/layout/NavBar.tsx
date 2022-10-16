import { Box, Button, Container, HStack, IconButton, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { useMobileBreakpoint, useScrollTop } from '../../lib/layout';
import ColorModeSwitch from '../common/ColorModeSwitch';
import LanguageSwitch from '../common/LanguageSwitch';
import Logo from './Logo';
import Menu from './Menu';
import MobileDrawerMenu from './MobileDrawerMenu';
import UserMenu from './UserMenu';

export default function NavBar({ hideMenu }: { hideMenu?: boolean }) {
  const { t } = useTranslation('common');
  const { user } = useUser();
  const mobileDrawerDisclosure = useDisclosure();
  const isMobile = useMobileBreakpoint();
  const isTop = useScrollTop();

  useEffect(() => {
    if (!isMobile && mobileDrawerDisclosure.isOpen) mobileDrawerDisclosure.onClose();
  }, [isMobile, mobileDrawerDisclosure]);

  return (
    <>
      <Box
        position="fixed"
        inset={0}
        bottom="auto"
        h={20}
        as="nav"
        bg={useColorModeValue('white', 'gray.900')}
        px={4}
        py={6}
        shadow={isTop ? 'none' : 'sm'}
        zIndex={99}
      >
        <Container maxW="5xl">
          <HStack spacing={8} justify="space-between">
            <HStack spacing={6}>
              <Logo />
              {!hideMenu && <Menu />}
            </HStack>

            <HStack spacing={4}>
              <HStack>
                <LanguageSwitch />
                <ColorModeSwitch />
              </HStack>
              {!hideMenu && isMobile && (
                <IconButton aria-label={t('menu.title')} variant="outline" onClick={mobileDrawerDisclosure.onToggle}>
                  <FaBars />
                </IconButton>
              )}
            </HStack>
          </HStack>
        </Container>
      </Box>
      <MobileDrawerMenu {...mobileDrawerDisclosure} />
    </>
  );
}
