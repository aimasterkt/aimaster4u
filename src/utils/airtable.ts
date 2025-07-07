// Airtable API configuration
const AIRTABLE_API_KEY = import.meta.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.AIRTABLE_BASE_ID;

export interface AITool {
  id: string;
  fields: {
    'Tên công cụ (VI)': string;
    'Tên công cụ (EN)': string;
    'Mô tả ngắn gọn (VI)': string;
    'Mô tả ngắn gọn (EN)': string;
    'Link Affiliate': string;
    'Danh mục': string[];
    'Trạng thái giá': string;
    'Phổ biến': boolean;
    'Logo công cụ': Array<{
      id: string;
      url: string;
      filename: string;
    }>;
    'Rating (Sao)': number;
    'Tag Độc quyền (VI)': string[];
    'Tag Độc quyền (EN)': string[];
  };
}

export interface BlogPost {
  id: string;
  fields: {
    'Tiêu đề bài viết (VI)': string;
    'Tiêu đề bài viết (EN)': string;
    'Slug (VI)': string;
    'Slug (EN)': string;
    'Nội dung (VI)': string;
    'Nội dung (EN)': string;
    'Ảnh Thumbnail': Array<{
      id: string;
      url: string;
      filename: string;
    }>;
    'Ngày đăng': string;
    'Danh mục Blog': string[];
    'Mô tả Meta (VI)': string;
    'Mô tả Meta (EN)': string;
  };
}

export async function getAITools(): Promise<AITool[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.warn('Airtable credentials not configured, returning mock data');
    return getMockAITools();
  }

  try {
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/AI%20Tools`, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.records;
  } catch (error) {
    console.error('Error fetching AI tools:', error);
    return getMockAITools();
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.warn('Airtable credentials not configured, returning mock data');
    return getMockBlogPosts();
  }

  try {
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Blog%20Posts`, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.records;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return getMockBlogPosts();
  }
}

