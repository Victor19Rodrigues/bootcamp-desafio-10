import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import MySubscription from '~/components/MySubscription';
import EmptyList from '~/components/EmptyList';
import Loading from '~/components/Loading';
import Header from '~/components/Header';
import Background from '~/components/Background';

import {Container, List} from './styles';

function Subscription({isFocused}) {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(false);

    async function loadSubscriptions() {
        setLoading(true);

        const response = await api.get('subscriptions');

        setSubscriptions(response.data);
        setLoading(false);
    }

    useEffect(() => {
        if (isFocused) {
            loadSubscriptions();
        }
    }, [isFocused]);

    async function handleCancel(id) {
        try {
            await api.delete(`subscriptions/${id}`);
            Alert.alert('Cancelado', 'Sua inscrição foi cancelada com sucesso');
            loadSubscriptions();
        } catch (error) {
            const message = String(error.response.data.message);
            Alert.alert('Ops!', message);
        }
    }

    return (
        <Background>
            <Container>
                <Header />

                {loading && <Loading />}

                {!loading &&
                    (subscriptions.length ? (
                        <List
                            data={subscriptions}
                            keyExtractor={item => String(item.id)}
                            renderItem={({item}) => (
                                <MySubscription
                                    data={item}
                                    handleCancel={() => handleCancel(item.id)}
                                />
                            )}
                        />
                    ) : (
                        <EmptyList>
                            Você não esta inscrito em nenhum meetup!
                        </EmptyList>
                    ))}
            </Container>
        </Background>
    );
}

Subscription.navigationOptions = {
    tabBarLabel: 'Inscrições',
    // eslint-disable-next-line react/prop-types
    tabBarIcon: ({tintColor}) => (
        <Icon name="local-offer" size={20} color={tintColor} />
    ),
};

Subscription.propTypes = {
    isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscription);
