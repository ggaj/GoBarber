import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px 24px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  text-align: left;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 64px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 12px;
`;

export const UserAvatar = styled.Image`
  height: 186px;
  width: 186px;
  border-radius: 98px;
  align-self: center;
`;
