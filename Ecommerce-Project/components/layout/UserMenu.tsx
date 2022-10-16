import { IconButton, Menu, MenuButton, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useUserName } from '../../lib/auth';

export default function UserMenu() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const userName = useUserName();

  const signOut = useCallback(async () => {
    await router.push('/');
    supabaseClient.auth.signOut();
  }, [router]);

  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={IconButton}
        size="sm"
        aria-label="Options"
        icon={<FaUser />}
        rounded="full"
        colorScheme="primary"
      />
      <MenuList>
        <MenuGroup title={t('userMenu.message', { user: userName })}>
          <Link href="/app/profile" passHref>
            <MenuItem icon={<FaUser />}>{t('userMenu.profile')}</MenuItem>
          </Link>

          <MenuItem icon={<FaSignOutAlt />} onClick={() => signOut?.()}>
            {t('userMenu.signOut')}
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
