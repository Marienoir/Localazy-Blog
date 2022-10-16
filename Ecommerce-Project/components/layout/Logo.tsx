import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" passHref>
      <Flex as="a" fontSize="2xl" color={useColorModeValue('gray.800', 'white')} align="center" lineHeight={1}>
        <Text as="span" fontWeight="bold">
          Supa
          <Text as="span" color={useColorModeValue('primary.500', 'primary.400')}>
            Commerce
          </Text>
        </Text>
      </Flex>
    </Link>
  );
}
