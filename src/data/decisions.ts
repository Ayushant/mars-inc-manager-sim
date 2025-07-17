
import { DecisionData } from '../types';

export const decisionsData: DecisionData[] = [
  {
    number: 1,
    title: "Team Building Strategy",
    description: "As the new Area Manager for Mars Inc. entering the Indian chocolate market, your first critical decision is building your sales team. The Indian market is dominated by established players like Cadbury, and your team selection will determine your market entry success. Consider the trade-offs between experience, cost, and cultural fit.",
    timeLimit: 180, // 3 minutes for demo
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
    timeLimit: 180, // 3 minutes for demo  
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
    description: "Your final critical decision involves selecting the right distribution partner. In India's complex distribution landscape, your choice will determine product availability, market reach, and quality control. Each option presents different trade-offs between experience, focus, and operational excellence.",
    timeLimit: 240, // 4 minutes for demo
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
  }
];
