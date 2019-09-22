import React, {useEffect, useState, useMemo} from 'react';
import {withNavigationFocus} from 'react-navigation';
import PropTypes from 'prop-types';
import {Alert} from 'react-native';

import {format, subDays, addDays} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
    Container,
    Time,
    PrevButton,
    DateText,
    NextButton,
    List,
} from './styles';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetapp from '~/components/Meetapp';
import Loading from '~/components/Loading';
import EmptyList from '~/components/EmptyList';

const per_page = 5;

function Dashboard({isFocused}) {
    const [meetapps, setMeetapps] = useState([]);
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    const dateFormatted = useMemo(
        () => format(date, "dd 'de' MMMM", {locale: pt}),
        [date],
    );

    async function loadMeetapps(pageNumber = page, shouldRefresh = false) {
        if (shouldRefresh) pageNumber = 1;

        const response = await api.get('meetups', {
            params: {
                per_page,
                page: pageNumber,
                date,
            },
        });

        setMeetapps(response.data);
        setPage(pageNumber + 1);

        setLoading(false);
    }

    useEffect(() => {
        if (isFocused) {
            setLoading(true);
            loadMeetapps(page, true);
        }
    }, [isFocused, date]);

    async function handleSubmit(id) {
        try {
            await api.post(`meetups/${id}/subscriptions`);
            Alert.alert(
                'Inscrito com sucesso',
                'Sua inscrição foi realizada com sucesso',
            );
        } catch (error) {
            Alert.alert(
                'Ops!',
                'Não é possivel se inscrever em um meetup que já foi realizado',
            );
        }
    }

    function handleLoadMeetappsOnRefresh() {
        loadMeetapps(page, true);
    }

    function handlePrevDay() {
        setPage(1);
        setDate(subDays(date, 1));
        setMeetapps([]);
    }

    function handleNextDay() {
        setPage(1);
        setDate(addDays(date, 1));
        setMeetapps([]);
    }

    return (
        <Background>
            <Header />

            <Container>
                <Time>
                    <PrevButton onPress={handlePrevDay}>
                        <Icon name="chevron-left" color="#fff" size={30} />
                        {/* <ImageChevron source={chevron_left} color="#fff" /> */}
                    </PrevButton>
                    <DateText>{dateFormatted}</DateText>
                    <NextButton onPress={handleNextDay}>
                        <Icon name="chevron-right" color="#fff" size={30} />
                    </NextButton>
                </Time>

                {loading && <Loading />}

                {!loading &&
                    (meetapps.length ? (
                        <List
                            data={meetapps}
                            keyExtractor={item => String(item.id)}
                            renderItem={({item}) => (
                                <Meetapp
                                    data={item}
                                    handleSubmit={() => handleSubmit(item.id)}
                                />
                            )}
                            onRefresh={handleLoadMeetappsOnRefresh}
                            refreshing={refreshing}
                        />
                    ) : (
                        <EmptyList>Não há meetapps para esta data!</EmptyList>
                    ))}
            </Container>
        </Background>
    );
}

Dashboard.navigationOptions = {
    tabBarLabel: 'Meetapps',
    tabBarIcon: ({tintColor}) => (
        <Icon name="list" size={20} color={tintColor} />
    ),
};

Dashboard.propTypes = {
    isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
