
import {
  Box,
  Heading,
  Stack,
  useColorModeValue,
  Image,
  Grid,
  SimpleGrid
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import SectionHeadline from './SectionHeadline';
export default function Features() {
  const { t } = useTranslation('home');
  const itemBg = useColorModeValue('white', 'gray.700');
  const featureItems = [
    {
      title: t('items.laptop.title'),
      description: t('items.laptop.description'),
      imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2022/07/laptop-under-500-2048px-acer-1.jpg"
    },
    {
      title: t('items.phones.title'),
      description: t('items.phones.description'),
      imageUrl: "https://www.android.com/static/2016/img/one/carousel/xiaomi_phones_a3-global_1x.png"
    },
    {
      title: t('items.headphones.title'),
      description: t('items.headphones.description'),
      imageUrl: "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo3-wireless/pdp/solo3-pdp-p02.png.large.2x.png"
    },
    {
      title: t('items.airpods.title'),
      description: t('items.airpods.description'),
      imageUrl: "https://media.istockphoto.com/photos/apple-airpods-pro-on-a-white-background-picture-id1208634643?k=20&m=1208634643&s=612x612&w=0&h=OyKuK4H2v_xtTSaH86BLMYFgTcO-CfmBCEmI61G3omw="
    },
    {
      title: t('items.smartWatch.title'),
      description: t('items.smartWatch.description'),
      imageUrl: "https://vmart.pk/wp-content/uploads/2022/02/Kieslect-K10-Smart-Watch-Black-4.jpg"
    },
    {
      title: t('items.smartTv.title'),
      description: t('items.smartTv.description'),
      imageUrl: "https://i5.walmartimages.com/asr/8782302f-5f1b-498f-af06-3cc477f95fb3.e34225d118e037e089f4eb3b3681faf5.jpeg"
    },
  ];
  return (
    <Box id="catalogue" px={16} py={16} bg='#f2ebff' >
      <SectionHeadline title={t('items.title')} description={t('items.description')} />
      <SimpleGrid columns={[1, 2]} spacing={10}>
        {featureItems.map((item, i) => (
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={6}
            key={i}
            w="full"
            p={8}
            bg={itemBg}
            rounded="3xl"
          >
            <Box flex={1}>
              <Box mb={8}>
                <Image src={item.imageUrl} alt='image' h='150px' />
              </Box>
              <Heading fontSize="xl" mb={2}>
                {item.title}
              </Heading>
              <p>{item.description}</p>
            </Box>
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
}