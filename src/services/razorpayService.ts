import { NativeModules, Alert } from 'react-native';
import { Config } from '../constants/Config';
import { apiClient } from '../api/client';
import { Endpoints } from '../api/endpoints';

let RazorpayCheckout: any = null;
try {
  if (NativeModules.RNRazorpayCheckout || NativeModules.RazorpayCheckout) {
    RazorpayCheckout = require('react-native-razorpay').default;
  }
} catch (e) {
  // Running in Expo Go
}

export interface CheckoutOptions {
  description: string;
  amountInr: number;
  currency?: string;
  orderId?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
}

class PaymentService {
  async checkout(options: CheckoutOptions): Promise<{ success: boolean; paymentId?: string; error?: string }> {
    // If running in Expo Go without native Razorpay binary
    if (!RazorpayCheckout) {
      console.log('[PaymentService:Expo] Simulating Razorpay checkout in Expo Go');
      return new Promise((resolve) => {
        Alert.alert(
          'Expo Go Test Payment',
          `Simulate successful recharge of ₹${options.amountInr}?`,
          [
            { text: 'Cancel', style: 'cancel', onPress: () => resolve({ success: false, error: 'Payment cancelled' }) },
            {
              text: 'Simulate Success',
              onPress: () => resolve({ success: true, paymentId: `pay_test_${Date.now()}` }),
            },
          ]
        );
      });
    }

    try {
      const checkoutData = {
        description: options.description,
        image: `${Config.CDN_BASE_URL}/logo.png`,
        currency: options.currency || 'INR',
        key: Config.RAZORPAY_KEY_ID,
        amount: Math.round(options.amountInr * 100),
        name: Config.APP_NAME,
        order_id: options.orderId || undefined,
        prefill: {
          email: options.userEmail || 'user@example.com',
          contact: options.userPhone || '9999999999',
          name: options.userName || 'VoBee User',
        },
        theme: { color: '#7B2CBF' },
      };

      const data = await RazorpayCheckout.open(checkoutData);
      
      if (data.razorpay_payment_id) {
        await apiClient.post(Endpoints.wallet.razorpayPaymentRecords, {
          paymentId: data.razorpay_payment_id,
          orderId: data.razorpay_order_id,
          signature: data.razorpay_signature,
          amount: options.amountInr,
        }).catch(() => null);
      }

      return {
        success: true,
        paymentId: data.razorpay_payment_id,
      };
    } catch (error: any) {
      console.warn('[Razorpay] Payment failed or cancelled:', error.description || error.message);
      return {
        success: false,
        error: error.description || error.message || 'Payment cancelled',
      };
    }
  }
}

export const paymentService = new PaymentService();
