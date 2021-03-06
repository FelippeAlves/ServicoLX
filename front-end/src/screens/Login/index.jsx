
import React,{ useState, useEffect} from 'react';
import * as Location from 'expo-location';
import getEnvVars from '../../../environment';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator, Text, View, Button, Image, Alert, TouchableOpacity  } from 'react-native';
import { styles } from './styles.js'
import { registerUser }  from '../../service/accountService'
import { storeData, retrieveData } from '../../service/storage'

import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth';

const { ANDROID_CLIENT_ID } = getEnvVars(); 

export default function Login({ navigation }) {
	const [ isSigninInProgress, setIsSigninInProgress ] = useState(false);
	const [location, setLocation] = useState(null);
	const [ user, setUser ] = useState(null);
		 
	useEffect(() => {
		async function _init() {
			let value = await retrieveData('@user');
			if (value) {
				navigation.reset({index: 0, routes: [{name:'Root'}]});
			}
		};
		_init();
		
		async function requestMediaPermission(){
			try {
				let { status } = await ImagePicker.requestCameraRollPermissionsAsync();
				
				if (status !== 'granted') {
					Alert.alert(
						"Permissão de acesso à mídia",
						"Este aplicativo utiliza de acesso às fotos para trazer a melhor experiência, criando serviços com fotos a partir do seu dispositivo móvel!",
						[
							{ text: "OK", onPress: () => requestMediaPermission() }
						],
						{ cancelable: false }
					  );
				}
				
			} catch (error) {
				requestMediaPermission()
			}
		}

		async function requestLocationPermission() {
			try {
				let { status } = await Location.requestPermissionsAsync();
				
				if (status !== 'granted') {
					Alert.alert(
						"Permissão de localização",
						"Este aplicativo utiliza sua localização atual para trazer a melhor experiência, buscando serviços que estejam mais próximos do conforto do seu toque!",
						[
							{ text: "OK", onPress: () => requestLocationPermission() }
						],
						{ cancelable: false }
					  );
				}

				let location = await Location.getCurrentPositionAsync({});

				var { latitude, longitude } = location.coords;
				location.address = await Location.reverseGeocodeAsync({'latitude': latitude, 'longitude': longitude});
				
				setLocation(location);
			} catch (error) {
				requestLocationPermission()
			}
		};
		requestLocationPermission();
		requestMediaPermission();
	}, []);

	async function signInWithGoogleAsync() {
		
		try {
			setIsSigninInProgress(true)

			const result = await Google.logInAsync({
				androidClientId: ANDROID_CLIENT_ID,
			});
	
			if (result.type === 'success') {

				let { user } = result;
				let {address, coords} = location;

				let account = await registerUser({ user, address, coords })

				if (account) {

					let status = await storeData('@user', JSON.stringify(account))
					if (status)
						navigation.reset({index: 0, routes: [{name:'Root'}]});

				} else {
					Alert.alert(
						"Falha no login",
						"O aplicativo utiliza suas credências da conta google para poder logar/se cadastrar, tenha certeza de estar conectado à internet, reinicie o aplicativo e tente novamente",
						[
							{ text: "OK"}
						],
						{ cancelable: false }
					);
				}
				
				setIsSigninInProgress(false);

			} else {
				// implementar toast bonitin https://docs.expo.io/versions/latest/react-native/toastandroid/
				setIsSigninInProgress(false)
				return { cancelled: true };
			}
		} catch (e) {
			return { error: true };
		}
	}

  return (
    <View style={styles.container}>
		{ isSigninInProgress && 
			<View style={styles.loading}>
				<ActivityIndicator size='large' color='red' />
			</View>
		}

		<View style={styles.containerLogo}>
			<Text title='Teste'>LOGO</Text>
		</View>
		<View style={styles.loginOptions}>
			<View style={styles.googleBackground}>
				<View style={styles.googleSet}>
					<Image 
						style={styles.tinyLogo}
						source={{
							uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/471px-Google_%22G%22_Logo.svg.png"
						}}
					></Image>
					<Button style={styles.googleBtn} title='Sign in with google' onPress={() => { signInWithGoogleAsync() }}></Button>
				</View>
			</View>
			<View style={styles.disclaimer}>
				<Text style={{fontSize: 12}} title="teste">ServiceLX - Todos os direitos reservados</Text>
			</View>
		</View>
    </View>
  )
}
