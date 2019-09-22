import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton).attrs({
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
})`
    height: 46px;
    background: #e4556d;
    border-radius: 4px;

    box-shadow: 10px 5px 5px black;
    align-items: center;
    justify-content: center;
`;

export const Text = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 18px;
`;
