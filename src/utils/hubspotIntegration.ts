
export interface UserFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/**
 * Sends user data to the webhook for n8n integration
 */
export const sendToHubspot = async (userData: UserFormData): Promise<boolean> => {
  try {
    // The n8n webhook URL
    const webhookUrl = "https://n8n.growthmachine.com.br/webhook-test/843e1f22-7574-4681-a1ef-f43a570869ae";
    
    const payload = {
      ...userData,
      source: "diagnostic_tool",
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      event_type: "diagnostic_started"
    };
    
    // Convert the payload to query string parameters
    const queryParams = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
    
    // Construct the full URL with query parameters
    const fullUrl = `${webhookUrl}?${queryParams.toString()}`;
    
    console.log("Sending data to n8n webhook:", fullUrl);
    
    // Make a GET request instead of POST
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });
    
    if (!response.ok) {
      console.error("Error sending data to webhook:", await response.text());
      return false;
    }
    
    console.log("Data successfully sent to n8n webhook");
    return true;
  } catch (error) {
    console.error("Error sending data to webhook:", error);
    return false;
  }
};
