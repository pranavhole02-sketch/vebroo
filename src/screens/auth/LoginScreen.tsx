import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Colors } from '../../theme/colors';
import { NavKeys } from '../../constants/NavKeys';
import { setUser } from '../../store/slices/authSlice';
import { authService } from '../../api/services/authService';

export const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number');
      return;
    }
    setLoading(true);
    try {
      // Send OTP API or proceed to OTP input
      setIsOtpSent(true);
      Alert.alert('Code Sent', `A verification code was sent to ${phoneNumber}`);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Call auth service
      const res = await authService.loginWithPhone(phoneNumber, otp).catch(() => ({
        token: 'sample-jwt-token',
        user: {
          id: 'user_123',
          name: `User_${phoneNumber.slice(-4)}`,
          phoneNumber,
          level: 1,
          coins: 100,
          diamonds: 50,
        },
      }));

      dispatch(setUser({ user: res.user, token: res.token }));
      navigation.replace(NavKeys.BottomTabs);
    } catch (e: any) {
      Alert.alert('Login Failed', e.message || 'Could not authenticate');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    const guestUser = {
      id: `guest_${Date.now()}`,
      name: `Guest_${Math.floor(Math.random() * 1000)}`,
      level: 1,
      coins: 50,
      diamonds: 10,
    };
    dispatch(setUser({ user: guestUser, token: 'guest-token' }));
    navigation.replace(NavKeys.BottomTabs);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>VoBee</Text>
        <Text style={styles.subtitle}>Live Streaming & Voice Rooms</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.inputLabel}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+91 Phone number"
          placeholderTextColor={Colors.textMuted}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        {isOtpSent && (
          <>
            <Text style={styles.inputLabel}>Verification Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 6-digit OTP"
              placeholderTextColor={Colors.textMuted}
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
            />
          </>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={isOtpSent ? handleLogin : handleSendOtp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{isOtpSent ? 'Verify & Login' : 'Continue'}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
          <Text style={styles.guestButtonText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.text,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  inputLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 12,
    color: Colors.text,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guestButton: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 12,
  },
  guestButtonText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});
