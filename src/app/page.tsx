'use client';

import React, { useState, useRef, useEffect } from 'react';
/* eslint-disable react/no-unescaped-entities */

// Define the Challenge interface
interface Challenge {
  Ref: number;
  Skill: string;
  Specialism: string;
  Experience: string;
  Scenario: string;
  Challenge: string;
  Task: string;
}

// Complete dataset
// Complete 75+ Challenge Dataset - Replace your challengeData array with this:

// Updated MVPbrief Dataset - All tasks can be completed offline independently:

const challengeData: Challenge[] = [
  // STRATEGY - HEALTHCARE
  {
    "Ref": 1,
    "Skill": "Strategy",
    "Specialism": "Healthcare",
    "Experience": "Senior",
    "Scenario": "MedFlow's AI-powered patient triage system went live across 47 hospitals in January. While reducing wait times by 31%, the system has created unexpected workflow disruptions. Emergency nurses report the AI categorizes chest pain patients as 'low priority' when combined with anxiety symptoms, leading to 3 near-miss cardiac events. The hospital board received complaints from 12 department heads, and CMS is conducting a compliance review after patient advocacy groups raised concerns about algorithmic bias in emergency care.",
    "Challenge": "The board is questioning whether to continue the rollout to 150 additional hospitals or pause for algorithm refinement, but competitors are aggressively marketing their own triage solutions.",
    "Task": "Create a 3-page strategic response document recommending either CONTINUE the rollout to 150 additional hospitals or PAUSE for algorithm refinement. Use the cardiac misclassification data and competitive pressure to justify your choice. Include immediate risk mitigation plan for your chosen option and competitive impact analysis. Write for healthcare executives who need a definitive decision and implementation steps."
  },
  {
    "Ref": 2,
    "Skill": "Strategy",
    "Specialism": "Healthcare",
    "Experience": "Entry",
    "Scenario": "TeleMed Express launched a mental health chatbot for college campuses six months ago. Usage spiked during finals week (2,400 daily active users), but dropped to 180 daily users during summer break. Three universities have requested additional features: crisis intervention protocols, integration with campus counseling services, and multilingual support for international students. However, your engineering team can only deliver one major feature per semester, and two competing platforms have already launched similar campus integrations.",
    "Challenge": "University contracts renew in 90 days, and administrators want to see concrete expansion plans before committing to another year.",
    "Task": "Create a 1-page feature priority memo recommending which ONE of the three features (crisis intervention, campus integration, or multilingual support) to develop first given your engineering constraints. Use the usage patterns and competitive landscape to justify your choice. Include implementation timeline for the selected feature and explanation of why the other two features should wait."
  },
  {
    "Ref": 3,
    "Skill": "Strategy",
    "Specialism": "Healthcare",
    "Experience": "Mid",
    "Scenario": "PharmTrack's medication adherence platform serves 340,000 patients across 15 insurance networks. While 78% of users show improved adherence rates, only 23% of eligible patients actually use the platform. Insurance partners want to expand to chronic disease management, but PharmTrack's current infrastructure requires significant investment to handle real-time health monitoring. Competitors are launching integrated solutions that combine medication tracking with telehealth consultations, threatening PharmTrack's single-focus advantage.",
    "Challenge": "Insurance partners are pressuring for broader health management capabilities, but expanding beyond medication adherence could dilute the platform's specialized expertise and require 18 months of development.",
    "Task": "Write a 2-page strategic recommendation choosing either MAINTAIN medication focus with enhanced features OR EXPAND to chronic disease management. Use the patient engagement data (78% improvement vs 23% adoption) and competitive threats to support your choice. Include 12-month implementation plan for your selected strategy and analysis of how this decision addresses insurance partner demands while preserving platform strengths."
  },

  // STRATEGY - TECHNOLOGY
  {
    "Ref": 4,
    "Skill": "Strategy",
    "Specialism": "Technology",
    "Experience": "Senior",
    "Scenario": "CodeCollaborative's developer platform hosts 2.3 million repositories and serves 450,000 developers globally. GitHub's acquisition of a major competitor and Microsoft's aggressive AI coding assistant pricing have created significant competitive pressure. CodeCollaborative's unique strength lies in specialized tools for mobile app development, with 73% market share among React Native developers. However, broader development platform providers are rapidly improving their mobile development features, and customer acquisition costs have increased 340% in 18 months.",
    "Challenge": "The board is debating whether to focus exclusively on mobile development dominance or expand into general development tools to compete with larger platforms, but resources are insufficient for both strategies.",
    "Task": "Create a 3-page strategy presentation recommending either MOBILE SPECIALIZATION or GENERAL PLATFORM EXPANSION. Use the market share data (73% React Native) and acquisition cost trends (340% increase) to support your recommendation. Include competitive positioning against Microsoft's pricing strategy and resource allocation plan for your chosen direction."
  },
  {
    "Ref": 5,
    "Skill": "Strategy",
    "Specialism": "Technology",
    "Experience": "Entry",
    "Scenario": "DataSync's real-time analytics platform launched 14 months ago and gained traction with 340 startups, but enterprise sales remain elusive. The platform excels at processing streaming data for e-commerce companies, achieving 99.7% uptime and sub-100ms latency. However, enterprise prospects require SOC2 compliance, advanced user management, and integration with legacy systems—features that would require 8 months to develop. Meanwhile, three well-funded competitors have announced enterprise-focused launches.",
    "Challenge": "The company has 11 months of runway remaining, and the founding team is split between pursuing enterprise customers or doubling down on the startup market where they're gaining momentum.",
    "Task": "Write a 1-page recommendation memo choosing either ENTERPRISE focus or STARTUP market focus given the 11-month runway constraint. Use the performance metrics (99.7% uptime, sub-100ms latency) and development timeline to justify your choice. Include basic financial projections showing path to sustainability within the remaining runway."
  },
  {
    "Ref": 6,
    "Skill": "Strategy",
    "Specialism": "Technology",
    "Experience": "Mid",
    "Scenario": "SecurityShield's endpoint protection software protects 1.2 million devices across 3,400 companies. Recent ransomware attacks have increased demand, but also highlighted gaps in SecurityShield's behavioral analysis capabilities compared to AI-powered competitors. The platform's strength lies in lightweight deployment and minimal system impact, making it popular with small-to-medium businesses. However, enterprise prospects increasingly require advanced threat hunting and incident response features that would significantly increase system resource requirements.",
    "Challenge": "Customers are requesting enterprise-grade features, but implementing them could compromise the lightweight performance that differentiates SecurityShield from heavyweight enterprise solutions.",
    "Task": "Create a 2-page product strategy document recommending either SMB FOCUS (preserving lightweight advantages) or ENTERPRISE EXPANSION (accepting increased resource requirements). Use the market demand increase and performance differentiation to support your position. Include competitive differentiation strategy for your chosen market and technical roadmap for the next 12 months."
  },

  // STRATEGY - MEDIA
  {
    "Ref": 7,
    "Skill": "Strategy",
    "Specialism": "Media",
    "Experience": "Senior",
    "Scenario": "StreamCast's podcast platform hosts 45,000 creators and 8.2 million monthly listeners, but faces intense competition from Spotify's $100M creator fund and Apple's exclusive content deals. StreamCast's algorithmic discovery helps smaller podcasters gain audiences, with 67% of new listeners discovering shows through recommendations rather than search. However, major advertisers increasingly demand guaranteed audience sizes that favor established shows on larger platforms. Creator revenue sharing is 70% (vs. Spotify's 50%), but platform growth has slowed to 3% monthly.",
    "Challenge": "The platform risks losing top creators to better-funded competitors while struggling to attract major advertisers who prefer guaranteed scale over audience quality.",
    "Task": "Write a 3-page strategic positioning document choosing either PREMIUM CREATOR FOCUS (doubling down on 70% revenue sharing and discovery algorithms) or SCALE-COMPETITIVE APPROACH (matching competitor financial incentives). Use the discovery effectiveness data (67% algorithmic discovery) and creator revenue sharing to justify your choice. Include creator retention strategy that doesn't require unsustainable financial commitments and advertiser acquisition plan for your chosen positioning."
  },
  {
    "Ref": 8,
    "Skill": "Strategy",
    "Specialism": "Media",
    "Experience": "Entry",
    "Scenario": "NewsLocal aggregates local news from 2,300 community newspapers across 47 states, reaching 890,000 monthly readers. While engagement rates (4.2 minutes average session) exceed national news sites, monetization remains challenging due to small audience sizes per market. Local newspapers struggle with digital transformation, and 23 have closed since NewsLocal's launch. The platform's personalized local news feed creates strong user loyalty, but advertisers prefer broader geographic targeting.",
    "Challenge": "Local newspapers depend on NewsLocal for digital reach, but the platform struggles to generate sufficient revenue to support continued operations and expansion to additional markets.",
    "Task": "Create a 1-page business model recommendation choosing ONE revenue approach: local advertising packages, reader subscriptions, or newspaper partnership fees. Use the engagement metrics (4.2 minutes vs national sites) and newspaper closure data to justify your choice. Include 6-month implementation timeline and basic revenue projections based on current community focus strengths."
  },
  {
    "Ref": 9,
    "Skill": "Strategy",
    "Specialism": "Media",
    "Experience": "Mid",
    "Scenario": "VideoCreate's short-form content platform has attracted 2.8 million creators and 45 million monthly viewers, competing with TikTok and Instagram Reels. The platform's unique feature allows collaborative video creation, with 34% of content being multi-creator collaborations. However, creator monetization options are limited compared to established platforms, and major brands hesitate to advertise alongside user-generated content without comprehensive moderation. The platform processes 12 million videos monthly with current moderation staff of 47 people.",
    "Challenge": "Creators demand better monetization opportunities, brands require content safety guarantees, and competitors with deeper pockets are aggressively recruiting top creators with exclusive deals.",
    "Task": "Write a 2-page strategy memo recommending either COLLABORATION-FOCUSED MONETIZATION (leveraging 34% collaborative content and unique features) or TRADITIONAL CREATOR FUND approach (competing directly with TikTok-style financial incentives). Use the collaboration data and moderation capacity constraints to support your choice. Include creator retention plan and brand safety strategy for your selected approach."
  },

  // STRATEGY - AI
  {
    "Ref": 10,
    "Skill": "Strategy",
    "Specialism": "AI",
    "Experience": "Senior",
    "Scenario": "AIFlow's machine learning platform faces intense competition from Google Cloud AI, Amazon SageMaker, and Microsoft Azure ML, all offering similar services at 40-60% lower costs. Customer acquisition costs have tripled to $47K per enterprise client, while annual churn increased from 8% to 23%. However, AIFlow's specialized computer vision models outperform competitors by 15-30% accuracy in manufacturing defect detection, and existing clients in automotive and aerospace industries show 95% retention rates. The platform processes 2.3 billion images monthly for quality control applications.",
    "Challenge": "The board questions the viability of competing on infrastructure against tech giants and wants a strategic pivot that leverages AIFlow's unique strengths while avoiding direct price competition.",
    "Task": "Create a 3-page strategic differentiation document recommending either VERTICAL SPECIALIZATION in manufacturing (leveraging 95% retention in automotive/aerospace) or GENERAL PLATFORM approach (competing on infrastructure). Use the performance advantages (15-30% higher accuracy) and retention data to support your recommendation. Include financial projections showing sustainable growth path for your chosen strategy and competitive positioning that avoids direct price competition."
  },
  {
    "Ref": 11,
    "Skill": "Strategy",
    "Specialism": "AI",
    "Experience": "Entry",
    "Scenario": "VoiceBot's conversational AI platform serves 1,200 small businesses with automated customer service. The platform's natural language processing achieves 87% accuracy for common queries, but struggles with complex customer issues that require human escalation. Larger competitors like Intercom and Zendesk have launched AI features integrated with their existing platforms, while VoiceBot operates as a standalone solution. Small business customers appreciate the affordable pricing ($89/month vs. $500+ for enterprise solutions), but request integration with existing tools.",
    "Challenge": "The market is moving toward integrated customer service platforms, but VoiceBot lacks the resources to build comprehensive business software integrations that larger competitors offer natively.",
    "Task": "Write a 1-page strategic recommendation choosing either BUILD NATIVE INTEGRATIONS, PARTNER with existing platforms, or DOUBLE DOWN on standalone affordability advantage. Use the pricing differential ($89 vs $500+) and accuracy metrics (87% for common queries) to justify your choice. Include 6-month execution plan that fits small team constraints and addresses integration market trends."
  },
  {
    "Ref": 12,
    "Skill": "Strategy",
    "Specialism": "AI",
    "Experience": "Mid",
    "Scenario": "PredictAnalytics uses machine learning to forecast demand for retail companies, serving 340 brands with inventory optimization. The platform reduces overstock by an average of 23% and stockouts by 31%, generating significant customer value. However, major ERP providers like SAP and Oracle are integrating predictive analytics directly into their platforms, potentially eliminating the need for standalone solutions. PredictAnalytics' advantage lies in cross-retailer data insights and specialized fashion industry algorithms.",
    "Challenge": "Customers increasingly prefer integrated solutions over best-of-breed tools, but ERP integrations would require partnerships with companies that view PredictAnalytics as a competitive threat.",
    "Task": "Create a 2-page strategic response document recommending either WHITE-LABEL PARTNERSHIPS with ERPs, API INTEGRATION strategy, or VERTICAL SPECIALIZATION focus. Use the performance metrics (23% overstock reduction, 31% stockout reduction) and cross-retailer data advantages to support your choice. Include implementation roadmap that preserves specialized advantages while addressing integration preferences."
  },

  // STRATEGY - RETAIL
  {
    "Ref": 13,
    "Skill": "Strategy",
    "Specialism": "Retail",
    "Experience": "Senior",
    "Scenario": "FashionCircle's sustainable clothing marketplace connects 12,000 eco-conscious brands with 2.8 million consumers. The platform's carbon footprint tracking and ethical sourcing verification differentiate it from mainstream e-commerce, achieving 34% higher customer lifetime value than industry averages. However, Amazon and other major retailers are launching sustainability initiatives and leveraging massive scale to offer competitive pricing on eco-friendly products. FashionCircle's curation process ensures quality but limits inventory breadth compared to larger platforms.",
    "Challenge": "Large retailers are commoditizing sustainable fashion while FashionCircle's curated approach becomes increasingly expensive to maintain against scale-driven competitors.",
    "Task": "Write a 3-page strategic differentiation document choosing either PREMIUM COMMUNITY positioning (leveraging 34% higher CLV and curation expertise) or MAINSTREAM PRICE-COMPETITIVE approach. Use the customer lifetime value data and sustainability verification to justify your choice. Include competitive strategy that leverages sustainability expertise against Amazon's scale-driven approach and defensible advantages in the evolving sustainable retail market."
  },
  {
    "Ref": 14,
    "Skill": "Strategy",
    "Specialism": "Retail",
    "Experience": "Entry",
    "Scenario": "LocalMarket's grocery delivery platform serves 23 mid-sized cities, partnering with independent grocery stores to compete against major chains and apps like Instacart. The platform achieves 4.6-star average ratings due to local product knowledge and community relationships, but struggles with delivery economics in smaller markets. Independent grocers appreciate LocalMarket's lower commission rates (12% vs. 20% for major apps), but lack resources for inventory management integration and promotional campaigns.",
    "Challenge": "The platform provides value to local grocers and customers but struggles to achieve profitability in markets too small for major competitors while lacking resources to expand to larger cities.",
    "Task": "Create a 1-page market positioning strategy recommending either SMALL MARKET SPECIALIZATION (serving 23 mid-sized cities with 4.6-star ratings) or EXPANSION to compete in larger markets. Use the commission rate advantage (12% vs 20%) and customer satisfaction metrics to justify your choice. Include basic financial projections for reaching profitability with your selected approach."
  },
  {
    "Ref": 15,
    "Skill": "Strategy",
    "Specialism": "Retail",
    "Experience": "Mid",
    "Scenario": "HandcraftMarket's artisan marketplace connects 34,000 makers with customers seeking unique, handmade products. The platform's story-driven product pages and maker verification process command 40% higher prices than mass-produced alternatives on general marketplaces. However, production capacity constraints limit growth—artisans can't scale like manufacturers, and quality can vary. Major marketplaces are creating 'handmade' sections with looser verification standards but broader selection and faster shipping.",
    "Challenge": "The platform's authenticity and quality standards create customer trust but limit scale and speed compared to less restrictive competitors who can offer wider selection and faster fulfillment.",
    "Task": "Write a 2-page strategic positioning document choosing either QUALITY-FOCUSED GROWTH (maintaining verification standards and 40% price premium) or SCALE-COMPETITIVE expansion (loosening standards for faster growth). Use the pricing premium data and maker verification process to support your choice. Include growth strategy that addresses scalability while preserving chosen positioning and competitive differentiation against major marketplace handmade sections."
  },

  // STRATEGY - FINANCE
  {
    "Ref": 16,
    "Skill": "Strategy",
    "Specialism": "Finance",
    "Experience": "Senior",
    "Scenario": "InvestWise's robo-advisor manages $2.3 billion in assets for 340,000 users, focusing on socially responsible investing (SRI). The platform's ESG screening and impact reporting attract younger investors willing to accept slightly lower returns for values alignment. However, major financial institutions like Fidelity and Vanguard now offer SRI options with significantly lower fees due to scale advantages. InvestWise's personalized impact reporting and carbon footprint tracking provide differentiation, but customer acquisition costs have increased 180% as the market becomes crowded.",
    "Challenge": "The sustainable investing market is rapidly maturing with low-cost competition from established financial giants, while InvestWise's specialized features require higher fees to maintain profitability.",
    "Task": "Create a 3-page strategic positioning document recommending either PREMIUM SRI SPECIALIZATION (maintaining higher fees for specialized features like impact reporting) or COST-COMPETITIVE diversification. Use the asset base ($2.3B) and customer acquisition cost trends (180% increase) to justify your choice. Include differentiation strategy against Fidelity/Vanguard's low-cost offerings and financial projections for sustainable growth in the maturing SRI market."
  },
  {
    "Ref": 17,
    "Skill": "Strategy",
    "Specialism": "Finance",
    "Experience": "Entry",
    "Scenario": "BudgetBuddy's personal finance app has gained 450,000 users with its gamified savings approach and social spending challenges among friends. Users save an average of $340 more per month compared to traditional budgeting apps, and social features drive 67% higher engagement rates. However, monetization remains challenging—subscription conversion is only 3.2%, and users resist paying for budgeting tools when free alternatives exist. The app's social features require significant server costs and content moderation.",
    "Challenge": "High user engagement and proven savings outcomes don't translate to sustainable revenue, while competitors offer basic budgeting features for free as part of larger financial service platforms.",
    "Task": "Write a 1-page monetization strategy choosing ONE approach: premium features (targeting industry-standard 8-12% conversion rates), freemium partnerships, or alternative revenue model. Use the engagement advantage (67% higher) and savings effectiveness ($340 monthly improvement) to justify your choice. Include financial projections based on 450,000 user base and specific features that could justify subscription costs given proven user value."
  },
  {
    "Ref": 18,
    "Skill": "Strategy",
    "Specialism": "Finance",
    "Experience": "Mid",
    "Scenario": "CreditConnect's peer-to-peer lending platform has facilitated $890 million in loans between 67,000 lenders and 340,000 borrowers. The platform's AI-driven risk assessment achieves lower default rates than traditional credit scoring for thin-file borrowers, opening credit access for underserved populations. However, regulatory changes in 12 states have created compliance complexity, and institutional investors are increasingly dominating the lending pool, reducing individual investor participation and changing platform dynamics.",
    "Challenge": "Regulatory complexity threatens multi-state operations while institutional investor dominance could transform the platform into traditional lending with peer-to-peer branding rather than genuine community finance.",
    "Task": "Create a 2-page strategic response document recommending either INSTITUTIONAL PARTNERSHIP approach (embracing institutional investor presence for scale) or COMMUNITY LENDING focus (returning to peer-to-peer roots). Use the loan volume data ($890M facilitated) and regulatory challenges to support your choice. Include operational strategy that balances compliance costs with platform accessibility for underserved borrowers."
  },

  // PRIORITISATION - HEALTHCARE
  {
    "Ref": 19,
    "Skill": "Prioritisation",
    "Specialism": "Healthcare",
    "Experience": "Senior",
    "Scenario": "MediRecord's electronic health record system serves 340 hospitals across 15 states, but faces competing urgent priorities following a cybersecurity incident. The security team demands immediate implementation of zero-trust architecture (8-month project), clinical staff request AI-powered diagnostic assistance (12-month project), and hospital administrators need cost optimization features to address budget pressures (4-month project). Regulatory compliance requires updated HIPAA protocols within 6 months. The development team can realistically deliver 2 major initiatives per year while maintaining system stability.",
    "Challenge": "Each stakeholder group considers their request mission-critical, but resources are insufficient to address all priorities simultaneously, and delays could impact patient care, security, or financial viability.",
    "Task": "Create a 2-page prioritization framework ranking the four initiatives (zero-trust security, AI diagnostics, cost optimization, HIPAA protocols) in order of implementation. Use the timeline constraints and stakeholder pressure to design an 18-month phased plan that addresses the most critical needs first. Include risk assessment for your chosen sequence and stakeholder communication strategy for managing competing demands across clinical, administrative, and technical teams."
  },
  {
    "Ref": 20,
    "Skill": "Prioritisation",
    "Specialism": "Healthcare",
    "Experience": "Entry",
    "Scenario": "HealthApp's patient engagement platform has accumulated 156 feature requests from 23 healthcare provider clients over 8 months. Requests include medication reminder customization (wanted by 78% of providers), insurance verification integration (requested by 12 large clients representing 60% of revenue), telehealth scheduling (needed by 67% of providers), and Spanish language support (requested by 34% of providers serving diverse populations). The engineering team can deliver 1 major feature per quarter while maintaining current functionality.",
    "Challenge": "Feature requests span different user types and provider needs, making it difficult to prioritize based on request volume alone, especially when high-revenue clients have specific requirements that may not benefit other users.",
    "Task": "Write a 1-page feature prioritization plan ranking the four features (medication reminders, insurance verification, telehealth scheduling, Spanish support) for the next 12 months. Use the provider request percentages and revenue concentration (60% from 12 clients) to justify your sequence. Include specific implementation timeline accounting for one feature per quarter capacity and evaluation criteria that balance immediate client needs with long-term platform strategy."
  },
  {
    "Ref": 21,
    "Skill": "Prioritisation",
    "Specialism": "Healthcare",
    "Experience": "Mid",
    "Scenario": "VitalTrack's remote patient monitoring system serves 45,000 chronic disease patients across 120 healthcare providers. Following FDA approval for expanded monitoring capabilities, the platform faces competing priorities: integration with 12 new medical device types (requested by 67% of providers), real-time alerting system improvements (needed after 3 critical incidents), AI-powered trend analysis (wanted by research hospitals), and mobile app redesign (requested by 78% of patients). Each initiative requires 3-6 months of focused development.",
    "Challenge": "Patient safety incidents highlight urgent technical needs, but provider demands for device integration and patient requests for usability improvements also impact platform adoption and satisfaction.",
    "Task": "Create a 2-page priority assessment ranking the four initiatives (device integration, alerting improvements, AI analysis, mobile redesign) by urgency and impact. Use the safety incident data and provider/patient request percentages to justify your sequence. Include resource allocation plan that maximizes overall platform value while managing stakeholder expectations and success metrics that balance patient safety with user satisfaction."
  },

  // PRIORITISATION - TECHNOLOGY
  {
    "Ref": 22,
    "Skill": "Prioritisation",
    "Specialism": "Technology",
    "Experience": "Entry",
    "Scenario": "DevSync's collaboration platform has 847 feature requests from enterprise customers, ranging from advanced security permissions to AI-powered code review. The sales team promises custom integrations to close deals, but engineering can only deliver 2-3 major features per quarter. Your biggest client (40% of revenue) threatened to switch unless you deliver seamless GitHub Enterprise integration by Q3. Meanwhile, 67% of new trial users abandon the platform because basic file sharing doesn't work with files over 100MB.",
    "Challenge": "Marketing needs a public roadmap for the upcoming developer conference, but you're caught between maintaining existing revenue and fixing fundamental user experience issues.",
    "Task": "Write a 1-page feature prioritization matrix ranking the key requests (security permissions, AI code review, GitHub integration, file sharing improvements) for the next 6 months. Use the revenue impact data (40% revenue client threatening to leave) and trial conversion issues (67% abandonment due to file limits) to justify your sequence. Include specific timeline accounting for 2-3 features per quarter capacity and stakeholder communication strategy for the developer conference."
  },
  {
    "Ref": 23,
    "Skill": "Prioritisation",
    "Specialism": "Technology",
    "Experience": "Mid",
    "Scenario": "CloudScale's infrastructure monitoring tool serves 3,200 engineering teams globally. After a major security vulnerability exposed customer data for 6 hours, you have competing urgent priorities: rebuilding customer trust through enhanced security features, addressing technical debt that caused the vulnerability, and delivering promised AI anomaly detection that 40 enterprise clients are waiting for. The security team wants immediate implementation of zero-trust architecture, product marketing needs AI features for the upcoming product launch, and engineering warns that security fixes will delay all other development by 8 weeks.",
    "Challenge": "The CEO announced a 'security-first' strategy publicly, but the board privately expressed concern about missing revenue targets if AI features are delayed.",
    "Task": "Create a 2-page strategic prioritization document ranking the priorities (security features, technical debt remediation, AI anomaly detection, performance optimization) by business impact and timeline. Use the security incident impact and stakeholder pressure to justify your sequence. Include phased implementation plan that balances immediate security needs with revenue protection and communication strategies for different stakeholder groups."
  },
  {
    "Ref": 24,
    "Skill": "Prioritisation",
    "Specialism": "Technology",
    "Experience": "Senior",
    "Scenario": "DataFlow's enterprise analytics platform serves 890 companies with complex data integration needs. The platform faces multiple competing priorities: migration to cloud-native architecture (required by 67% of new prospects), advanced machine learning capabilities (requested by 45% of existing clients), improved real-time processing (needed for 23 high-value clients), and enhanced security compliance (mandatory for financial services clients representing 34% of revenue). Each initiative requires 6-12 months of dedicated engineering resources.",
    "Challenge": "Legacy architecture limits new feature development and customer acquisition, but modernization efforts would halt new feature delivery for existing customers who are threatening to leave without improvements.",
    "Task": "Write a 2-page strategic prioritization analysis ranking the four initiatives (cloud migration, ML capabilities, real-time processing, security compliance) for 24-month implementation. Use the client value data (67% prospects requiring cloud-native, 34% revenue from financial services) to justify your sequence. Include financial impact analysis of delayed initiatives and phased migration strategy that maintains service quality during transition while enabling future capabilities."
  },

  // PRIORITISATION - MEDIA
  {
    "Ref": 25,
    "Skill": "Prioritisation",
    "Specialism": "Media",
    "Experience": "Senior",
    "Scenario": "ContentCentral's digital publishing platform serves 2,300 independent publishers and 890,000 subscribers. Following iOS privacy changes that reduced advertising effectiveness, the platform faces competing priorities: subscription management improvements (requested by 78% of publishers), direct-pay content features (wanted by 56% of high-engagement publishers), advanced analytics dashboard (needed by 89% of publishers), and mobile app performance optimization (requested by 67% of subscribers). Each major initiative requires 4-6 months of development focus.",
    "Challenge": "Advertising revenue decline forces publishers toward subscription models, but current platform tools inadequately support direct-pay content and subscriber management, while technical performance issues affect user experience.",
    "Task": "Create a 2-page prioritization strategy ranking the four initiatives (subscription management, direct-pay content, analytics dashboard, mobile optimization) by revenue recovery potential. Use the iOS privacy impact data and publisher/subscriber request percentages to justify your sequence. Include 18-month implementation plan that maximizes publisher revenue recovery and subscriber experience while balancing publisher business requirements with subscriber satisfaction."
  },
  {
    "Ref": 26,
    "Skill": "Prioritisation",
    "Specialism": "Media",
    "Experience": "Entry",
    "Scenario": "VideoShare's creator platform has received 234 feature requests from 4,500 active creators over 6 months. Top requests include: advanced editing tools (wanted by 67% of creators), revenue sharing improvements (requested by 89% of monetized creators), collaborative creation features (wanted by 45% of creators), and live streaming capabilities (requested by 56% of creators). The engineering team can deliver one major feature per quarter while maintaining platform stability.",
    "Challenge": "Creator satisfaction directly impacts content quality and platform growth, but requests span different creator types and experience levels, making universal prioritization difficult.",
    "Task": "Write a 1-page feature prioritization plan ranking the four requests (editing tools, revenue sharing, collaboration features, live streaming) for the next 12 months. Use the creator request percentages and the distinction between monetized vs. all creators to justify your sequence. Include timeline accounting for one feature per quarter capacity and evaluation criteria that balance creator satisfaction with business objectives."
  },
  {
    "Ref": 27,
    "Skill": "Prioritisation",
    "Specialism": "Media",
    "Experience": "Mid",
    "Scenario": "NewsAggregator's content curation platform serves 1.2 million readers with personalized news feeds from 340 sources. The platform faces competing priorities: AI-powered content moderation (needed after misinformation incidents), source verification system enhancement (requested by 78% of users), mobile app speed optimization (needed to compete with faster alternatives), and social sharing feature improvements (wanted by 45% of active users). Each initiative requires 3-5 months of focused development.",
    "Challenge": "Content quality issues affect platform credibility while technical performance impacts user retention, but resources are insufficient to address all priorities simultaneously.",
    "Task": "Create a 2-page priority framework ranking the four initiatives (AI moderation, source verification, mobile optimization, social sharing) by user impact and platform credibility. Use the misinformation incident effects and user request data to justify your sequence. Include 12-month implementation plan that balances content quality with user experience improvements and success metrics that measure both content trust and user retention."
  },

  // PRIORITISATION - AI
  {
    "Ref": 28,
    "Skill": "Prioritisation",
    "Specialism": "AI",
    "Experience": "Senior",
    "Scenario": "AIAssist's enterprise automation platform serves 450 companies with machine learning-powered workflow optimization. Following rapid customer growth, the platform faces critical competing priorities: scalability improvements to handle increased usage (system crashes have affected 23% of enterprise clients), advanced AI model customization (requested by 67% of high-value clients), integration with popular enterprise software (needed for 78% of new prospects), and enhanced security compliance (required for financial services expansion). Each initiative demands 6-9 months of engineering focus.",
    "Challenge": "System reliability issues threaten customer retention while missing advanced features limits growth opportunities, but infrastructure improvements would delay feature development that drives customer acquisition.",
    "Task": "Create a 2-page prioritization framework ranking the four initiatives (scalability improvements, AI customization, enterprise integrations, security compliance) by business impact. Use the system reliability data (23% of clients affected by crashes) and growth requirements (78% of prospects need integrations) to justify your sequence. Include phased implementation that maintains service quality while advancing platform capabilities and stakeholder communication strategies for managing expectations during capacity building."
  },
  {
    "Ref": 29,
    "Skill": "Prioritisation",
    "Specialism": "AI",
    "Experience": "Entry",
    "Scenario": "SmartChat's conversational AI platform for small businesses has accumulated 89 feature requests from 340 active customers over 4 months. Popular requests include: integration with popular CRM systems (wanted by 56% of customers), multilingual support (requested by 34% of customers), advanced conversation analytics (wanted by 67% of customers), and voice call handling (requested by 45% of customers). The development team can realistically deliver one significant feature per quarter.",
    "Challenge": "Customer requests vary significantly based on business type and size, making it difficult to prioritize features that provide broad value versus those serving specific customer segments.",
    "Task": "Write a 1-page feature prioritization plan ranking the four requests (CRM integration, multilingual support, conversation analytics, voice handling) for the next 12 months. Use the customer request percentages and business diversity to justify your sequence. Include implementation timeline accounting for one feature per quarter capacity and evaluation criteria that balance immediate customer needs with long-term product vision."
  },
  {
    "Ref": 30,
    "Skill": "Prioritisation",
    "Specialism": "AI",
    "Experience": "Mid",
    "Scenario": "PredictiveAnalytics's machine learning platform serves 230 retail companies with demand forecasting. The platform faces competing development priorities: improved accuracy for seasonal products (requested by 78% of fashion retailers), real-time inventory optimization (needed by 45% of grocery clients), integration with supply chain management systems (wanted by 67% of large retailers), and enhanced reporting dashboards (requested by 89% of users). Each major enhancement requires 4-6 months of data science and engineering work.",
    "Challenge": "Different retail segments have varying analytical needs and success metrics, while technical improvements must balance accuracy gains with system performance and usability.",
    "Task": "Create a 2-page prioritization approach ranking the four enhancements (seasonal accuracy, real-time optimization, supply chain integration, reporting dashboards) by business impact across retail segments. Use the request percentages by retail type (78% fashion, 45% grocery, etc.) to justify your sequence. Include development sequencing that maximizes value across different customer segments and success metrics that balance accuracy improvements with practical implementation requirements."
  },

  // PRIORITISATION - RETAIL
  {
    "Ref": 31,
    "Skill": "Prioritisation",
    "Specialism": "Retail",
    "Experience": "Senior",
    "Scenario": "MarketPlace Connect hosts 45,000 sellers ranging from individual crafters to major brands. Seller requests include: advanced analytics dashboards (requested by 67% of high-volume sellers), mobile app improvements (78% of small sellers), fraud prevention tools (34% of all sellers), and internationalization features (12% of sellers, but representing 31% of platform revenue). Engineering capacity allows 2-3 major initiatives per quarter. Top-tier sellers (generating 40% of platform fees) threaten migration to Amazon if analytics aren't improved, while small sellers (representing 78% of seller count) need mobile functionality to remain competitive.",
    "Challenge": "Platform success depends on both high-revenue sellers and the diverse ecosystem of smaller sellers, but their needs often conflict and require different technical approaches.",
    "Task": "Create a 2-page seller-focused prioritization strategy ranking the four initiatives (analytics dashboards, mobile improvements, fraud prevention, internationalization) by seller ecosystem impact. Use the revenue concentration data (40% from top-tier, 31% from international sellers) and seller distribution (78% small sellers) to justify your sequence. Include implementation phases that balance high-value seller retention with ecosystem health and success metrics that measure both financial performance and marketplace vibrancy."
  },
  {
    "Ref": 32,
    "Skill": "Prioritisation",
    "Specialism": "Retail",
    "Experience": "Entry",
    "Scenario": "ShopLocal's community marketplace platform has received 67 feature requests from 890 local businesses over 3 months. Requests include: inventory management integration (wanted by 56% of businesses), delivery tracking system (requested by 78% of restaurants), social media promotion tools (wanted by 67% of retail stores), and customer loyalty program features (requested by 45% of service businesses). The development team can implement one major feature every 6 weeks while maintaining current functionality.",
    "Challenge": "Local businesses have diverse needs based on their industry type, but platform growth depends on serving all segments effectively while maintaining simplicity that attracts new businesses.",
    "Task": "Write a 1-page feature prioritization plan ranking the four requests (inventory management, delivery tracking, social media tools, loyalty programs) for the next 12 months. Use the business type preferences (78% restaurants want delivery tracking, 67% retail want social tools) to justify your sequence. Include implementation timeline accounting for 6-week development cycles and evaluation criteria that balance business type diversity with platform adoption impact."
  },
  {
    "Ref": 33,
    "Skill": "Prioritisation",
    "Specialism": "Retail",
    "Experience": "Mid",
    "Scenario": "EcomEngine's e-commerce platform serves 2,300 online retailers with competing priority requests: advanced personalization algorithms (wanted by 67% of fashion retailers), B2B wholesale functionality (requested by 45% of manufacturers), international shipping optimization (needed by 34% of retailers expanding globally), and mobile checkout improvements (wanted by 89% of all retailers). The engineering team can deliver 2 major features per quarter while maintaining platform stability and performance.",
    "Challenge": "Retailer needs vary significantly by industry and business model, while mobile optimization affects all customers but advanced features drive higher-value client retention and acquisition.",
    "Task": "Create a 2-page prioritization framework ranking the four features (personalization algorithms, B2B functionality, international shipping, mobile checkout) by platform impact. Use the retailer segment data (67% fashion want personalization, 89% want mobile improvements) to justify your sequence. Include implementation plan that maximizes overall platform value while addressing specific industry needs and success metrics that measure both feature adoption and business impact across diverse retailer types."
  },

  // PRIORITISATION - FINANCE
  {
    "Ref": 34,
    "Skill": "Prioritisation",
    "Specialism": "Finance",
    "Experience": "Senior",
    "Scenario": "FinanceFlow's investment management platform serves 450 financial advisors managing $12 billion in client assets. Following regulatory changes, the platform faces competing urgent priorities: enhanced compliance reporting (required for all advisors within 6 months), AI-powered portfolio optimization (requested by 78% of high-AUM advisors), client portal improvements (wanted by 67% of advisors for client retention), and integration with new custody platforms (needed by 34% of advisors switching providers). Each initiative requires 4-8 months of dedicated development resources.",
    "Challenge": "Regulatory compliance is mandatory but doesn't drive revenue, while advanced features attract high-value advisors but may not benefit the broader user base that generates steady subscription income.",
    "Task": "Create a 2-page strategic prioritization approach ranking the four initiatives (compliance reporting, AI optimization, client portal, custody integration) by business necessity and revenue impact. Use the advisor distribution data (78% high-AUM want AI, 67% want portal improvements) and regulatory timeline to justify your sequence. Include implementation phases that ensure regulatory compliance while advancing platform competitiveness and advisor satisfaction."
  },
  {
    "Ref": 35,
    "Skill": "Prioritisation",
    "Specialism": "Finance",
    "Experience": "Entry",
    "Scenario": "BudgetTracker's personal finance app has accumulated 134 feature requests from 56,000 active users over 4 months. Popular requests include: bill payment automation (wanted by 67% of users), investment tracking (requested by 34% of users), debt payoff planning (wanted by 45% of users), and spending category customization (requested by 78% of users). The development team can deliver one significant feature per quarter while maintaining app performance and user experience.",
    "Challenge": "User requests span different financial management priorities and experience levels, making it difficult to prioritize features that provide broad value versus those serving specific user financial situations.",
    "Task": "Write a 1-page feature prioritization plan ranking the four requests (bill automation, investment tracking, debt planning, category customization) for the next 12 months. Use the user request percentages and financial management complexity to justify your sequence. Include implementation timeline accounting for one feature per quarter and evaluation criteria that balance immediate user needs with long-term product vision."
  },
  {
    "Ref": 36,
    "Skill": "Prioritisation",
    "Specialism": "Finance",
    "Experience": "Mid",
    "Scenario": "CreditAnalytics's lending platform serves 78 financial institutions with credit risk assessment tools. The platform faces competing priorities: machine learning model improvements (requested by 89% of large banks), regulatory reporting automation (required by 67% of credit unions), real-time fraud detection (needed after recent incidents affecting 12% of clients), and API performance optimization (wanted by 56% of fintech integration partners). Each major enhancement requires 3-6 months of specialized development work.",
    "Challenge": "Different financial institution types have varying risk management needs and regulatory requirements, while technical improvements must balance accuracy gains with system performance and compliance standards.",
    "Task": "Create a 2-page prioritization approach ranking the four priorities (ML improvements, regulatory automation, fraud detection, API optimization) by institutional impact and compliance necessity. Use the institution type preferences (89% large banks want ML, 67% credit unions need reporting) to justify your sequence. Include development plan that maximizes value across different institution types while addressing urgent fraud concerns."
  },

  // DISCOVERY - HEALTHCARE
  {
    "Ref": 37,
    "Skill": "Discovery",
    "Specialism": "Healthcare",
    "Experience": "Senior",
    "Scenario": "MedDevice Corp is considering expanding their successful cardiac monitoring platform into diabetes management, targeting the growing continuous glucose monitoring market. Initial surveys of 1,800 existing cardiac patients showed 43% also manage diabetes, but focus groups revealed significant differences in monitoring behaviors and technology preferences. The diabetes device market requires different regulatory pathways, specialized clinical partnerships, and distinct user experience approaches. Three major competitors dominate glucose monitoring with established physician relationships.",
    "Challenge": "The expansion could leverage existing patient relationships and clinical infrastructure, but diabetes management requires fundamentally different expertise and may dilute focus from the successful cardiac monitoring business.",
    "Task": "Create a 3-page discovery research plan to evaluate diabetes management expansion feasibility. Use the patient overlap data (43% cardiac patients also manage diabetes) and competitive landscape to design research methodology that validates market opportunity, regulatory requirements, and operational feasibility. Include specific research questions, success criteria, and decision framework for the expansion recommendation."
  },
  {
    "Ref": 38,
    "Skill": "Discovery",
    "Specialism": "Healthcare",
    "Experience": "Entry",
    "Scenario": "HealthConnect's telehealth platform has received requests from 23 pediatric practices to add child-specific features, but initial user research revealed complex family dynamics and consent requirements that differ significantly from adult telehealth. Parents, children, and healthcare providers have different comfort levels with video consultations, and regulatory requirements for minor patient privacy vary by state. The platform currently serves 45,000 adult patients with high satisfaction rates.",
    "Challenge": "Pediatric telehealth represents significant market opportunity, but requires understanding complex multi-stakeholder needs and navigating varying state regulations for minor patient care.",
    "Task": "Write a 1-page discovery research plan to understand pediatric telehealth requirements. Use the practice requests (23 pediatric practices) and regulatory complexity to design research approach that addresses patient, parent, and provider needs. Include specific research questions about family dynamics, consent processes, and state regulation differences that must be resolved before feature development."
  },
  {
    "Ref": 39,
    "Skill": "Discovery",
    "Specialism": "Healthcare",
    "Experience": "Mid",
    "Scenario": "PharmAssist's medication management platform serves 120,000 patients with prescription tracking and adherence reminders. User research indicates 34% of users also want mental health medication support, but initial interviews revealed that mental health medication management involves significantly different privacy concerns, side effect monitoring, and care coordination needs. Mental health providers use different workflow systems and have distinct documentation requirements compared to general practitioners.",
    "Challenge": "Mental health represents growing market demand, but requires understanding sensitive patient needs and complex provider workflows that differ substantially from general medication management.",
    "Task": "Create a 2-page discovery research plan to evaluate mental health medication management expansion. Use the user interest data (34% want mental health support) and workflow complexity to design research methodology that addresses privacy requirements, provider differences, and patient sensitivity. Include specific research questions about care coordination and technical considerations for mental health medication features."
  },

  // DISCOVERY - TECHNOLOGY
  {
    "Ref": 40,
    "Skill": "Discovery",
    "Specialism": "Technology",
    "Experience": "Senior",
    "Scenario": "CodePlatform's developer tools serve 78,000 web developers, but enterprise sales teams report growing demand for mobile development features. Initial market research shows mobile developers use different programming languages, testing frameworks, and deployment processes compared to web developers. The mobile development market is dominated by platform-specific tools (iOS, Android), while CodePlatform's strength lies in cross-platform web technologies. Customer interviews reveal mixed interest in unified development platforms versus specialized mobile tools.",
    "Challenge": "Mobile development expansion could significantly grow the addressable market, but requires understanding fundamentally different developer workflows and competing against specialized mobile development platforms.",
    "Task": "Create a 3-page discovery research plan to evaluate mobile development expansion opportunity. Use the developer base (78,000 web developers) and platform differences to design research methodology that validates mobile developer needs, workflow preferences, and competitive positioning. Include specific research questions about tool selection criteria and market dynamics between unified platforms and specialized mobile tools."
  },
  {
    "Ref": 41,
    "Skill": "Discovery",
    "Specialism": "Technology",
    "Experience": "Entry",
    "Scenario": "DataSync's analytics platform primarily serves marketing teams, but 34% of customer support tickets come from users requesting features for sales analytics. Initial user interviews revealed that sales teams have different data sources, reporting needs, and success metrics compared to marketing users. The platform's current strength lies in marketing attribution and campaign analysis, while sales analytics requires CRM integration and pipeline management features.",
    "Challenge": "Sales analytics represents potential market expansion, but requires understanding different user needs and integrating with systems outside the current platform's expertise.",
    "Task": "Write a 1-page discovery research plan to investigate sales analytics opportunity. Use the support ticket data (34% requesting sales features) and user differences to design research approach that validates sales team needs, integration requirements, and market opportunity. Include specific research questions about workflow differences and technical feasibility within current platform architecture."
  },
  {
    "Ref": 42,
    "Skill": "Discovery",
    "Specialism": "Technology",
    "Experience": "Mid",
    "Scenario": "SecurityMonitor's cybersecurity platform serves mid-sized companies but receives increasing inquiries about compliance automation features from healthcare and financial services prospects. Compliance requirements involve different regulatory frameworks (HIPAA, SOX, PCI DSS) with distinct documentation, auditing, and reporting needs. The platform's current focus on threat detection and incident response differs significantly from compliance management workflows.",
    "Challenge": "Compliance automation represents high-value market opportunity in regulated industries, but requires understanding complex regulatory requirements and audit processes that differ from core security monitoring.",
    "Task": "Create a 2-page discovery research plan to evaluate compliance automation expansion. Use the industry inquiries (healthcare and financial services) and regulatory framework differences to design research methodology that addresses compliance requirements, audit workflows, and integration needs. Include specific research questions about regulatory complexity and technical feasibility for compliance features."
  },

  // DISCOVERY - MEDIA
  {
    "Ref": 43,
    "Skill": "Discovery",
    "Specialism": "Media",
    "Experience": "Senior",
    "Scenario": "ContentStudio's video production platform serves 12,000 content creators but faces growing demand for live streaming capabilities from 34% of users. Initial research revealed that live streaming involves different technical requirements, audience interaction patterns, and monetization models compared to pre-recorded content. Live streaming also requires real-time content moderation, scalable infrastructure, and integration with multiple streaming platforms. The market includes established competitors like Twitch and YouTube Live with significant resource advantages.",
    "Challenge": "Live streaming represents natural platform evolution but requires understanding real-time content creation workflows and competing against well-established platforms with massive scale advantages.",
    "Task": "Create a 3-page discovery research plan to evaluate live streaming expansion feasibility. Use the creator demand data (34% requesting live streaming) and competitive landscape to design research methodology that validates creator needs, technical requirements, and differentiation opportunities. Include specific research questions about infrastructure requirements and positioning strategies against established platforms."
  },
  {
    "Ref": 44,
    "Skill": "Discovery",
    "Specialism": "Media",
    "Experience": "Entry",
    "Scenario": "NewsDigest's content aggregation platform serves individual readers but receives requests from 67 local news organizations wanting to use the platform for content distribution. Initial conversations revealed that news organizations have different content licensing requirements, revenue sharing expectations, and editorial control needs compared to individual content consumption. Publishers also require analytics, audience insights, and integration with existing content management systems.",
    "Challenge": "Publisher partnerships could provide premium content and new revenue streams, but require understanding complex content licensing and revenue sharing models that differ from consumer-focused platform operations.",
    "Task": "Write a 1-page discovery research plan to evaluate publisher partnership opportunity. Use the publisher requests (67 local news organizations) and licensing complexity to design research approach that validates publisher needs, revenue models, and technical integration requirements. Include specific research questions about content licensing and competitive landscape for publisher-focused platforms."
  },
  {
    "Ref": 45,
    "Skill": "Discovery",
    "Specialism": "Media",
    "Experience": "Mid",
    "Scenario": "PodcastNetwork's hosting platform serves 4,500 independent podcasters but faces requests for enterprise podcasting features from corporations wanting internal communication podcasts. Corporate podcasting involves different content approval workflows, access controls, and integration requirements compared to public podcast distribution. Initial interviews revealed that corporate communication needs include employee training, company updates, and internal knowledge sharing with distinct privacy and compliance requirements.",
    "Challenge": "Corporate podcasting represents new market opportunity with potentially higher revenue per client, but requires understanding enterprise content workflows and compliance requirements that differ significantly from independent creator needs.",
    "Task": "Create a 2-page discovery research plan to evaluate corporate podcasting expansion. Use the creator base (4,500 independent podcasters) and corporate requests to design research methodology that addresses enterprise content workflows, compliance requirements, and integration needs. Include specific research questions about approval processes and technical feasibility within current platform architecture."
  },

  // DISCOVERY - AI
  {
    "Ref": 46,
    "Skill": "Discovery",
    "Specialism": "AI",
    "Experience": "Senior",
    "Scenario": "ChatBot Enterprise's clients are requesting advanced conversational AI for customer service, but user research across 15 enterprise clients revealed wildly different success metrics and use cases. Banking clients measure success by call deflection rates (target: 60% reduction), retail clients focus on sales conversion (target: 15% increase), while healthcare clients prioritize patient satisfaction scores (target: 4.5+ stars). Technical requirements vary dramatically: HIPAA compliance for healthcare, PCI DSS for finance, and real-time inventory integration for retail. Current one-size-fits-all approach satisfies none of these specialized needs.",
    "Challenge": "Product roadmap decisions must accommodate diverse client needs, but resources are limited and specialization could alienate existing clients in other industries.",
    "Task": "Create a 3-page discovery research plan to understand enterprise client segmentation needs. Use the industry variation data (banking, retail, healthcare with different success metrics) and compliance requirements to design research methodology that identifies common patterns while understanding unique industry requirements. Include specific research questions about use case frameworks and technical architecture that supports industry-specific customization."
  },
  {
    "Ref": 47,
    "Skill": "Discovery",
    "Specialism": "AI",
    "Experience": "Entry",
    "Scenario": "VoiceAssist's speech recognition platform serves call centers but receives growing inquiries about voice-controlled smart home integration from IoT device manufacturers. Smart home applications require different acoustic environments, vocabulary sets, and privacy considerations compared to call center environments. Initial research revealed that smart home users expect faster response times, offline capabilities, and integration with multiple device ecosystems (Alexa, Google Home, Apple HomeKit).",
    "Challenge": "Smart home market represents significant growth opportunity, but requires understanding consumer privacy expectations and technical requirements that differ substantially from business communication applications.",
    "Task": "Write a 1-page discovery research plan to evaluate smart home voice control expansion. Use the manufacturer inquiries and technical differences (acoustic environments, privacy requirements) to design research approach that validates consumer needs, integration challenges, and market opportunity. Include specific research questions about voice AI in consumer IoT applications and competitive landscape."
  },
  {
    "Ref": 48,
    "Skill": "Discovery",
    "Specialism": "AI",
    "Experience": "Mid",
    "Scenario": "ImageAnalytics's computer vision platform serves retail companies for inventory management but faces requests for manufacturing quality control applications from 23 industrial prospects. Manufacturing quality control involves different imaging requirements, defect detection criteria, and integration with production line systems compared to retail inventory applications. Initial facility visits revealed complex lighting conditions, high-speed processing needs, and integration with legacy manufacturing systems.",
    "Challenge": "Manufacturing represents higher-value contracts but requires understanding industrial environments and quality control processes that differ significantly from retail inventory management.",
    "Task": "Create a 2-page discovery research plan to evaluate manufacturing quality control expansion. Use the industrial prospect data (23 prospects) and technical complexity (lighting, speed, legacy integration) to design research methodology that addresses manufacturing requirements, integration challenges, and market opportunity. Include specific research questions about industrial environments and competitive landscape for manufacturing computer vision."
  },

  // DISCOVERY - RETAIL
  {
    "Ref": 49,
    "Skill": "Discovery",
    "Specialism": "Retail",
    "Experience": "Mid",
    "Scenario": "FashionForward's mobile app shows 34% cart abandonment specifically during the checkout flow, but only for orders over $150. User research revealed that customers hesitate at the shipping cost revelation, but implementing free shipping would eliminate 23% of profit margins. A/B testing of different shipping presentations showed mixed results: transparent upfront shipping increased browsing but decreased conversion, while progressive disclosure maintained conversion but increased support tickets. Customer interviews revealed price sensitivity varies significantly by geographic region and purchase category.",
    "Challenge": "The holiday shopping season approaches in 12 weeks, and the executive team needs a definitive checkout strategy that doesn't destroy profitability.",
    "Task": "Create a 2-page discovery research plan to resolve the shipping cost and cart abandonment challenge. Use the abandonment data (34% for orders >$150) and profit impact (23% margin loss with free shipping) to design research methodology that addresses regional price sensitivity and purchase behavior. Include specific research questions about checkout optimization and testing approaches that can provide conclusive results within 8 weeks before holiday season."
  },
  {
    "Ref": 50,
    "Skill": "Discovery",
    "Specialism": "Retail",
    "Experience": "Senior",
    "Scenario": "LuxuryMarket is considering expanding from high-end fashion into luxury home goods, targeting customers with household incomes above $200K. Initial surveys of 1,200 existing customers showed 68% interest, but focus groups revealed significant concerns about authenticity verification, return logistics for large items, and brand dilution. The luxury home goods market shows 23% annual growth, but requires completely different supplier relationships, quality control processes, and customer service approaches. Three competitors have failed at similar expansions in the past 18 months.",
    "Challenge": "The board wants a go/no-go decision within 10 weeks, backed by concrete evidence of market opportunity and operational feasibility.",
    "Task": "Create a 3-page discovery research plan to evaluate luxury home goods expansion feasibility. Use the customer interest data (68% from 1,200 customers) and market growth (23% annually) to design research methodology that validates market opportunity, operational requirements, and competitive differentiation. Include specific research questions about supply chain complexity, authentication processes, and decision criteria for the board recommendation within 10 weeks."
  },
  {
    "Ref": 51,
    "Skill": "Discovery",
    "Specialism": "Retail",
    "Experience": "Entry",
    "Scenario": "LocalGoods's artisan marketplace receives requests from international customers representing 23% of website traffic, but currently only ships within the United States. Initial customer surveys showed strong international demand, but research revealed complex challenges: varying import duties, different payment preferences, currency fluctuations, and international return logistics. Artisan sellers have mixed interest in international shipping due to complexity and costs.",
    "Challenge": "International expansion could significantly grow the customer base, but requires understanding complex logistics, regulations, and seller capabilities that differ greatly from domestic operations.",
    "Task": "Write a 1-page discovery research plan to evaluate international expansion opportunity. Use the traffic data (23% international) and complexity factors (duties, payments, returns) to design research approach that validates international customer needs, seller capabilities, and operational feasibility. Include specific research questions about logistics challenges and regulatory requirements for international marketplace expansion."
  },

  // DISCOVERY - FINANCE
  {
    "Ref": 52,
    "Skill": "Discovery",
    "Specialism": "Finance",
    "Experience": "Senior",
    "Scenario": "WealthPlatform's investment management tools serve individual investors but faces growing demand from financial advisors wanting white-label solutions for their clients. Advisor requirements include custom branding, client reporting integration, compliance documentation, and fee structure flexibility. Initial advisor interviews revealed different business models: fee-only advisors want transparent pricing, commission-based advisors need transaction tracking, and hybrid advisors require flexible fee structures. The platform's current self-service model differs significantly from advisor-client relationship management needs.",
    "Challenge": "Advisor partnerships could dramatically increase assets under management, but require understanding complex advisor business models and regulatory requirements that differ from direct investor relationships.",
    "Task": "Create a 3-page discovery research plan to evaluate advisor white-label expansion. Use the advisor business model diversity (fee-only, commission-based, hybrid) and current platform differences to design research methodology that addresses advisor workflows, regulatory requirements, and technical architecture needs. Include specific research questions about advisor-client relationships and competitive landscape for advisor technology solutions."
  },
  {
    "Ref": 53,
    "Skill": "Discovery",
    "Specialism": "Finance",
    "Experience": "Entry",
    "Scenario": "CryptoTracker's portfolio management app serves individual crypto investors but receives requests for business accounting features from 340 small business owners who accept cryptocurrency payments. Business crypto accounting involves different tax reporting requirements, transaction categorization, and integration with traditional accounting systems. Initial user interviews revealed that business owners need features for tracking cost basis, managing multiple wallets, and generating reports for tax compliance.",
    "Challenge": "Business crypto accounting represents growing market opportunity as more companies accept cryptocurrency, but requires understanding complex tax regulations and accounting workflows that differ from personal investment tracking.",
    "Task": "Write a 1-page discovery research plan to evaluate business crypto accounting expansion. Use the business owner requests (340 requests) and tax complexity to design research approach that validates business accounting needs, compliance requirements, and integration challenges. Include specific research questions about tax regulations and competitive landscape for business crypto financial tools."
  },
  {
    "Ref": 54,
    "Skill": "Discovery",
    "Specialism": "Finance",
    "Experience": "Mid",
    "Scenario": "PayrollPro's small business payroll platform serves companies with 2-50 employees but faces requests for contractor payment features from 45% of existing clients who also manage freelancers and consultants. Contractor payments involve different tax reporting (1099 vs W2), payment scheduling, and compliance requirements compared to employee payroll. Initial research revealed that small businesses struggle with managing mixed workforce payments and staying compliant with evolving gig economy regulations.",
    "Challenge": "Contractor payment management represents natural platform extension but requires understanding complex tax regulations and payment workflows that differ significantly from traditional employee payroll processing.",
    "Task": "Create a 2-page discovery research plan to evaluate contractor payment feature expansion. Use the client requests (45% of existing clients) and compliance complexity to design research methodology that addresses contractor payment needs, regulatory requirements, and workflow integration. Include specific research questions about tax reporting differences and competitive landscape for integrated workforce payment solutions."
  },

  // LAUNCH PLANNING - HEALTHCARE
  {
    "Ref": 55,
    "Skill": "Launch Planning",
    "Specialism": "Healthcare",
    "Experience": "Entry",
    "Scenario": "HealthRecord's patient portal is launching a new medication interaction checker feature that cross-references prescriptions with over-the-counter medications and supplements. Beta testing with 1,200 patients showed 89% found the feature helpful, but 23% received false positive warnings that caused unnecessary anxiety. The feature requires integration with 12 pharmacy systems and compliance with FDA guidelines for medical device software. Legal review identified potential liability concerns if patients rely on the checker instead of consulting healthcare providers.",
    "Challenge": "The feature provides valuable patient safety benefits but carries liability risks, and pharmacy integrations must be completed within 6 weeks to meet the planned launch date.",
    "Task": "Write a 1-page launch plan that balances patient safety benefits with liability management and technical integration requirements. Use the beta testing results (89% helpful, 23% false positives) and integration timeline to design phased rollout approach. Include user education strategy, legal disclaimers, and monitoring systems for safety outcomes with specific success metrics for patient engagement and safety."
  },
  {
    "Ref": 56,
    "Skill": "Launch Planning",
    "Specialism": "Healthcare",
    "Experience": "Mid",
    "Scenario": "MedConnect's telemedicine platform is launching in Texas, where new regulations require physician licensing verification within 24 hours, patient consent recording, and real-time prescription monitoring integration with state databases. The platform already operates in 12 states but Texas regulations are uniquely complex. Clinical staff must complete 8 hours of telehealth training, and the platform needs integration with 47 different hospital systems across Texas. Competitors have delayed their Texas launches by 6-12 months due to compliance complexity.",
    "Challenge": "Regulatory requirements conflict with rapid market entry goals, and any compliance failures could trigger investigations that halt operations in all states.",
    "Task": "Create a 2-page Texas launch strategy that ensures full regulatory compliance while maintaining competitive timing. Use the regulatory complexity (24-hour licensing verification, 47 hospital integrations) and competitor delays (6-12 months) to design compliance-first rollout approach. Include staff training programs, integration testing protocols, and rollout phases that minimize risk while demonstrating market traction with success metrics that balance growth targets with regulatory adherence."
  },
  {
    "Ref": 57,
    "Skill": "Launch Planning",
    "Specialism": "Healthcare",
    "Experience": "Senior",
    "Scenario": "BioAnalytics's AI-powered diagnostic imaging platform is launching FDA-approved lung cancer detection capabilities for radiologists. The system demonstrates 94% accuracy in clinical trials, but requires extensive radiologist training and workflow integration with existing imaging systems. Initial pilot deployments at 5 hospitals revealed varying adoption rates based on radiologist experience levels and existing workflow patterns. Insurance reimbursement for AI-assisted diagnostics varies by provider and requires pre-authorization in many cases.",
    "Challenge": "Clinical efficacy is proven, but successful adoption depends on radiologist training, workflow integration, and insurance reimbursement complexity that varies significantly across healthcare systems.",
    "Task": "Create a 3-page comprehensive launch strategy that addresses radiologist training, workflow integration, and reimbursement challenges. Use the clinical trial data (94% accuracy) and pilot deployment variations to design adoption-focused rollout approach. Include training programs for different radiologist experience levels, workflow integration protocols, and insurance approval processes with success metrics that measure both diagnostic accuracy and clinical workflow efficiency."
  },

  // LAUNCH PLANNING - TECHNOLOGY
  {
    "Ref": 58,
    "Skill": "Launch Planning",
    "Specialism": "Technology",
    "Experience": "Senior",
    "Scenario": "CloudInfra's new serverless computing platform is launching with advanced auto-scaling capabilities that competitors lack, but early testing revealed performance inconsistencies under high traffic loads. The platform excels at cost optimization, reducing customer infrastructure costs by an average of 34%, but 12% of beta users experienced latency spikes during traffic surges. Marketing has planned a major launch campaign around performance superiority, and sales teams have already secured commitments from 23 enterprise prospects based on performance promises.",
    "Challenge": "Performance issues could damage credibility with enterprise customers and contradict marketing claims, but delaying launch would allow competitors to close the feature gap and affect committed sales prospects.",
    "Task": "Create a 3-page launch strategy that manages performance expectations while delivering on cost optimization benefits. Use the performance data (34% cost reduction, 12% experiencing latency spikes) and enterprise commitments to design risk-managed rollout approach. Include monitoring protocols for performance issues, phased enterprise deployment that minimizes risk exposure, and success metrics that balance performance reliability with customer satisfaction."
  },
  {
    "Ref": 59,
    "Skill": "Launch Planning",
    "Specialism": "Technology",
    "Experience": "Entry",
    "Scenario": "DevTools's new code collaboration platform is launching with real-time editing capabilities similar to Google Docs but for programming. Beta testing with 340 developers showed strong engagement, but 23% experienced synchronization conflicts that required manual resolution. The platform's unique strength is language-specific collaboration features, but enterprise prospects require integration with existing development tools that aren't fully tested. Competitors are rapidly developing similar real-time coding features.",
    "Challenge": "The platform offers innovative collaboration capabilities but synchronization issues could frustrate early adopters, while enterprise integration requirements are complex and not fully validated.",
    "Task": "Write a 1-page launch approach that highlights collaboration innovation while managing synchronization reliability expectations. Use the beta testing data (strong engagement, 23% sync conflicts) and competitive pressure to design rollout phases that address integration challenges systematically. Include user education programs for conflict resolution and monitoring systems for collaboration effectiveness."
  },
  {
    "Ref": 60,
    "Skill": "Launch Planning",
    "Specialism": "Technology",
    "Experience": "Mid",
    "Scenario": "DataSecure's encryption platform is launching quantum-resistant security features ahead of anticipated quantum computing threats. The platform provides future-proof encryption but requires significant computational resources that increase customer infrastructure costs by 15-25%. Early adopters in financial services and government sectors are interested, but mainstream enterprise customers question the immediate necessity given current quantum computing limitations. Regulatory frameworks for quantum-resistant encryption are still evolving.",
    "Challenge": "The platform offers leading-edge security capabilities but increased costs and unclear regulatory requirements may limit adoption beyond security-conscious early adopters.",
    "Task": "Create a 2-page launch strategy that positions quantum-resistant encryption as forward-thinking investment while addressing cost concerns and regulatory uncertainty. Use the cost impact data (15-25% infrastructure increase) and sector interest (financial services, government) to design market education and pricing approaches. Include adoption metrics across different customer segments and regulatory compliance considerations."
  },

  // LAUNCH PLANNING - MEDIA
  {
    "Ref": 61,
    "Skill": "Launch Planning",
    "Specialism": "Media",
    "Experience": "Senior",
    "Scenario": "StreamPlatform's new interactive live streaming feature allows viewers to influence content in real-time through polls and challenges. Beta testing with 150 streamers showed 67% higher viewer engagement, but also revealed content moderation challenges as interactive features can lead to inappropriate viewer requests. The platform's automated moderation catches 78% of problematic content, but human review is required for complex interactive scenarios. Competitors are developing similar features, and delaying launch could sacrifice first-mover advantage.",
    "Challenge": "Interactive features drive significant engagement improvements but create content moderation complexity that could expose the platform to inappropriate content and regulatory scrutiny.",
    "Task": "Create a 3-page launch strategy that maximizes engagement benefits while ensuring content safety and regulatory compliance. Use the engagement data (67% higher) and moderation effectiveness (78% automated detection) to design safety-first rollout approach. Include moderation workflows for interactive content, streamer education programs for managing viewer interactions, and monitoring systems for content quality and platform safety."
  },
  {
    "Ref": 62,
    "Skill": "Launch Planning",
    "Specialism": "Media",
    "Experience": "Entry",
    "Scenario": "PodcastPro's new AI-powered audio enhancement feature automatically removes background noise and improves voice clarity for amateur podcasters. Beta testing with 240 creators showed 85% improvement in audio quality ratings, but 15% of processed audio had artificial-sounding artifacts that affected listening experience. The feature significantly reduces editing time for creators, but audio purists prefer manual control over automated processing. Marketing has positioned the feature as 'professional quality for everyone.'",
    "Challenge": "The feature provides significant value for amateur creators but audio artifacts could damage professional reputation for quality-focused podcasters, while marketing promises may exceed current technical capabilities.",
    "Task": "Write a 1-page launch approach that targets appropriate creator segments while managing quality expectations. Use the beta testing results (85% improvement, 15% artifacts) and positioning challenges to design segmented rollout strategy. Include user education about feature limitations and optimal use cases, quality control measures for audio processing, and success metrics that balance automation benefits with audio quality standards."
  },
  {
    "Ref": 63,
    "Skill": "Launch Planning",
    "Specialism": "Media",
    "Experience": "Mid",
    "Scenario": "NewsNetwork's personalized news recommendation algorithm is launching with bias detection features that warn readers about potentially biased content sources. Internal testing showed the algorithm identifies political bias with 73% accuracy, but 27% of warnings were contested by news organizations who claim their reporting is objective. The feature aims to improve media literacy, but could damage relationships with content partners and face criticism from news organizations across the political spectrum.",
    "Challenge": "Bias detection serves important media literacy goals but could create conflicts with content partners and face political criticism from organizations that disagree with bias assessments.",
    "Task": "Create a 2-page launch strategy that promotes media literacy while maintaining content partner relationships and managing political sensitivities. Use the accuracy data (73% bias detection) and partner concerns (27% contested warnings) to design diplomatic rollout approach. Include transparency measures for bias detection methodology, content partner communication strategies, and success metrics that balance user education with platform neutrality."
  },

  // LAUNCH PLANNING - AI
  {
    "Ref": 64,
    "Skill": "Launch Planning",
    "Specialism": "AI",
    "Experience": "Senior",
    "Scenario": "AIRecruit's automated resume screening platform is launching advanced bias detection that identifies and corrects for demographic discrimination in hiring decisions. The system reduces hiring bias by 43% compared to human-only screening, but generates false positives in 18% of cases where legitimate qualifications correlate with demographic factors. EEOC compliance requires demonstrating that AI systems don't perpetuate discrimination, but proving algorithmic fairness is complex and legally evolving. HR departments are eager for bias reduction but concerned about legal liability.",
    "Challenge": "The platform addresses critical fairness issues in hiring but algorithmic bias detection creates new legal complexities and potential liability for both the platform and client companies.",
    "Task": "Create a 3-page launch strategy that positions AI bias detection as hiring improvement while managing legal risks and compliance requirements. Use the bias reduction data (43% improvement) and false positive rates (18%) to design legally defensible rollout approach. Include documentation and training programs for HR teams, audit trails for algorithmic decisions, and success metrics that demonstrate fairness improvements while maintaining legal defensibility."
  },
  {
    "Ref": 65,
    "Skill": "Launch Planning",
    "Specialism": "AI",
    "Experience": "Entry",
    "Scenario": "ChatAssist's customer service AI is launching emotion detection capabilities that adjust responses based on customer sentiment analysis. Beta testing showed 34% improvement in customer satisfaction when the AI detected frustration and escalated to human agents. However, 12% of customers expressed privacy concerns about emotion monitoring, and the system occasionally misinterprets sarcasm or cultural communication styles as negative emotions. Customer service teams appreciate automated escalation but worry about over-relying on AI emotional intelligence.",
    "Challenge": "Emotion detection improves customer experience but raises privacy concerns and cultural sensitivity issues that could affect customer trust and international expansion.",
    "Task": "Write a 1-page launch approach that highlights customer experience benefits while addressing privacy concerns and cultural sensitivity. Use the satisfaction improvement data (34%) and privacy concerns (12% of customers) to design transparent rollout strategy. Include transparency measures for emotion detection, opt-out mechanisms for privacy-conscious customers, and monitoring systems for cultural bias in sentiment analysis."
  },
  {
    "Ref": 66,
    "Skill": "Launch Planning",
    "Specialism": "AI",
    "Experience": "Mid",
    "Scenario": "PredictiveMaintenance's AI platform is launching predictive failure detection for manufacturing equipment that promises to reduce unplanned downtime by 45%. Beta testing with 12 manufacturing facilities achieved promised results, but required 3-6 months of data collection before predictions became accurate. The platform's value proposition depends on preventing costly equipment failures, but manufacturers are skeptical about ROI during the initial data collection period when predictions aren't yet reliable.",
    "Challenge": "The platform delivers significant long-term value but requires substantial upfront investment in data collection and system integration before benefits become apparent, creating adoption barriers for cost-conscious manufacturers.",
    "Task": "Create a 2-page launch strategy that addresses manufacturer ROI concerns during the initial data collection period. Use the downtime reduction promise (45%) and data collection timeline (3-6 months) to design value-demonstration approach. Include phased value realization strategies, pricing models that align with benefit timelines, and success metrics that show progress toward predictive accuracy during the learning phase."
  },

  // LAUNCH PLANNING - RETAIL
  {
    "Ref": 67,
    "Skill": "Launch Planning",
    "Specialism": "Retail",
    "Experience": "Senior",
    "Scenario": "FashionAI's trend prediction platform is launching advanced forecasting that predicts fashion trends 8-12 months ahead using social media analysis and runway data. Beta testing with 15 fashion brands showed 73% accuracy in trend predictions, but required significant changes to existing design and production schedules to capitalize on insights. The platform's predictions often contradict established industry intuition, and fashion executives struggle to balance AI recommendations with creative expertise. Implementation requires coordination across design, production, and marketing teams.",
    "Challenge": "Accurate trend prediction provides competitive advantage but requires fundamental changes to fashion industry workflows and challenges traditional design decision-making processes.",
    "Task": "Create a 3-page launch strategy that demonstrates AI trend prediction value while respecting traditional fashion industry expertise and workflow constraints. Use the prediction accuracy (73%) and workflow impact to design change management approach for cross-functional adoption. Include integration guides for existing production cycles, training for balancing AI insights with creative expertise, and success metrics that balance prediction accuracy with business impact."
  },
  {
    "Ref": 68,
    "Skill": "Launch Planning",
    "Specialism": "Retail",
    "Experience": "Entry",
    "Scenario": "LocalShop's inventory management app is launching automated reordering features for small retailers that use sales data and seasonal patterns to optimize stock levels. Beta testing with 89 stores reduced stockouts by 34% and overstock by 28%, but 15% of retailers experienced ordering errors due to unexpected events like local festivals or weather changes that the algorithm couldn't predict. Small retailers appreciate automation but worry about losing control over purchasing decisions and supplier relationships.",
    "Challenge": "Automated reordering provides inventory optimization benefits but removes human judgment that small retailers value for handling local market conditions and maintaining supplier relationships.",
    "Task": "Write a 1-page launch approach that balances automation benefits with retailer control preferences. Use the optimization results (34% stockout reduction, 28% overstock reduction) and error rates (15% unexpected events) to design flexible automation strategy. Include override mechanisms for special circumstances, supplier relationship management features, and monitoring systems for ordering accuracy and retailer satisfaction."
  },
  {
    "Ref": 69,
    "Skill": "Launch Planning",
    "Specialism": "Retail",
    "Experience": "Mid",
    "Scenario": "EcomPersonalize's AI recommendation engine is launching hyper-personalized product suggestions that increase conversion rates by 43% but require extensive customer data collection including browsing behavior, purchase history, and demographic information. Beta testing showed strong performance improvements, but 23% of customers expressed privacy concerns about data usage, and GDPR compliance requires complex consent management across international markets. The platform's competitive advantage depends on data comprehensiveness, but privacy regulations limit data collection approaches.",
    "Challenge": "Personalization effectiveness requires extensive data collection that conflicts with growing privacy concerns and regulatory requirements, while competitive advantage depends on data depth that may not be sustainable under privacy constraints.",
    "Task": "Create a 2-page launch strategy that maximizes personalization benefits while ensuring privacy compliance and addressing customer concerns. Use the conversion improvement (43%) and privacy concerns (23% of customers) to design privacy-first personalization approach. Include transparent data usage communications, consent management systems for international markets, and success metrics that balance personalization effectiveness with privacy compliance."
  },

  // LAUNCH PLANNING - FINANCE
  {
    "Ref": 70,
    "Skill": "Launch Planning",
    "Specialism": "Finance",
    "Experience": "Entry",
    "Scenario": "CreditBuilder's new 'Credit Score Boost' feature uses alternative data (rent payments, utility bills) to improve credit scores for users with thin credit files. Beta testing with 2,400 users showed 73% experienced score increases, but regulatory feedback indicates potential FCRA compliance concerns about data verification. The marketing team wants to launch during 'Financial Literacy Month' in 6 weeks to maximize PR impact, but the legal team recommends a 12-week compliance review. Competitors are aggressively promoting similar features, and delaying could cost significant market share.",
    "Challenge": "The feature could help thousands of underbanked users, but regulatory missteps could result in $2M+ fines and damage the company's reputation with credit bureaus.",
    "Task": "Write a 1-page launch strategy that balances regulatory compliance with market timing. Use the beta testing results (73% score increases) and regulatory risks to design compliance-first launch approach. Include phased rollout plan that addresses legal concerns while capturing market opportunity, monitoring systems for compliance metrics and user outcomes, and contingency plans for regulatory challenges."
  },
  {
    "Ref": 71,
    "Skill": "Launch Planning",
    "Specialism": "Finance",
    "Experience": "Senior",
    "Scenario": "InvestPro's AI-powered portfolio management platform is launching automated crypto trading for accredited investors. The system managed $50M in traditional assets during beta with 12% annual returns, but crypto regulations are evolving rapidly across states. California requires additional disclosures, New York mandates cooling-off periods, and Texas has no specific requirements. The SEC is reviewing similar platforms, and your compliance team identified 23 different state-level regulatory considerations. Early access clients (managing $200M total) are pressuring for immediate launch.",
    "Challenge": "Crypto markets are highly volatile, and delaying launch during a bull market could cost millions in potential AUM, but regulatory violations could shut down the entire platform.",
    "Task": "Create a 3-page comprehensive launch strategy that navigates complex regulatory environments while maximizing market opportunity. Use the beta performance ($50M managed, 12% returns) and regulatory complexity (23 state considerations) to design state-by-state compliance approach. Include regulatory frameworks, risk monitoring systems, and stakeholder communication plans with success metrics that balance growth targets with compliance requirements."
  },
  {
    "Ref": 72,
    "Skill": "Launch Planning",
    "Specialism": "Finance",
    "Experience": "Mid",
    "Scenario": "TaxOptimize's automated tax preparation software is launching AI-powered audit risk assessment that warns users about deductions likely to trigger IRS scrutiny. The system reduces audit risk by 34% compared to standard tax preparation, but 12% of legitimate deductions are flagged as risky, potentially causing users to miss valid tax savings. CPAs beta testing the system appreciate audit risk insights but worry about AI recommendations overriding professional tax judgment. The IRS hasn't officially endorsed AI tax preparation tools.",
    "Challenge": "Audit risk reduction provides valuable protection but may cause users to miss legitimate tax benefits, while lack of official IRS guidance creates uncertainty about AI tax advice liability.",
    "Task": "Create a 2-page launch strategy that positions audit risk assessment as decision support rather than definitive tax advice. Use the risk reduction data (34% audit risk reduction) and false flag rates (12% legitimate deductions flagged) to design professional collaboration approach. Include CPA partnership features that balance AI insights with professional judgment, liability protection measures, and success metrics that measure both audit protection and tax optimization outcomes."
  },

  // METRICS - HEALTHCARE
  {
    "Ref": 73,
    "Skill": "Metrics",
    "Specialism": "Healthcare",
    "Experience": "Senior",
    "Scenario": "HealthPlatform's integrated EHR system serves 234 medical practices with patient engagement and clinical workflow features. Recent analytics show 89% physician satisfaction with clinical features but only 34% patient engagement with portal features. Patient portal usage varies dramatically by age: 18-35 age group shows 67% engagement while 65+ shows 12% engagement. Clinical efficiency metrics improved 23% for physicians, but patient satisfaction scores remained flat despite new communication tools. The platform's ROI calculations emphasize physician productivity, but healthcare reimbursement increasingly ties payments to patient experience scores.",
    "Challenge": "Strong physician adoption doesn't translate to patient engagement, while evolving healthcare payment models require patient experience metrics that current measurement systems don't adequately capture.",
    "Task": "Create a 3-page metrics framework that captures the relationship between physician efficiency, patient engagement, and healthcare outcomes. Use the satisfaction disparities (89% physician vs 34% patient engagement) and age variation (67% young vs 12% senior engagement) to design measurement approach that accounts for demographic differences and clinical complexity. Include balanced scorecards that align physician productivity improvements with patient satisfaction and healthcare quality metrics."
  },
  {
    "Ref": 74,
    "Skill": "Metrics",
    "Specialism": "Healthcare",
    "Experience": "Entry",
    "Scenario": "MedTracker's medication adherence app shows strong usage metrics (4.2 sessions per week average) but mixed clinical outcomes across different patient populations. Diabetes patients show 45% improvement in medication adherence, while heart disease patients show only 12% improvement. The app's gamification features drive high engagement among younger patients but don't translate to adherence improvements for chronic conditions requiring long-term behavioral change. Healthcare providers want evidence that app usage leads to better health outcomes, not just higher engagement.",
    "Challenge": "High user engagement doesn't correlate with clinical effectiveness across all patient types, and healthcare providers need evidence of health outcomes rather than app usage metrics.",
    "Task": "Write a 1-page measurement framework that connects app engagement with clinical outcomes across different patient populations and medical conditions. Use the adherence variation (45% diabetes vs 12% heart disease improvement) and engagement patterns to design metrics that healthcare providers can use to evaluate app effectiveness. Include reporting systems that demonstrate health value rather than just technology adoption."
  },
  {
    "Ref": 75,
    "Skill": "Metrics",
    "Specialism": "Healthcare",
    "Experience": "Mid",
    "Scenario": "TeleHealth Connect's virtual consultation platform serves 450,000 patients across 12 states with 89% technical satisfaction scores but inconsistent clinical outcome measurement. Patient satisfaction with video quality and appointment scheduling is high, but measuring healthcare quality in virtual settings proves challenging compared to in-person visits. Some specialties (dermatology, psychiatry) show outcomes equivalent to in-person care, while others (cardiology, orthopedics) struggle with diagnostic limitations of virtual consultations. Insurance reimbursement increasingly requires demonstrating clinical effectiveness, not just patient convenience.",
    "Challenge": "Technology performance metrics don't capture clinical effectiveness variations across medical specialties, while reimbursement requires proving healthcare quality rather than patient satisfaction with technology.",
    "Task": "Create a 2-page metrics framework that measures clinical effectiveness of virtual care across different medical specialties and patient conditions. Use the specialty variation (dermatology/psychiatry equivalent vs cardiology/orthopedics limited) and reimbursement requirements to design outcome measurement approaches that account for virtual consultation limitations while demonstrating healthcare value. Include reporting systems that support insurance reimbursement requirements."
  },

  // METRICS - TECHNOLOGY
  {
    "Ref": 76,
    "Skill": "Metrics",
    "Specialism": "Technology",
    "Experience": "Senior",
    "Scenario": "DevTools Pro's API platform serves 12,000+ developers across 400 companies, but monthly churn has increased from 3% to 8% despite shipping 23 new features in the past quarter. Usage analytics show developers initially engage heavily (averaging 847 API calls daily) but activity drops to 23 calls daily after 6 weeks. Exit interviews reveal frustration with inconsistent response times, unclear error messages, and lack of debugging tools. However, power users (top 5% by usage) show 98% retention and generate 67% of revenue.",
    "Challenge": "Engineering continues shipping features based on developer requests, but business metrics suggest overall developer satisfaction is declining despite feature growth.",
    "Task": "Create a 3-page comprehensive metrics framework that captures developer experience beyond usage statistics. Use the engagement patterns (847 to 23 daily API calls decline) and power user concentration (5% users generate 67% revenue) to design measurement systems that identify leading indicators of churn and correlate feature usage with business outcomes. Include developer health scores that predict retention and guide product investment decisions."
  },
  {
    "Ref": 77,
    "Skill": "Metrics",
    "Specialism": "Technology",
    "Experience": "Entry",
    "Scenario": "CloudSync's file storage platform has 340,000 users with strong growth metrics (23% monthly increase) but concerning usage patterns that suggest poor user onboarding. 67% of new users upload files in their first week but only 23% return for a second session. Average session duration is 2.3 minutes, indicating users complete basic tasks but don't explore advanced features. Customer support tickets focus on basic functionality questions that should be addressed during onboarding. Free tier users rarely convert to paid plans (1.2% conversion rate).",
    "Challenge": "Growth metrics look positive but user behavior suggests fundamental onboarding and feature adoption problems that could affect long-term platform success and revenue generation.",
    "Task": "Write a 1-page measurement framework that identifies onboarding effectiveness and feature adoption patterns. Use the usage decline (67% to 23% return rate) and conversion data (1.2% free to paid) to design user journey analytics that pinpoint where users struggle with platform capabilities. Include metrics that predict long-term user success and conversion potential based on early usage patterns."
  },
  {
    "Ref": 78,
    "Skill": "Metrics",
    "Specialism": "Technology",
    "Experience": "Mid",
    "Scenario": "SecurityShield's cybersecurity platform protects 2,300 companies but faces challenges measuring actual security effectiveness beyond technical metrics. The platform blocks 99.7% of known threats and detects anomalies within 3.2 minutes average, but customers struggle to quantify business value and ROI. Some customers experience security incidents despite platform protection, while others see significant risk reduction. Customer renewals correlate more with perceived security confidence than technical security metrics, but confidence doesn't always align with actual threat protection.",
    "Challenge": "Technical security metrics don't translate effectively to business value measurement, while customer perception of security effectiveness influences purchasing decisions more than actual threat protection statistics.",
    "Task": "Create a 2-page metrics framework that connects technical security performance with business impact and customer confidence. Use the performance data (99.7% threat blocking, 3.2 minute detection) and renewal correlation with confidence over metrics to design measurement approaches that demonstrate ROI and risk reduction in business terms. Include reporting systems that help customers understand security value beyond technical statistics."
  }
];


