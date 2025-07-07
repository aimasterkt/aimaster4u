// API endpoint for email subscription
// This is a server-side endpoint for handling email subscriptions

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();
    const { email, language = 'vi', source = 'unknown' } = body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: language === 'vi' ? 'Email không hợp lệ' : 'Invalid email address' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Here you would integrate with your email service provider
    // Examples: Mailchimp, ConvertKit, EmailOctopus, Brevo (Sendinblue), etc.
    
    const subscriptionResult = await subscribeToEmailService({
      email,
      language,
      source,
      tags: ['website_subscription', `lang_${language}`, `source_${source}`],
      customFields: {
        signup_date: new Date().toISOString(),
        language_preference: language,
        source: source
      }
    });

    if (subscriptionResult.success) {
      // Log successful subscription (for analytics)
      console.log('Subscription successful:', { email, language, source });
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: language === 'vi' 
            ? 'Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.' 
            : 'Subscription successful! Please check your email to confirm.'
        }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      throw new Error(subscriptionResult.message || 'Subscription failed');
    }

  } catch (error) {
    console.error('Subscription error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'An error occurred. Please try again.' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Email service integration function
async function subscribeToEmailService(data: {
  email: string;
  language: string;
  source: string;
  tags: string[];
  customFields: Record<string, any>;
}) {
  // Example integration with Mailchimp
  // Replace with your actual email service provider
  
  /*
  // Mailchimp Example
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER; // e.g., 'us1'
  
  const response = await fetch(
    `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: data.email,
        status: 'subscribed', // or 'pending' for double opt-in
        language: data.language,
        tags: data.tags,
        merge_fields: {
          LANGUAGE: data.language,
          SOURCE: data.source,
          SIGNUP: data.customFields.signup_date,
        },
      }),
    }
  );
  
  const result = await response.json();
  
  if (response.ok) {
    return { success: true, data: result };
  } else {
    return { success: false, message: result.detail || 'Subscription failed' };
  }
  */

  /*
  // ConvertKit Example
  const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
  const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;
  
  const response = await fetch(
    `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: CONVERTKIT_API_KEY,
        email: data.email,
        tags: data.tags,
        fields: {
          language: data.language,
          source: data.source,
          signup_date: data.customFields.signup_date,
        },
      }),
    }
  );
  
  const result = await response.json();
  
  if (response.ok && result.subscription) {
    return { success: true, data: result };
  } else {
    return { success: false, message: result.message || 'Subscription failed' };
  }
  */

  /*
  // Brevo (Sendinblue) Example
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_LIST_ID = process.env.BREVO_LIST_ID;
  
  const response = await fetch(
    'https://api.brevo.com/v3/contacts',
    {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        listIds: [parseInt(BREVO_LIST_ID)],
        attributes: {
          LANGUAGE: data.language,
          SOURCE: data.source,
          SIGNUP_DATE: data.customFields.signup_date,
        },
        updateEnabled: true,
      }),
    }
  );
  
  if (response.ok) {
    return { success: true };
  } else {
    const result = await response.json();
    return { success: false, message: result.message || 'Subscription failed' };
  }
  */

  // Mock implementation for development
  // Replace this with your actual email service integration
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate success (90% success rate for testing)
      const success = Math.random() > 0.1;
      resolve({
        success,
        message: success ? 'Subscription successful' : 'Email already exists'
      });
    }, 1000);
  });
}

// Alternative: If using a different framework or static hosting,
// you can use services like:
// - Netlify Forms
// - Vercel Edge Functions
// - Cloudflare Workers
// - AWS Lambda
// - Google Cloud Functions

/*
// Netlify Forms Example (for static sites)
// Just add this to your HTML form:
// <form name="subscription" method="POST" data-netlify="true">
//   <input type="hidden" name="form-name" value="subscription" />
//   <input type="email" name="email" required />
//   <input type="hidden" name="language" value="vi" />
//   <button type="submit">Subscribe</button>
// </form>

// Then handle the submission with JavaScript:
async function submitToNetlify(formData) {
  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString()
  });
  
  return response.ok;
}
*/