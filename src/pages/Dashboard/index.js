import React, {useEffect, useState, useMemo} from 'react';
import {withNavigationFocus} from 'react-navigation';
import PropTypes from 'prop-types';
import {Alert} from 'react-native';

import {format, parseISO, isBefore, subDays, addDays} from 'date-fns';
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

const per_page = 5;

function Dashboard({isFocused}) {
    const [meetapps, setMeetapps] = useState([]);
    const [date, setDate] = useState(new Date());
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const dateFormatted = useMemo(
        () => format(date, "dd 'de' MMMM", {locale: pt}),
        [date],
    );

    async function loadMeetapps(pageNumber = page, shouldRefresh = false) {
        if (total && pageNumber > total) {
            return;
        }
        console.tron.log(date);
        const response = await api.get('meetups', {
            params: {
                per_page,
                page: pageNumber,
                date,
            },
        });

        const data = response.data.map(meetapp => {
            return {
                ...meetapps,
                past: isBefore(parseISO(meetapp.date), new Date()),
            };
        });

        const totalItems = await response.data.count;

        setTotal(Math.ceil(totalItems / per_page));
        setMeetapps(response.data);
        setPage(pageNumber + 1);
    }

    useEffect(() => {
        if (isFocused) {
            loadMeetapps();
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

                <List
                    data={meetapps}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item}) => (
                        <Meetapp
                            data={item}
                            handleSubmit={() => handleSubmit(item.id)}
                        />
                    )}
                    onRefresh={loadMeetapps}
                    refreshing={refreshing}
                />
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
