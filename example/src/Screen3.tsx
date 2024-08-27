// In App.js in a new project

import * as React from 'react';
import { Text, View } from 'react-native';
import { MREC_AD_UNIT_ID } from './constants/keys';
import { AdFormat, AdView } from 'react-native-applovin-max';

const Screen3 = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text>Screen 3</Text>
            <AdView adUnitId={MREC_AD_UNIT_ID} adFormat={AdFormat.MREC} style={{ width: '100%', height: 'auto' }} />
        </View>
    );
};

export default Screen3;
