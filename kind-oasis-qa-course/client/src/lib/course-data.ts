export interface Module {
  id: number;
  title: string;
  duration: string;
  objectives: number;
  hasQuiz: boolean;
  content: ModuleContent;
}

export interface ModuleContent {
  sections: Section[];
  quiz?: Quiz;
}

export interface Section {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'interactive' | 'image' | 'objectives' | 'calculator';
  interactive?: InteractiveElement;
  image?: string;
  objectives?: string[];
}

export interface InteractiveElement {
  type: 'checklist' | 'rating' | 'calculator' | 'facility-design' | 'risk-matrix' | 'fmea-calculator' | 'haccp-decision-tree' | 'risk-assessment-flowchart';
  items?: string[];
  calculatorType?: 'thc';
}

export interface Quiz {
  questions: Question[];
  passingScore: number;
}

export interface Question {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation?: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export const COURSE_MODULES: Module[] = [
  {
    id: 1,
    title: "Process Quality Assurance",
    duration: "15 minutes",
    objectives: 5,
    hasQuiz: false,
    content: {
      sections: [
        {
          id: "overview",
          title: "Course Overview",
          type: "text",
          content: "This comprehensive course provides practical, real-world training that directly addresses the challenges faced in cannabis manufacturing. Each module is designed to build upon previous knowledge while maintaining independence for targeted skill development."
        },
        {
          id: "statistics",
          title: "Course Statistics",
          type: "interactive",
          content: "Interactive statistics display",
          interactive: {
            type: "checklist",
            items: ["14 Modules", "25+ Interactive Elements", "12 Knowledge Checks", "100% Compliance Focus"]
          }
        },
        {
          id: "objectives",
          title: "Learning Objectives",
          type: "objectives",
          content: "Upon completion of this module, learners will be able to:",
          objectives: [
            "Articulate the business case for quality assurance in cannabis manufacturing",
            "Navigate the course platform effectively, utilizing all interactive features",
            "Identify personal learning goals and align them with organizational quality requirements",
            "Demonstrate understanding of course structure and module contributions",
            "Commit to applying learned concepts in daily work activities"
          ]
        },
        {
          id: "features",
          title: "Platform Features",
          type: "interactive",
          content: "Explore the interactive features available throughout the course",
          interactive: {
            type: "checklist",
            items: ["Bookmark important sections", "Track your progress", "Complete assessments", "Access on any device"]
          }
        },
        {
          id: "scope",
          title: "Training Scope",
          type: "text",
          content: "This course covers regulatory compliance, quality systems, testing protocols, documentation requirements, and continuous improvement processes essential for cannabis manufacturing excellence."
        }
      ]
    }
  },
  {
    id: 2,
    title: "Product Quality Assurance",
    duration: "2-3 hours",
    objectives: 8,
    hasQuiz: true,
    content: {
      sections: [
        {
          id: "fundamentals-overview",
          title: "Fundamentals of Product Quality Assurance",
          type: "text",
          content: "Product Quality Assurance is a comprehensive and systematic approach to ensuring that finished products consistently meet predetermined specifications and exceed customer expectations. This module explores the critical final steps in the manufacturing process that prevent defective products from entering the market while building customer trust and brand reputation.",
          image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
        },
        {
          id: "core-concepts",
          title: "Core QA Concepts and Components",
          type: "interactive",
          content: "Key components that form the foundation of effective product quality assurance systems",
          interactive: {
            type: "checklist",
            items: [
              "Prevention Focus: Addressing potential issues before they occur",
              "Process Integration: Embedding quality into every production stage",
              "Continuous Monitoring: Real-time tracking and adjustment capabilities",
              "Documentation: Comprehensive record-keeping for traceability",
              "Customer Orientation: Meeting and exceeding market expectations",
              "Systematic Approach: Structured methodologies and standards"
            ]
          }
        },
        {
          id: "qa-vs-qc",
          title: "Quality Assurance vs Quality Control Comparison",
          type: "interactive",
          content: "Understanding the critical distinctions between QA and QC approaches in manufacturing",
          interactive: {
            type: "rating",
            items: [
              "Approach: QA is Proactive/Preventive vs QC is Reactive/Detective",
              "Focus: QA targets Process Improvement vs QC targets Product Inspection",
              "Timing: QA operates Throughout Production vs QC at End of Production",
              "Scope: QA covers Entire Quality System vs QC covers Specific Products",
              "Goal: QA aims to Prevent Defects vs QC aims to Identify Defects",
              "Responsibility: QA involves Everyone vs QC involves QC Department"
            ]
          }
        },
        {
          id: "cost-of-quality",
          title: "Cost of Quality Impact Assessment",
          type: "interactive",
          content: "Interactive visualization showing how quality costs impact business performance. Click each category to explore cost relationships and ROI calculations.",
          interactive: {
            type: "risk-matrix"
          }
        },
        {
          id: "quality-cost-categories",
          title: "Quality Cost Categories and Examples",
          type: "interactive",
          content: "Four primary categories for analyzing and managing quality-related expenses",
          interactive: {
            type: "rating",
            items: [
              "Prevention Costs: Training, process improvement, quality planning, maintenance",
              "Appraisal Costs: Inspection, testing, quality audits, calibration",
              "Internal Failure Costs: Scrap, rework, downtime, re-inspection",
              "External Failure Costs: Returns, recalls, warranty claims, lost business"
            ]
          }
        },
        {
          id: "testing-categories-overview",
          title: "Four Key Testing Categories in Quality Control",
          type: "text",
          content: "Comprehensive product quality control relies on four fundamental testing categories: appearance inspection, functional testing, stability testing, and environmental testing. Each category addresses specific quality dimensions and customer expectations.",
          image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
        },
        {
          id: "appearance-inspection",
          title: "Appearance Inspection Methods and Standards",
          type: "interactive",
          content: "Visual quality verification that creates critical customer first impressions",
          interactive: {
            type: "checklist",
            items: [
              "Color Consistency: Matching to standard color specifications",
              "Surface Quality: Scratches, dents, blemishes, or irregularities",
              "Dimensional Accuracy: Size, shape, and geometric tolerances",
              "Labeling Quality: Correct placement, readability, and accuracy",
              "Packaging Integrity: Damage, seal quality, and presentation",
              "Assembly Quality: Proper fit, alignment, and finish standards"
            ]
          }
        },
        {
          id: "functional-testing",
          title: "Comprehensive Functional Testing Approach",
          type: "text",
          content: "Functional testing evaluates product performance under various operating conditions to ensure design specifications are met. This includes basic functionality, performance metrics, stress testing, and compatibility verification.",
          image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
        },
        {
          id: "functional-test-categories",
          title: "Functional Testing Categories and Applications",
          type: "interactive",
          content: "Key areas of functional testing to ensure comprehensive product performance validation",
          interactive: {
            type: "rating",
            items: [
              "Basic Functionality: Power operations, primary functions, user interface",
              "Performance Testing: Speed, efficiency, load capacity, energy consumption",
              "Stress Testing: Specification limits, overload conditions, rapid cycling",
              "Compatibility Testing: System interfaces, software compatibility, accessories"
            ]
          }
        },
        {
          id: "stability-testing",
          title: "Stability Testing for Product Shelf Life",
          type: "text",
          content: "Stability testing ensures products maintain quality and performance throughout their intended shelf life under various storage conditions. This includes real-time studies, accelerated testing, and stress conditions to predict long-term performance.",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
        },
        {
          id: "stability-test-types",
          title: "Types of Stability Studies and Parameters",
          type: "interactive",
          content: "Comprehensive stability testing approaches for different product categories and timeframes",
          interactive: {
            type: "checklist",
            items: [
              "Real-Time Stability: Ambient conditions, actual shelf-life determination",
              "Accelerated Stability: Elevated temperature/humidity, predictive modeling",
              "Stress Testing: Extreme conditions, freeze-thaw cycles, light exposure",
              "Physical Changes: Appearance, chemical composition, microbiological growth",
              "Performance Monitoring: Functional performance, package integrity",
              "Industry-Specific: Pharmaceuticals (ICH), Food (sensory), Electronics (thermal)"
            ]
          }
        },
        {
          id: "environmental-testing",
          title: "Environmental Testing for Product Durability",
          type: "text",
          content: "Environmental testing verifies product performance under various conditions encountered during shipping, storage, and use. This includes temperature extremes, mechanical stress, environmental exposure, and altitude variations.",
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
        },
        {
          id: "environmental-test-categories",
          title: "Environmental Testing Standards and Methods",
          type: "interactive",
          content: "Key environmental testing categories to ensure product durability and reliability",
          interactive: {
            type: "rating",
            items: [
              "Temperature Testing: High/low operation, cycling, thermal shock",
              "Mechanical Testing: Vibration, shock, drop testing, compression",
              "Environmental Exposure: Salt spray, UV radiation, dust, water immersion",
              "Altitude/Pressure: High altitude operation, decompression, vacuum testing"
            ]
          }
        },
        {
          id: "qa-system-implementation",
          title: "Interactive QA System Design Workshop",
          type: "interactive",
          content: "Design your own quality management facility layout. This interactive tool helps you understand spatial relationships, workflow optimization, and contamination control in manufacturing environments.",
          interactive: {
            type: "facility-design"
          }
        },
        {
          id: "qms-components",
          title: "Quality Management System Components",
          type: "interactive",
          content: "Essential components of a robust Quality Management System for manufacturing excellence",
          interactive: {
            type: "checklist",
            items: [
              "Document Control: Version management, distribution, change procedures",
              "Process Management: Process mapping, control points, performance metrics",
              "Resource Management: Personnel competency, equipment calibration",
              "Product Realization: Design controls, production planning, monitoring",
              "Measurement and Analysis: Data collection, statistical analysis, reporting",
              "Continuous Improvement: Feedback loops, corrective actions, optimization"
            ]
          }
        },
        {
          id: "statistical-process-control",
          title: "Interactive FMEA Risk Analysis Calculator",
          type: "interactive",
          content: "Use this Failure Mode and Effects Analysis tool to calculate Risk Priority Numbers (RPN) for quality control processes. Input severity, occurrence, and detection ratings to prioritize improvement efforts.",
          interactive: {
            type: "fmea-calculator"
          }
        },
        {
          id: "spc-tools",
          title: "Key SPC Tools and Implementation Steps",
          type: "interactive",
          content: "Essential statistical tools for process control and quality monitoring",
          interactive: {
            type: "rating",
            items: [
              "Control Charts: X-bar/R charts, P-charts, C-charts for variation monitoring",
              "Process Capability: Cp/Cpk indices, Six Sigma levels, DPMO calculations",
              "Sampling Plans: Single/double sampling, variables vs attributes",
              "Implementation: Identify characteristics, establish baselines, monitor performance"
            ]
          }
        },
        {
          id: "industry-specific-qa",
          title: "Risk Assessment Process Flowchart",
          type: "interactive",
          content: "Follow this interactive flowchart to conduct comprehensive risk assessments for quality management. Navigate through each step to identify, evaluate, and mitigate quality risks in your manufacturing processes.",
          interactive: {
            type: "risk-assessment-flowchart"
          }
        },
        {
          id: "industry-standards",
          title: "Industry-Specific Quality Standards and Focus Areas",
          type: "interactive",
          content: "Key quality standards and focus areas across major manufacturing industries",
          interactive: {
            type: "checklist",
            items: [
              "Pharmaceutical: FDA cGMP, ICH Guidelines, sterility, stability protocols",
              "Food & Beverage: HACCP, FSMA, allergen control, microbiological testing",
              "Electronics: EMC/EMI compliance, burn-in testing, reliability validation",
              "Automotive: IATF 16949, PPAP, safety-critical systems, durability",
              "Aerospace: AS9100, safety certifications, environmental stress screening",
              "Medical Devices: ISO 13485, biocompatibility, clinical validation"
            ]
          }
        },
        {
          id: "qa-benefits-roi",
          title: "Benefits and ROI of Quality Assurance Programs",
          type: "text",
          content: "Quality assurance investments consistently deliver positive returns through cost reduction, improved customer satisfaction, and enhanced market position. Understanding these benefits helps justify quality investments and track improvement opportunities.",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
        },
        {
          id: "qa-benefits",
          title: "Direct and Indirect Benefits of QA Implementation",
          type: "interactive",
          content: "Comprehensive benefits realized through effective quality assurance programs",
          interactive: {
            type: "rating",
            items: [
              "Direct Benefits: Reduced defects, cost savings, operational efficiency",
              "Customer Benefits: Consistent quality, reliable performance, brand loyalty",
              "Market Benefits: Competitive advantage, premium pricing, market share growth",
              "Organizational Benefits: Quality culture, employee engagement, innovation drive"
            ]
          }
        },
        {
          id: "modern-qa-technologies",
          title: "Quality Control Decision Tree Navigator",
          type: "interactive",
          content: "Navigate through quality control decision points using this interactive flowchart. Follow the decision tree to determine appropriate testing methods, sampling strategies, and corrective actions for different quality scenarios.",
          interactive: {
            type: "haccp-decision-tree"
          }
        },
        {
          id: "future-qa-trends",
          title: "Emerging QA Technologies and Future Trends",
          type: "interactive",
          content: "Advanced technologies transforming modern quality assurance practices",
          interactive: {
            type: "checklist",
            items: [
              "Quality 4.0: IoT sensors, big data analytics, predictive models, cloud QMS",
              "Artificial Intelligence: Machine learning, computer vision, automated analysis",
              "Advanced Testing: Non-destructive testing, 3D measurement, in-line monitoring",
              "Automation: Robotic inspection, automated testing, digital workflows",
              "Future Technologies: Blockchain quality, AR inspection, digital twins",
              "Sustainable Practices: Green quality, circular economy, environmental focus"
            ]
          }
        }
      ],
      quiz: {
        questions: [
          {
            id: "q1",
            question: "What is the primary difference between Quality Assurance (QA) and Quality Control (QC)?",
            options: [
              { id: "a", text: "QA is more expensive than QC" },
              { id: "b", text: "QA is proactive and preventive while QC is reactive and detective" },
              { id: "c", text: "QC happens before QA in the production process" },
              { id: "d", text: "There is no difference between QA and QC" }
            ],
            correctAnswer: "b",
            explanation: "QA focuses on preventing defects through process improvement and systematic approaches, while QC focuses on detecting defects through inspection and testing."
          },
          {
            id: "q2",
            question: "Which of the following is NOT one of the four main testing categories in product quality control?",
            options: [
              { id: "a", text: "Appearance inspection" },
              { id: "b", text: "Marketing testing" },
              { id: "c", text: "Functional testing" },
              { id: "d", text: "Stability testing" }
            ],
            correctAnswer: "b",
            explanation: "The four main testing categories are appearance inspection, functional testing, stability testing, and environmental testing. Marketing testing is not a quality control category."
          },
          {
            id: "q3",
            question: "What type of testing would you use to predict a product's shelf life in a shorter timeframe?",
            options: [
              { id: "a", text: "Real-time stability testing" },
              { id: "b", text: "Functional testing" },
              { id: "c", text: "Accelerated stability testing" },
              { id: "d", text: "Appearance inspection" }
            ],
            correctAnswer: "c",
            explanation: "Accelerated stability testing uses elevated temperature and humidity conditions to compress timeframes and predict long-term stability through accelerated aging."
          },
          {
            id: "q4",
            question: "In the Cost of Quality model, which category includes expenses for scrap and rework?",
            options: [
              { id: "a", text: "Prevention costs" },
              { id: "b", text: "Appraisal costs" },
              { id: "c", text: "External failure costs" },
              { id: "d", text: "Internal failure costs" }
            ],
            correctAnswer: "d",
            explanation: "Internal failure costs include scrap, rework, downtime, and re-inspection - costs incurred when defects are found before reaching the customer."
          },
          {
            id: "q5",
            question: "What does AQL stand for in quality sampling?",
            options: [
              { id: "a", text: "Average Quality Level" },
              { id: "b", text: "Acceptable Quality Limit" },
              { id: "c", text: "Acceptable Quality Level" },
              { id: "d", text: "Average Quality Limit" }
            ],
            correctAnswer: "c",
            explanation: "AQL stands for Acceptable Quality Level, which defines the maximum percentage of defective items considered acceptable in a sample."
          },
          {
            id: "q6",
            question: "Which environmental test would best evaluate a product's ability to withstand ocean shipping conditions?",
            options: [
              { id: "a", text: "Temperature cycling" },
              { id: "b", text: "Salt spray testing" },
              { id: "c", text: "UV exposure" },
              { id: "d", text: "Altitude testing" }
            ],
            correctAnswer: "b",
            explanation: "Salt spray testing evaluates corrosion resistance under marine environments, making it ideal for products shipped by ocean where salt exposure is common."
          },
          {
            id: "q7",
            question: "What is the primary purpose of Statistical Process Control (SPC)?",
            options: [
              { id: "a", text: "To increase production speed" },
              { id: "b", text: "To monitor and control process variations" },
              { id: "c", text: "To reduce workforce requirements" },
              { id: "d", text: "To eliminate all testing needs" }
            ],
            correctAnswer: "b",
            explanation: "SPC monitors process variations using statistical methods to maintain control and predict when processes may go out of specification."
          },
          {
            id: "q8",
            question: "Which quality standard is specifically designed for automotive manufacturers?",
            options: [
              { id: "a", text: "ISO 9001" },
              { id: "b", text: "ISO 14001" },
              { id: "c", text: "IATF 16949" },
              { id: "d", text: "ISO 22000" }
            ],
            correctAnswer: "c",
            explanation: "IATF 16949 is the automotive quality management standard that builds on ISO 9001 with specific requirements for automotive suppliers."
          },
          {
            id: "q9",
            question: "What technology uses machine learning algorithms to identify defects in real-time during production?",
            options: [
              { id: "a", text: "Coordinate measuring machines" },
              { id: "b", text: "Computer vision inspection systems" },
              { id: "c", text: "Ultrasonic testing" },
              { id: "d", text: "Manual inspection" }
            ],
            correctAnswer: "b",
            explanation: "Computer vision inspection systems use machine learning algorithms and high-speed cameras to identify defects automatically during production."
          },
          {
            id: "q10",
            question: "Which of the following is a key benefit of implementing a comprehensive quality assurance system?",
            options: [
              { id: "a", text: "Eliminates the need for customer feedback" },
              { id: "b", text: "Guarantees zero defects" },
              { id: "c", text: "Reduces overall cost of quality through prevention" },
              { id: "d", text: "Removes the need for employee training" }
            ],
            correctAnswer: "c",
            explanation: "Quality assurance focuses on prevention, which typically reduces overall cost of quality by preventing defects rather than detecting and correcting them."
          }
        ],
        passingScore: 80
      }
    }
  },
  {
    id: 3,
    title: "Document Management",
    duration: "30 minutes",
    objectives: 6,
    hasQuiz: true,
    content: {
      sections: [
        {
          id: "federal",
          title: "Federal Regulatory Bodies",
          type: "text",
          content: "The cannabis industry operates under a complex federal regulatory framework involving multiple agencies with overlapping jurisdictions.",
          image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
        },
        {
          id: "agencies",
          title: "Key Regulatory Agencies",
          type: "interactive",
          content: "Understanding the roles of FDA, USDA, and DEA in cannabis regulation",
          interactive: {
            type: "checklist",
            items: [
              "FDA - Food facility registration, therapeutic claims",
              "USDA - Hemp production regulations, 2018 Farm Bill",
              "DEA - Controlled Substances Act enforcement"
            ]
          }
        },
        {
          id: "calculator",
          title: "THC Compliance Calculator",
          type: "calculator",
          content: "Interactive tool for calculating total THC compliance",
          interactive: {
            type: "calculator",
            calculatorType: "thc"
          }
        },
        {
          id: "state-frameworks",
          title: "State and Industry Frameworks",
          type: "text",
          content: "Cannabis regulation varies significantly across states, creating a complex patchwork of requirements. State variations include THC limits (0.3% to 1.0%), testing requirements, licensing procedures, age restrictions, and product labeling standards."
        },
        {
          id: "industry-standards",
          title: "Industry Standards",
          type: "interactive",
          content: "Key industry organizations providing guidance",
          interactive: {
            type: "checklist",
            items: ["AFDO Model Code", "FOCUS Manufacturing Standard", "NEHA Food Safety Guidance", "ISO quality standards", "cGMP adaptations"]
          }
        }
      ],
      quiz: {
        passingScore: 75,
        questions: [
          {
            id: "q1",
            question: "Which federal agency is primarily responsible for food facility registration requirements for cannabis products?",
            options: [
              { id: "a", text: "DEA (Drug Enforcement Administration)" },
              { id: "b", text: "USDA (U.S. Department of Agriculture)" },
              { id: "c", text: "FDA (Food and Drug Administration)" },
              { id: "d", text: "ATF (Bureau of Alcohol, Tobacco, Firearms and Explosives)" }
            ],
            correctAnswer: "c",
            explanation: "The FDA is responsible for food facility registration requirements for cannabis products."
          },
          {
            id: "q2",
            question: "Under the 2018 Farm Bill, hemp is defined as cannabis containing what maximum THC level?",
            options: [
              { id: "a", text: "≤0.5% Delta-9 THC" },
              { id: "b", text: "≤0.3% Delta-9 THC" },
              { id: "c", text: "≤1.0% Delta-9 THC" },
              { id: "d", text: "≤0.1% Delta-9 THC" }
            ],
            correctAnswer: "b",
            explanation: "The 2018 Farm Bill defines hemp as cannabis containing ≤0.3% Delta-9 THC on a dry weight basis."
          },
          {
            id: "q3",
            question: "Which agency enforces the Controlled Substances Act as it relates to cannabis classification?",
            options: [
              { id: "a", text: "FDA" },
              { id: "b", text: "USDA" },
              { id: "c", text: "DEA" },
              { id: "d", text: "EPA" }
            ],
            correctAnswer: "c",
            explanation: "The DEA enforces the Controlled Substances Act and is responsible for cannabis classification."
          },
          {
            id: "q4",
            question: "What is the critical distinction between legal hemp and marijuana based on federal law?",
            options: [
              { id: "a", text: "The plant species" },
              { id: "b", text: "The growing method" },
              { id: "c", text: "The Delta-9 THC concentration" },
              { id: "d", text: "The CBD content" }
            ],
            correctAnswer: "c",
            explanation: "Federal law distinguishes hemp from marijuana based on Delta-9 THC concentration (≤0.3% for hemp)."
          }
        ]
      }
    }
  },
  {
    id: 4,
    title: "Risk Management",
    duration: "3-4 hours",
    objectives: 10,
    hasQuiz: true,
    content: {
      sections: [
        {
          id: "overview",
          title: "Risk Management Overview",
          type: "text",
          content: "Risk Management in cannabis/hemp manufacturing is a systematic, proactive approach to identifying, assessing, and controlling quality and safety risks throughout the production process. Quality Risk Management (QRM) uses scientific knowledge and data-driven methodologies to protect consumer safety, ensure product quality, and maintain regulatory compliance in an industry where product integrity directly impacts public health.",
          image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
        },
        {
          id: "objectives",
          title: "Learning Objectives",
          type: "objectives",
          content: "By the end of this module, participants will be able to:",
          objectives: [
            "Apply risk-based thinking to cannabis/hemp manufacturing processes",
            "Implement risk assessment tools including FMEA, HACCP, and HAZOP",
            "Develop risk matrices and scoring systems for decision-making",
            "Create comprehensive risk management documentation",
            "Form and lead cross-functional risk management teams",
            "Establish risk control strategies and monitoring systems",
            "Integrate risk management with quality management systems"
          ]
        },
        {
          id: "core-principles",
          title: "Core Principles of Quality Risk Management",
          type: "interactive",
          content: "The foundation principles that guide effective risk management in cannabis manufacturing",
          interactive: {
            type: "checklist",
            items: [
              "Scientific Foundation - Evidence-based risk evaluation using empirical data",
              "Proportional Response - Controls that match risk severity levels",
              "Life Cycle Approach - Continuous assessment from cultivation to consumption"
            ]
          }
        },
        {
          id: "risk-categories",
          title: "Risk Categories in Cannabis Manufacturing",
          type: "interactive",
          content: "Understanding the three major categories of hazards in cannabis/hemp manufacturing",
          interactive: {
            type: "checklist",
            items: [
              "Biological Hazards - Microbial contamination, mycotoxins, pest infestations",
              "Chemical Hazards - Pesticide residues, heavy metals, residual solvents",
              "Physical Hazards - Foreign material, equipment particles, environmental debris"
            ]
          }
        },
        {
          id: "team-formation",
          title: "Risk Management Team Formation",
          type: "text",
          content: "Effective risk management requires cross-functional teams with diverse expertise. The ideal team includes a Quality Assurance Manager as team leader, along with Production Representatives, Laboratory Personnel, Facility/Engineering Staff, Regulatory Compliance Officers, and Supply Chain Representatives. Each member brings unique perspectives essential for comprehensive risk assessment.",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
        },
        {
          id: "assessment-process",
          title: "Risk Assessment Process Flowchart",
          type: "interactive",
          content: "Interactive step-by-step guide through the complete risk assessment process",
          interactive: {
            type: "risk-assessment-flowchart"
          }
        },
        {
          id: "risk-matrix",
          title: "Interactive Risk Assessment Matrix",
          type: "interactive",
          content: "Practice risk assessment using an interactive matrix tool",
          interactive: {
            type: "risk-matrix"
          }
        },
        {
          id: "fmea-tool",
          title: "FMEA Calculator & Analysis Tool",
          type: "interactive",
          content: "Interactive FMEA calculator with real-time RPN scoring",
          interactive: {
            type: "fmea-calculator"
          }
        },
        {
          id: "haccp-principles",
          title: "HACCP Seven Principles",
          type: "interactive",
          content: "The seven principles of Hazard Analysis and Critical Control Points system",
          interactive: {
            type: "checklist",
            items: [
              "1. Conduct Hazard Analysis",
              "2. Determine Critical Control Points (CCPs)",
              "3. Establish Critical Limits",
              "4. Establish Monitoring Procedures",
              "5. Establish Corrective Actions",
              "6. Establish Verification Procedures",
              "7. Establish Documentation and Record Keeping"
            ]
          }
        },
        {
          id: "haccp-decision-tree",
          title: "HACCP Decision Tree Tool",
          type: "interactive",
          content: "Interactive flowchart for determining Critical Control Points",
          interactive: {
            type: "haccp-decision-tree"
          }
        },
        {
          id: "cannabis-ccps",
          title: "Cannabis-Specific Critical Control Points",
          type: "interactive",
          content: "Common Critical Control Points in cannabis/hemp manufacturing operations",
          interactive: {
            type: "checklist",
            items: [
              "Drying temperature and humidity control",
              "Extraction solvent recovery verification",
              "Microbiological testing at packaging",
              "Heavy metal testing of cultivation inputs",
              "Final product potency verification"
            ]
          }
        },
        {
          id: "hazop-methodology",
          title: "HAZOP (Hazard and Operability Study)",
          type: "text",
          content: "HAZOP is a systematic examination of process deviations using guide words (No, More, Less, As Well As, Part Of, Reverse, Other Than). This methodology is particularly valuable for analyzing CO2 extraction systems, ethanol recovery systems, automated packaging lines, and environmental control systems in cannabis manufacturing.",
          image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
        },
        {
          id: "risk-controls",
          title: "Risk Control Strategies",
          type: "interactive",
          content: "The hierarchy of risk control measures in cannabis manufacturing",
          interactive: {
            type: "checklist",
            items: [
              "Engineering Controls - Automated monitoring, fail-safe design, contamination barriers",
              "Administrative Controls - SOPs, training programs, access restrictions",
              "Personal Protective Equipment - Risk-based selection and maintenance"
            ]
          }
        },
        {
          id: "monitoring-systems",
          title: "Risk Monitoring and Key Indicators",
          type: "interactive",
          content: "Essential Key Risk Indicators (KRIs) for cannabis manufacturing operations",
          interactive: {
            type: "checklist",
            items: [
              "Deviation frequency tracking",
              "Customer complaint trends analysis",
              "Testing failure rates monitoring",
              "Audit findings evaluation",
              "Regulatory citations review"
            ]
          }
        },
        {
          id: "documentation",
          title: "Risk Management Documentation",
          type: "text",
          content: "Comprehensive documentation is essential for effective risk management. Required documents include Risk Management Plans, Risk Assessment Reports, Risk Control Matrices, Monitoring Records, Review Meeting Minutes, and Training Records. All documents must follow proper version control, approval workflows, and retention requirements.",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
        },
        {
          id: "integration",
          title: "Integration with Quality Management Systems",
          type: "interactive",
          content: "Aligning risk management with established quality standards and regulatory requirements",
          interactive: {
            type: "checklist",
            items: [
              "ISO 9001 risk-based thinking integration",
              "ISO 31000 risk management principles",
              "GMP risk-based validation",
              "Regulatory compliance alignment (FDA, state-specific)"
            ]
          }
        }
      ],
      quiz: {
        passingScore: 80,
        questions: [
          {
            id: "q1",
            question: "Which formula is used to calculate Risk Priority Number (RPN) in FMEA?",
            options: [
              { id: "a", text: "Severity + Occurrence + Detection" },
              { id: "b", text: "Severity × Occurrence × Detection" },
              { id: "c", text: "Severity - Occurrence - Detection" },
              { id: "d", text: "Severity ÷ Occurrence ÷ Detection" }
            ],
            correctAnswer: "b",
            explanation: "RPN is calculated by multiplying Severity × Occurrence × Detection to provide a numerical risk priority ranking."
          },
          {
            id: "q2",
            question: "What RPN score range indicates immediate action is required?",
            options: [
              { id: "a", text: "1-100" },
              { id: "b", text: "101-200" },
              { id: "c", text: "201-500" },
              { id: "d", text: "Over 500" }
            ],
            correctAnswer: "d",
            explanation: "RPN scores over 500 indicate critical risk requiring immediate action to stop the process until resolved."
          },
          {
            id: "q3",
            question: "How many principles are included in HACCP?",
            options: [
              { id: "a", text: "5" },
              { id: "b", text: "6" },
              { id: "c", text: "7" },
              { id: "d", text: "9" }
            ],
            correctAnswer: "c",
            explanation: "HACCP is built on seven fundamental principles from hazard analysis to documentation and record keeping."
          },
          {
            id: "q4",
            question: "Which of the following is NOT a biological hazard in cannabis manufacturing?",
            options: [
              { id: "a", text: "Mold contamination" },
              { id: "b", text: "Pesticide residues" },
              { id: "c", text: "Mycotoxins" },
              { id: "d", text: "Bacterial growth" }
            ],
            correctAnswer: "b",
            explanation: "Pesticide residues are chemical hazards, not biological hazards. Biological hazards include living organisms like mold, bacteria, and their byproducts like mycotoxins."
          },
          {
            id: "q5",
            question: "What does CCP stand for in HACCP?",
            options: [
              { id: "a", text: "Cannabis Control Protocol" },
              { id: "b", text: "Critical Control Point" },
              { id: "c", text: "Contamination Control Procedure" },
              { id: "d", text: "Certified Compliance Program" }
            ],
            correctAnswer: "b",
            explanation: "CCP stands for Critical Control Point - a step where control can be applied to prevent, eliminate, or reduce a hazard."
          },
          {
            id: "q6",
            question: "Which team member typically leads a risk management team?",
            options: [
              { id: "a", text: "Production Manager" },
              { id: "b", text: "CEO" },
              { id: "c", text: "Quality Assurance Manager" },
              { id: "d", text: "Sales Director" }
            ],
            correctAnswer: "c",
            explanation: "The Quality Assurance Manager typically leads risk management teams due to their expertise in quality systems and risk assessment methodologies."
          },
          {
            id: "q7",
            question: "Which tool is best for analyzing equipment-related risks in extraction systems?",
            options: [
              { id: "a", text: "HACCP" },
              { id: "b", text: "HAZOP" },
              { id: "c", text: "Pareto Chart" },
              { id: "d", text: "Fishbone Diagram" }
            ],
            correctAnswer: "b",
            explanation: "HAZOP (Hazard and Operability Study) is specifically designed for systematic examination of process deviations in complex systems like extraction equipment."
          },
          {
            id: "q8",
            question: "What is a Critical Control Point in cannabis manufacturing?",
            options: [
              { id: "a", text: "Any quality check" },
              { id: "b", text: "Step where control can be applied to prevent/eliminate hazard" },
              { id: "c", text: "Final product testing only" },
              { id: "d", text: "Employee training checkpoint" }
            ],
            correctAnswer: "b",
            explanation: "A Critical Control Point is a specific step in the process where control measures can be applied to prevent, eliminate, or reduce identified hazards to acceptable levels."
          },
          {
            id: "q9",
            question: "What documentation is required for risk acceptance?",
            options: [
              { id: "a", text: "Only management signature" },
              { id: "b", text: "Rationale, residual risk assessment, monitoring plans" },
              { id: "c", text: "Financial analysis only" },
              { id: "d", text: "Customer approval" }
            ],
            correctAnswer: "b",
            explanation: "Risk acceptance requires comprehensive documentation including the rationale for acceptance, residual risk assessment, and ongoing monitoring plans."
          },
          {
            id: "q10",
            question: "Which statement about risk management teams is correct?",
            options: [
              { id: "a", text: "Should only include quality personnel" },
              { id: "b", text: "Must be led by senior management" },
              { id: "c", text: "Requires cross-functional representation" },
              { id: "d", text: "Limited to 3 members maximum" }
            ],
            correctAnswer: "c",
            explanation: "Effective risk management teams require cross-functional representation to bring diverse expertise and perspectives to the risk assessment process."
          }
        ]
      }
    }
  }
];

// Module 5: Nonconformance & Deviation Management
COURSE_MODULES.push({
  id: 5,
  title: "Nonconformance & Deviation Management",
  duration: "2-3 hours",
  objectives: 8,
  hasQuiz: true,
  content: {
    sections: [
      {
        id: "module-overview",
        title: "Understanding Nonconformance & Deviation Management",
        type: "text",
        content: "Nonconformance and Deviation Management is the systematic approach to handling departures from established standards and managing products that fail to meet specifications in manufacturing operations. This module explores the critical differences between deviations and nonconformances, their impact on product quality and safety, and the structured processes for investigation, documentation, and resolution.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "core-definitions",
        title: "Core Definitions and Key Distinctions",
        type: "interactive",
        content: "Understanding the fundamental differences between deviations and nonconformances is critical for proper quality management",
        interactive: {
          type: "checklist",
          items: [
            "Deviation: Departure from approved instruction, procedure, or specification",
            "Nonconformance: Product/material that fails to meet specified requirements",
            "Planned Deviation: Intentional, pre-approved departure with documentation",
            "Unplanned Deviation: Accidental departure discovered during/after execution",
            "Process-focused vs Product-focused distinctions",
            "Timing differences in identification and resolution"
          ]
        }
      },
      {
        id: "comparison-matrix",
        title: "Deviation vs Nonconformance Comparison",
        type: "interactive",
        content: "Key distinctions between deviations and nonconformances across different aspects",
        interactive: {
          type: "rating",
          items: [
            "Nature: Process-focused (Deviation) vs Product-focused (Nonconformance)",
            "Timing: Before/during/after production vs Typically after production",
            "Prevention: Can be pre-approved vs Always represents failure",
            "Documentation: Deviation report vs Nonconformance report (NCR)",
            "Resolution: May not require disposition vs Always requires disposition"
          ]
        }
      },
      {
        id: "food-manufacturing-applications",
        title: "Food Manufacturing Specific Applications",
        type: "text",
        content: "In food manufacturing, nonconformances and deviations have unique implications due to direct consumer health impacts and stringent regulatory requirements. Understanding food-specific definitions and applications is crucial for maintaining safety and compliance.",
        image: "https://images.unsplash.com/photo-1574263867128-ade8c3fb9e78?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "food-examples",
        title: "Common Food Manufacturing Examples",
        type: "interactive",
        content: "Real-world examples of deviations and nonconformances in food production environments",
        interactive: {
          type: "checklist",
          items: [
            "Deviation: Processing temperature drops below critical limit",
            "Deviation: Sanitizer concentration varies from specified range",
            "Deviation: Metal detector check performed late",
            "Nonconformance: Finished product fails pathogen testing",
            "Nonconformance: Foreign material found in packaged product",
            "Nonconformance: pH outside acceptable range in acidified foods"
          ]
        }
      },
      {
        id: "critical-safety-considerations",
        title: "Critical Food Safety Considerations",
        type: "interactive",
        content: "Key factors that must be considered when managing food safety related nonconformances",
        interactive: {
          type: "rating",
          items: [
            "Consumer Health Impact: Immediate risks from pathogens, allergens, toxins",
            "Regulatory Compliance: FDA FSMA requirements and HACCP deviations",
            "Supply Chain Implications: Raw material and distribution issues",
            "Vulnerable Populations: Special considerations for high-risk consumers",
            "Long-term Health: Chronic exposure and cumulative effects"
          ]
        }
      },
      {
        id: "mrb-structure",
        title: "Material Review Board (MRB) Process",
        type: "text",
        content: "The Material Review Board is a cross-functional team responsible for evaluating nonconforming materials and determining appropriate disposition. The MRB provides systematic evaluation with diverse expertise to ensure proper decision-making.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "mrb-members",
        title: "MRB Core Team Composition",
        type: "interactive",
        content: "Essential and additional members of an effective Material Review Board",
        interactive: {
          type: "checklist",
          items: [
            "Quality Assurance Manager (typically chairs the board)",
            "Production/Manufacturing Manager",
            "Engineering Representative",
            "Purchasing/Procurement Representative",
            "Food Safety Manager (for food manufacturing)",
            "Regulatory Affairs Representative (when applicable)",
            "R&D/Product Development (as needed)",
            "Finance Representative (for cost analysis)"
          ]
        }
      },
      {
        id: "disposition-options",
        title: "MRB Disposition Decision Options",
        type: "interactive",
        content: "Six primary disposition options available to Material Review Boards for nonconforming materials",
        interactive: {
          type: "rating",
          items: [
            "Accept As-Is: Minor deviations with no safety/functional impact",
            "Rework/Reprocess: Material can be brought into compliance",
            "Sort/Screen: Segregation of conforming from nonconforming units",
            "Return to Vendor: Supplier-caused nonconformances with contract terms",
            "Downgrade/Redirect: Alternative application or second-grade use",
            "Scrap/Destroy: Safety risk too high or no economical alternative"
          ]
        }
      },
      {
        id: "investigation-process",
        title: "Investigation and Root Cause Analysis",
        type: "text",
        content: "Thorough investigation and root cause analysis are essential for preventing recurrence and driving systemic improvements. The investigation process must be systematic, documented, and focused on identifying fundamental causes rather than symptoms.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "investigation-steps",
        title: "Detailed Investigation Process Steps",
        type: "interactive",
        content: "Systematic approach to investigating nonconformances and deviations",
        interactive: {
          type: "checklist",
          items: [
            "Immediate Actions: Secure materials, stop production if needed, notify stakeholders",
            "Data Collection: Production records, equipment logs, personnel interviews",
            "Timeline Construction: Sequence of events and process changes",
            "Comparative Analysis: Compare against specifications and historical data",
            "Root Cause Tools: 5 Whys, Fishbone diagrams, FMEA analysis",
            "Documentation: Comprehensive investigation report with findings"
          ]
        }
      },
      {
        id: "root-cause-tools",
        title: "Root Cause Analysis Tool Selection",
        type: "interactive",
        content: "Primary tools used for identifying root causes of nonconformances",
        interactive: {
          type: "rating",
          items: [
            "5 Whys Analysis: Simple iterative questioning for straightforward problems",
            "Fishbone Diagram: Systematic evaluation of Methods, Machines, Materials, Manpower",
            "FMEA: Failure Mode and Effects Analysis with risk priority calculations",
            "Comparative Analysis: Historical data and benchmark comparisons",
            "Timeline Analysis: Sequence of events and process variations"
          ]
        }
      },
      {
        id: "capa-integration",
        title: "CAPA System Integration",
        type: "text",
        content: "Linking nonconformances to Corrective and Preventive Action (CAPA) systems ensures systematic improvement and prevents recurrence. CAPA integration is required for repeat issues, high-risk situations, and regulatory compliance.",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "capa-triggers",
        title: "When to Initiate CAPA Actions",
        type: "interactive",
        content: "Criteria for determining when nonconformances require formal CAPA processes",
        interactive: {
          type: "checklist",
          items: [
            "Repeat nonconformances showing trends or patterns",
            "High-risk or safety-related issues with consumer impact",
            "Regulatory requirements or audit findings",
            "Customer complaints with quality system implications",
            "Significant financial impact or business disruption",
            "Systemic issues affecting multiple products/processes"
          ]
        }
      },
      {
        id: "eqms-benefits",
        title: "Enterprise Quality Management System (EQMS) Integration",
        type: "text",
        content: "Modern EQMS solutions dramatically improve efficiency, visibility, and effectiveness of quality management processes. Digital transformation addresses traditional paper-based challenges while enabling real-time collaboration and data analytics.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "eqms-features",
        title: "Key EQMS Features for Nonconformance Management",
        type: "interactive",
        content: "Essential capabilities provided by modern quality management systems",
        interactive: {
          type: "rating",
          items: [
            "Automated Workflows: NCR creation, routing, approvals, and task assignments",
            "Data Integration: Links to production records, LIMS data, and supplier metrics",
            "Analytics and Reporting: Pareto analysis, trend identification, KPI dashboards",
            "Real-time Notifications: Automated escalations and deadline tracking",
            "Mobile Accessibility: Field access and data collection capabilities"
          ]
        }
      },
      {
        id: "prevention-strategies",
        title: "Prevention Strategies and Proactive Management",
        type: "text",
        content: "The most effective approach to nonconformance management is prevention through robust processes, supplier management, and employee training. Proactive strategies yield the highest return on investment and customer satisfaction.",
        image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "prevention-elements",
        title: "Proactive Quality Management Elements",
        type: "interactive",
        content: "Key components of effective prevention-focused quality systems",
        interactive: {
          type: "checklist",
          items: [
            "Statistical Process Control: Control charts and early warning systems",
            "Supplier Quality Management: Approved programs and scorecards",
            "Training and Competency: Role-specific programs and assessments",
            "Design for Quality: Robust processes and error-proofing",
            "Change Management: Risk assessment and validation protocols",
            "Continuous Improvement Culture: Data-driven decisions and learning"
          ]
        }
      },
      {
        id: "cost-impact-analysis",
        title: "Cost Impact Analysis and ROI Calculations",
        type: "text",
        content: "Understanding the financial impact of nonconformances and the return on investment for quality improvements is essential for business justification and resource allocation. Cost of quality frameworks provide structure for analysis.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "cost-categories",
        title: "Cost of Quality Framework Categories",
        type: "interactive",
        content: "Four primary categories for analyzing quality-related costs",
        interactive: {
          type: "rating",
          items: [
            "Prevention Costs: Training, process improvement, preventive maintenance",
            "Appraisal Costs: Inspection, testing, calibration, audits",
            "Internal Failure Costs: Scrap, rework, downtime, re-inspection",
            "External Failure Costs: Complaints, returns, recalls, warranty claims"
          ]
        }
      }
    ],
    quiz: {
      questions: [
        {
          id: "q1",
          question: "What is the primary difference between a deviation and a nonconformance?",
          options: [
            { id: "a", text: "Deviations are more serious than nonconformances" },
            { id: "b", text: "Deviations relate to process departures while nonconformances relate to product failures" },
            { id: "c", text: "Nonconformances can be planned while deviations cannot" },
            { id: "d", text: "There is no difference; the terms are interchangeable" }
          ],
          correctAnswer: "b",
          explanation: "Deviations are departures from approved procedures or standards (process-focused), while nonconformances are products or materials that fail to meet specifications (product-focused)."
        },
        {
          id: "q2",
          question: "Which of the following is NOT typically a member of the Material Review Board?",
          options: [
            { id: "a", text: "Quality Assurance Manager" },
            { id: "b", text: "Production Manager" },
            { id: "c", text: "External customer representative" },
            { id: "d", text: "Purchasing Representative" }
          ],
          correctAnswer: "c",
          explanation: "Material Review Boards consist of internal cross-functional team members. External customer representatives are not typically included in MRB meetings."
        },
        {
          id: "q3",
          question: "In food manufacturing, which type of nonconformance would likely pose the greatest immediate risk?",
          options: [
            { id: "a", text: "Product weight 2% below label declaration" },
            { id: "b", text: "Pathogen detection in ready-to-eat product" },
            { id: "c", text: "Minor cosmetic defect in packaging" },
            { id: "d", text: "Slightly elevated moisture content" }
          ],
          correctAnswer: "b",
          explanation: "Pathogen detection in ready-to-eat products poses immediate consumer health risks and requires immediate action to prevent foodborne illness."
        },
        {
          id: "q4",
          question: "What disposition option involves bringing nonconforming material back into compliance with specifications?",
          options: [
            { id: "a", text: "Accept as-is" },
            { id: "b", text: "Return to vendor" },
            { id: "c", text: "Rework/Reprocess" },
            { id: "d", text: "Scrap" }
          ],
          correctAnswer: "c",
          explanation: "Rework/Reprocess involves processing the nonconforming material to bring it back into compliance with original specifications."
        },
        {
          id: "q5",
          question: "Which root cause analysis tool uses iterative questioning to drill down to the fundamental cause?",
          options: [
            { id: "a", text: "Fishbone diagram" },
            { id: "b", text: "5 Whys analysis" },
            { id: "c", text: "Pareto chart" },
            { id: "d", text: "Control chart" }
          ],
          correctAnswer: "b",
          explanation: "The 5 Whys analysis uses iterative questioning, asking 'why' repeatedly to drill down from symptoms to root causes."
        },
        {
          id: "q6",
          question: "When should a CAPA (Corrective and Preventive Action) be initiated for a nonconformance?",
          options: [
            { id: "a", text: "For every single nonconformance" },
            { id: "b", text: "Only for customer complaints" },
            { id: "c", text: "For repeat occurrences or high-risk issues" },
            { id: "d", text: "Only when required by auditors" }
          ],
          correctAnswer: "c",
          explanation: "CAPA should be initiated for repeat nonconformances, high-risk or safety-related issues, regulatory requirements, or significant customer complaints."
        },
        {
          id: "q7",
          question: "What is a key advantage of using an Enterprise Quality Management System (EQMS) for nonconformance management?",
          options: [
            { id: "a", text: "Eliminates the need for investigations" },
            { id: "b", text: "Provides real-time notifications and automated workflows" },
            { id: "c", text: "Removes the need for management review" },
            { id: "d", text: "Guarantees zero defects" }
          ],
          correctAnswer: "b",
          explanation: "EQMS provides automated workflows, real-time notifications, integrated analytics, and improved visibility compared to paper-based systems."
        },
        {
          id: "q8",
          question: "Which cost category includes expenses related to scrap and rework?",
          options: [
            { id: "a", text: "Prevention costs" },
            { id: "b", text: "Appraisal costs" },
            { id: "c", text: "Internal failure costs" },
            { id: "d", text: "External failure costs" }
          ],
          correctAnswer: "c",
          explanation: "Internal failure costs include scrap, rework, downtime, re-inspection, and other costs incurred before the product reaches the customer."
        },
        {
          id: "q9",
          question: "What is the recommended approach when a deviation from standard procedure is necessary and known in advance?",
          options: [
            { id: "a", text: "Proceed without documentation" },
            { id: "b", text: "Create a planned deviation with pre-approval and documentation" },
            { id: "c", text: "Report it as a nonconformance after the fact" },
            { id: "d", text: "Avoid the deviation at all costs" }
          ],
          correctAnswer: "b",
          explanation: "Planned deviations should be pre-approved with documented justification and proper authorization before execution."
        },
        {
          id: "q10",
          question: "Which of the following best describes the role of trend analysis in nonconformance management?",
          options: [
            { id: "a", text: "It replaces the need for root cause analysis" },
            { id: "b", text: "It helps identify patterns and systemic issues requiring preventive action" },
            { id: "c", text: "It is only useful for financial reporting" },
            { id: "d", text: "It should only be done annually" }
          ],
          correctAnswer: "b",
          explanation: "Trend analysis identifies patterns and systemic issues that require preventive action and helps prioritize improvement efforts."
        }
      ],
      passingScore: 80
    }
  }
});

// Module 6: GMP Fundamentals for Cannabis/Hemp
COURSE_MODULES.push({
  id: 6,
  title: "GMP Fundamentals for Cannabis/Hemp",
  duration: "3-4 hours",
  objectives: 12,
  hasQuiz: true,
  content: {
    sections: [
      {
        id: "gmp-overview",
        title: "Introduction to Cannabis/Hemp GMP",
        type: "text",
        content: "Good Manufacturing Practices (GMP) for Cannabis/Hemp establish comprehensive quality control guidelines ensuring products are consistently produced and controlled according to strict quality standards. GMPs provide the framework for maintaining product safety, purity, potency, and compliance with evolving regulatory requirements while building consumer trust and market competitiveness.",
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "gmp-standards",
        title: "GMP Standards Comparison",
        type: "interactive",
        content: "Different GMP standards apply to cannabis operations worldwide, each with specific requirements and compliance levels",
        interactive: {
          type: "checklist",
          items: [
            "cGMP (Current Good Manufacturing Practice) - FDA standard for US operations",
            "EU-GMP - European Union standards (strictest globally)",
            "GPP (Good Production Practice) - Canadian Health Canada requirements", 
            "WHO-GMP - World Health Organization international standard",
            "GaCP - Good Agricultural and Collection Practices",
            "ISO 22000 - Food safety management systems"
          ]
        }
      },
      {
        id: "gmp-benefits",
        title: "Benefits of GMP Implementation",
        type: "interactive",
        content: "Implementing GMP provides significant advantages across quality, business, and regulatory dimensions",
        interactive: {
          type: "rating",
          items: [
            "Consistent product quality and reduced contamination risks",
            "Market differentiation and access to medical markets",
            "International export eligibility and investor confidence",
            "Reduced recall risks and insurance premium reductions",
            "Proactive compliance positioning and faster license approvals",
            "Multi-state operational efficiency"
          ]
        }
      },
      {
        id: "qms-foundation",
        title: "Quality Management System (QMS) Framework",
        type: "text",
        content: "A robust QMS provides the foundation for all GMP activities, establishing clear policies, organizational structure, and management review processes. The QMS ensures systematic quality control through documented procedures, defined responsibilities, and continuous improvement mechanisms.",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "document-hierarchy",
        title: "GMP Document Control Hierarchy",
        type: "interactive",
        content: "GMP documentation follows a structured hierarchy from high-level policies to detailed work instructions",
        interactive: {
          type: "checklist",
          items: [
            "Level 1: Quality Manual (top level policy document)",
            "Level 2: Policies (departmental guidance documents)",
            "Level 3: Standard Operating Procedures (step-by-step instructions)",
            "Level 4: Work Instructions (detailed task procedures)",
            "Level 5: Forms and Records (data collection and evidence)"
          ]
        }
      },
      {
        id: "facility-design",
        title: "GMP Facility Design Principles",
        type: "interactive",
        content: "GMP-compliant facilities require specific design elements to prevent contamination and ensure product quality",
        interactive: {
          type: "facility-design"
        }
      },
      {
        id: "facility-zones",
        title: "Cannabis Facility Zone Classifications",
        type: "interactive",
        content: "Different areas of cannabis facilities require specific environmental controls and access restrictions",
        interactive: {
          type: "checklist",
          items: [
            "Cultivation Areas - Mother plant rooms, vegetative growth, flowering, drying, curing",
            "Processing Areas - Trimming rooms, extraction suites, formulation, packaging",
            "Laboratory Spaces - Testing areas with controlled environments",
            "Support Areas - Material warehouses, quarantine, waste management",
            "Personnel Areas - Locker rooms, break areas, training rooms"
          ]
        }
      },
      {
        id: "equipment-qualification",
        title: "Equipment Qualification Process",
        type: "text",
        content: "Equipment qualification ensures that all manufacturing equipment performs consistently and reliably. The three-phase qualification process (IQ, OQ, PQ) provides documented evidence that equipment is properly installed, operates correctly, and performs consistently within specified parameters.",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "qualification-phases",
        title: "Three Phases of Equipment Qualification",
        type: "interactive",
        content: "Equipment qualification follows a systematic three-phase approach to ensure proper installation and performance",
        interactive: {
          type: "checklist",
          items: [
            "IQ (Installation Qualification) - Proper installation verification and utility connections",
            "OQ (Operational Qualification) - Performance range testing and control system verification", 
            "PQ (Performance Qualification) - Product-specific testing and consistency verification"
          ]
        }
      },
      {
        id: "personnel-training",
        title: "Personnel Training Requirements",
        type: "text",
        content: "GMP personnel training ensures all staff understand their roles in maintaining product quality and regulatory compliance. Training programs must be comprehensive, documented, and regularly updated to address evolving regulations and best practices.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "training-components",
        title: "Essential Training Program Components",
        type: "interactive",
        content: "Comprehensive GMP training covers multiple areas to ensure personnel competency",
        interactive: {
          type: "checklist",
          items: [
            "GMP fundamentals and company quality policies",
            "Job-specific procedures and safety protocols",
            "Aseptic techniques and contamination prevention",
            "Equipment operation and cleaning procedures",
            "Documentation requirements and record keeping",
            "Emergency procedures and incident reporting"
          ]
        }
      },
      {
        id: "sop-development",
        title: "Standard Operating Procedures (SOPs)",
        type: "text",
        content: "SOPs provide detailed, step-by-step instructions for all critical operations. GMP certification typically requires a minimum of 50 comprehensive SOPs covering facility operations, personnel practices, material management, production processes, quality control, and documentation procedures.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "critical-sops",
        title: "Critical SOP Categories for Cannabis Operations",
        type: "interactive",
        content: "Cannabis operations require SOPs across all major operational areas to maintain GMP compliance",
        interactive: {
          type: "checklist",
          items: [
            "Cultivation SOPs - Propagation, nutrient management, pest control, harvest, drying",
            "Processing SOPs - Extraction, purification, formulation, filling, packaging",
            "Quality SOPs - Sampling, testing methods, release procedures, stability",
            "Facility SOPs - Cleaning, maintenance, environmental monitoring",
            "Personnel SOPs - Training, hygiene, health monitoring, access control",
            "Documentation SOPs - Record keeping, change control, deviation management"
          ]
        }
      },
      {
        id: "quality-control",
        title: "Quality Control and Testing Requirements",
        type: "text",
        content: "GMP quality control ensures product safety and consistency through comprehensive testing programs. Both in-process controls during manufacturing and final product testing are essential to verify product quality, potency, and safety before release.",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "required-tests",
        title: "Required Final Product Testing",
        type: "interactive",
        content: "Cannabis products must pass comprehensive testing before release to market",
        interactive: {
          type: "checklist",
          items: [
            "Cannabinoid profile (THC, CBD, CBG, CBN analysis)",
            "Microbiological screen (bacteria, yeast, mold testing)",
            "Heavy metals testing (lead, mercury, cadmium, arsenic)",
            "Pesticide residues screening (approved pesticide limits)",
            "Residual solvents analysis (extraction solvent residues)",
            "Mycotoxins testing (aflatoxins and ochratoxin A)",
            "Water activity measurement (stability and safety)",
            "Foreign matter inspection (visual contamination check)"
          ]
        }
      },
      {
        id: "certification-process",
        title: "GMP Certification Process",
        type: "text",
        content: "Achieving GMP certification typically requires 6-24 months of preparation, including facility upgrades, documentation development, training completion, and system validation. The process involves significant investment but provides market access and competitive advantages.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "certification-costs",
        title: "GMP Certification Investment Requirements",
        type: "interactive",
        content: "GMP certification involves various cost components that businesses must budget for",
        interactive: {
          type: "rating",
          items: [
            "Facility upgrades and infrastructure improvements: $50,000-$500,000",
            "Consultant fees for guidance and gap analysis: $25,000-$100,000",
            "Certification fees and audit costs: $10,000-$30,000",
            "Training costs for personnel development: $5,000-$20,000",
            "Ongoing compliance and maintenance: $20,000-$50,000/year"
          ]
        }
      },
      {
        id: "audit-preparation",
        title: "Preparing for GMP Audits",
        type: "text",
        content: "Successful GMP audits require thorough preparation including gap analysis, mock audits, document review, training verification, and facility preparation. The audit process includes document review, facility tours, process observation, and employee interviews.",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "audit-phases",
        title: "GMP Audit Process Phases",
        type: "interactive",
        content: "The GMP audit follows a structured process from preparation through certification",
        interactive: {
          type: "checklist",
          items: [
            "Pre-Audit Preparation - Gap analysis, mock audits, document review",
            "Audit Execution - Opening meeting, facility tour, process observation",
            "Employee Interviews - Competency verification and procedure knowledge",
            "Document Review - SOP compliance and record accuracy",
            "Findings Response - Corrective actions and implementation plans",
            "Post-Audit Activities - Verification, certificate issuance, surveillance"
          ]
        }
      }
    ],
    quiz: {
      questions: [
        {
          id: "q1",
          question: "Which GMP standard is considered the strictest globally?",
          options: [
            { id: "a", text: "FDA cGMP" },
            { id: "b", text: "WHO-GMP" },
            { id: "c", text: "EU-GMP" },
            { id: "d", text: "Health Canada GPP" }
          ],
          correctAnswer: "c",
          explanation: "EU-GMP is widely recognized as the strictest GMP standard globally, with the most comprehensive requirements for pharmaceutical and cannabis manufacturing."
        },
        {
          id: "q2", 
          question: "What is the typical number of SOPs required for GMP certification?",
          options: [
            { id: "a", text: "10-20" },
            { id: "b", text: "20-30" },
            { id: "c", text: "30-40" },
            { id: "d", text: "50 or more" }
          ],
          correctAnswer: "d",
          explanation: "GMP certification typically requires a minimum of 50 comprehensive SOPs covering all aspects of operations, from facility management to quality control."
        },
        {
          id: "q3",
          question: "What type of air filtration is typically required in production areas?",
          options: [
            { id: "a", text: "Standard HVAC filters" },
            { id: "b", text: "HEPA filtration" },
            { id: "c", text: "Carbon filters only" },
            { id: "d", text: "No specific requirement" }
          ],
          correctAnswer: "b",
          explanation: "HEPA (High Efficiency Particulate Air) filtration is required in GMP production areas to remove 99.97% of particles 0.3 micrometers or larger."
        },
        {
          id: "q4",
          question: "Which document sits at the top of the GMP document hierarchy?",
          options: [
            { id: "a", text: "SOPs" },
            { id: "b", text: "Work Instructions" },
            { id: "c", text: "Quality Manual" },
            { id: "d", text: "Forms" }
          ],
          correctAnswer: "c",
          explanation: "The Quality Manual is the top-level document in the GMP hierarchy, establishing overall quality policy and management system framework."
        },
        {
          id: "q5",
          question: "What are the three types of equipment qualification?",
          options: [
            { id: "a", text: "IQ, OQ, PQ" },
            { id: "b", text: "QA, QC, QM" },
            { id: "c", text: "GMP, GPP, GCP" },
            { id: "d", text: "ISO, FDA, WHO" }
          ],
          correctAnswer: "a",
          explanation: "Equipment qualification consists of Installation Qualification (IQ), Operational Qualification (OQ), and Performance Qualification (PQ)."
        },
        {
          id: "q6",
          question: "What must be verified during raw material receiving?",
          options: [
            { id: "a", text: "Price only" },
            { id: "b", text: "Identity and quality" },
            { id: "c", text: "Delivery driver credentials" },
            { id: "d", text: "Package color" }
          ],
          correctAnswer: "b",
          explanation: "Raw material receiving must verify both identity (correct material) and quality (meets specifications) through inspection and testing."
        },
        {
          id: "q7",
          question: "How long does GMP certification typically take?",
          options: [
            { id: "a", text: "1-2 weeks" },
            { id: "b", text: "1-2 months" },
            { id: "c", text: "6-24 months" },
            { id: "d", text: "3-5 years" }
          ],
          correctAnswer: "c",
          explanation: "GMP certification typically requires 6-24 months for preparation, including facility upgrades, documentation, training, and system validation."
        },
        {
          id: "q8",
          question: "Which document provides step-by-step instructions for tasks?",
          options: [
            { id: "a", text: "Quality Policy" },
            { id: "b", text: "Organizational Chart" },
            { id: "c", text: "Standard Operating Procedure" },
            { id: "d", text: "Mission Statement" }
          ],
          correctAnswer: "c",
          explanation: "Standard Operating Procedures (SOPs) provide detailed, step-by-step instructions for performing specific tasks or operations."
        },
        {
          id: "q9",
          question: "What should be included in a Master Production Record?",
          options: [
            { id: "a", text: "Employee vacation schedules" },
            { id: "b", text: "Formula and process parameters" },
            { id: "c", text: "Competitor information" },
            { id: "d", text: "Marketing strategies" }
          ],
          correctAnswer: "b",
          explanation: "Master Production Records must include formula documentation, process parameters, equipment specifications, and quality checkpoints."
        },
        {
          id: "q10",
          question: "What is the primary purpose of a Quality Management System?",
          options: [
            { id: "a", text: "Increase production speed" },
            { id: "b", text: "Ensure consistent quality and compliance" },
            { id: "c", text: "Reduce employee count" },
            { id: "d", text: "Maximize profits only" }
          ],
          correctAnswer: "b",
          explanation: "The primary purpose of a QMS is to ensure consistent product quality and regulatory compliance through systematic quality control processes."
        }
      ],
      passingScore: 80
    }
  }
});

// Module 7: In-Process Controls and Monitoring
COURSE_MODULES.push({
  id: 7,
  title: "In-Process Controls and Monitoring",
  duration: "35 minutes",
  objectives: 7,
  hasQuiz: true,
  content: {
    sections: [
      {
        id: "overview",
        title: "Process Control Systems",
        type: "text",
        content: "In-process controls monitor and maintain product quality during manufacturing. These controls detect deviations early and prevent the production of non-conforming products.",
        image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        id: "critical-control-points",
        title: "Critical Control Points",
        type: "interactive",
        content: "Key monitoring points in cannabis manufacturing",
        interactive: {
          type: "checklist",
          items: [
            "Temperature control during extraction",
            "pH levels in formulations",
            "Weight verification for dosing",
            "Moisture content monitoring",
            "Time limits for processing steps",
            "Environmental conditions"
          ]
        }
      }
    ],
    quiz: {
      passingScore: 75,
      questions: [
        {
          id: "q1",
          question: "What is a Critical Control Point (CCP)?",
          options: [
            { id: "a", text: "A step where hazards can be prevented or eliminated" },
            { id: "b", text: "A final inspection point" },
            { id: "c", text: "A documentation requirement" },
            { id: "d", text: "A cleaning procedure" }
          ],
          correctAnswer: "a",
          explanation: "CCPs are points where hazards can be prevented, eliminated, or reduced to acceptable levels."
        }
      ]
    }
  }
});

// Generate remaining modules 8-14 with enhanced content
const enhancedModules = [
  {
    id: 8,
    title: "Training & Competency Management",
    duration: "30 minutes",
    objectives: 6,
    content: "Equipment qualification and preventive maintenance programs ensure consistent performance and product quality throughout the manufacturing process."
  },
  {
    id: 9,
    title: "Supplier Quality Management",
    duration: "25 minutes", 
    objectives: 5,
    content: "Environmental monitoring systems track temperature, humidity, air quality, and contamination risks to maintain controlled manufacturing conditions."
  },
  {
    id: 10,
    title: "Validation & Qualification",
    duration: "30 minutes",
    objectives: 6,
    content: "Comprehensive documentation systems ensure traceability, support regulatory compliance, and provide evidence of quality system effectiveness."
  },
  {
    id: 11,
    title: "Change Control & Internal Auditing",
    duration: "35 minutes",
    objectives: 7,
    content: "Corrective and Preventive Action (CAPA) systems identify root causes of problems and implement sustainable improvements to prevent recurrence."
  },
  {
    id: 12,
    title: "Statistical Process Control (SPC)",
    duration: "25 minutes",
    objectives: 5,
    content: "Product release procedures ensure only conforming products reach consumers, while distribution controls maintain product integrity throughout the supply chain."
  },
  {
    id: 13,
    title: "Lean Manufacturing & 5S",
    duration: "30 minutes",
    objectives: 6,
    content: "Effective audit programs and inspection readiness ensure ongoing compliance and demonstrate commitment to quality and regulatory requirements."
  },
  {
    id: 14,
    title: "Problem-Solving Methodologies",
    duration: "25 minutes",
    objectives: 5,
    content: "Sustainable quality systems require a culture where every team member understands their role in maintaining product quality and customer safety."
  }
];

enhancedModules.forEach(module => {
  COURSE_MODULES.push({
    id: module.id,
    title: module.title,
    duration: module.duration,
    objectives: module.objectives,
    hasQuiz: true,
    content: {
      sections: [
        {
          id: "overview",
          title: `${module.title} Overview`,
          type: "text",
          content: module.content,
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
        },
        {
          id: "key-concepts",
          title: "Key Concepts",
          type: "interactive",
          content: `Essential elements of ${module.title.toLowerCase()}`,
          interactive: {
            type: "checklist",
            items: [
              "Regulatory requirements and standards",
              "Implementation best practices",
              "Risk assessment and mitigation",
              "Documentation requirements",
              "Performance monitoring",
              "Continuous improvement"
            ]
          }
        }
      ],
      quiz: {
        passingScore: 75,
        questions: [
          {
            id: "q1",
            question: `What is the primary goal of ${module.title}?`,
            options: [
              { id: "a", text: "Regulatory compliance" },
              { id: "b", text: "Quality assurance and consumer safety" },
              { id: "c", text: "Cost reduction" },
              { id: "d", text: "Process efficiency" }
            ],
            correctAnswer: "b",
            explanation: `${module.title} focuses on ensuring quality assurance and consumer safety in cannabis manufacturing.`
          },
          {
            id: "q2",
            question: "Which approach is most effective for sustainable quality systems?",
            options: [
              { id: "a", text: "Reactive problem solving" },
              { id: "b", text: "Preventive measures and continuous improvement" },
              { id: "c", text: "Minimum compliance requirements" },
              { id: "d", text: "Cost-based decisions" }
            ],
            correctAnswer: "b",
            explanation: "Preventive measures and continuous improvement create sustainable, effective quality systems."
          }
        ]
      }
    }
  });
});
