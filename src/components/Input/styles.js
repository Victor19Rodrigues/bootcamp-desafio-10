import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 0 15px;
    height: 50px;
    background: #261c2c;
    border-radius: 4px;

    flex-direction: row;
    align-items: center;
`;

export const TInput = styled.TextInput.attrs({
    placeholderTextColor: '#938E96',
})`
    flex: 1;
    font-size: 18px;
    margin-left: 5px;
    color: #fff;
`;
