import * as React from 'react';
import { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, Dimensions, Button } from 'react-native';
import AppLovinMAX, {
    ConsentFlowUserGeography,
    AppTrackingStatus,
    preloadNativeUIComponentAdView,
    destroyNativeUIComponentAdView,
    addNativeUIComponentAdViewAdLoadFailedEventListener,
    removeNativeUIComponentAdViewAdLoadedEventListener,
    addNativeUIComponentAdViewAdLoadedEventListener,
    removeNativeUIComponentAdViewAdLoadFailedEventListener,
    AdFormat,
} from 'react-native-applovin-max';
import type { Configuration, AdInfo, AdLoadFailedInfo, NativeUIComponentAdViewOptions } from 'react-native-applovin-max';
import AppLogo from './components/AppLogo';
import AppButton from './components/AppButton';
import InterExample from './InterExample';
import RewardedExample from './RewardedExample';
import ProgrammaticBannerExample from './ProgrammaticBannerExample';
import ProgrammaticMRecExample from './ProgrammaticMRecExample';
import NativeBannerExample from './NativeBannerExample';
import NativeMRecExample from './NativeMRecExample';
import NativeAdViewExample from './NativeAdViewExample';
import ScrolledAdViewExample from './ScrolledAdViewExample';
import { SDK_KEY, BANNER_AD_UNIT_ID, INTERSTITIAL_AD_UNIT_ID, MREC_AD_UNIT_ID, NATIVE_AD_UNIT_ID, REWARDED_AD_UNIT_ID } from './constants/keys';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    // Create states
    const [isInitialized, setIsInitialized] = useState(false);
    const [isProgrammaticBannerShowing, setIsProgrammaticBannerShowing] = useState(false);
    const [isNativeUIBannerShowing, setIsNativeUIBannerShowing] = useState(false);
    const [isProgrammaticMRecShowing, setIsProgrammaticMRecShowing] = useState(false);
    const [isNativeUIMRecShowing, setIsNativeUIMRecShowing] = useState(false);
    const [isNativeAdShowing, setIsNativeAdShowing] = useState(false);
    const [statusText, setStatusText] = useState('Initializing SDK...');

    const navigation = useNavigation<any>();

    // Run once after mounting
    useEffect(() => {
        // MAX Consent Flow - https://dash.applovin.com/documentation/mediation/react-native/getting-started/terms-and-privacy-policy-flow
        AppLovinMAX.setTermsAndPrivacyPolicyFlowEnabled(true);
        AppLovinMAX.setPrivacyPolicyUrl('https://your_company_name.com/privacy/'); // mandatory
        AppLovinMAX.setTermsOfServiceUrl('https://your_company_name.com/terms/'); // optional

        AppLovinMAX.setTestDeviceAdvertisingIds([]);
        AppLovinMAX.initialize(SDK_KEY)
            .then((conf: Configuration) => {
                setIsInitialized(true);
                setStatusText('SDK Initialized in ' + conf.countryCode);

                console.log('isTestModeEnabled: ' + conf.isTestModeEnabled);

                console.log('consentFlowUserGeography: ' + Object.keys(ConsentFlowUserGeography)[Object.values(ConsentFlowUserGeography).indexOf(conf.consentFlowUserGeography)]);

                // AppTrackingStatus for iOS
                if (conf.appTrackingStatus) {
                    console.log('appTrackingStatus: ' + Object.keys(AppTrackingStatus)[Object.values(AppTrackingStatus).indexOf(conf.appTrackingStatus)]);
                }
            })
            .catch((error) => {
                setStatusText(error.message);
            });
    }, []);

    // Run when statusText has changed
    useEffect(() => {
        console.log(statusText);
    }, [statusText]);

    // Preload AdView for banner and MREC ads
    useEffect(() => {
        if (!isInitialized) return;

        addNativeUIComponentAdViewAdLoadedEventListener((adInfo: AdInfo) => {
            if (adInfo.adUnitId === BANNER_AD_UNIT_ID) {
                console.log('Banner ad preloaded from ' + adInfo.networkName);
            } else if (adInfo.adUnitId === MREC_AD_UNIT_ID) {
                console.log('MREC ad preloaded from ' + adInfo.networkName);
            } else {
                console.log('Error: unexpected ad preloaded for ' + adInfo.adUnitId);
            }
        });

        addNativeUIComponentAdViewAdLoadFailedEventListener((errorInfo: AdLoadFailedInfo) => {
            if (errorInfo.adUnitId === BANNER_AD_UNIT_ID) {
                console.log('Banner ad failed to preload with error code ' + errorInfo.code + ' and message: ' + errorInfo.message);
            } else if (errorInfo.adUnitId === MREC_AD_UNIT_ID) {
                console.log('MREC ad failed to preload with error code ' + errorInfo.code + ' and message: ' + errorInfo.message);
            } else {
                console.log('Error: unexpected ad failed to preload for ' + errorInfo.adUnitId);
            }
        });

        preloadNativeUIComponentAdView(BANNER_AD_UNIT_ID, AdFormat.BANNER)
            .then(() => {
                console.log('Started preloading a banner ad for ' + BANNER_AD_UNIT_ID);
            })
            .catch((error) => {
                console.log('Failed to preaload a banner ad: ' + error.message);
            });

        const mrecOptions: NativeUIComponentAdViewOptions = {
            placement: 'placement',
            customData: 'customData',
            extraParameters: { key1: 'value1', key2: 'value2' },
            localExtraParameters: { key1: 1, key2: 'two' },
        };

        preloadNativeUIComponentAdView(MREC_AD_UNIT_ID, AdFormat.MREC, mrecOptions)
            .then(() => {
                console.log('Started preloading a MREC ad for ' + MREC_AD_UNIT_ID);
            })
            .catch((error) => {
                console.log('Failed to preaload a MREC ad: ' + error.message);
            });

        return () => {
            removeNativeUIComponentAdViewAdLoadedEventListener();
            removeNativeUIComponentAdViewAdLoadFailedEventListener();

            destroyNativeUIComponentAdView(BANNER_AD_UNIT_ID)
                .then(() => {
                    console.log('Destroyed the preloaded banner ad');
                })
                .catch((error) => {
                    console.log('Cannot destroy the preloaded banner ad: ' + error.message);
                });

            destroyNativeUIComponentAdView(MREC_AD_UNIT_ID)
                .then(() => {
                    console.log('Destroyed the preloaded MREC ad');
                })
                .catch((error) => {
                    console.log('Cannot destroy the preloaded MREC ad: ' + error.message);
                });
        };
    }, [isInitialized]);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <AppLogo />
                <Button title="Go to Screen 1" onPress={() => navigation.navigate('Screen1')} />
                <Text style={styles.statusText}>{statusText}</Text>
                <AppButton
                    title="Mediation Debugger"
                    enabled={isInitialized}
                    onPress={() => {
                        AppLovinMAX.showMediationDebugger();
                    }}
                />
                <InterExample adUnitId={INTERSTITIAL_AD_UNIT_ID} log={setStatusText} isInitialized={isInitialized} />
                <RewardedExample adUnitId={REWARDED_AD_UNIT_ID} log={setStatusText} isInitialized={isInitialized} />
                <ProgrammaticBannerExample
                    adUnitId={BANNER_AD_UNIT_ID}
                    log={setStatusText}
                    isInitialized={isInitialized}
                    isNativeUIBannerShowing={isNativeUIBannerShowing}
                    isProgrammaticBannerShowing={isProgrammaticBannerShowing}
                    setIsProgrammaticBannerShowing={setIsProgrammaticBannerShowing}
                />
                <ProgrammaticMRecExample
                    adUnitId={MREC_AD_UNIT_ID}
                    log={setStatusText}
                    isInitialized={isInitialized}
                    isNativeUIMRecShowing={isNativeUIMRecShowing}
                    isProgrammaticMRecShowing={isProgrammaticMRecShowing}
                    setIsProgrammaticMRecShowing={setIsProgrammaticMRecShowing}
                />
                <NativeBannerExample
                    adUnitId={BANNER_AD_UNIT_ID}
                    log={setStatusText}
                    isInitialized={isInitialized}
                    isNativeUIBannerShowing={isNativeUIBannerShowing}
                    isProgrammaticBannerShowing={isProgrammaticBannerShowing}
                    setIsNativeUIBannerShowing={setIsNativeUIBannerShowing}
                />
                <NativeMRecExample
                    adUnitId={MREC_AD_UNIT_ID}
                    log={setStatusText}
                    isInitialized={isInitialized}
                    isNativeUIMRecShowing={isNativeUIMRecShowing}
                    isProgrammaticMRecShowing={isProgrammaticMRecShowing}
                    setIsNativeUIMRecShowing={setIsNativeUIMRecShowing}
                />
                <NativeAdViewExample
                    adUnitId={NATIVE_AD_UNIT_ID}
                    isInitialized={isInitialized}
                    log={setStatusText}
                    isNativeAdShowing={isNativeAdShowing}
                    setIsNativeAdShowing={setIsNativeAdShowing}
                />
                <ScrolledAdViewExample bannerAdUnitId={BANNER_AD_UNIT_ID} mrecAdUnitId={MREC_AD_UNIT_ID} isInitialized={isInitialized} isNativeAdShowing={isNativeAdShowing} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: Platform.select({
            ios: Dimensions.get('window').height - 44, // For top safe area
            android: Dimensions.get('window').height,
        }),
    },
    statusText: {
        backgroundColor: 'green',
        padding: 10,
        fontSize: 20,
        textAlign: 'center',
    },
});

export default Home;
