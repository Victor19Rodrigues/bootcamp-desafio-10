import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Time = styled.View`
    margin: 30px 0 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const PrevButton = styled(RectButton)``;

export const DateText = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    margin: 0 15px;
`;

export const NextButton = styled(RectButton)``;

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {padding: 30},
})``;
