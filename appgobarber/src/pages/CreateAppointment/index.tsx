import React, { useCallback, useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  // ProviderListTitle,
  ProviderContainer,
  ProviderAvatar,
  // ProviderInfo,
  ProviderName,
  // ProviderMeta,
  // ProviderMetaText,
} from './styles';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const route = useRoute();
  const { user } = useAuth();
  const { goBack } = useNavigation();

  const { providerId } = route.params as RouteParams;
  const [selectedProvider, setSelectedProvider] = useState(providerId);

  useEffect(() => {
    api.get('/providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((id: string) => {
    setSelectedProvider(id);
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>
        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={provider => provider.id}
          data={providers}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectedProvider}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
              {/* //   <ProviderInfo>

            //     <ProviderMeta>
            //       <Icon name="calendar" size={14} color="#ff9000" />
            //       <ProviderMetaText>Segunda à Sexta</ProviderMetaText>
            //     </ProviderMeta>

            //     <ProviderMeta>
            //       <Icon name="clock" size={14} color="#ff9000" />
            //       <ProviderMetaText>8h às 18h</ProviderMetaText>
            //     </ProviderMeta>
            //   </ProviderInfo> */}
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>
    </Container>
  );
};

export default CreateAppointment;
