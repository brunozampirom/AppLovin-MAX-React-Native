// In App.js in a new project

import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { BANNER_AD_UNIT_ID, MREC_AD_UNIT_ID } from './constants/keys';
import { useNavigation } from '@react-navigation/native';
import { AdFormat, AdView } from 'react-native-applovin-max';

const Screen1 = () => {
    const navigation = useNavigation<any>();

    const onButtonPress = () => {
        navigation.navigate('Screen2');
    };

    return (
        <View style={{ flex: 1 }}>
            <Text>Screen 1</Text>
            <Button title="Go to Screen 2" onPress={onButtonPress} />
            <AdView adUnitId={MREC_AD_UNIT_ID} adFormat={AdFormat.MREC} style={{ width: '100%', height: 'auto' }} />
            <AdView adUnitId={BANNER_AD_UNIT_ID} adFormat={AdFormat.BANNER} style={{ width: '100%', height: 'auto' }} />
        </View>
    );
};

export default Screen1;
