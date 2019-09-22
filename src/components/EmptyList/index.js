import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import {Container, Text} from './styles';

export default function EmptyList({children}) {
    return (
        <Background>
            <Container>
                <Icon name="highlight-off" size={50} color="#fff" />
                <Text>{children}</Text>
            </Container>
        </Background>
    );
}

EmptyList.propTypes = {
    children: PropTypes.string.isRequired,
};
