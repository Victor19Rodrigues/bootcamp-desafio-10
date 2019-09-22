import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
import {NativeModules} from 'react-native';

const host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];

if (__DEV__) {
    // const tron = Reactotron.configure({host: '10.0.3.2'})
    const tron = Reactotron.configure({host})
        .useReactNative()
        .use(reactotronRedux())
        .use(reactotronSaga())
        .connect();

    tron.clear();

    console.tron = tron;
}
