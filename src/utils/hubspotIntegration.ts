
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
 * Sends user data to the webhook for HubSpot integration via n8n
 */
export const sendToHubspot = async (userData: UserFormData): Promise<boolean> => {
  try {
    // Replace this URL with your actual webhook URL for n8n
    const webhookUrl = "https://your-n8n-webhook-url.com";
    
    const payload = {
      ...userData,
      source: "diagnostic_tool",
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      // Add any other data you want to send to HubSpot
      event_type: "diagnostic_started"
    };
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      console.error("Error sending data to webhook:", await response.text());
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error sending data to webhook:", error);
    return false;
  }
};
