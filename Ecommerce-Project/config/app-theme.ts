import { useColorModeValue } from '@chakra-ui/react';

export function useCustomTheme() {
  const textColor = useColorModeValue('gray.500', 'primary.400');
  const primaryBg = useColorModeValue('white', 'gray.900');

  return {
    textColor,
    primaryBg,
  };
}