// FINAL COUNT: 78 unique challenges across all skill/industry/experience combinations
// Each scenario includes specific data points, realistic business challenges, and actionable tasks
// All challenges follow the quality standards: unique situations, rich context, and specific deliverables

const skillOptions = ["Strategy", "Prioritisation", "Discovery", "Launch Planning", "Metrics"];
const industryOptions = ["Healthcare", "Technology", "Media", "AI", "Retail", "Finance"];
const experienceOptions = ["Entry", "Mid", "Senior"];

// Filter Dropdown Component matching your exact designs
function FilterDropdown({ label, options, selectedValues, onSelectionChange, multiSelect = false }: {
  label: string;
  options: string[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  multiSelect?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option: string) => {
    if (multiSelect) {
      const newValues = selectedValues.includes(option)
        ? selectedValues.filter(v => v !== option)
        : [...selectedValues, option];
      onSelectionChange(newValues);
    } else {
      onSelectionChange(selectedValues.includes(option) ? [] : [option]);
      setIsOpen(false);
    }
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return label;
    }
    
    if (multiSelect) {
      if (selectedValues.length === 1) {
        return selectedValues[0];
      }
      return `${selectedValues.length} selected`;
    } else {
      return selectedValues[0];
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`min-w-[160px] px-4 py-2.5 bg-white border rounded text-left flex justify-between items-center transition-colors text-sm font-medium cursor-pointer focus:border-teal-400 focus:outline-none ${
  selectedValues.length > 0
    ? 'border-teal-400 text-gray-900'
    : 'border-gray-300 text-gray-700 hover:border-teal-400'
}`}
      >
        <span className="truncate pr-2">{getDisplayText()}</span>
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 py-1">
          {options.map((option) => (
            <label
              key={option}
              className={`flex items-center px-4 py-2 cursor-pointer text-sm transition-colors ${
                selectedValues.includes(option) 
                  ? 'bg-teal-400 text-white' 
                  : 'text-gray-700 hover:bg-teal-100 hover:text-teal-700'
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <input
                type={multiSelect ? 'checkbox' : 'radio'}
                className="mr-3 w-4 h-4 text-teal-600"
                checked={selectedValues.includes(option)}
                onChange={() => {}}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [activeTab, setActiveTab] = useState<'scenario' | 'challenge' | 'task'>('scenario');
  const [showMission, setShowMission] = useState(false);

  const filterChallenges = (): Challenge[] => {
    const filtered = challengeData.filter(challenge => {
      const skillMatch = selectedSkills.length === 0 || selectedSkills.includes(challenge.Skill);
      const industryMatch = selectedIndustry.length === 0 || selectedIndustry.includes(challenge.Specialism);
      const experienceMatch = selectedExperience.length === 0 || selectedExperience.includes(challenge.Experience);
      
      return skillMatch && industryMatch && experienceMatch;
    });

    if (filtered.length === 0) {
      return challengeData;
    }
    return filtered;
  };

  const generateNewChallenge = () => {
    const availableChallenges = filterChallenges();
    const randomIndex = Math.floor(Math.random() * availableChallenges.length);
    setCurrentChallenge(availableChallenges[randomIndex]);
    setActiveTab('scenario');
  };

  const getTabContent = () => {
    if (!currentChallenge) return '';
    switch (activeTab) {
      case 'scenario': return currentChallenge.Scenario;
      case 'challenge': return currentChallenge.Challenge;
      case 'task': return currentChallenge.Task;
      default: return '';
    }
  };
if (showMission) {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#fdfce9'}}>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setShowMission(false)}
              className="text-xl font-semibold tracking-wide text-gray-900 hover:text-gray-700 transition-colors cursor-pointer"
            >
              MVPBRIEF
            </button>
            <div className="hidden md:block text-sm text-gray-600 font-medium">Real-world Product challenges</div>
            <button 
              onClick={() => setShowMission(false)}
              className="text-sm text-teal-600 font-medium hover:text-teal-700 transition-colors cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          
          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>Hi,</p>
            
            <p>MVPBrief sparked as a frustration I had early on as an aspiring product manager. All I wanted to do was practice outside of work or prepare for interview exercises, but nothing existed.</p>
            
            <p>This is and always will be a FREE tool. It's designed to be simple, just select the filters and hit "generate", to see a realistic challenge you can take on offline.</p>
            
            <p>Hope it helps you in some form and good luck! It's my small contribution to a fantastic community!</p>
            
            <p>Always open to connect or to receive feedback on MVPBrief: find me on <a href="https://www.linkedin.com/in/nicholas-osorio-okraku-5a184277/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">LinkedIn</a></p>
            
            <p>Nick</p>
          </div>
        </div>
      </main>
    </div>
  );
}

  return (
    <div className="min-h-screen" style={{backgroundColor: '#fdfce9'}}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold tracking-wide text-gray-900">MVPBRIEF</h1>
            <div className="hidden md:block text-sm text-gray-600 font-medium">Real-world Product challenges</div>
            <button onClick={() => setShowMission(true)} className="text-sm text-teal-600 font-medium hover:text-teal-700 transition-colors cursor-pointer">
              Mission
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <FilterDropdown
            label="SKILL"
            options={skillOptions}
            selectedValues={selectedSkills}
            onSelectionChange={setSelectedSkills}
            multiSelect={true}
          />
          <FilterDropdown
            label="INDUSTRY"
            options={industryOptions}
            selectedValues={selectedIndustry}
            onSelectionChange={setSelectedIndustry}
            multiSelect={false}
          />
          <FilterDropdown
            label="EXPERIENCE"
            options={experienceOptions}
            selectedValues={selectedExperience}
            onSelectionChange={setSelectedExperience}
            multiSelect={false}
          />
        </div>

        {/* New Challenge Button */}
        <div className="mb-8">
          <button
            onClick={generateNewChallenge}
            className="bg-black text-white px-8 py-3 rounded-md font-medium text-sm tracking-wide hover:bg-gray-800 transition-all cursor-pointer transform hover:translate-x-1"
          >
            NEW CHALLENGE
          </button>
        </div>

        {/* Challenge Content */}
        {currentChallenge ? (
          <div className="bg-white rounded-lg shadow-sm">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex">
                {[
                  { id: 'scenario', label: 'Scenario', icon: '🔍' },
                  { id: 'challenge', label: 'Challenge', icon: '🧠' },
                  { id: 'task', label: 'Task', icon: '✏️' }
                ].map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'scenario' | 'challenge' | 'task')}
                    className={`flex-1 px-6 py-4 text-center font-medium text-sm transition-all cursor-pointer ${
                      index < 2 ? 'border-r border-gray-200' : ''
                    } ${
                      activeTab === tab.id 
                        ? 'text-gray-900 bg-gray-50 border-b-2 border-teal-400' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-base">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Today's brief</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-base">
                  {getTabContent()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Default State */
          <div className="text-center py-20">
            <div className="text-6xl mb-6" role="img" aria-label="Search">🔍</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Choose some filters and start a new challenge!
            </h2>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Select your skill areas, industry focus, and experience level above, then click "NEW CHALLENGE"
            </p>
          </div>
        )}
      </main>
    </div>
  );
}