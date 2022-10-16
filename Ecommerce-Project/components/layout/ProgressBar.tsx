import NextNProgress from 'nextjs-progressbar';
import { customTheme } from '../../config/chakra-ui';

export default function ProgressBar() {
  return <NextNProgress height={4} color={customTheme.colors.primary.DEFAULT} showOnShallow={true} />;
}
