import { Platform } from 'react-native';

export const SDK_KEY = 'YOUR_SDK_KEY_HERE';

export const INTERSTITIAL_AD_UNIT_ID = Platform.select({
    ios: 'ENTER_IOS_INTERSTITIAL_AD_UNIT_ID_HERE',
    android: 'ENTER_ANDROID_INTERSTITIAL_AD_UNIT_ID_HERE',
    default: '',
});

export const REWARDED_AD_UNIT_ID = Platform.select({
    ios: 'ENTER_IOS_REWARDED_AD_UNIT_ID_HERE',
    android: 'ENTER_ANDROID_REWARDED_AD_UNIT_ID_HERE',
    default: '',
});

export const BANNER_AD_UNIT_ID = Platform.select({
    ios: 'ENTER_IOS_BANNER_AD_UNIT_ID_HERE',
    android: 'ENTER_ANDROID_BANNER_AD_UNIT_ID_HERE',
    default: '',
});

export const MREC_AD_UNIT_ID = Platform.select({
    ios: 'ENTER_IOS_MREC_AD_UNIT_ID_HERE',
    android: 'ENTER_ANDROID_MREC_AD_UNIT_ID_HERE',
    default: '',
});

export const NATIVE_AD_UNIT_ID = Platform.select({
    ios: 'ENTER_IOS_NATIVE_AD_UNIT_ID_HERE',
    android: 'ENTER_ANDROID_NATIVE_AD_UNIT_ID_HERE',
    default: '',
});
