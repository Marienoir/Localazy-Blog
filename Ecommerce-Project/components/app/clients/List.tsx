import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import { defaultToastOptions } from '../../../config/chakra-ui';
import { definitions } from '../../../types/supabase';
import ConfirmModal from '../ConfirmModal';
import ClientFormModal from './FormModal';

type Client = definitions['clients'];

async function fetchClients() {
  const { data: clients, error } = await supabaseClient.from<Client>('clients').select('*');
  if (error) throw new Error('Failed to fetch clients');
  return clients;
}

async function deleteClient(id: string) {
  if (!id) return;
  const { error } = await supabaseClient.from<Client>('clients').delete().eq('id', id);
  if (error) throw new Error('Could not delete client');
}

export default function ClientsList() {
  const queryClient = useQueryClient();
  const { t } = useTranslation('app');
  const toast = useToast(defaultToastOptions);
  const formModal = useDisclosure();
  const confirmModal = useDisclosure();
  const [selectedClient, setSelectedClient] = useState<null | Client>(null);
  const { data: clients, isLoading: loadingClients } = useQuery(['clients'], fetchClients);
  const tableBg = useColorModeValue('white', 'gray.700');
  const tableBorderColor = useColorModeValue('gray.100', 'gray.600');

  const openClientForm = useCallback(
    (client: Client | null) => {
      setSelectedClient(client);
      formModal.onOpen();
    },
    [formModal, setSelectedClient]
  );

  const openDeleteConfirm = useCallback(
    (client: Client | null) => {
      setSelectedClient(client);
      confirmModal.onOpen();
    },
    [confirmModal, setSelectedClient]
  );

  const deleteClientMutation = useMutation(deleteClient, {
    // reset client after request
    onSettled: () => setSelectedClient(null),
    // show toast on error
    onError: () =>
      toast({
        status: 'error',
        title: t('deleteClient.errorMessage'),
      }),
    // show toast on success and refetch clients
    onSuccess: () => {
      toast({
        status: 'success',
        title: t('deleteClient.successMessage'),
      });
      queryClient.invalidateQueries(['clients']);
    },
  });

  return (
    <>
      <HStack mb={4} justify="space-between">
        <Heading fontSize="2xl">{t('clients.title')}</Heading>

        <Button size="sm" colorScheme="primary" leftIcon={<FaUserPlus />} onClick={() => openClientForm(null)}>
          {t('clients.createButton')}
        </Button>
      </HStack>
      <Box
        bg={tableBg}
        rounded="xl"
        border="1px solid "
        borderColor={tableBorderColor}
        w="full"
        maxW="full"
        overflow="auto"
      >
        {loadingClients && !clients ? (
          <Stack w="full" p={4}>
            <Skeleton rounded="lg" height="24px" />
            <Skeleton rounded="lg" height="32px" />
            <Skeleton rounded="lg" height="32px" />
            <Skeleton rounded="lg" height="32px" />
          </Stack>
        ) : (
          <Table>
            <Thead borderBottom="1px solid" borderColor={tableBorderColor}>
              <Tr>
                <Th>{t('clients.list.columns.name')}</Th>
                <Th>{t('clients.list.columns.email')}</Th>
                <Th>{t('clients.list.columns.phone')}</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {clients && clients.length > 0 ? (
                clients?.map((client) => (
                  <Tr key={`client-${client.id}`}>
                    <Td>{client.name}</Td>
                    <Td>{client.email}</Td>
                    <Td>{client.phone}</Td>
                    <Td>
                      <HStack justify="end" spacing={1}>
                        <IconButton
                          size="sm"
                          colorScheme="primary"
                          variant="ghost"
                          icon={<FaEdit />}
                          aria-label={t('clients.list.edit')}
                          onClick={() => openClientForm(client)}
                        />
                        <IconButton
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          icon={<FaTrash />}
                          aria-label={t('clients.list.delete')}
                          disabled={selectedClient?.id === client.id && deleteClientMutation.isLoading}
                          onClick={() => openDeleteConfirm(client)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={99}>
                    <VStack textAlign="center" p={6}>
                      <Heading fontSize="lg">{t('clients.list.noResults')}</Heading>
                      <Text opacity={0.5}>{t('clients.list.empty')}</Text>
                    </VStack>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        )}
      </Box>
      <ClientFormModal client={selectedClient} isOpen={formModal.isOpen} onClose={formModal.onClose} />
      <ConfirmModal
        title={t('deleteClientModal.title')}
        description={t('deleteClientModal.description')}
        isDelete
        isOpen={confirmModal.isOpen}
        onClose={(confirmed) => {
          if (confirmed && selectedClient?.id) deleteClientMutation.mutate(selectedClient.id);
          confirmModal.onClose();
        }}
      />
    </>
  );
}
