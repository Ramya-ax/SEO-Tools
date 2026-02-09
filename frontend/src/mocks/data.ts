import type { ReportData } from "../types/index";

// Exact replica of sample.json transformed to frontend format
// Fix plan bullets formatted as: "What: ... Why: ... Where: ... How: ..."
export const MOCK_DATA: Record<string, ReportData> = {
    "overall-strategy": {
        id: "rep_001",
        type: "overall-strategy",
        generated_at: new Date().toISOString(),
        data: {
            goal: "Achieve a 200% increase in average monthly foot traffic, reaching 1500 people per month by December 2026, by securing top local organic rankings on Google through an optimized Google My Business profile and comprehensive local SEO strategies.",
            competitor_count: 6,
            seed_keywords: [
                {
                    keyword: "antique jewellery",
                    search_volume: 22200,
                    difficulty: 0,
                    intent: "Transactional"
                },
                {
                    keyword: "platinum jewellery",
                    search_volume: 18100,
                    difficulty: 4,
                    intent: "Transactional"
                }
            ],
            competitors_list: [
                "https://www.kalyanjewellers.net/",
                "https://www.sayarjewellerysaidapet.com/",
                "https://www.tarinika.in/",
                "https://www.bhimagold.com/",
                "https://www.efifdiamonds.com/",
                "https://konikajewellery.com/"
            ],
            competitor_analysis: [
                {
                    url: "https://www.kalyanjewellers.net/",
                    title: "Kalyan Jewellers - India's Trusted Online Jewellery Store | Buy Gold, Diamond, Platinum Jewellery",
                    meta_description: "Shop the latest collections of gold, diamond, and platinum jewellery online at Kalyan Jewellers. Explore exquisite designs for every occasion. Trusted since 1993.",
                    h1: [
                        "Buy Gold, Diamond & Platinum Jewellery Online",
                        "Discover Our Latest Collections"
                    ],
                    word_count: 95,
                    cta_links: 4,
                    schema_detected: true
                },
                {
                    url: "https://www.sayarjewellerysaidapet.com/",
                    title: "Sayar Jewellery Saidapet - Exquisite Gold & Diamond Jewellery in Chennai",
                    meta_description: "Discover Sayar Jewellery Saidapet, your trusted jeweller in Chennai for traditional gold, modern diamond, and bespoke jewellery designs. Visit us today!",
                    h1: [
                        "Sayar Jewellery Saidapet: Your Trusted Jeweller",
                        "Gold & Diamond Collections"
                    ],
                    word_count: 89,
                    cta_links: 3,
                    schema_detected: true
                },
                {
                    url: "https://www.tarinika.in/",
                    title: "Tarinika: Online Indian Jewellery Store | Shop Traditional & Fashion Jewellery",
                    meta_description: "Shop for exquisite Indian jewellery online at Tarinika. Explore traditional, temple, and fashion jewellery collections with unique designs. Worldwide shipping.",
                    h1: [
                        "Tarinika: Exquisite Indian Jewellery Online",
                        "Discover Your Sparkle"
                    ],
                    word_count: 92,
                    cta_links: 3,
                    schema_detected: true
                },
                {
                    url: "https://www.bhimagold.com/",
                    title: "Bhima Gold | Gold, Diamond & Platinum Jewellery Online",
                    meta_description: "One of India's most trusted jewellery brands. Explore and buy BIS Hallmarked gold, certified diamond, and platinum jewellery online from Bhima Gold.",
                    h1: [
                        "Bhima Gold: The Tradition of Trust",
                        "Finest Jewellery Since 1925"
                    ],
                    word_count: 97,
                    cta_links: 4,
                    schema_detected: true
                },
                {
                    url: "https://www.efifdiamonds.com/",
                    title: "Efif Diamonds - Lab Grown Diamond Jewellery Online | Certified Diamonds",
                    meta_description: "Shop ethical and sustainable lab grown diamond jewellery online at Efif Diamonds. Explore certified engagement rings, earrings, and pendants. Free shipping.",
                    h1: [
                        "Efif Diamonds: Lab Grown Diamond Jewellery",
                        "Ethical | Sustainable | Certified"
                    ],
                    word_count: 97,
                    cta_links: 3,
                    schema_detected: true
                },
                {
                    url: "https://konikajewellery.com/",
                    title: "Konika Jewellery - Gold & Diamond Jewellery in Kolkata",
                    meta_description: "Konika Jewellery offers beautiful gold, diamond, and precious gemstone jewellery in Kolkata. Explore our exclusive collections for all occasions.",
                    h1: [
                        "Konika Jewellery: Crafting Elegance",
                        "Gold & Diamond Collection"
                    ],
                    word_count: 90,
                    cta_links: 3,
                    schema_detected: true
                }
            ],
            gaps: [
                {
                    id: "gap_1",
                    type: "Content",
                    description: "Goutham Jewellers' homepage suffers from severe deficiencies across messaging, navigation, trust, and conversion when compared to leading competitors. It operates more like an informational brochure than a modern e-commerce hub designed to convert. Competitors prioritize immediate visual impact, clear user pathways, strong social proof, and direct conversion opportunities, all of which are significantly underdeveloped on Goutham's page.",
                    fix_plan: {
                        what: "Revamp the homepage into a conversion-focused e-commerce gateway with a strong hero section.",
                        why: "This is the single largest gap. Competitors use their homepages to immediately capture attention, articulate value, and funnel users to products. Goutham's current homepage design is an active barrier to conversion.",
                        where: "Entire homepage layout.",
                        how: "Design a modern e-commerce homepage featuring a large hero banner with a compelling visual, a strong headline (H1), and a clear 'Shop Now' CTA. Follow with sections for 'New Arrivals', 'Bestsellers', and visually appealing category blocks, each with direct links to collections. Integrate customer testimonials and trust badges prominently.",
                        priority: "High"
                    }
                },
                {
                    id: "gap_2",
                    type: "Trust",
                    description: "Goutham Jewellers' homepage suffers from severe deficiencies across messaging, navigation, trust, and conversion when compared to leading competitors. It operates more like an informational brochure than a modern e-commerce hub designed to convert. Competitors prioritize immediate visual impact, clear user pathways, strong social proof, and direct conversion opportunities, all of which are significantly underdeveloped on Goutham's page.",
                    fix_plan: {
                        what: "Develop and clearly link comprehensive 'About Us', 'Certifications', and 'Why Shop With Us' sections.",
                        why: "To close the EEAT gap, Goutham must explicitly present its expertise and trustworthiness. Competitors excel at this by detailing their history, quality standards, and unique selling points.",
                        where: "Dedicated pages, linked from header/footer, and summarized on the homepage.",
                        how: "Create an in-depth 'About Us' page detailing the company's four-decade history, craftsmanship, and values. Add a 'Certifications' page or section displaying BIS, GIA/IGI details. Summarize key trust points (e.g., '40+ Years of Heritage', 'Certified Quality', 'Bespoke Designs') in an easily digestible format on the homepage.",
                        priority: "High"
                    }
                },
                {
                    id: "gap_3",
                    type: "Conversion",
                    description: "Goutham Jewellers' homepage suffers from severe deficiencies across messaging, navigation, trust, and conversion when compared to leading competitors. It operates more like an informational brochure than a modern e-commerce hub designed to convert. Competitors prioritize immediate visual impact, clear user pathways, strong social proof, and direct conversion opportunities, all of which are significantly underdeveloped on Goutham's page.",
                    fix_plan: {
                        what: "Integrate advanced product filtering and browsing capabilities.",
                        why: "Competitors offer robust filtering (by price, material, style, occasion) to help users find specific items quickly. Goutham's current text-list approach is primitive.",
                        where: "Category pages, accessible from the homepage navigation.",
                        how: "Implement a robust filtering system on all collection pages, allowing users to narrow down selections by attributes like metal type, gemstone, price range, occasion, and design style.",
                        priority: "Medium"
                    }
                }
            ],
            clusters: [
                {
                    name: "Antique Jewellery Collections",
                    keywords: ["antique jewellery"],
                    intent: "Transactional"
                },
                {
                    name: "Platinum Jewellery Selection",
                    keywords: ["platinum jewellery"],
                    intent: "Transactional"
                }
            ],
            roadmap: [
                {
                    step_number: 1,
                    issue: "Content Dominance",
                    evidence: "Competitors like Kalyan Jewellers and Tarinika use their primary above-the-fold content to immediately state what they offer (e.g., 'Exquisite Gold & Diamond Collections', 'Crafting Timeless Jewellery') and current compelling offers with strong visual hierarchy in their hero sections, which Goutham lacks with its generic H1 and text-heavy brand statement. They also clearly define 'who' their product is for (e.g., bridal, everyday wear) more explicitly through targeted campaigns.",
                    priority: "High",
                    fix_plan_bullets: [
                        "What: Rewrite H1 to include core value proposition and specialization.\nWhy: Competitors like Kalyan Jewellers and Tarinika use their primary above-the-fold content to immediately state what they offer (e.g., 'Exquisite Gold & Diamond Collections', 'Crafting Timeless Jewellery'). A generic H1 misses this critical opportunity for immediate clarity and SEO relevance.\nWhere: H1\nHow: Change H1 from 'Goutham Jewellers' to 'Goutham Jewellers: Antique & Lab-Grown Diamond Jewellery | Heritage Since 1980' or similar, incorporating key specializations and legacy.",

                        "What: Rewrite Title Tag using a clear value proposition and product focus.\nWhy: The current title is 'Goutham Jewellers'. Competitors like Kalyan Jewellers and Tarinika clearly keyword front-load and include product categories in their titles (e.g., 'Kalyan Jewellers - India's Trusted Online Jewellery Store | Buy Gold, Diamond, Platinum Jewellery').\nWhere: Title Tag\nHow: Revise the title tag to 'Goutham Jewellers: Antique & Platinum Jewellery | Chennai's Trusted Jeweller Since 1980', highlighting key products and local relevance.",

                        "What: Rewrite Hero paragraph to clearly define 'what we do + who it is for + why trust'.\nWhy: Goutham's visible text includes a discount and a paragraph about heritage but lacks a concise, strong headline that articulates 'WHAT' is uniquely offered and 'WHY' it's superior. Competitors articulate benefits and offerings in their introductory paragraphs.\nWhere: Hero Paragraph\nHow: Craft a hero paragraph stating: 'Goutham Jewellers: Chennai's leading destination for exquisite antique jewellery and modern platinum designs, trusted by families and investors for over four decades. Discover unparalleled craftsmanship and certified quality for your cherished moments.'"
                    ],
                    keywords_to_use: ["antique jewellery", "platinum jewellery"],
                    where_to_use_keyword: {
                        "antique jewellery": "H1: exact match, Hero Paragraph: first 100 words",
                        "platinum jewellery": "Title Tag: start, Hero Paragraph: first 100 words"
                    }
                },
                {
                    step_number: 2,
                    issue: "Long-Tail Capture",
                    evidence: "The domain lacks structured content modules for specific long-tail informational queries, which competitors often use to capture users in earlier stages of their research.",
                    priority: "Medium",
                    fix_plan_bullets: [
                        "What: Develop a 'Jewellery Care & Maintenance' informational section.\nWhy: While Goutham's seed keywords are transactional, customers often research how to care for their valuable pieces. Providing this information builds trust and captures users seeking informational content related to their eventual purchase. This also helps establish topical authority.\nWhere: Create a new blog post or dedicated section linked from the footer.\nHow: Create a comprehensive guide on 'How to care for your antique and platinum jewellery'. Include subsections on cleaning, storage, and common issues. Focus on clear, concise language. This content will not directly use the transactional seed keywords but will support overall domain authority."
                    ],
                    keywords_to_use: ["antique jewellery"],
                    where_to_use_keyword: {
                        "antique jewellery": "Content mentioning 'antique jewellery care tips' in supporting text"
                    }
                },
                {
                    step_number: 3,
                    issue: "Audience & Region Alignment",
                    evidence: "Goutham's homepage lacks explicit regional modifiers and audience-specific language in prominent SEO elements (meta description, H1, hero), failing to directly engage its target local audience ('Families and gold investors' in 'Chennai').",
                    priority: "High",
                    fix_plan_bullets: [
                        "What: Insert regional modifiers into the Meta Description for local targeting.\nWhy: Competitors effectively use location in their meta descriptions and titles to attract local customers, which is crucial for achieving 'Top Local rankings'. Goutham's goal specifically mentions local rankings.\nWhere: Meta Description\nHow: Revise the meta description to prominently feature 'Chennai', e.g., 'Goutham Jewellers: Chennai's trusted destination for antique & platinum jewellery. Explore our exquisite collections for families and gold investors since 1980.'",

                        "What: Incorporate persona-specific language into section headings or descriptive blocks.\nWhy: To align with the target audience of 'Families and gold investors', the content needs to speak directly to their needs and motivations, which competitors implicitly do through their overall messaging and collections.\nWhere: Below the hero section, in introductory paragraphs to product categories or a 'Why Choose Us' section.\nHow: Add headings like 'Cherished Heirlooms for Your Family' or 'Invest in Timeless Platinum: A Legacy for Generations' for relevant sections on the homepage. While not directly using a seed keyword in the heading, the supporting text can feature terms like 'antique jewellery' and 'platinum jewellery'."
                    ],
                    keywords_to_use: ["antique jewellery", "platinum jewellery"],
                    where_to_use_keyword: {
                        "antique jewellery": "Meta Description",
                        "platinum jewellery": "Section headings: 'Invest in Timeless Platinum' supporting text"
                    }
                },
                {
                    step_number: 4,
                    issue: "Trust & EEAT Reinforcement",
                    evidence: "Goutham's current page lacks visible customer reviews, explicit industry certifications (e.g., BIS Hallmark for gold, GIA/IGI for diamonds), clear security badges, or easily accessible policy links, which are prominently displayed by competitors to build trust and authority.",
                    priority: "High",
                    fix_plan_bullets: [
                        "What: Integrate a customer testimonials and star ratings module.\nWhy: Competitors implicitly leverage social proof; the Domain Page Analysis explicitly identifies 'Absence of visible customer reviews, testimonials, or star ratings' as an issue. Customer reviews build trust and credibility.\nWhere: Homepage, immediately below the hero section or before the footer.\nHow: Implement a dedicated 'What Our Customers Say' section showcasing quotes and average star ratings (e.g., 4.8/5 based on 250+ reviews). (Add proof once verified internally).",

                        "What: Prominently display industry certifications and quality guarantees.\nWhy: Competitors like Kalyan Jewellers and Bhima Gold clearly show BIS Hallmark logos and explicit purity guarantees, which are non-negotiable trust signals in the jewellery industry. Efif Diamonds would show diamond certifications for lab-grown. The Domain Page Analysis found 'Lack of explicit industry certifications' as an issue.\nWhere: Above-the-fold, near the value proposition, and in the footer.\nHow: Add official logos for BIS Hallmark (if applicable for gold), and specify GIA/IGI certifications for lab-grown diamonds, accompanied by a brief explanation of what these certifications signify.",

                        "What: Relocate and enhance contact information visibility.\nWhy: The Domain Page Analysis notes 'Contact information is relegated to the footer, reducing its immediate visibility as a trust signal'. Competitors often feature contact details more prominently.\nWhere: Website header or a dedicated 'Contact Us' section visible above the fold.\nHow: Place the phone number and a 'Contact Us' link (leading to a dedicated contact page with a form and all details) in the website header. Ensure business hours are clearly stated."
                    ],
                    keywords_to_use: ["antique jewellery", "platinum jewellery"],
                    where_to_use_keyword: {
                        "antique jewellery": "Testimonial content related to 'antique jewellery selection', Contact Us page for 'antique jewellery inquiries'",
                        "platinum jewellery": "Description text next to 'platinum jewellery certification'"
                    }
                },
                {
                    step_number: 5,
                    issue: "Conversion Path Optimization",
                    evidence: "Goutham's page severely lacks clear, direct 'Shop Now' or 'Explore Collections' CTAs that immediately guide users into the product catalog, unlike competitors who use prominent, visually distinct buttons and banners to drive users to specific collections or sales events.",
                    priority: "High",
                    fix_plan_bullets: [
                        "What: Implement prominent, action-oriented 'Shop Now' CTAs for key product categories.\nWhy: Competitors utilize clear 'Shop Now' or 'Explore Collection' buttons within their hero sections and category blocks, providing an immediate and intuitive path for users to engage with products and redeem offers. The lack of these is a critical conversion barrier.\nWhere: Within the hero section and alongside each visual category block for 'antique jewellery' and 'platinum jewellery'.\nHow: Design distinct, high-contrast buttons (e.g., 'Shop Antique Jewellery', 'Shop Platinum Designs') that link directly to relevant collection pages. Ensure the '5% Off' offer is prominently linked to these pathways.",

                        "What: Highlight key conversion facilitators (e.g., free shipping, easy returns).\nWhy: Competitors reduce purchase friction by prominently displaying customer-centric benefits like 'Free Shipping', 'Easy Returns', and 'Secure Payments', which the Domain Page Analysis noted as missing. These alleviate purchase anxiety.\nWhere: Header banner, within the hero section, or a dedicated 'Why Shop With Us' section.\nHow: Add concise, visually appealing icons or text snippets (e.g., 'Free Shipping on All Orders', '10-Day Easy Returns') in a prominent area, like a top announcement bar or a feature section.",

                        "What: Display secure payment gateway logos and trust seals.\nWhy: Customers look for visual cues of security during online transactions. Competitors implicitly or explicitly show secure payment methods and security badges. This builds confidence at the point of conversion, identified as missing by the Domain Page Analysis.\nWhere: Footer and near conversion points (e.g., 'Shop Now' buttons).\nHow: Integrate logos of accepted payment methods and a visible SSL certificate or trusted security badge in the footer and potentially in a subtle banner above the fold."
                    ],
                    keywords_to_use: ["antique jewellery", "platinum jewellery"],
                    where_to_use_keyword: {
                        "antique jewellery": "Above fold: 'Shop Antique Jewellery' button, Below 'Shop Antique Jewellery' CTA",
                        "platinum jewellery": "Mid-page: 'Shop Platinum Designs' button, Footer next to payment options"
                    }
                },
                {
                    step_number: 6,
                    issue: "Internal Link Authority Flow",
                    evidence: "Goutham's page relies on plain text listing of categories, indicating an underdeveloped internal linking strategy that fails to efficiently distribute authority or guide users through a structured product discovery path compared to competitors.",
                    priority: "High",
                    fix_plan_bullets: [
                        "What: Implement a structured mega-menu for category navigation.\nWhy: The Domain Page Analysis notes 'Competitors universally provide organized navigation... that allows users to quickly find desired product categories or information, drastically reducing friction compared to Goutham's plain text list'. This is crucial for internal link authority and user experience.\nWhere: Website header, visible on all pages.\nHow: Design and implement a mega-menu that links to core collections like '/antique-jewellery' and '/platinum-jewellery', along with subcategories. Use descriptive anchor text for each link.",

                        "What: Establish clear internal linking from homepage to primary product pages.\nWhy: The homepage currently lacks strong, direct internal links to key product categories beyond a plain text list. Competitors use visual blocks and clear CTAs to link to their main product pages, passing authority.\nWhere: Below the hero section, using visual category blocks.\nHow: Create visual blocks for 'Shop Antique Jewellery' linking to `/antique-jewellery` and 'Explore Platinum Designs' linking to `/platinum-jewellery`. Ensure the anchor text is relevant to the target keyword."
                    ],
                    keywords_to_use: ["antique jewellery", "platinum jewellery"],
                    where_to_use_keyword: {
                        "antique jewellery": "Mega-menu link anchor text, Homepage visual block anchor text",
                        "platinum jewellery": "Mega-menu link anchor text, Homepage visual block anchor text"
                    }
                },
                {
                    step_number: 7,
                    issue: "Technical SEO + Schema",
                    evidence: "Goutham's page visibly lacks explicit schema markup that competitors utilize to enhance their SERP presence and clearly define their entity (Organization/LocalBusiness) and product offerings.",
                    priority: "High",
                    fix_plan_bullets: [
                        "What: Add Organization schema JSON-LD to the homepage.\nWhy: Competitors like Kalyan Jewellers and Bhima Gold utilize Organization schema to explicitly define their brand, improving entity understanding and potentially leading to rich results for brand queries. This is missing for Goutham.\nWhere: Within the <head> section of the homepage.\nHow: Implement Organization schema including 'url', 'name' ('Goutham Jewellers'), 'logo', and 'contactPoint' details, reflecting the business's identity.",

                        "What: Implement LocalBusiness schema JSON-LD.\nWhy: Given Goutham is a Chennai-based brand with a goal for 'Top Local rankings through GMB', LocalBusiness schema is critical for local SEO. Competitors like Sayar Jewellery Saidapet and Konika Jewellery use this schema.\nWhere: Within the <head> section of the homepage.\nHow: Add LocalBusiness schema including 'name', 'address', 'telephone', 'openingHours', and 'url', explicitly defining Goutham's physical presence and local services."
                    ],
                    keywords_to_use: ["antique jewellery", "platinum jewellery"],
                    where_to_use_keyword: {
                        "antique jewellery": "Schema name/description field (e.g., 'Goutham Jewellers offers exquisite antique jewellery')",
                        "platinum jewellery": "Schema name/description field (e.g., 'Visit our Chennai store for premium platinum jewellery')"
                    }
                },
                {
                    step_number: 8,
                    issue: "SERP Feature Domination",
                    evidence: "Goutham's content structure lacks specific FAQ blocks or short-answer blocks optimized for featured snippets and People Also Ask (PAA) boxes, missing opportunities to dominate SERP features.",
                    priority: "Medium",
                    fix_plan_bullets: [
                        "What: Develop an FAQ section on relevant category pages or a dedicated FAQ page.\nWhy: The Domain Page Analysis highlighted a 'Missing FAQ block'. Structuring content into Q&A format directly targets People Also Ask (PAA) and featured snippet opportunities, even if Goutham's seed keywords are transactional, related informational queries exist.\nWhere: New 'FAQ' section on product category pages (e.g., antique jewellery collection page) or a dedicated FAQ page.\nHow: Create an FAQ section with questions like 'What is antique jewellery?', 'How to authenticate antique jewellery?', 'What is the resale value of platinum jewellery?', and 'How to care for platinum jewellery?'. Provide concise, direct answers.",

                        "What: Create short definition paragraphs for key product types.\nWhy: Optimizing for short definitions can help capture featured snippets for 'what is X' type queries, even for transactional products like 'antique jewellery' and 'platinum jewellery'.\nWhere: Introduction section of respective category pages (e.g., /antique-jewellery).\nHow: Add a concise (40-60 words) paragraph defining 'antique jewellery' and 'platinum jewellery' immediately below the H1 on their respective category pages. E.g., 'Antique jewellery refers to pieces that are typically over 100 years old, carrying historical significance and unique craftsmanship. These treasures are often sought after for their intricate designs and rich heritage, offering a glimpse into past eras of artistry.'"
                    ],
                    keywords_to_use: ["antique jewellery", "platinum jewellery"],
                    where_to_use_keyword: {
                        "antique jewellery": "FAQ question 'What is antique jewellery?', Paragraph definition on /antique-jewellery page",
                        "platinum jewellery": "FAQ question 'How to care for platinum jewellery?', Paragraph definition on /platinum-jewellery page"
                    }
                }
            ]
        }
    },
    "product-analysis": {
        id: "rep_002",
        type: "product-analysis",
        generated_at: new Date().toISOString(),
        data: {
            "Verdict": {
                "status": "LOSING",
                "reason": "The Tulsi Silks Organza Sarees page is currently losing organic demand and conversions due to a generic H1 and a buried value proposition, failing to immediately engage users or differentiate the brand. Critically, it lacks visible product pricing, explicit CTAs (beyond implied clicks), and real-time stock indicators on the category page, which are standard for competitors. Furthermore, its 1-day return policy is highly uncompetitive, actively eroding customer trust and conversion potential. While basic filtering for color, design, and occasion is in place, the absence of advanced filtering (e.g., price range, specific work types, sorting options) and visible social proof (customer reviews/ratings) puts it at a significant disadvantage, hindering product discoverability and purchase confidence compared to best-in-class competitors.",
                "conversion_readiness_score": 40
            },
            "Seed_Keyword": [
                {
                    "keyword": "organza saree",
                    "keyword_source": "important_keyword",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 65,
                    "improvement_plan": "null"
                },
                {
                    "keyword": "organza silk saree",
                    "keyword_source": "important_keyword",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 60,
                    "improvement_plan": "null"
                },
                {
                    "keyword": "blouse designs for organza sarees",
                    "keyword_source": "important_keyword",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 55,
                    "improvement_plan": "null"
                },
                {
                    "keyword": "organza saree blouse",
                    "keyword_source": "important_keyword",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 58,
                    "improvement_plan": "null"
                },
                {
                    "keyword": "pink organza saree",
                    "keyword_source": "important_keyword",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 50,
                    "improvement_plan": "null"
                },
                {
                    "keyword": "floral organza saree",
                    "keyword_source": "important_keyword",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 52,
                    "improvement_plan": "null"
                },
                {
                    "keyword": "Organza sarees",
                    "keyword_source": "product",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 68,
                    "improvement_plan": "null"
                },
                {
                    "keyword": "kora organza sarees",
                    "keyword_source": "seed_keywords_dataforseo",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 60,
                    "improvement_plan": "Ensure 'kora organza sarees' is present in prominent H2 subheadings within the category description and is used as anchor text for internal links to kora-specific product sub-filters. Optimize product descriptions for kora organza sarees with exact match phrases."
                },
                {
                    "keyword": "organza silk sarees with embroidery price",
                    "keyword_source": "seed_keywords_dataforseo",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 70,
                    "improvement_plan": "Create dedicated product descriptions or a content block within the category page focusing on 'organza silk sarees with embroidery price', clearly displaying pricing and value proposition. Include in meta descriptions for relevant product listings."
                },
                {
                    "keyword": "white organza sarees online",
                    "keyword_source": "seed_keywords_dataforseo",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 65,
                    "improvement_plan": "Integrate 'white organza sarees online' into the title tags and meta descriptions for the white organza subcategory. Ensure a clear and prominent 'Shop White Organza Online' CTA is visible for this filter."
                },
                {
                    "keyword": "maroon organza saree",
                    "keyword_source": "seed_keywords_dataforseo",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 55,
                    "improvement_plan": "Include 'maroon organza saree' in relevant product descriptions and as anchor text for internal links pointing to specific maroon organza saree product pages. Use in image alt attributes."
                },
                {
                    "keyword": "organza black saree",
                    "keyword_source": "seed_keywords_dataforseo",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 55,
                    "improvement_plan": "Ensure 'organza black saree' is used in product titles and rich product descriptions for black organza sarees. Consider a dedicated collection banner or section highlighting black organza sarees."
                },
                {
                    "keyword": "organza saree for farewell",
                    "keyword_source": "seed_keywords_dataforseo",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 45,
                    "improvement_plan": "Develop a specific sub-category or landing page optimized for 'organza saree for farewell' to showcase suitable products, including this keyword in the H1 and prominent textual content."
                },
                {
                    "keyword": "organza blue saree",
                    "keyword_source": "seed_keywords_dataforseo",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 50,
                    "improvement_plan": "Optimize existing blue organza saree product page meta descriptions and H2s with 'organza blue saree'. Use in image alt texts for visual search ranking."
                },
                {
                    "keyword": "organza saree design",
                    "keyword_source": "seed_keywords_dataforseo",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 50,
                    "improvement_plan": "Integrate 'organza saree design' into blog content discussing trends, patterns, and styling tips linked from the category page. Use this keyword in image alt text and captions for visual search optimization."
                },
                {
                    "keyword": "banarasi kora organza silk sarees",
                    "keyword_source": "seed_keywords_dataforseo",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 75,
                    "improvement_plan": "Create a distinct, high-quality category page for 'banarasi kora organza silk sarees' with unique, rich content detailing craftsmanship. Ensure this keyword is in the H1, title tag, and first paragraph."
                },
                {
                    "keyword": "organza tissue saree",
                    "keyword_source": "seed_keywords_dataforseo",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 60,
                    "improvement_plan": "Clearly distinguish and optimize content for 'organza tissue saree' in product descriptions and possibly a dedicated filter option, highlighting its unique qualities in H2s and subheadings."
                },
                {
                    "keyword": "printed organza saree",
                    "keyword_source": "seed_keywords_dataforseo",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 50,
                    "improvement_plan": "Enhance image alt text, captions, and product descriptions for printed organza sarees using 'printed organza saree'. Ensure it's a prominent and easily accessible filter option for users."
                },
                {
                    "keyword": "soft organza sarees",
                    "keyword_source": "seed_keywords_dataforseo",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 48,
                    "improvement_plan": "Focus on content highlighting the 'soft' attribute of organza sarees in product descriptions, H2s, and feature bullet points. Incorporate 'soft organza sarees' in customer testimonials where applicable."
                },
                {
                    "keyword": "organza floral print sarees",
                    "keyword_source": "seed_keywords_dataforseo",
                    "search_volume": null,
                    "relevance_score": null,
                    "difficulty": 52,
                    "improvement_plan": "Optimize image alt text and product descriptions specifically for 'organza floral print sarees'. Ensure this is a filterable attribute and mentioned in any introductory content for floral designs."
                }
            ],
            "competetior": [
                "taneira.com",
                "prashantisarees.com",
                "koskii.com",
                "nalli.com",
                "hayagrivassilkhouse.com",
                "kanchivml.com"
            ],
            "competetior_Analyisis": [
                {
                    "competitor": "https://hafsaad.com/collections/designer-organza",
                    "scrape": {
                        "title": "Shop Designer Organza Sarees Online | Hafsaad",
                        "h1": "Designer Organza Sarees Collection",
                        "p_text": [
                            "Explore Hafsaad's exclusive collection of designer organza sarees, featuring intricate embroidery and contemporary prints. Each saree is crafted with precision, offering lightweight elegance and sophisticated charm. Discover our range with transparent pricing and customer reviews.",
                            "We offer 7-day hassle-free returns on all designer organza sarees. Shop now and experience the Hafsaad difference!"
                        ],
                        "word_count": 550,
                        "cta_links": [
                            {
                                "anchor_text": "Shop Now",
                                "href": "/shop"
                            },
                            {
                                "anchor_text": "View Details",
                                "href": "/product/xyz"
                            }
                        ],
                        "schema_ld_json": {
                            "@context": "https://schema.org",
                            "@type": "CollectionPage",
                            "name": "Designer Organza Sarees",
                            "description": "Shop exquisite designer organza sarees.",
                            "url": "https://hafsaad.com/collections/designer-organza"
                        }
                    }
                },
                {
                    "competitor": "https://orgenza.in/collections/organza-silk",
                    "scrape": {
                        "title": "Buy Organza Silk Sarees Online | Orgenza",
                        "h1": "Exquisite Organza Silk Sarees",
                        "p_text": [
                            "Immerse yourself in the timeless beauty of Orgenza's organza silk sarees. Our collection showcases a blend of traditional craftsmanship and modern aesthetics. Filter by price, occasion, or work type to find your perfect drape.",
                            "Benefit from our 10-day easy return policy and swift delivery. Customer reviews available on each product page."
                        ],
                        "word_count": 600,
                        "cta_links": [
                            {
                                "anchor_text": "Shop Organza Silks",
                                "href": "/shop"
                            },
                            {
                                "anchor_text": "Quick View",
                                "href": "/product/abc"
                            }
                        ],
                        "schema_ld_json": {
                            "@context": "https://schema.org",
                            "@type": "CollectionPage",
                            "name": "Organza Silk Sarees",
                            "description": "Buy exquisite organza silk sarees online.",
                            "url": "https://orgenza.in/collections/organza-silk"
                        }
                    }
                },
                {
                    "competitor": "https://www.banarasee.in/collections/organza-sarees",
                    "scrape": {
                        "title": "Banarasee Organza Sarees - Handloom & Silk Collection",
                        "h1": "Authentic Banarasee Organza Sarees",
                        "p_text": [
                            "Discover our authentic collection of Banarasee organza sarees, handloom woven with rich silk. Each saree is a testament to traditional artistry, perfect for weddings and festive occasions. See transparent pricing and verified customer ratings for every piece.",
                            "We pride ourselves on genuine craftsmanship and offer a 15-day return window. In stock items ship within 24 hours."
                        ],
                        "word_count": 680,
                        "cta_links": [
                            {
                                "anchor_text": "Explore Banarasee",
                                "href": "/collections/organza-sarees"
                            },
                            {
                                "anchor_text": "Buy Now",
                                "href": "/product/def"
                            }
                        ],
                        "schema_ld_json": {
                            "@context": "https://schema.org",
                            "@type": "CollectionPage",
                            "name": "Banarasee Organza Sarees",
                            "description": "Authentic Banarasee Organza Sarees.",
                            "url": "https://www.banarasee.in/collections/organza-sarees"
                        }
                    }
                },
                {
                    "competitor": "https://kankatala.com/collections/organza",
                    "scrape": {
                        "title": "Kankatala Organza Collection - Shop Online",
                        "h1": "The Kankatala Organza Edit",
                        "p_text": [
                            "Step into a world of sheer elegance with Kankatala's exquisite organza saree collection. Curated for discerning tastes, our sarees feature delicate textures and captivating designs. Easily filter by price, weave, and latest arrivals.",
                            "Enjoy free shipping on all orders over INR 10,000 and a customer-friendly 7-day return policy. Check product availability directly on each listing."
                        ],
                        "word_count": 720,
                        "cta_links": [
                            {
                                "anchor_text": "Shop Organza",
                                "href": "/shop"
                            },
                            {
                                "anchor_text": "View All",
                                "href": "/collections/organza"
                            }
                        ],
                        "schema_ld_json": {
                            "@context": "https://schema.org",
                            "@type": "CollectionPage",
                            "name": "Kankatala Organza Collection",
                            "description": "Kankatala Organza Collection - Shop Online.",
                            "url": "https://kankatala.com/collections/organza"
                        }
                    }
                },
                {
                    "competitor": "https://www.taneira.com/shop/organza-sarees",
                    "scrape": {
                        "title": "Shop Premium Organza Sarees | Taneira",
                        "h1": "Taneira Organza Sarees: Elegance Redefined",
                        "p_text": [
                            "Explore Taneira's exclusive collection of organza sarees, meticulously crafted for modern women. Experience lightweight luxury with intricate designs and vibrant colors. Our handpicked selection ensures quality and authenticity. Read customer reviews and find your perfect saree today. Enjoy hassle-free returns and fast shipping across India."
                        ],
                        "word_count": 650,
                        "cta_links": [
                            {
                                "anchor_text": "Shop New Arrivals",
                                "href": "https://www.taneira.com/shop/organza-sarees?filter=new"
                            },
                            {
                                "anchor_text": "View All Organza",
                                "href": "https://www.taneira.com/shop/organza-sarees"
                            }
                        ],
                        "schema_ld_json": {
                            "@context": "https://schema.org",
                            "@type": "CollectionPage",
                            "name": "Organza Sarees",
                            "description": "Shop Premium Organza Sarees by Taneira.",
                            "url": "https://www.taneira.com/shop/organza-sarees"
                        }
                    }
                },
                {
                    "competitor": "https://www.nalli.com/collections/organza-sarees",
                    "scrape": {
                        "title": "Organza Sarees Online | Buy Latest Collection - Nalli",
                        "h1": "Nalli's Exquisite Organza Sarees",
                        "p_text": [
                            "Nalli brings you a captivating range of organza sarees, perfect for any occasion. From subtle pastels to rich, festive hues, our collection is designed to impress. Discover sarees with embroidery, prints, and unique weaves. View prices, check stock, and read customer ratings before you buy.",
                            "With over 90 years of trust, Nalli offers a 14-day return policy and secure worldwide shipping."
                        ],
                        "word_count": 700,
                        "cta_links": [
                            {
                                "anchor_text": "Buy Organza",
                                "href": "/shop"
                            },
                            {
                                "anchor_text": "Discover Collection",
                                "href": "/collections/organza-sarees"
                            }
                        ],
                        "schema_ld_json": {
                            "@context": "https://schema.org",
                            "@type": "CollectionPage",
                            "name": "Organza Sarees Online",
                            "description": "Buy Latest Organza Saree Collection from Nalli.",
                            "url": "https://www.nalli.com/collections/organza-sarees"
                        }
                    }
                }
            ],
            "competetor_gap": [
                {
                    "gap_type": "Visible Pricing",
                    "domain_evidence": "No visible pricing for individual sarees in the main product grid/listings (only present in schema).",
                    "competitor_evidence": "Competitors (e.g., Hafsaad, Orgenza, Banarasee, Kankatala, Taneira, Nalli) universally display product prices directly on the category page.",
                    "fix_plan": [
                        {
                            "what": "Implement clear pricing, stock, and CTA elements on product cards.",
                            "why": "This is a fundamental e-commerce best practice universally adopted by competitors to reduce friction and enable faster purchasing decisions. Its absence is a significant conversion blocker.",
                            "where": "Within each product listing on the Organza Sarees category page.",
                            "how": "For each saree, display the price (and sale price if applicable), 'In Stock'/'Low Stock' status, and a 'View Product' button. Consider a 'Quick View' option.",
                            "priority": "high"
                        }
                    ]
                },
                {
                    "gap_type": "Customer Reviews/Ratings",
                    "domain_evidence": "Lack of visible customer reviews or star ratings for individual products on the category page.",
                    "competitor_evidence": "Competitors like Taneira and Nalli prominently feature star ratings and review counts on category pages, building immediate social proof and trust.",
                    "fix_plan": [
                        {
                            "what": "Integrate a robust customer review and rating system.",
                            "why": "Customer reviews are critical for building social proof and trust, especially for apparel. Competitors widely use them to differentiate and build confidence.",
                            "where": "Below each product title/image, and aggregate ratings for the category page itself.",
                            "how": "Implement a system to collect and display star ratings and customer reviews prominently for all products. Highlight the total number of reviews for the category.",
                            "priority": "high"
                        }
                    ]
                },
                {
                    "gap_type": "Advanced Filtering & Sorting",
                    "domain_evidence": "Absence of advanced sorting options beyond implicit order and limited filtering to basic color, occasion, material, and design.",
                    "competitor_evidence": "Competitors offer granular filters (e.g., price range, specific embellishments like 'zari' vs. 'embroidery', fabric blends) and sorting options (price, popularity, new arrivals) for better product discovery.",
                    "fix_plan": [
                        {
                            "what": "Expand and enhance filtering and sorting options.",
                            "why": "Users need granular control over product discovery. Competitors provide these advanced features to cater to diverse customer needs and reduce search time.",
                            "where": "Sidebar and above the product grid.",
                            "how": "Add filters for 'Price Range', 'Work Type' (e.g., Zari, Embroidery), 'Occasion' (e.g., Wedding, Party), and 'Fabric Blend'. Implement sorting by 'Price', 'Newest', and 'Popularity'.",
                            "priority": "high"
                        }
                    ]
                },
                {
                    "gap_type": "Competitive Return Policy",
                    "domain_evidence": "The return policy specified in schema (1-day return window) is extremely short and uncompetitive.",
                    "competitor_evidence": "The 1-day return policy in Tulsi Silks' schema is drastically inferior to the 7-15 day (or more) return policies typically offered by competitors, which directly impacts customer confidence and willingness to purchase.",
                    "fix_plan": [
                        {
                            "what": "Revise and clearly communicate an industry-standard return policy.",
                            "why": "The current 1-day return window is actively harming trust and conversion by being uncompetitive and inconvenient. Competitors offer more consumer-friendly policies (7-15 days).",
                            "where": "Prominently displayed banner, dedicated policy page, and updated schema.",
                            "how": "Extend the return period to at least 7-15 days and clearly state 'Hassle-Free Returns' or similar, making it a visible trust signal rather than a hidden deterrent. Update all instances, including schema.",
                            "priority": "high"
                        }
                    ]
                },
                {
                    "gap_type": "Prominent Value Proposition/H1",
                    "domain_evidence": "H1 'Organza Sarees' is generic and lacks specific benefit or unique selling proposition. Value proposition ('comfort, movement, modern aesthetics') is present in paragraph form, lacking immediate visual impact.",
                    "competitor_evidence": "Competitors use more specific, benefit-driven H1s and visually distinct value propositions above the fold.",
                    "fix_plan": [
                        {
                            "what": "Strengthen the H1 and visible value proposition.",
                            "why": "A generic H1 and buried value proposition fail to immediately engage and differentiate. Competitors use strong, benefit-rich statements to capture attention.",
                            "where": "H1 tag and a dedicated section above the product grid.",
                            "how": "Craft a unique, benefit-driven H1 (e.g., 'Discover Handcrafted Organza Sarees for Timeless Elegance'). Add a concise, visually prominent statement outlining Tulsi Silks' unique selling points for Organza Sarees.",
                            "priority": "high"
                        }
                    ]
                }
            ],
            "Keyword_Cluster": [
                {
                    "cluster_name": "Core Organza & Material Types",
                    "keywords": [
                        "organza saree",
                        "Organza sarees",
                        "organza silk saree",
                        "soft organza sarees",
                        "organza tissue saree"
                    ],
                    "tag": "Core & Material Types"
                },
                {
                    "cluster_name": "Color Specific Organza",
                    "keywords": [
                        "pink organza saree",
                        "white organza sarees online",
                        "maroon organza saree",
                        "organza black saree",
                        "organza blue saree"
                    ],
                    "tag": "Color Variants"
                },
                {
                    "cluster_name": "Design & Workmanship",
                    "keywords": [
                        "floral organza saree",
                        "organza floral print sarees",
                        "printed organza saree",
                        "kora organza sarees",
                        "banarasi kora organza silk sarees",
                        "organza silk sarees with embroidery price"
                    ],
                    "tag": "Design & Workmanship"
                },
                {
                    "cluster_name": "Styling & Occasion",
                    "keywords": [
                        "blouse designs for organza sarees",
                        "organza saree blouse",
                        "organza saree for farewell",
                        "organza saree design"
                    ],
                    "tag": "Styling & Occasion"
                }
            ],
            "Stragery": {
                "steps": [
                    {
                        "step_name": "Content Dominance for High-Value Keywords",
                        "competitor_issue": "Competitors use specific, benefit-driven H1s and value propositions to immediately engage users, while the target page uses a generic H1 and buries its value proposition in body text.",
                        "evidence_from_scrape": {
                            "target_page": "H1: ['Organza Sarees'], Value proposition ('comfort, movement, modern aesthetics') is present in paragraph form, lacking immediate visual impact.",
                            "competitor_pages": "Hafsaad: 'Designer Organza Sarees Collection', Orgenza: 'Exquisite Organza Silk Sarees', Taneira: 'Taneira Organza Sarees: Elegance Redefined'."
                        },
                        "fix_plan": [
                            {
                                "page_action": "Existing Page Upgrade",
                                "page_url": "https://tulsisilks.co.in/category/organza-sarees",
                                "what": "Revise the H1 and prominently feature a concise value proposition statement above the fold.",
                                "why": "A generic H1 fails to capture user intent and differentiate the brand. Competitors leverage descriptive H1s and clear value propositions to improve user engagement and SEO. Elevating the value proposition will immediately communicate uniqueness.",
                                "where": "H1 tag and a dedicated, visually prominent section directly below the main navigation or header banner.",
                                "how": "Change the H1 to 'Exquisite Organza Sarees: Graceful Drapes by Tulsi Silks'. Add a clear, concise tagline/banner below it like 'Experience Tulsi Silks Organza: Comfort, Movement, Modern Aesthetics'.",
                                "priority": "high",
                                "primary_keyword": "organza saree",
                                "secondary_keywords": [
                                    "Organza sarees",
                                    "organza silk saree",
                                    "soft organza sarees"
                                ],
                                "where_to_use_keyword": {
                                    "organza saree": "Revised H1: 'Exquisite Organza Sarees: Graceful Drapes by Tulsi Silks' (as a plural for category).",
                                    "Organza sarees": "In a prominent value proposition statement above the fold.",
                                    "organza silk saree": "Within the introductory paragraph, describing the material's premium quality.",
                                    "soft organza sarees": "In a benefit-driven statement about comfort and drape."
                                },
                                "cta": null,
                                "internal_linking": null,
                                "schema_type": null
                            }
                        ]
                    },
                    {
                        "step_name": "Long-Tail Keyword Capture with Specificity",
                        "competitor_issue": "The target page lacks specific content and landing pages for important long-tail keywords that competitors might implicitly capture through extensive product descriptions or dedicated collections.",
                        "evidence_from_scrape": {
                            "target_page": "Existing filters are by color, occasion, material, design, but no explicit pages or sections for specific long-tail queries like 'organza saree for farewell'.",
                            "competitor_pages": "Competitors often have richer textual content on category pages and might implicitly cover more long-tail queries through product descriptions and filter results."
                        },
                        "fix_plan": [
                            {
                                "page_action": "New Page",
                                "page_url": "https://tulsisilks.co.in/category/organza-sarees-for-farewell",
                                "what": "Create a dedicated sub-category page for 'organza saree for farewell'.",
                                "why": "Capturing high-intent, specific long-tail keywords directly addresses user needs and reduces bounce rates. This improves SEO visibility for a niche but valuable segment, driving targeted traffic that converts at a higher rate.",
                                "where": "New category page URL and linked from the main Organza Sarees page under 'Occasion' filter.",
                                "how": "Develop a new page with 'Organza Saree for Farewell' as the H1, a compelling meta description, and introductory paragraph content. Curate suitable products on this page and include relevant styling tips.",
                                "priority": "high",
                                "primary_keyword": "organza saree for farewell",
                                "secondary_keywords": [
                                    "blouse designs for organza sarees",
                                    "organza saree blouse",
                                    "organza saree design"
                                ],
                                "where_to_use_keyword": {
                                    "organza saree for farewell": "H1, title tag, meta description, and introductory paragraph.",
                                    "blouse designs for organza sarees": "In a sub-section suggesting pairing options or a linked blog post.",
                                    "organza saree blouse": "In image captions for product images on the page.",
                                    "organza saree design": "Within product descriptions, highlighting specific design elements suitable for farewells."
                                },
                                "cta": "Shop Farewell Organza Sarees",
                                "internal_linking": {
                                    "from_page": "https://tulsisilks.co.in/category/organza-sarees",
                                    "to_page": "https://tulsisilks.co.in/category/organza-sarees-for-farewell",
                                    "anchor_text": "Organza Sarees for Farewell"
                                },
                                "schema_type": [
                                    "CollectionPage"
                                ]
                            }
                        ]
                    },
                    {
                        "step_name": "Audience & Region Alignment",
                        "competitor_issue": "The page's value proposition and content are broad, not specifically tailored to the nuances of 'Women both in India and US' or to high-intent regional keywords like 'banarasi kora organza silk sarees'.",
                        "evidence_from_scrape": {
                            "target_page": "The descriptive text is general, mentioning 'celebrations, gatherings and stylish everyday moments' without specific regional or audience-centric messaging. 'Free domestic shipping on orders above INR 25,000. International shipping available.'",
                            "competitor_pages": "Competitors like Banarasee specifically highlight 'Handloom & Silk Collection' and 'authentic' weaves, targeting a specific audience appreciative of traditional craftsmanship."
                        },
                        "fix_plan": [
                            {
                                "page_action": "Existing Page Upgrade",
                                "page_url": "https://tulsisilks.co.in/category/organza-sarees",
                                "what": "Enhance the introductory content and H2s with specific language appealing to both Indian and US audiences, highlighting craftsmanship and occasions. Introduce targeted content for 'banarasi kora organza silk sarees'.",
                                "why": "Tailoring content to specific regional and audience preferences (e.g., appreciation for Banarasi weaves in India, modern elegance in the US) increases relevance and engagement, boosting conversions from diverse customer segments. This also supports high-intent keywords.",
                                "where": "Introductory paragraphs and new H2 sections within the category page content, potentially leading to specific sub-category pages.",
                                "how": "Add an H2: 'Discover the Allure of Banarasi Kora Organza Silks'. Revise the main descriptive text to explicitly mention appeal to 'Indian heritage enthusiasts' and 'global fashion connoisseurs' seeking 'timeless elegance for celebrations in India and the US'.",
                                "priority": "medium",
                                "primary_keyword": "banarasi kora organza silk sarees",
                                "secondary_keywords": [
                                    "kora organza sarees",
                                    "organza silk saree",
                                    "Organza sarees"
                                ],
                                "where_to_use_keyword": {
                                    "banarasi kora organza silk sarees": "As a new H2 heading and in a dedicated paragraph explaining craftsmanship.",
                                    "kora organza sarees": "In the paragraph describing traditional weaves.",
                                    "organza silk saree": "Emphasizing the material quality for the international audience.",
                                    "Organza sarees": "Ensuring broad appeal while introducing specific sub-segments."
                                },
                                "cta": null,
                                "internal_linking": {
                                    "from_page": "https://tulsisilks.co.in/category/organza-sarees",
                                    "to_page": "https://tulsisilks.co.in/category/banarasi-kora-organza-silk-sarees",
                                    "anchor_text": "Explore Banarasi Kora Organza Silks"
                                },
                                "schema_type": null
                            }
                        ]
                    },
                    {
                        "step_name": "Trust & EEAT Reinforcement",
                        "competitor_issue": "The target page severely lacks visible trust signals, notably customer reviews and competitive return policies, which are critical for high-value apparel purchases. The 1-day return policy in schema actively erodes trust.",
                        "evidence_from_scrape": {
                            "target_page": "No visible customer reviews or ratings. Return policy specified in schema (1-day return window). No explicit quality certifications or 'About Us' snippets on the page content.",
                            "competitor_pages": "Taneira & Nalli prominently feature ratings/reviews. Competitors offer 7-15 day returns. Many brands highlight quality marks or heritage."
                        },
                        "fix_plan": [
                            {
                                "page_action": "Existing Page Upgrade",
                                "page_url": "https://tulsisilks.co.in/category/organza-sarees",
                                "what": "Integrate visible customer review summaries/ratings on product listings and revise the return policy to be competitive and prominently displayed.",
                                "why": "Social proof (reviews) and a fair return policy are paramount for building trust and reducing purchase anxiety in e-commerce, directly impacting conversion rates. The current policy is a significant detractor.",
                                "where": "Below each product image on the category grid (for star ratings) and a prominent banner/footer element for the return policy.",
                                "how": "Display average star ratings (e.g., '4.5/5 stars (120 reviews)') beneath each product title. Implement a site-wide return policy of at least 7-15 days, clearly visible via a banner (e.g., 'Hassle-Free 10-Day Returns') and update product schema.",
                                "priority": "high",
                                "primary_keyword": "organza saree",
                                "secondary_keywords": [
                                    "Organza sarees",
                                    "organza silk saree"
                                ],
                                "where_to_use_keyword": {
                                    "organza saree": "In the context of customer testimonials, e.g., 'Customers love our organza sarees for their elegance and quality'.",
                                    "Organza sarees": "Within the revised return policy banner or FAQ section, explaining policy applies to all 'Organza Sarees'.",
                                    "organza silk saree": "Referring to high-quality products receiving good reviews."
                                },
                                "cta": null,
                                "internal_linking": {
                                    "from_page": "https://tulsisilks.co.in/category/organza-sarees",
                                    "to_page": "https://tulsisilks.co.in/returns-policy",
                                    "anchor_text": "Hassle-Free Returns Policy"
                                },
                                "schema_type": [
                                    "Review",
                                    "AggregateRating"
                                ]
                            }
                        ]
                    },
                    {
                        "step_name": "Conversion Path Optimization",
                        "competitor_issue": "The target page lacks visible pricing, clear CTAs, and stock information for individual products on the category page, creating friction and deterring immediate purchase decisions.",
                        "evidence_from_scrape": {
                            "target_page": "No visible pricing for products (only in schema). No explicit 'View Product' or 'Quick Shop' CTAs. No visible stock indicators. 'Free domestic shipping on orders above INR 25,000' is a high threshold.",
                            "competitor_pages": "Competitors universally display pricing, stock status, and clear CTAs ('Shop Now', 'Quick View') on product cards. Kankatala offers free shipping over INR 10,000."
                        },
                        "fix_plan": [
                            {
                                "page_action": "Existing Page Upgrade",
                                "page_url": "https://tulsisilks.co.in/category/organza-sarees",
                                "what": "Implement visible pricing, stock indicators, and explicit 'View Product' or 'Add to Cart' CTAs on each product card. Review and adjust shipping thresholds or offers.",
                                "why": "Eliminating friction points like hidden pricing and unclear next steps is crucial for conversion. Clear visibility of price and availability empowers users to make faster decisions. Competitive shipping incentives reduce cart abandonment.",
                                "where": "Within each product listing on the Organza Sarees category page (below image/title) and a site-wide banner for shipping info.",
                                "how": "For every saree, display 'INR [Price]' (with strike-through for sale prices if applicable). Add an 'In Stock'/'Low Stock' badge. Implement a clear 'View Product' button. Consider reducing the free shipping threshold to INR 10,000-15,000 or offering flat-rate shipping.",
                                "priority": "high",
                                "primary_keyword": "organza silk sarees with embroidery price",
                                "secondary_keywords": [
                                    "organza saree",
                                    "white organza sarees online",
                                    "printed organza saree"
                                ],
                                "where_to_use_keyword": {
                                    "organza silk sarees with embroidery price": "When displaying price for embroidered items, ensure 'price' is a key visual component on the product card.",
                                    "organza saree": "Generic product card pricing for all sarees.",
                                    "white organza sarees online": "Visible price next to 'white organza sarees' product listings.",
                                    "printed organza saree": "Price visibility for all 'printed organza sarees' displayed on the page."
                                },
                                "cta": "View Product",
                                "internal_linking": null,
                                "schema_type": null
                            }
                        ]
                    },
                    {
                        "step_name": "Internal Link Authority Flow",
                        "competitor_issue": "While internal links exist for filtering, the strategy for distributing authority and relevance to crucial sub-categories and product attributes (e.g., kora organza) seems implicit rather than explicit or optimized.",
                        "evidence_from_scrape": {
                            "target_page": "Numerous internal links exist to sub-categories (e.g., /category/silk-organza-sarees, /category/kora-organza-sarees, /category/embroidered-organza-sarees) and individual products.",
                            "competitor_pages": "Competitors generally have well-structured internal linking, often using descriptive anchor text in main navigation and body content for important sub-categories."
                        },
                        "fix_plan": [
                            {
                                "page_action": "Existing Page Upgrade",
                                "page_url": "https://tulsisilks.co.in/category/organza-sarees",
                                "what": "Optimize internal linking from the main Organza Sarees page to key sub-categories and product attributes using keyword-rich anchor text within descriptive content.",
                                "why": "Strategic internal linking passes link equity, improves discoverability of important sub-pages (e.g., Kora Organza, Printed Organza), and signals relevance to search engines. This helps rank for more specific, high-intent keywords.",
                                "where": "Within the main descriptive text blocks and any 'Explore By' sections on the Organza Sarees category page.",
                                "how": "Identify key phrases like 'kora organza sarees', 'printed organza saree', and 'organza silk sarees with embroidery price' within the existing descriptive content and link them to their respective sub-category pages or filter results using these exact keywords as anchor text.",
                                "priority": "medium",
                                "primary_keyword": "kora organza sarees",
                                "secondary_keywords": [
                                    "printed organza saree",
                                    "organza silk sarees with embroidery price",
                                    "banarasi kora organza silk sarees"
                                ],
                                "where_to_use_keyword": {
                                    "kora organza sarees": "In the paragraph discussing fabric types, as an internal link to the Kora Organza sub-category.",
                                    "printed organza saree": "In the section detailing design types, linking to the Printed Organza sub-category.",
                                    "organza silk sarees with embroidery price": "In content discussing high-end collections, linking to embroidered silk organza selections.",
                                    "banarasi kora organza silk sarees": "As a prominent internal link within text introducing premium weaves."
                                },
                                "cta": null,
                                "internal_linking": {
                                    "from_page": "https://tulsisilks.co.in/category/organza-sarees",
                                    "to_page": "http://tulsisilks.co.in/category/kora-organza-sarees",
                                    "anchor_text": "kora organza sarees"
                                },
                                "schema_type": null
                            }
                        ]
                    },
                    {
                        "step_name": "Technical SEO + Schema Enhancement",
                        "competitor_issue": "While basic Product and FAQ schema are present, there's a missed opportunity to fully optimize existing schema for comprehensive product details and to leverage additional schema types for better SERP visibility.",
                        "evidence_from_scrape": {
                            "target_page": "Schema includes FAQPage, Organization, WebSite, BreadcrumbList, and ItemList with basic Product info (name, image, description, price, availability, returnPolicy). Product descriptions are sometimes empty in schema for specific products.",
                            "competitor_pages": "Competitors often have detailed schema with consistent data, sometimes including review snippets, ratings, or more robust 'Product' properties."
                        },
                        "fix_plan": [
                            {
                                "page_action": "Existing Page Upgrade",
                                "page_url": "https://tulsisilks.co.in/category/organza-sarees",
                                "what": "Audit and enrich existing Product schema for all listed items, ensuring complete descriptions and adding 'reviews' and 'aggregateRating' properties. Implement additional schema where beneficial.",
                                "why": "Comprehensive and accurate schema enhances rich snippet eligibility, improving CTR from SERPs, and provides direct information to search engines for better understanding of product offerings. Filling missing descriptions and adding review data makes product listings more appealing.",
                                "where": "Schema.org markup within the HTML of the category page.",
                                "how": "For each product within the ItemList, ensure the 'description' field is populated. Add 'aggregateRating' and 'review' properties to each product, pulling data from the new review system. Investigate implementing 'ImageObject' schema for individual product images to boost visual search domination.",
                                "priority": "high",
                                "primary_keyword": "organza floral print sarees",
                                "secondary_keywords": [
                                    "organza saree design",
                                    "organza black saree",
                                    "organza tissue saree"
                                ],
                                "where_to_use_keyword": {
                                    "organza floral print sarees": "Ensure 'description' field in schema for relevant products explicitly mentions 'organza floral print sarees'.",
                                    "organza saree design": "Used in general schema descriptions for the category, or in blog post schema linked from here.",
                                    "organza black saree": "Populate specific product schema descriptions with 'organza black saree' details.",
                                    "organza tissue saree": "Ensure product schema description clearly defines 'organza tissue saree'."
                                },
                                "cta": null,
                                "internal_linking": null,
                                "schema_type": [
                                    "Product",
                                    "ImageObject",
                                    "AggregateRating",
                                    "Review"
                                ]
                            }
                        ]
                    },
                    {
                        "step_name": "SERP Feature Domination",
                        "competitor_issue": "The target page is not explicitly optimized to dominate visual search results or capture diverse SERP features for high-intent keywords, missing opportunities to increase visibility and click-through rates.",
                        "evidence_from_scrape": {
                            "target_page": "75 images on the page, but no explicit strategy for image SEO beyond standard product images. FAQ schema is present but no specific focus on other SERP features. 'organza saree photos' and 'organza saree photo' rank low (45, 48).",
                            "competitor_pages": "Competitors likely have well-optimized product imagery and might leverage various rich snippets."
                        },
                        "fix_plan": [
                            {
                                "page_action": "Existing Page Upgrade",
                                "page_url": "https://tulsisilks.co.in/category/organza-sarees",
                                "what": "Optimize all product images and lifestyle shots for visual search and rich snippets by implementing descriptive alt text and captions. Develop content targeting 'organza saree look for wedding' in image-heavy formats.",
                                "why": "Dominating visual search directly supports the business goal by increasing visibility for users actively browsing product images. Rich alt text and captions improve relevance for visual search engines and can contribute to image pack or shopping carousel features.",
                                "where": "All product image alt attributes and surrounding caption text on the category page and individual product pages.",
                                "how": "Update alt text for all 75 images to be highly descriptive, incorporating keywords like 'floral organza saree', 'pink organza saree', 'embroidered organza sarees', and 'organza saree photos'. Ensure these images are included in `ImageObject` schema. Create an image gallery or 'Lookbook' section within the category, optimized with these keywords.",
                                "priority": "high",
                                "primary_keyword": "floral organza saree",
                                "secondary_keywords": [
                                    "organza floral print sarees",
                                    "pink organza saree",
                                    "organza saree photos",
                                    "organza saree design"
                                ],
                                "where_to_use_keyword": {
                                    "floral organza saree": "In alt text for images depicting floral patterns, and in product descriptions.",
                                    "organza floral print sarees": "As alt text for product images featuring floral prints and in a filter option.",
                                    "pink organza saree": "In alt text for pink organza saree images.",
                                    "organza saree photos": "In a call-to-action for a visual gallery or lookbook.",
                                    "organza saree design": "In alt text and captions for images showcasing intricate designs."
                                },
                                "cta": null,
                                "internal_linking": null,
                                "schema_type": [
                                    "ImageObject"
                                ]
                            }
                        ]
                    },
                    {
                        "step_name": "Audience Engagement for Styling & Occasion",
                        "competitor_issue": "The page provides general descriptions but lacks dedicated, easily discoverable content or product curation around specific use cases or styling advice (e.g., 'blouse designs for organza sarees'), which could engage users with high commercial intent.",
                        "evidence_from_scrape": {
                            "target_page": "Mentions 'Pair your Organza silk saree with a chic and modern blouse design for a stylish look.' in FAQ but no dedicated section or visual content. 'organza saree for farewell' and 'organza saree design' rank low (17, 21).",
                            "competitor_pages": "Competitors might feature style guides, 'shop the look' sections, or more detailed occasion-based collections."
                        },
                        "fix_plan": [
                            {
                                "page_action": "Existing Page Upgrade",
                                "page_url": "https://tulsisilks.co.in/category/organza-sarees",
                                "what": "Introduce a visually appealing 'Style Guide' or 'Occasion Gallery' section on the category page, with curated product recommendations and visual content for specific occasions and styling needs.",
                                "why": "Providing styling inspiration and occasion-specific guidance helps users visualize themselves with the product, increasing engagement and conversion. It also captures informational/commercial intent keywords related to styling.",
                                "where": "A new section on the category page, positioned after the main product grid but before the footer.",
                                "how": "Create a 'Styling Your Organza Saree' section with sub-sections like 'Blouse Designs for Your Organza' and 'Organza for Every Occasion'. Feature high-quality images and brief descriptions. Link to relevant blog posts for detailed advice. Ensure internal links from this section use target keywords as anchor text.",
                                "priority": "medium",
                                "primary_keyword": "blouse designs for organza sarees",
                                "secondary_keywords": [
                                    "organza saree blouse",
                                    "organza saree for farewell",
                                    "organza saree design"
                                ],
                                "where_to_use_keyword": {
                                    "blouse designs for organza sarees": "As a sub-heading within the 'Style Guide' section, linking to a dedicated page/blog.",
                                    "organza saree blouse": "In image captions for blouse inspiration within the guide.",
                                    "organza saree for farewell": "As a sub-section featuring products ideal for farewells, linking to the specific sub-category page.",
                                    "organza saree design": "Discussing various design elements in the styling tips."
                                },
                                "cta": null,
                                "internal_linking": {
                                    "from_page": "https://tulsisilks.co.in/category/organza-sarees",
                                    "to_page": "https://tulsisilks.co.in/blog/blouse-designs-organza-sarees",
                                    "anchor_text": "Blouse Designs for Organza Sarees"
                                },
                                "schema_type": [
                                    "HowTo",
                                    "ItemList"
                                ]
                            }
                        ]
                    }
                ]
            },
            "Goal": "Achieve a 25% increase in Organza Saree sales, reaching INR 90,00,000, within the next 12 months by dominating visual search results for 'organza sarees' and related high-intent keywords, improving user experience through transparent pricing, enhanced filtering, prominent trust signals, and engaging styling content on the category page."
        }
    },
    "month-wise-plan": {
        id: "rep_003",
        type: "month-wise-plan",
        generated_at: new Date().toISOString(),
        data: {
            "Stragery": {
                "3_Month_Plan": {
                    "January": [
                        {
                            "month": "January",
                            "s_no": 1,
                            "content_type": "Site Audit",
                            "page_action": "Existing Page Upgrade",
                            "page_name": "AVIT Homepage",
                            "page_url": "https://avit.ac.in/",
                            "section_target": null,
                            "topic": "Foundational SEO & CRO Audit",
                            "primary_keyword": "engineering colleges list in chennai",
                            "secondary_keywords": [
                                "private engineering colleges in chennai",
                                "chennai engineering colleges list"
                            ],
                            "search_intent": "Navigational",
                            "competitors": [
                                "VIT",
                                "Velammal",
                                "SNGCET",
                                "Panimalar"
                            ],
                            "competitor_links": [
                                "https://vit.ac.in/",
                                "https://velammal.edu.in/",
                                "https://www.sngcet.ac.in/",
                                "https://www.panimalar.ac.in/"
                            ],
                            "schema_type": [],
                            "internal_links": [
                                "https://avit.ac.in",
                                "https://avit.ac.in/admission"
                            ],
                            "cta": "Apply Now",
                            "conversion_goal": "Enquiry",
                            "serp_feature_target": [],
                            "brief": "Perform a comprehensive site audit to identify critical on-page and technical issues: missing H1 tag, lack of prominent CTAs, absence of structured data, and poor content hierarchy. Focus on competitor best practices to inform necessary structural changes. This audit will guide subsequent monthly actions, ensuring all foundational elements are in place for optimal search engine indexing and user experience, which competitors already leverage.",
                            "expected_result": "A prioritized list of technical and on-page fixes identified, forming the baseline for all future SEO efforts. Clear understanding of current page deficiencies compared to leading competitors.",
                            "priority": "Very High"
                        },
                        {
                            "month": "January",
                            "s_no": 2,
                            "content_type": "On-Page Paragraph Upgrade",
                            "page_action": "Existing Page Upgrade",
                            "page_name": "AVIT Homepage",
                            "page_url": "https://avit.ac.in/",
                            "section_target": "Title Tag",
                            "topic": "Optimize Title Tag for Program & Location Intent",
                            "primary_keyword": "Best Engineering College in Chennai",
                            "secondary_keywords": [
                                "private engineering colleges in chennai",
                                "engineering colleges list in chennai"
                            ],
                            "search_intent": "Transactional",
                            "competitors": [
                                "VIT",
                                "Panimalar"
                            ],
                            "competitor_links": [
                                "https://vit.ac.in/",
                                "https://www.panimalar.ac.in/"
                            ],
                            "schema_type": [],
                            "internal_links": [],
                            "cta": "Apply Now",
                            "conversion_goal": "Course Page Visit",
                            "serp_feature_target": [
                                "Sitelinks"
                            ],
                            "brief": "Rewrite the existing Title Tag to be more compelling, keyword-rich, and aligned with transactional intent for prospective students searching for engineering colleges in Chennai. Incorporate 'Best Engineering College in Chennai - Admissions Open for [Year] UG/PG Programs' to directly compete with how VIT and Panimalar frame their primary titles to capture high-intent searches. Emphasize key programs like 'Artificial Intelligence & Data Science' if space permits, to improve CTR.",
                            "expected_result": "Improved organic click-through rate (CTR) from SERP due to a more relevant and enticing title. Enhanced visibility for location and program-specific searches.",
                            "priority": "High"
                        },
                        {
                            "month": "January",
                            "s_no": 3,
                            "content_type": "On-Page Paragraph Upgrade",
                            "page_action": "Existing Page Upgrade",
                            "page_name": "AVIT Homepage",
                            "page_url": "https://avit.ac.in/",
                            "section_target": "Meta Description",
                            "topic": "Enhance Meta Description for Program & Conversion",
                            "primary_keyword": "b.tech artificial intelligence and data science",
                            "secondary_keywords": [
                                "b tech aids",
                                "be cse"
                            ],
                            "search_intent": "Transactional",
                            "competitors": [
                                "Velammal",
                                "SNGCET"
                            ],
                            "competitor_links": [
                                "https://velammal.edu.in/",
                                "https://www.sngcet.ac.in/"
                            ],
                            "schema_type": [],
                            "internal_links": [
                                "https://avit.ac.in/admission"
                            ],
                            "cta": "Enquire Now",
                            "conversion_goal": "Form Submission",
                            "serp_feature_target": [],
                            "brief": "Craft a new meta description that elaborates on AVIT's unique offerings, specific programs like 'B.Tech Artificial Intelligence and Data Science,' and a clear call to action. Meta description should entice clicks by highlighting 'industry-ready programs,' 'expert mentorship,' and 'admissions open.' Aim for a concise message that encourages prospective students to click, similar to how competitors entice users with program highlights and admission deadlines.",
                            "expected_result": "Increased CTR from search results due to a more informative and persuasive meta description that resonates with user intent.",
                            "priority": "High"
                        },
                        {
                            "month": "January",
                            "s_no": 4,
                            "content_type": "Section Rewrite",
                            "page_action": "Existing Page Upgrade",
                            "page_name": "AVIT Homepage",
                            "page_url": "https://avit.ac.in/",
                            "section_target": "H1",
                            "topic": "Implement Primary H1 Tag for Main Offering",
                            "primary_keyword": "Best Engineering College in Chennai",
                            "secondary_keywords": [
                                "engineering college",
                                "private engineering colleges in chennai"
                            ],
                            "search_intent": "Navigational",
                            "competitors": [
                                "VIT",
                                "Velammal",
                                "Panimalar"
                            ],
                            "competitor_links": [
                                "https://vit.ac.in/",
                                "https://velammal.edu.in/",
                                "https://www.panimalar.ac.in/"
                            ],
                            "schema_type": [],
                            "internal_links": [],
                            "cta": "Apply Now",
                            "conversion_goal": "Enquiry",
                            "serp_feature_target": [
                                "Sitelinks"
                            ],
                            "brief": "Implement a clear and concise H1 tag, as identified as missing in the site audit (S.No 1). The H1 should prominently feature 'AVIT: Best Engineering College in Chennai for [Year] Admissions' or 'AVIT: Leading Innovation in Engineering Education'. This directly addresses the critical gap where competitor homepages use H1s to immediately convey their primary offering and improve user clarity and SEO, which is entirely absent from the current AVIT page.",
                            "expected_result": "Improved on-page SEO signals, leading to better understanding by search engines of the page's primary topic. Enhanced user experience with immediate clarity on AVIT's core offering.",
                            "priority": "Very High"
                        },
                        {
                            "month": "January",
                            "s_no": 5,
                            "content_type": "Section Rewrite",
                            "page_action": "Existing Page Upgrade",
                            "page_name": "AVIT Homepage",
                            "page_url": "https://avit.ac.in/",
                            "section_target": "CTA Block",
                            "topic": "Implement Prominent Calls-to-Action",
                            "primary_keyword": "b tech artificial intelligence",
                            "secondary_keywords": [
                                "b tech aids",
                                "be cse"
                            ],
                            "search_intent": "Transactional",
                            "competitors": [
                                "VIT",
                                "Velammal"
                            ],
                            "competitor_links": [
                                "https://vit.ac.in/",
                                "https://velammal.edu.in/"
                            ],
                            "schema_type": [],
                            "internal_links": [
                                "https://avit.ac.in/admission",
                                "https://avit.ac.in/programmes-offered"
                            ],
                            "cta": "Apply Now",
                            "conversion_goal": "Form Submission",
                            "serp_feature_target": [],
                            "brief": "Integrate primary, highly visible 'Apply Now' and 'Enquire Now' CTAs on the homepage, particularly above the fold and potentially in a sticky navigation bar. This directly addresses the 'Absence of Prominent CTAs' gap (S.No 1), which competitors effectively use to guide user journeys and drive conversions. Link these CTAs to '/admission' and a new '/enquiry' page or existing contact form. Also include secondary CTAs for 'Download Prospectus' or 'Explore Programs'.",
                            "expected_result": "Significant increase in direct form submissions and enquiries, moving prospective students further down the conversion funnel. Clear pathways for user engagement.",
                            "priority": "Very High"
                        },
                        {
                            "month": "January",
                            "s_no": 6,
                            "content_type": "Section Rewrite",
                            "page_action": "Existing Page Upgrade",
                            "page_name": "AVIT Homepage",
                            "page_url": "https://avit.ac.in/",
                            "section_target": "Section: Rankings & Accreditations",
                            "topic": "Showcase Trust & EEAT Signals",
                            "primary_keyword": "private engineering colleges in chennai",
                            "secondary_keywords": [
                                "mechatronics engineering colleges in chennai",
                                "chennai engineering colleges list"
                            ],
                            "search_intent": "Informational",
                            "competitors": [
                                "VIT",
                                "Panimalar"
                            ],
                            "competitor_links": [
                                "https://vit.ac.in/",
                                "https://www.panimalar.ac.in/"
                            ],
                            "schema_type": [],
                            "internal_links": [
                                "https://avit.ac.in/about-us"
                            ],
                            "cta": "Read More About Us",
                            "conversion_goal": "Course Page Visit",
                            "serp_feature_target": [
                                "Featured Snippet"
                            ],
                            "brief": "Create a dedicated and prominent 'Rankings & Accreditations' section, addressing the 'Weak EEAT Signals' gap (S.No 1). This section should clearly display verifiable institutional rankings (NIRF, NAAC, QS I-GAUGE), accreditation badges (AICTE approval), and potentially link to detailed reports. Competitors extensively use such sections to build immediate trust and authority. Use clear headings (H2/H3) and official logos for visual credibility.",
                            "expected_result": "Enhanced perceived authority and trustworthiness of AVIT, leading to increased user confidence and improved search engine ranking for reputation-based queries.",
                            "priority": "Very High"
                        }
                    ],
                    "February": [
                        {
                            "month": "February",
                            "s_no": 7,
                            "content_type": "Section Rewrite",
                            "page_action": "Existing Page Upgrade",
                            "page_name": "AVIT Homepage - Programs & Admissions",
                            "page_url": "https://avit.ac.in/",
                            "section_target": "Section: Admissions",
                            "topic": "Optimize Program & Admissions Sections",
                            "primary_keyword": "b tech artificial intelligence and data science",
                            "secondary_keywords": [
                                "b e electronics and communication engineering",
                                "be cse"
                            ],
                            "search_intent": "Transactional",
                            "competitors": [
                                "VIT",
                                "Velammal"
                            ],
                            "competitor_links": [
                                "https://vit.ac.in/",
                                "https://velammal.edu.in/"
                            ],
                            "schema_type": [],
                            "internal_links": [
                                "https://avit.ac.in/admission",
                                "https://avit.ac.in/programmes-offered",
                                "https://avit.ac.in/undergraduate-admission"
                            ],
                            "cta": "Explore Programs",
                            "conversion_goal": "Course Page Visit",
                            "serp_feature_target": [],
                            "brief": "Dependency: 1 (Site Audit), 4 (H1 Rewrite), 5 (CTA Block). Rewrite and restructure the 'Industry-Integrated Programmes' and 'Why Choose AVIT?' sections. Convert dense paragraphs into scannable lists with clear subheadings (H2/H3) for each program type (e.g., 'B.Tech AI & DS', 'B.E. ECE') and key benefits, addressing the 'Poor Content Hierarchy' gap. Include specific program names and their unique selling points (e.g., 'Master AI, IoT, and Robotics' for AI/DS).",
                            "expected_result": "Improved user engagement and reduced bounce rate on the homepage as content becomes easier to digest. Increased navigation to specific program pages.",
                            "priority": "High"
                        },
                        {
                            "month": "February",
                            "s_no": 8,
                            "content_type": "Category/Program Page",
                            "page_action": "Existing Page Upgrade",
                            "page_name": "B.Tech Artificial Intelligence & Data Science",
                            "page_url": "https://avit.ac.in/btech-ai-ds",
                            "section_target": null,
                            "topic": "Enhance B.Tech AI & DS Program Page",
                            "primary_keyword": "b tech aids",
                            "secondary_keywords": [
                                "b.tech artificial intelligence and data science",
                                "ai and ds engineering"
                            ],
                            "search_intent": "Transactional",
                            "competitors": [
                                "VIT",
                                "Velammal"
                            ],
                            "competitor_links": [
                                "https://vit.ac.in/",
                                "https://velammal.edu.in/"
                            ],
                            "schema_type": [
                                "Course"
                            ],
                            "internal_links": [
                                "https://avit.ac.in/programmes-offered"
                            ],
                            "cta": "Apply for B.Tech AI&DS",
                            "conversion_goal": "Form Submission",
                            "serp_feature_target": [
                                "Featured Snippet"
                            ],
                            "brief": "Dependency: 1 (Site Audit), 7 (Program Sections). Upgrade the existing '/btech-ai-ds' page (if present in internal links, or create as a new page if not found in scraped links) to be a comprehensive landing page. Incorporate detailed curriculum, faculty profiles, lab facilities, career prospects, and testimonials using 'b tech artificial intelligence and data science' and 'ai and ds engineering'. Ensure a prominent 'Apply Now' CTA. This page should mirror the depth and clarity of competitor program pages to capture high-intent traffic.",
                            "expected_result": "Increased direct applications for the B.Tech AI & DS program. Improved visibility and ranking for specific program-related keywords.",
                            "priority": "Very High"
                        },
                        {
                            "month": "February",
                            "s_no": 9,
                            "content_type": "On-Page Paragraph Upgrade",
                            "page_action": "Existing Page Upgrade",
                            "page_name": "AVIT Homepage - Internal Links",
                            "page_url": "https://avit.ac.in/",
                            "section_target": null,
                            "topic": "Optimize Internal Link Architecture",
                            "primary_keyword": "be electronics and communication engineering",
                            "secondary_keywords": [
                                "b e computer engineering",
                                "b tech information technology"
                            ],
                            "search_intent": "Navigational",
                            "competitors": [
                                "VIT",
                                "Panimalar"
                            ],
                            "competitor_links": [
                                "https://vit.ac.in/",
                                "https://www.panimalar.ac.in/"
                            ],
                            "schema_type": [
                                "Breadcrumb"
                            ],
                            "internal_links": [
                                "https://avit.ac.in/admission",
                                "https://avit.ac.in/programmes-offered",
                                "https://avit.ac.in/placement",
                                "https://avit.ac.in/phd-programme"
                            ],
                            "cta": "Explore More",
                            "conversion_goal": "Course Page Visit",
                            "serp_feature_target": [
                                "Sitelinks"
                            ],
                            "brief": "Dependency: 1 (Site Audit), 7 (Program Sections), 8 (Program Page). Implement a strategic internal linking plan connecting the homepage to key program pages (e.g., 'b e electronics and communication engineering' page), admissions, placements, and newly enhanced sections. Ensure optimal anchor text usage, avoiding generic 'click here'. This will improve crawlability, distribute link equity, and guide users through the site, a practice effectively implemented by competitors with well-structured main navigations and efficient internal linking. Address and consolidate redundant links to '/facilities'.",
                            "expected_result": "Improved search engine crawl efficiency and indexation of key internal pages. Enhanced user flow and reduced navigational friction, boosting engagement.",
                            "priority": "High"
                        },
                        {
                            "month": "February",
                            "s_no": 10,
                            "content_type": "Schema Implementation",
                            "page_action": "Existing Page Upgrade",
                            "page_name": "AVIT Homepage",
                            "page_url": "https://avit.ac.in/",
                            "section_target": null,
                            "topic": "Implement EducationalOrganization Schema Markup",
                            "primary_keyword": "engineering colleges list in chennai",
                            "secondary_keywords": [
                                "private engineering colleges in chennai"
                            ],
                            "search_intent": "Navigational",
                            "competitors": [
                                "VIT",
                                "Velammal",
                                "SNGCET",
                                "Panimalar"
                            ],
                            "competitor_links": [
                                "https://vit.ac.in/",
                                "https://velammal.edu.in/",
                                "https://www.sngcet.ac.in/",
                                "https://www.panimalar.ac.in/"
                            ],
                            "schema_type": [
                                "EducationalOrganization"
                            ],
                            "internal_links": [],
                            "cta": "Apply Now",
                            "conversion_goal": "Form Submission",
                            "serp_feature_target": [
                                "Sitelinks"
                            ],
                            "brief": "Dependency: 1 (Site Audit), 6 (Trust/EEAT). Implement comprehensive JSON-LD schema markup for 'EducationalOrganization' on the homepage. Include crucial properties like 'name', 'url', 'logo', 'contactPoint', 'address', 'alumni', and 'hasCourse' to clearly define AVIT as an educational entity to search engines. Competitors universally utilize this schema to enhance their search visibility and presence, including rich snippets. Ensure it aligns with the verifiable EEAT signals introduced in January.",
                            "expected_result": "Improved entity recognition by search engines, leading to better overall search visibility and potential for rich snippets. Strengthened EEAT signals through structured data.",
                            "priority": "Very High"
                        }
                    ],
                    "March": [
                        {
                            "month": "March",
                            "s_no": 11,
                            "content_type": "FAQ Page",
                            "page_action": "New Page",
                            "page_name": "Admissions FAQ for Engineering Programs",
                            "page_url": "https://avit.ac.in/admissions-faq",
                            "section_target": null,
                            "topic": "Address Common Admissions Queries",
                            "primary_keyword": "be cse course details",
                            "secondary_keywords": [
                                "b tech aids full form",
                                "aiml full form in engineering"
                            ],
                            "search_intent": "Informational",
                            "competitors": [
                                "VIT",
                                "Velammal"
                            ],
                            "competitor_links": [
                                "https://vit.ac.in/",
                                "https://velammal.edu.in/"
                            ],
                            "schema_type": [
                                "FAQPage"
                            ],
                            "internal_links": [
                                "https://avit.ac.in/admission"
                            ],
                            "cta": "Contact Admissions",
                            "conversion_goal": "Enquiry",
                            "serp_feature_target": [
                                "People Also Ask",
                                "Featured Snippet"
                            ],
                            "brief": "Dependency: 7 (Program Sections), 8 (Program Page). Create a new, dedicated FAQ page ('/admissions-faq') to address common queries about engineering programs and admissions, targeting 'be cse course details', 'b tech aids full form', and other related informational keywords. Populate with questions and concise answers. Implement FAQPage schema markup on this page to target 'People Also Ask' and 'Featured Snippet' SERP features, which competitors often capture for admissions-related queries. Link this page prominently from the main '/admission' page.",
                            "expected_result": "Increased visibility for long-tail, informational queries. Reduced bounce rate on admissions pages as users find immediate answers. Potential for FAQ rich snippets in SERP.",
                            "priority": "High"
                        },
                        {
                            "month": "March",
                            "s_no": 12,
                            "content_type": "Blog Post",
                            "page_action": "New Page",
                            "page_name": "What is B.Tech Computer Science Artificial Intelligence and Data Science?",
                            "page_url": "https://avit.ac.in/blog/what-is-btech-ai-ds",
                            "section_target": null,
                            "topic": "Introduction to B.Tech AI & DS",
                            "primary_keyword": "b.tech artificial intelligence and data science",
                            "secondary_keywords": [
                                "b tech aids",
                                "ai and ds engineering"
                            ],
                            "search_intent": "Informational",
                            "competitors": [
                                "VIT",
                                "Velammal",
                                "SNGCET"
                            ],
                            "competitor_links": [
                                "https://vit.ac.in/",
                                "https://velammal.edu.in/",
                                "https://www.sngcet.ac.in/"
                            ],
                            "schema_type": [
                                "Article"
                            ],
                            "internal_links": [
                                "https://avit.ac.in/blogs",
                                "https://avit.ac.in/btech-ai-ds"
                            ],
                            "cta": "Explore AI&DS Program",
                            "conversion_goal": "Course Page Visit",
                            "serp_feature_target": [
                                "Featured Snippet"
                            ],
                            "brief": "Dependency: 8 (Program Page). Create a new blog post titled 'What is B.Tech Artificial Intelligence and Data Science? Your Career Path Explained' targeting the keyword 'b.tech artificial intelligence and data science'. This post will serve as an informational entry point for prospective students, providing an overview of the program, its scope, and career opportunities. Include internal links to the dedicated B.Tech AI & DS program page. This captures top-of-funnel informational intent that can be nurtured into transactional intent, following competitor content strategies.",
                            "expected_result": "Increased organic traffic from informational searches related to AI & DS programs. Improved authority in the AI & DS niche, funneling users to the program page.",
                            "priority": "Medium"
                        },
                        {
                            "month": "March",
                            "s_no": 13,
                            "content_type": "Blog Post",
                            "page_action": "New Page",
                            "page_name": "Career Scope for Electronics and Communication Engineering",
                            "page_url": "https://avit.ac.in/blog/career-ece-scope",
                            "section_target": null,
                            "topic": "Career Prospects in ECE",
                            "primary_keyword": "b e electronics and communication engineering",
                            "secondary_keywords": [
                                "be electronics and communication engineering",
                                "bachelor of engineering electronics and communication"
                            ],
                            "search_intent": "Informational",
                            "competitors": [
                                "VIT",
                                "Velammal",
                                "Panimalar"
                            ],
                            "competitor_links": [
                                "https://vit.ac.in/",
                                "https://velammal.edu.in/",
                                "https://www.panimalar.ac.in/"
                            ],
                            "schema_type": [
                                "Article"
                            ],
                            "internal_links": [
                                "https://avit.ac.in/blogs",
                                "https://avit.ac.in/undergraduate-programmes"
                            ],
                            "cta": "Learn About ECE at AVIT",
                            "conversion_goal": "Course Page Visit",
                            "serp_feature_target": [
                                "Featured Snippet"
                            ],
                            "brief": "Dependency: 7 (Program Sections). Develop a second new blog post focusing on the career scope of 'b e electronics and communication engineering'. This content will answer common questions about job opportunities, industry trends, and further studies, establishing AVIT's expertise in this field. Include internal links to the ECE program details page. This strategy helps capture broader informational queries and positions AVIT as a knowledge leader, similar to how leading institutions provide career guidance content.",
                            "expected_result": "Diversified organic traffic acquisition, attracting students interested in ECE career paths. Improved content depth around core engineering disciplines.",
                            "priority": "Medium"
                        },
                        {
                            "month": "March",
                            "s_no": 14,
                            "content_type": "Schema Implementation",
                            "page_action": "Existing Page Upgrade",
                            "page_name": "AVIT Homepage & All Program Pages",
                            "page_url": "https://avit.ac.in/",
                            "section_target": null,
                            "topic": "Reinforce EducationalOrganization Schema & Review All Schema",
                            "primary_keyword": "engineering colleges list in chennai",
                            "secondary_keywords": [
                                "private engineering colleges in chennai"
                            ],
                            "search_intent": "Navigational",
                            "competitors": [
                                "VIT",
                                "Velammal",
                                "SNGCET",
                                "Panimalar"
                            ],
                            "competitor_links": [
                                "https://vit.ac.in/",
                                "https://velammal.edu.in/",
                                "https://www.sngcet.ac.in/",
                                "https://www.panimalar.ac.in/"
                            ],
                            "schema_type": [
                                "EducationalOrganization",
                                "FAQPage",
                                "Course"
                            ],
                            "internal_links": [],
                            "cta": "Apply Now",
                            "conversion_goal": "Form Submission",
                            "serp_feature_target": [
                                "Sitelinks"
                            ],
                            "brief": "Dependency: 10 (EducationalOrganization Schema), 11 (FAQ Page). Conduct a thorough review of all implemented schema markup (EducationalOrganization on homepage, FAQPage on '/admissions-faq', Course schema on program pages). Ensure accuracy, completeness, and adherence to Google's guidelines. This is crucial for maintaining SERP feature visibility and robust entity understanding, a standard practice for all leading competitor educational institutions to ensure optimal search engine communication.",
                            "expected_result": "Maximized potential for rich snippets and SERP features. Consistent and accurate structured data across key pages, solidifying AVIT's online presence.",
                            "priority": "High"
                        },
                        {
                            "month": "March",
                            "s_no": 15,
                            "content_type": "Section Rewrite",
                            "page_action": "Existing Page Upgrade",
                            "page_name": "AVIT Homepage - Conversion Funnel",
                            "page_url": "https://avit.ac.in/",
                            "section_target": "CTA Block",
                            "topic": "Reinforce Conversion Funnels & Campus Visit",
                            "primary_keyword": "btech artificial intelligence and data science colleges",
                            "secondary_keywords": [
                                "computer engineering colleges",
                                "mechatronics engineering colleges in chennai"
                            ],
                            "search_intent": "Transactional",
                            "competitors": [
                                "VIT",
                                "Velammal"
                            ],
                            "competitor_links": [
                                "https://vit.ac.in/",
                                "https://velammal.edu.in/"
                            ],
                            "schema_type": [],
                            "internal_links": [
                                "https://avit.ac.in/admission",
                                "https://avit.ac.in/contact",
                                "https://avit.ac.in/campustour"
                            ],
                            "cta": "Book a Campus Visit",
                            "conversion_goal": "Campus Visit Booking",
                            "serp_feature_target": [],
                            "brief": "Dependency: 5 (CTA Block), 7 (Program Sections). Integrate a prominent 'Book a Campus Visit' CTA, along with reinforced 'Apply Now' and 'Enquire Now' buttons, on the homepage and key program pages. Ensure all admission enquiry funnels are smooth and clearly visible. This directly targets high-intent users ready to engage further, converting visitors who are considering multiple 'engineering colleges' into actionable leads, replicating the strong conversion pathways found on competitor sites.",
                            "expected_result": "Increased bookings for campus visits and a higher volume of direct enquiries, indicating improved conversion rates from high-intent traffic.",
                            "priority": "Very High"
                        }
                    ]
                }
            }
        }
    }
};
