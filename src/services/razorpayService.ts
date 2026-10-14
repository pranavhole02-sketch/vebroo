import RazorpayCheckout from 'react-native-razorpay';
import { Config } from '../constants/Config';
import { apiClient } from '../api/client';
import { Endpoints } from '../api/endpoints';

export interface CheckoutOptions {
  description: string;
  amountInr: number; // in Rupees
  currency?: string;
  orderId?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
}

class PaymentService {
  async checkout(options: CheckoutOptions): Promise<{ success: boolean; paymentId?: string; error?: string }> {
    try {
      const checkoutData = {
        description: options.description,
        image: `${Config.CDN_BASE_URL}/logo.png`,
        currency: options.currency || 'INR',
        key: Config.RAZORPAY_KEY_ID,
        amount: Math.round(options.amountInr * 100), // convert to paise
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
      
      // Notify backend of payment
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
