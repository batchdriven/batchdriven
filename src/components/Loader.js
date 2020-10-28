import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Colors from '../constatnts/Colors';

const Loader = (props) => {
    return (
        props.loading ? <View style={{ position: 'absolute', backgroundColor: '#00000040', justifyContent: 'center', alignItems: 'center', top: 0, bottom: 0, left: 0, right: 0 }}>
            <ActivityIndicator color={Colors.primaryColor} size="large" />
        </View>
            : null
    );
}

export { Loader };
