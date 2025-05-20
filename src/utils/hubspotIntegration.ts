
import { UserInfo } from '@/types/diagnostic';

export type UserFormData = UserInfo;

export async function sendToHubspot(data: UserFormData): Promise<boolean> {
  try {
    // This is the webhook URL for n8n (corrected)
    const webhookUrl = 'https://webhook.n8n.growthmachine.com.br/webhook/843e1f22-7574-4681-a1ef-f43a570869ae';
    
    // Create query string from user data
    const params = new URLSearchParams();
    
    // Validate all required fields are present
    if (!data.name || !data.email || !data.company || !data.phone) {
      console.error('Missing required user data fields');
      return false;
    }
    
    // Add user data to query params
    Object.entries(data).forEach(([key, value]) => {
      if (value) { // Only add parameters with values
        params.append(key, value.toString());
      }
    });
    
    // Add timestamp to avoid caching
    params.append('timestamp', Date.now().toString());
    
    // Store the complete data to localStorage for sharing
    try {
      localStorage.setItem('userContact', JSON.stringify(data));
    } catch (storageError) {
      console.error('Error storing user data in localStorage:', storageError);
    }
    
    // Append query string to URL
    const urlWithParams = `${webhookUrl}?${params.toString()}`;
    
    // Make GET request to the webhook with no-cors mode
    await fetch(urlWithParams, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'no-cors', // Add no-cors mode to handle CORS issues
    });
    
    // With no-cors, we won't get a normal response status, so we just assume it succeeded
    // if it didn't throw an error
    console.log('Successfully sent user data to n8n webhook');
    return true;
    
  } catch (error) {
    console.error('Error sending data to n8n webhook:', error);
    return false;
  }
}