// Mock data for development
function getMockAITools(): AITool[] {
  return [
    {
      id: '1',
      fields: {
        'Tên công cụ (VI)': 'ChatGPT',
        'Tên công cụ (EN)': 'ChatGPT',
        'Mô tả ngắn gọn (VI)': 'AI chatbot thông minh cho tất cả các nhiệm vụ',
        'Mô tả ngắn gọn (EN)': 'Intelligent AI chatbot for all tasks',
        'Link Affiliate': 'https://chat.openai.com',
        'Danh mục': ['Trợ lý AI', 'Tạo Nội dung'],
        'Trạng thái giá': 'Miễn phí & Trả phí',
        'Phổ biến': true,
        'Logo công cụ': [{ id: '1', url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400', filename: 'chatgpt.jpg' }],
        'Rating (Sao)': 5,
        'Tag Độc quyền (VI)': ['#Tiết_kiệm_thời_gian', '#Dễ_sử_dụng'],
        'Tag Độc quyền (EN)': ['#TimeSaver', '#EasyToUse']
      }
    },
    {
      id: '2',
      fields: {
        'Tên công cụ (VI)': 'Midjourney',
        'Tên công cụ (EN)': 'Midjourney',
        'Mô tả ngắn gọn (VI)': 'Tạo hình ảnh AI tuyệt đẹp từ văn bản',
        'Mô tả ngắn gọn (EN)': 'Create stunning AI images from text',
        'Link Affiliate': 'https://midjourney.com',
        'Danh mục': ['Tạo Hình ảnh', 'Thiết kế & Đa phương tiện'],
        'Trạng thái giá': 'Trả phí',
        'Phổ biến': true,
        'Logo công cụ': [{ id: '2', url: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=400', filename: 'midjourney.jpg' }],
        'Rating (Sao)': 4,
        'Tag Độc quyền (VI)': ['#Chất_lượng_cao', '#Sáng_tạo'],
        'Tag Độc quyền (EN)': ['#HighQuality', '#Creative']
      }
    },
    {
      id: '3',
      fields: {
        'Tên công cụ (VI)': 'GitHub Copilot',
        'Tên công cụ (EN)': 'GitHub Copilot',
        'Mô tả ngắn gọn (VI)': 'Trợ lý lập trình AI thông minh',
        'Mô tả ngắn gọn (EN)': 'AI-powered coding assistant',
        'Link Affiliate': 'https://github.com/features/copilot',
        'Danh mục': ['Lập trình & Phát triển'],
        'Trạng thái giá': 'Có dùng thử',
        'Phổ biến': true,
        'Logo công cụ': [{ id: '3', url: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400', filename: 'copilot.jpg' }],
        'Rating (Sao)': 5,
        'Tag Độc quyền (VI)': ['#Lập_trình', '#Hiệu_quả'],
        'Tag Độc quyền (EN)': ['#Coding', '#Efficient']
      }
    },
    {
      id: '4',
      fields: {
        'Tên công cụ (VI)': 'Canva AI',
        'Tên công cụ (EN)': 'Canva AI',
        'Mô tả ngắn gọn (VI)': 'Thiết kế đồ họa AI dễ dàng',
        'Mô tả ngắn gọn (EN)': 'Easy AI graphic design',
        'Link Affiliate': 'https://canva.com',
        'Danh mục': ['Thiết kế & Đa phương tiện', 'Marketing & Bán hàng'],
        'Trạng thái giá': 'Miễn phí & Trả phí',
        'Phổ biến': true,
        'Logo công cụ': [{ id: '4', url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400', filename: 'canva.jpg' }],
        'Rating (Sao)': 4,
        'Tag Độc quyền (VI)': ['#Thiết_kế', '#Đơn_giản'],
        'Tag Độc quyền (EN)': ['#Design', '#Simple']
      }
    },
    {
      id: '5',
      fields: {
        'Tên công cụ (VI)': 'Notion AI',
        'Tên công cụ (EN)': 'Notion AI',
        'Mô tả ngắn gọn (VI)': 'Trợ lý viết và tổ chức thông minh',
        'Mô tả ngắn gọn (EN)': 'Smart writing and organization assistant',
        'Link Affiliate': 'https://notion.so',
        'Danh mục': ['Trợ lý AI', 'Tạo Nội dung'],
        'Trạng thái giá': 'Miễn phí & Trả phí',
        'Phổ biến': true,
        'Logo công cụ': [{ id: '5', url: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpg?auto=compress&cs=tinysrgb&w=400', filename: 'notion.jpg' }],
        'Rating (Sao)': 4,
        'Tag Độc quyền (VI)': ['#Tổ_chức', '#Hiệu_quả'],
        'Tag Độc quyền (EN)': ['#Organization', '#Productive']
      }
    },
    {
      id: '6',
      fields: {
        'Tên công cụ (VI)': 'Runway ML',
        'Tên công cụ (EN)': 'Runway ML',
        'Mô tả ngắn gọn (VI)': 'Tạo video AI chuyên nghiệp',
        'Mô tả ngắn gọn (EN)': 'Professional AI video creation',
        'Link Affiliate': 'https://runwayml.com',
        'Danh mục': ['Tạo Video & Âm thanh', 'Thiết kế & Đa phương tiện'],
        'Trạng thái giá': 'Có dùng thử',
        'Phổ biến': true,
        'Logo công cụ': [{ id: '6', url: 'https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=400', filename: 'runway.jpg' }],
        'Rating (Sao)': 5,
        'Tag Độc quyền (VI)': ['#Video_AI', '#Mới_ra_mắt'],
        'Tag Độc quyền (EN)': ['#AIVideo', '#NewRelease']
      }
    }
  ];
}

function getMockBlogPosts(): BlogPost[] {
  return [
    {
      id: '1',
      fields: {
        'Tiêu đề bài viết (VI)': 'Khám phá AI Tạo sinh: Cuộc cách mạng sáng tạo',
        'Tiêu đề bài viết (EN)': 'Exploring Generative AI: The Creative Revolution',
        'Slug (VI)': 'kham-pha-ai-tao-sinh-cuoc-cach-mang-sang-tao',
        'Slug (EN)': 'exploring-generative-ai-creative-revolution',
        'Nội dung (VI)': `
# Khám phá AI Tạo sinh: Cuộc cách mạng sáng tạo

AI tạo sinh đang thay đổi hoàn toàn cách chúng ta tiếp cận sáng tạo. Từ việc tạo ra những hình ảnh tuyệt đẹp đến việc viết nội dung chất lượng cao, AI tạo sinh đã mở ra một kỷ nguyên mới cho sự sáng tạo.

## Tại sao AI Tạo sinh lại quan trọng?

AI tạo sinh không chỉ là một công nghệ mới, mà còn là một công cụ mạnh mẽ giúp con người mở rộng khả năng sáng tạo của mình. Nó giúp:

- Tăng tốc độ sáng tạo
- Giảm chi phí sản xuất nội dung
- Mở ra những khả năng sáng tạo mới

## Các ứng dụng phổ biến

### 1. Tạo hình ảnh
Các công cụ như Midjourney, DALL-E, và Stable Diffusion đã chứng minh khả năng tạo ra những hình ảnh tuyệt đẹp chỉ từ mô tả văn bản.

### 2. Viết nội dung
ChatGPT, Claude, và các mô hình ngôn ngữ khác giúp tạo ra nội dung chất lượng cao cho blog, marketing, và nhiều mục đích khác.

### 3. Tạo video và âm thanh
Runway ML, Synthesia, và các công cụ khác đang cách mạng hóa việc tạo video và âm thanh.

## Tương lai của AI Tạo sinh

Tương lai của AI tạo sinh hứa hẹn sẽ còn thú vị hơn nữa. Chúng ta sẽ thấy:

- Chất lượng ngày càng cao
- Tốc độ xử lý nhanh hơn
- Khả năng tùy chỉnh cao hơn
- Tích hợp tốt hơn vào quy trình làm việc

AI tạo sinh không phải là để thay thế con người, mà là để tăng cường khả năng sáng tạo của chúng ta. Hãy bắt đầu khám phá ngay hôm nay!
        `,
        'Nội dung (EN)': `
# Exploring Generative AI: The Creative Revolution

Generative AI is completely transforming how we approach creativity. From creating stunning images to writing high-quality content, generative AI has opened up a new era for creativity.

## Why is Generative AI Important?

Generative AI is not just a new technology, but also a powerful tool that helps humans expand their creative capabilities. It helps:

- Accelerate creative processes
- Reduce content production costs
- Open up new creative possibilities

## Popular Applications

### 1. Image Generation
Tools like Midjourney, DALL-E, and Stable Diffusion have proven their ability to create stunning images from text descriptions.

### 2. Content Writing
ChatGPT, Claude, and other language models help create high-quality content for blogs, marketing, and many other purposes.

### 3. Video and Audio Creation
Runway ML, Synthesia, and other tools are revolutionizing video and audio creation.

## The Future of Generative AI

The future of generative AI promises to be even more exciting. We will see:

- Increasingly high quality
- Faster processing speeds
- Higher customization capabilities
- Better integration into workflows

Generative AI is not meant to replace humans, but to enhance our creative abilities. Start exploring today!
        `,
        'Ảnh Thumbnail': [{ id: '1', url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800', filename: 'ai-brain.jpg' }],
        'Ngày đăng': '2025-01-15',
        'Danh mục Blog': ['AI tạo sinh', 'Hướng dẫn'],
        'Mô tả Meta (VI)': 'Khám phá AI tạo sinh và tác động của nó đến sự sáng tạo. Tìm hiểu các ứng dụng, công cụ và xu hướng tương lai.',
        'Mô tả Meta (EN)': 'Explore generative AI and its impact on creativity. Learn about applications, tools and future trends.'
      }
    },
    {
      id: '2',
      fields: {
        'Tiêu đề bài viết (VI)': '10 Công cụ AI Marketing thay đổi cuộc chơi năm 2025',
        'Tiêu đề bài viết (EN)': '10 Game-Changing AI Marketing Tools for 2025',
        'Slug (VI)': '10-cong-cu-ai-marketing-thay-doi-cuoc-choi-2025',
        'Slug (EN)': '10-game-changing-ai-marketing-tools-2025',
        'Nội dung (VI)': `
# 10 Công cụ AI Marketing thay đổi cuộc chơi năm 2025

Marketing đang trải qua một cuộc cách mạng với sự xuất hiện của AI. Năm 2025, các công cụ AI marketing không chỉ giúp tối ưu hóa chiến lược mà còn tạo ra những trải nghiệm khách hàng hoàn toàn mới.

## Tại sao AI Marketing lại quan trọng?

AI marketing giúp doanh nghiệp:
- Cá nhân hóa trải nghiệm khách hàng
- Tối ưu hóa ROI cho các chiến dịch
- Tự động hóa các quy trình marketing
- Dự đoán hành vi khách hàng

## Top 10 Công cụ AI Marketing

### 1. HubSpot AI
Tích hợp AI vào toàn bộ quy trình marketing, từ tạo content đến phân tích khách hàng.

### 2. Jasper AI
Chuyên gia tạo nội dung marketing với khả năng hiểu sâu về thương hiệu.

### 3. Canva AI
Tạo thiết kế marketing chuyên nghiệp chỉ trong vài phút.

### 4. Mailchimp AI
Tối ưu hóa email marketing với AI dự đoán và cá nhân hóa.

### 5. Hootsuite Insights
Phân tích social media thông minh với AI.

### 6. Google Analytics Intelligence
Phân tích dữ liệu website với AI để tối ưu hóa chuyển đổi.

### 7. Salesforce Einstein
AI CRM giúp quản lý khách hàng hiệu quả.

### 8. Adobe Sensei
Tối ưu hóa creative và trải nghiệm khách hàng.

### 9. Drift AI
Chatbot AI cho customer service và lead generation.

### 10. Brandwatch AI
Phân tích sentiment và trends trên social media.

## Cách bắt đầu với AI Marketing

1. **Xác định mục tiêu**: Bạn muốn AI giúp gì?
2. **Chọn công cụ phù hợp**: Dựa trên ngân sách và nhu cầu
3. **Thử nghiệm nhỏ**: Bắt đầu với một dự án pilot
4. **Đo lường và tối ưu**: Theo dõi kết quả và cải thiện

## Lời khuyên cho tương lai

AI marketing không phải là xu hướng nhất thời mà là tương lai của ngành. Hãy bắt đầu học hỏi và áp dụng ngay hôm nay để không bị tụt hậu!
        `,
        'Nội dung (EN)': `
# 10 Game-Changing AI Marketing Tools for 2025

Marketing is undergoing a revolution with the emergence of AI. In 2025, AI marketing tools not only help optimize strategies but also create completely new customer experiences.

## Why is AI Marketing Important?

AI marketing helps businesses:
- Personalize customer experiences
- Optimize ROI for campaigns
- Automate marketing processes
- Predict customer behavior

## Top 10 AI Marketing Tools

### 1. HubSpot AI
Integrates AI into the entire marketing process, from content creation to customer analysis.

### 2. Jasper AI
Marketing content creation expert with deep brand understanding.

### 3. Canva AI
Create professional marketing designs in just minutes.

### 4. Mailchimp AI
Optimize email marketing with predictive AI and personalization.

### 5. Hootsuite Insights
Smart social media analytics with AI.

### 6. Google Analytics Intelligence
Website data analysis with AI to optimize conversions.

### 7. Salesforce Einstein
AI CRM for effective customer management.

### 8. Adobe Sensei
Optimize creative and customer experience.

### 9. Drift AI
AI chatbot for customer service and lead generation.

### 10. Brandwatch AI
Sentiment analysis and social media trends.

## How to Get Started with AI Marketing

1. **Define objectives**: What do you want AI to help with?
2. **Choose the right tools**: Based on budget and needs
3. **Small experiments**: Start with a pilot project
4. **Measure and optimize**: Track results and improve

## Advice for the Future

AI marketing is not a temporary trend but the future of the industry. Start learning and applying today to not fall behind!
        `,
        'Ảnh Thumbnail': [{ id: '2', url: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpg?auto=compress&cs=tinysrgb&w=800', filename: 'marketing-ai.jpg' }],
        'Ngày đăng': '2025-01-10',
        'Danh mục Blog': ['Marketing & Bán hàng', 'Ứng dụng AI'],
        'Mô tả Meta (VI)': 'Khám phá 10 công cụ AI marketing hàng đầu năm 2025. Tìm hiểu cách áp dụng AI để tối ưu hóa chiến lược marketing.',
        'Mô tả Meta (EN)': 'Discover the top 10 AI marketing tools for 2025. Learn how to apply AI to optimize your marketing strategy.'
      }
    }
  ];
}