
import { DecisionData } from '../types';

export const decisionsData: DecisionData[] = [
  {
    number: 1,
    title: "Team Building Strategy",
    description: "As the new Area Manager for Mars Inc. entering the Indian chocolate market, your first critical decision is building your sales team. The Indian market is dominated by established players like Cadbury, and your team selection will determine your market entry success. Consider the trade-offs between experience, cost, and cultural fit.",
    timeLimit: 1800, // 30 minutes
    day: 1,
    options: [
      {
        id: "a",
        text: "Poach best salesmen from Cadbury",
        description: "Recruit top performers from the market leader with deep chocolate category knowledge",
        score: 15,
        reasoning: "High cost but immediate market penetration capabilities"
      },
      {
        id: "b", 
        text: "Recruit experienced from other food/non-food brands",
        description: "Hire seasoned sales professionals from adjacent categories",
        score: 12,
        reasoning: "Good experience but requires learning curve for chocolate category"
      },
      {
        id: "c",
        text: "Build team of freshers & moderate experience", 
        description: "Cost-effective mix of new graduates and mid-level professionals",
        score: 8,
        reasoning: "Cost effective but slow ramp-up and market learning"
      },
      {
        id: "d",
        text: "Mix of experienced, moderate, and freshers from food brands",
        description: "Balanced approach with varied experience levels from relevant categories",
        score: 20,
        reasoning: "Optimal balance for sustainable growth and knowledge transfer"
      }
    ]
  },
  {
    number: 2,
    title: "Team Size & Compensation Strategy",
    description: "With your team building approach decided, you now need to determine the optimal team size and compensation structure. The Indian market requires extensive coverage, but budget constraints and motivation factors must be balanced. Your decision will impact both market reach and individual performance.",
    timeLimit: 1800, // 30 minutes
    day: 2,
    options: [
      {
        id: "a",
        text: "50 Salesmen at ₹20,000 average salary",
        description: "Large team with basic compensation for maximum market coverage",
        score: 12,
        reasoning: "Wide coverage but lower individual motivation due to basic pay"
      },
      {
        id: "b",
        text: "40 Salesmen at ₹25,000 average salary", 
        description: "Balanced team size with competitive market-rate compensation",
        score: 18,
        reasoning: "Optimal balance of coverage and motivation for performance"
      },
      {
        id: "c",
        text: "30 Salesmen at ₹30,000 average salary",
        description: "Smaller premium team with above-market compensation",
        score: 15,
        reasoning: "High individual quality but limited market coverage"
      },
      {
        id: "d",
        text: "Pyramid structure with top 20% earning premium",
        description: "Performance-based tiered compensation motivating excellence",
        score: 20,
        reasoning: "Creates strong performance culture and internal competition"
      }
    ]
  },
  {
    number: 3,
    title: "Distributor Selection Strategy",
    description: "Your third critical decision involves selecting the right distribution partner. In India's complex distribution landscape, your choice will determine product availability, market reach, and quality control. Each option presents different trade-offs between experience, focus, and operational excellence.",
    timeLimit: 1800, // 30 minutes
    day: 3,
    options: [
      {
        id: "a",
        text: "Big experienced related category distributor",
        description: "Established player with chocolate/confectionery experience but quality concerns",
        score: 10,
        reasoning: "Strong existing network but potential quality management issues"
      },
      {
        id: "b",
        text: "Big experienced unrelated category distributor",
        description: "Large distributor with financial strength but from different categories", 
        score: 8,
        reasoning: "Financial stability but lack of category-specific expertise"
      },
      {
        id: "c",
        text: "Mid-size related category distributor (quality focused)",
        description: "Medium-scale distributor with chocolate experience and quality emphasis",
        score: 25,
        reasoning: "Perfect balance of category expertise and quality management focus"
      },
      {
        id: "d", 
        text: "Fresh distributor with no experience (quality focused)",
        description: "New player committed to quality but lacking market knowledge",
        score: 12,
        reasoning: "Quality assured but significant market knowledge and network gaps"
      },
      {
        id: "e",
        text: "Fresh distributor with personal experience (quality focused)",
        description: "Individual with industry background starting own distribution",
        score: 20,
        reasoning: "Good compromise with personal expertise and fresh quality focus"
      }
    ]
  },
  {
    number: 4,
    title: "Product Portfolio Strategy",
    description: "Now you must decide which Mars products to launch first in the Indian market. Your portfolio choice will determine initial market positioning, resource allocation, and competitive response. Consider local preferences, manufacturing capabilities, and market penetration strategies.",
    timeLimit: 1800, // 30 minutes
    day: 4,
    options: [
      {
        id: "a",
        text: "Launch full global portfolio simultaneously",
        description: "Introduce all Mars brands (Snickers, Mars, Twix, etc.) at once for maximum impact",
        score: 10,
        reasoning: "High visibility but resource strain and market confusion"
      },
      {
        id: "b",
        text: "Focus on premium brands first (Snickers, Mars)",
        description: "Start with established premium brands to build market credibility",
        score: 18,
        reasoning: "Strong brand equity but limited market reach initially"
      },
      {
        id: "c",
        text: "Launch affordable variants first",
        description: "Introduce price-accessible versions to capture mass market",
        score: 15,
        reasoning: "Broad market appeal but potential brand dilution"
      },
      {
        id: "d",
        text: "Phased launch starting with one hero brand",
        description: "Focus all resources on establishing one strong brand before expanding",
        score: 25,
        reasoning: "Concentrated effort ensures strong market establishment"
      }
    ]
  },
  {
    number: 5,
    title: "Pricing Strategy",
    description: "Your pricing decision will determine market positioning and competitive dynamics. You must balance profitability with market penetration in a price-sensitive Indian market dominated by established players with strong pricing power.",
    timeLimit: 1800, // 30 minutes
    day: 5,
    options: [
      {
        id: "a",
        text: "Premium pricing to match global positioning",
        description: "Price above Cadbury to establish premium market position",
        score: 12,
        reasoning: "Strong margins but limited market penetration"
      },
      {
        id: "b",
        text: "Competitive pricing at par with Cadbury",
        description: "Match market leader's pricing for direct competition",
        score: 20,
        reasoning: "Balanced approach enabling fair market competition"
      },
      {
        id: "c",
        text: "Penetration pricing below competitors",
        description: "Aggressive pricing to gain quick market share",
        score: 15,
        reasoning: "Fast market entry but potential margin pressure"
      },
      {
        id: "d",
        text: "Value pricing with smaller pack sizes",
        description: "Offer smaller, affordable packs to capture price-sensitive consumers",
        score: 22,
        reasoning: "Smart market penetration strategy for emerging markets"
      }
    ]
  },
  {
    number: 6,
    title: "Marketing & Promotion Strategy",
    description: "Your marketing approach will determine brand awareness and consumer trial. In India's diverse media landscape, you must choose the right mix of traditional and digital channels while considering regional preferences and cultural nuances.",
    timeLimit: 1800, // 30 minutes
    day: 6,
    options: [
      {
        id: "a",
        text: "Heavy TV advertising campaign",
        description: "Traditional mass media approach with prime-time television slots",
        score: 16,
        reasoning: "Broad reach but high cost and declining TV viewership"
      },
      {
        id: "b",
        text: "Digital-first strategy with social media focus",
        description: "Modern approach targeting younger demographics through digital platforms",
        score: 18,
        reasoning: "Cost-effective and targeted but may miss traditional consumers"
      },
      {
        id: "c",
        text: "Integrated multimedia campaign",
        description: "Balanced approach combining TV, digital, print, and outdoor advertising",
        score: 25,
        reasoning: "Comprehensive reach across all consumer segments"
      },
      {
        id: "d",
        text: "Experiential marketing and sampling",
        description: "Focus on product trials through events, malls, and sampling campaigns",
        score: 20,
        reasoning: "Direct consumer engagement but limited scale"
      }
    ]
  },
  {
    number: 7,
    title: "Retail Channel Strategy",
    description: "Your retail strategy will determine product availability and consumer access. India's retail landscape includes traditional trade, modern trade, and emerging e-commerce channels, each requiring different approaches and resource allocation.",
    timeLimit: 1800, // 30 minutes
    day: 7,
    options: [
      {
        id: "a",
        text: "Focus on modern trade (supermarkets, hypermarkets)",
        description: "Prioritize organized retail chains for better margins and brand presentation",
        score: 15,
        reasoning: "Better margins but limited market coverage"
      },
      {
        id: "b",
        text: "Traditional trade dominance (kiranas, pan shops)",
        description: "Emphasize traditional retail for maximum market penetration",
        score: 22,
        reasoning: "Excellent market reach but margin pressure"
      },
      {
        id: "c",
        text: "Multi-channel approach across all formats",
        description: "Equal focus on traditional, modern, and online retail channels",
        score: 25,
        reasoning: "Comprehensive distribution ensuring maximum availability"
      },
      {
        id: "d",
        text: "E-commerce first strategy",
        description: "Leverage online platforms for direct consumer reach",
        score: 12,
        reasoning: "Growing channel but limited current market share"
      }
    ]
  },
  {
    number: 8,
    title: "Performance Measurement & Optimization",
    description: "Your final decision involves establishing key performance indicators and optimization strategies. This will determine how you measure success, identify improvement areas, and ensure sustainable growth in the competitive Indian chocolate market.",
    timeLimit: 1800, // 30 minutes
    day: 8,
    options: [
      {
        id: "a",
        text: "Sales volume and revenue focus",
        description: "Traditional metrics emphasizing quantity and top-line growth",
        score: 15,
        reasoning: "Clear metrics but may compromise profitability"
      },
      {
        id: "b",
        text: "Market share and brand awareness tracking",
        description: "Focus on competitive position and brand building metrics",
        score: 20,
        reasoning: "Strategic focus but may miss operational efficiency"
      },
      {
        id: "c",
        text: "Balanced scorecard approach",
        description: "Comprehensive metrics covering financial, customer, operational, and learning perspectives",
        score: 25,
        reasoning: "Holistic view ensuring balanced business growth"
      },
      {
        id: "d",
        text: "Customer satisfaction and loyalty metrics",
        description: "Consumer-centric approach focusing on satisfaction and repeat purchase",
        score: 18,
        reasoning: "Customer focus but may miss broader business metrics"
      }
    ]
  }
];
