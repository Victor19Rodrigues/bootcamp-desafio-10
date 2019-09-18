import React from 'react';
import {View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Container } from './styles';
import Background from '~/components/Background';

export default function Dashboard() {
    return <Background />;
}

Dashboard.navigationOptions = {
    tabBarLabel: 'Meetapps',
    tabBarIcon: ({tintColor}) => (
        <Icon name="list" size={20} color={tintColor} />
    ),
};
