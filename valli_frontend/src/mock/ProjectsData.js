export const projectsData = [{
    id: 1,

    /*Project Overview*/
    overviewData: {
        public: true,
        name: "First Project",
        status: "Good",
        location: "New Delhi",
        type: "Wheat Field",
        objective: "Grow more",
        newInsights: 3,
        lastUpdated: new Date(),
    },

    /*Field And Crop Details*/
    fieldAndCropDetails: {
        size: "5",
        stage: "Planning",
        irrigationMethod: "Canal",
    },

    /*Health Metrics*/
    healthMetricsData: {
        bar: 90,
        dayHeatStress: 6,
        nightHeatStress: 3,
        waterNeeds: "Medium",
        frostRisk: "Low",
        soilHealth: 80,
    },

    /*Water Usage*/
    waterData: {
        waterSources: {
            labels: ["Tube Wells", "Canal", "Sprinkler", "Drip"],
            data: [52, 22.8, 13.9, 11.3],
            colors: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722"],
        },
        waterUsage: {
            current: 22000,
            estimated: 15000,
            colors: {
                current: "#1F3A93",
                estimated: "#FFC107",
            },
        },
    },

    /*Biological And Recommendations*/
    bioAndRecommendationsData: {
        listProductsData: [{
            header: {
                title: "🌿 Stress Buster",
                subtitle: "Anti-Stress & Growth Activator",
            },
            description: "A bio-stimulant that helps plants tolerate and recover from abiotic stress (cold, heat, drought, wounding), preserving yield.",
            link: "https://example.com/stress-buster"
        },
            {
                header: {
                    title: "🌾 Yield Booster",
                    subtitle: "Root Development Enhancer",
                },
                description: "Improves nutrient uptake and boosts early-stage root growth for better yield.",
                link: "https://example.com/yield-booster"
            },
        ],
        usageHistory: [{
            name: "Stress Buster",
            date: new Date(),
            result: null
        },
            {
                name: "Yield Booster",
                date: new Date(),
                result: "Grows more"
            }
        ]
    },
    /*Financial Overview*/
    financialOverview: {
        transactions: [{
            category: '📈 Estimated Profit',
            amount: 18000,
            unit: '₹',
            description: 'per acre'
        },
            {
                category: '🌾 Yield Expectation',
                amount: 2100,
                unit: 'kg',
                description: 'per acre'
            },
            {
                category: '💰 Expected Revenue',
                amount: 52000,
                unit: '₹',
                description: 'per acre'
            },
            {
                category: '💸 Total Cost',
                amount: 34000,
                unit: '₹',
                description: 'per acre'
            },
            {
                category: '📊 Price Trends',
                amount: 'Up 4%',
                unit: '',
                description: 'this month'
            },
        ],
        summaryData: {
            labels: ['Seeds & Fertilizers', 'Irrigation Costs', 'Labor & Machinery', 'Electricity & Fuel', 'Protection'],
            data: [20000, 20000, 50000, 80000, 80000],
            colors: ['#66BB6A', '#42A5F5', '#FFA726', '#AB47BC', '#FF7043']
        }
    },

    /*Insights*/
    insightsData: {
        environmentInsights: [{
            title: "🌱 Growth Efficiency",
            description: "Your Wheat crop is growing 12% faster compared to the regional average.",
        },
            {
                title: "💧 Water Efficiency",
                description: "Your current water usage is 18% lower than local benchmarks for wheat.",
            },
            {
                title: "🌧 Rainfall Utilization",
                description: "Rain forecast of 25 mm this week may reduce irrigation needs by ~12%.",
            },
            {
                title: "🌡 Heat Stress Outlook",
                description: "Daytime heat stress is moderate (5/9), monitor crop resilience closely.",
            },
            {
                title: "📉 Seasonal Water Use Comparison",
                description: "Estimated total use: 18,000 m³ (3,600 m³/acre) — efficient for this stage.",
            },
        ],
        businessInsights: [{
            title: "🌾 Yield Prediction",
            description: "Expected wheat yield is 9% above average due to early planting and stable weather.",
        },
            {
                title: "💰 Market Price Forecast",
                description: "Wheat prices projected to increase by 6% during harvest window (Sept 15–25).",
            },
            {
                title: "⏳ Harvest Timing Recommendation",
                description: "Ideal harvest time is Sept 18–22 to align with peak market demand.",
            },
            {
                title: "🧑‍🌾 Labor & Machinery Cost Insights",
                description: "Mechanical harvesting could save up to 12% in operational expenses.",
            },
            {
                title: "🚜 Resource Efficiency",
                description: "Canal irrigation is cost-effective; no change needed for current season.",
            }
        ],
        protectionInsights: [{
            title: "🛡 Recommended Biological Products",
            description: "Applying 'Stress Buster' this week can reduce early heat stress impact.",
        },
            {
                title: "🐛 Pest & Disease Alert",
                description: "Minor aphid activity spotted regionally — monitor closely.",
            },
            {
                title: "⚠️ Frost Risk",
                description: "Frost risk is minimal until October, no actions required now.",
            },
            {
                title: "💦 Irrigation Risk",
                description: "Canal-based irrigation may be affected by upcoming dry spell — stay alert.",
            },
            {
                title: "✅ Soil Protection Recommendations",
                description: "Soil is in good shape (80%). Consider 'Yield Booster' for nutrient balancing.",
            },
        ],
    },
},
    {
        id: 2,

        /*Project Overview*/
        overviewData: {
            public: false,
            name: "Golden Cornfield",
            status: "Moderate",
            location: "Iowa",
            type: "Corn",
            objective: "Increase resistance to pests",
            newInsights: 2,
            lastUpdated: new Date(),
        },

        /*Field And Crop Details*/
        fieldAndCropDetails: {
            size: "12",
            stage: "Active Growth",
            irrigationMethod: "Sprinkler",
        },

        /*Health Metrics*/
        healthMetricsData: {
            bar: 60,
            dayHeatStress: 4,
            nightHeatStress: 5,
            waterNeeds: "High",
            frostRisk: "Medium",
            soilHealth: 72,
        },

        /*Water Usage*/
        waterData: {
            waterSources: {
                labels: ["Tube Wells", "Canal", "Sprinkler", "Drip"],
                data: [15, 5, 70, 10],
                colors: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722"],
            },
            waterUsage: {
                current: 24000,
                estimated: 20000,
                colors: {
                    current: "#1F3A93",
                    estimated: "#FFC107",
                },
            },
        },

        /*Biological And Recommendations*/
        bioAndRecommendationsData: {
            listProductsData: [{
                header: {
                    title: "🛡 Pest Guard",
                    subtitle: "Biological Protection from Common Corn Pests",
                },
                description: "An eco-friendly bio-product that builds natural resistance to aphids and beetles. Enhances immunity and improves resilience in early growth stages.",
                link: "https://www.example-bio.com/pest-guard"
            }],
            usageHistory: [{
                name: "Pest Guard",
                date: new Date("2023-06-12"),
                result: "Reduced pest activity significantly",
            },
                {
                    name: "Nitro Boost",
                    date: new Date("2023-07-02"),
                    result: "Enhanced leaf development",
                },
            ],
        },
        /*Financial Overview*/
        financialOverview: {
            transactions: [{
                category: '📈 Estimated Profit',
                amount: 18000,
                unit: '₹',
                description: 'per acre'
            },
                {
                    category: '🌾 Yield Expectation',
                    amount: 2100,
                    unit: 'kg',
                    description: 'per acre'
                },
                {
                    category: '💰 Expected Revenue',
                    amount: 52000,
                    unit: '₹',
                    description: 'per acre'
                },
                {
                    category: '💸 Total Cost',
                    amount: 34000,
                    unit: '₹',
                    description: 'per acre'
                },
                {
                    category: '📊 Price Trends',
                    amount: 'Up 4%',
                    unit: '',
                    description: 'this month'
                },
            ],
            summaryData: {
                labels: ['Seeds', 'Watering & Irrigation', 'Labor', 'Machinery', 'Pest Control'],
                data: [15000, 18000, 25000, 30000, 20000],
                colors: ['#81C784', '#4FC3F7', '#FFB74D', '#9575CD', '#EF5350']
            }
        },

        /*Insights*/
        insightsData: {
            environmentInsights: [{
                title: "🌱 Growth Efficiency",
                description: "Corn is showing 5% slower growth vs. regional average due to late planting.",
            },
                {
                    title: "💧 Water Efficiency",
                    description: "Water use is within normal limits but has room for 10% optimization.",
                },
                {
                    title: "🌧 Rainfall Utilization",
                    description: "35 mm rainfall expected; hold irrigation for 3–4 days to save resources.",
                },
                {
                    title: "🌡 Heat Stress Outlook",
                    description: "Heat stress will peak midweek (7/9) — risk of leaf curl.",
                },
                {
                    title: "📉 Seasonal Water Use Comparison",
                    description: "Estimated: 24,000 m³ (4,800 m³/acre) — just above sustainable level.",
                },
            ],
            businessInsights: [{
                title: "🌾 Yield Prediction",
                description: "Corn yield might be 5% below average due to late sowing and heatwaves.",
            },
                {
                    title: "💰 Market Price Forecast",
                    description: "Corn prices remain stable with minor expected growth of 2–3% by October.",
                },
                {
                    title: "⏳ Harvest Timing Recommendation",
                    description: "Harvest between Oct 5–10 to avoid weather-related losses.",
                },
                {
                    title: "🧑‍🌾 Labor & Machinery Cost Insights",
                    description: "Switching to local co-op machinery can reduce labor costs by 18%.",
                },
                {
                    title: "🚜 Resource Efficiency",
                    description: "Sprinkler system may increase water cost; consider partial automation.",
                },
            ],
            protectionInsights: [{
                title: "🛡 Recommended Biological Products",
                description: "'Root Shield' is suggested to prevent early-stage nematode infestation.",
            },
                {
                    title: "🐛 Pest & Disease Alert",
                    description: "Increased beetle presence expected post-rain — apply early deterrent.",
                },
                {
                    title: "⚠️ Frost Risk",
                    description: "Moderate frost risk begins mid-October — prep protection materials.",
                },
                {
                    title: "💦 Irrigation Risk",
                    description: "Sprinkler zones show uneven saturation — inspect southern area.",
                },
                {
                    title: "✅ Soil Protection Recommendations",
                    description: "Current soil health (72%) is fair. Add bio-activators before next planting.",
                },
            ],
        },
    },

    {
        id: 3,

        /*Project Overview*/
        overviewData: {
            public: true,
            name: "Rice Paradise",
            status: "Good",
            location: "Dhaka",
            type: "Rice Paddies",
            objective: "Optimize water efficiency",
            newInsights: 0,
            lastUpdated: new Date(),
        },

        /*Field And Crop Details*/
        fieldAndCropDetails: {
            size: "18",
            stage: "Harvesting",
            irrigationMethod: "Tube wells",
        },

        /*Health Metrics*/
        healthMetricsData: {
            bar: 80,
            dayHeatStress: 5,
            nightHeatStress: 2,
            waterNeeds: "Very High",
            frostRisk: "Low",
            soilHealth: 65,
        },

        /*Water Usage*/
        waterData: {
            waterSources: {
                labels: ["Tube Wells", "Canal", "Sprinkler", "Drip"],
                data: [85, 5, 5, 5],
                colors: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722"],
            },
            waterUsage: {
                current: 27500,
                estimated: 27000,
                colors: {
                    current: "#1F3A93",
                    estimated: "#FFC107",
                },
            },
        },

        /*Biological And Recommendations*/
        bioAndRecommendationsData: {
            listProductsData: [{
                header: {
                    title: "💧 Hydro Sync",
                    subtitle: "Smart Water Balancer",
                },
                description: "Balances water distribution and reduces over-saturation during heavy rainfall. Improves rice root stability.",
                link: "https://www.example-bio.com/hydro-sync",
            }],
            usageHistory: [{
                name: "Hydro Sync",
                date: new Date("2023-06-20"),
                result: "Water usage optimized",
            },
                {
                    name: "Harvest Helper",
                    date: new Date("2023-07-10"),
                    result: "Easier grain separation",
                },
            ],
        },
        /*Financial Overview*/
        financialOverview: {
            transactions: [{
                category: '📈 Estimated Profit',
                amount: 18000,
                unit: '₹',
                description: 'per acre'
            },
                {
                    category: '🌾 Yield Expectation',
                    amount: 2100,
                    unit: 'kg',
                    description: 'per acre'
                },
                {
                    category: '💰 Expected Revenue',
                    amount: 52000,
                    unit: '₹',
                    description: 'per acre'
                },
                {
                    category: '💸 Total Cost',
                    amount: 34000,
                    unit: '₹',
                    description: 'per acre'
                },
                {
                    category: '📊 Price Trends',
                    amount: 'Up 4%',
                    unit: '',
                    description: 'this month'
                },
            ],
            summaryData: {
                labels: ['Soil Enhancers', 'Drip Setup', 'Labor', 'Bio Products', 'Fertilizer'],
                data: [12000, 15000, 22000, 18000, 25000],
                colors: ['#AED581', '#4DD0E1', '#FF8A65', '#BA68C8', '#FFD54F']
            }
        },


        /*Insights*/
        insightsData: {
            environmentInsights: [{
                title: "🌱 Growth Efficiency",
                description: "Your Rice crop is growing 15% faster compared to the regional average.",
            },
                {
                    title: "💧 Water Efficiency",
                    description: "Your current water usage is 20% lower compared to the average regional farmer this season.",
                },
                {
                    title: "🌧 Rainfall Utilization",
                    description: "Upcoming rainfall (30 mm forecast) may reduce your next irrigation need by ~15%.",
                },
                {
                    title: "🌡 Heat Stress Outlook",
                    description: "Daytime heat stress is predicted to stay low (2/9), optimal conditions for the coming week.",
                },
                {
                    title: "📉 Seasonal Water Use Comparison",
                    description: "Estimated seasonal water use: 27,500 m³ total (5,500 m³/acre), which is within sustainable limits for your region.",
                },
            ],
            businessInsights: [{
                title: "🌾 Yield Prediction",
                description: "Based on current growth, your estimated yield is 8–10% above the regional average.",
            },
                {
                    title: "💰 Market Price Forecast",
                    description: "Rice prices are projected to rise by approximately 7% around your estimated harvest date (Nov 25–30).",
                },
                {
                    title: "⏳ Harvest Timing Recommendation",
                    description: "Optimal harvest window (Nov 25–30) could help maximize market price.",
                },
                {
                    title: "🧑‍🌾 Labor & Machinery Cost Insights",
                    description: "Switching from manual labor to machinery could potentially save up to 15% in operational costs.",
                },
                {
                    title: "🚜 Resource Efficiency",
                    description: "Your current irrigation method (Tube wells) is cost-efficient, but transitioning to drip irrigation could further reduce costs by ~10–20% next season.",
                },
            ],
            protectionInsights: [{
                title: "🛡 Recommended Biological Products",
                description: "Applying 'Stress Buster' can reduce risks related to upcoming mild nighttime heat stress, preserving crop health.",
            },
                {
                    title: "🐛 Pest & Disease Alert",
                    description: "No significant pest or disease risks detected in your region currently. Regular monitoring is advised.",
                },
                {
                    title: "⚠️ Frost Risk",
                    description: "Frost risk remains low for your area until the estimated harvest date.",
                },
                {
                    title: "💦 Irrigation Risk",
                    description: "Your groundwater-based irrigation method is stable, but monitoring groundwater levels is recommended due to regional water table fluctuations.",
                },
                {
                    title: "✅ Soil Protection Recommendations",
                    description: "Soil health is adequate (65%). Consider biological products like 'Yield Booster' for improved soil nutrient efficiency and reduced chemical fertilizer dependence.",
                },
            ],
        },
    },
    {
        id: 4,

        /*Project Overview*/
        overviewData: {
            public: false,
            name: "Barley Base",
            status: "Needs Attention",
            location: "Edinburgh",
            type: "Barley",
            objective: "Improve grain quality",
            newInsights: 1,
            lastUpdated: new Date(),
        },

        /*Field And Crop Details*/
        fieldAndCropDetails: {
            size: "7.5",
            stage: "Soil Prep",
            irrigationMethod: "Drip",
        },

        /*Health Metrics*/
        healthMetricsData: {
            bar: 40,
            dayHeatStress: 2,
            nightHeatStress: 1,
            waterNeeds: "Low",
            frostRisk: "High",
            soilHealth: 91,
        },

        /*Water Usage*/
        waterData: {
            waterSources: {
                labels: ["Tube Wells", "Canal", "Sprinkler", "Drip"],
                data: [0, 0, 10, 90],
                colors: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722"],
            },
            waterUsage: {
                current: 15000,
                estimated: 14000,
                colors: {
                    current: "#1F3A93",
                    estimated: "#FFC107",
                },
            },
        },

        /*Biological And Recommendations*/
        bioAndRecommendationsData: {
            listProductsData: [{
                header: {
                    title: "🧬 Root Energizer",
                    subtitle: "Frost-Ready Root Booster",
                },
                description: "Prepares barley roots for harsh conditions and improves nutrient uptake in cold climates.",
                link: "https://www.example-bio.com/root-energizer",
            }],
            usageHistory: [{
                name: "Root Energizer",
                date: new Date("2023-10-10"),
                result: "Stronger roots under frost",
            },
                {
                    name: "Soil Activator",
                    date: new Date("2023-09-22"),
                    result: "Increased microbial activity",
                },
            ],
        },
        /*Financial Overview*/
        financialOverview: {
            transactions: [{
                category: '📈 Estimated Profit',
                amount: 18000,
                unit: '₹',
                description: 'per acre'
            },
                {
                    category: '🌾 Yield Expectation',
                    amount: 2100,
                    unit: 'kg',
                    description: 'per acre'
                },
                {
                    category: '💰 Expected Revenue',
                    amount: 52000,
                    unit: '₹',
                    description: 'per acre'
                },
                {
                    category: '💸 Total Cost',
                    amount: 34000,
                    unit: '₹',
                    description: 'per acre'
                },
                {
                    category: '📊 Price Trends',
                    amount: 'Up 4%',
                    unit: '',
                    description: 'this month'
                },
            ],
            summaryData: {
                labels: ['Seedlings', 'Irrigation', 'Manual Labor', 'Fuel', 'Nutrient Boosters'],
                data: [18000, 20000, 27000, 15000, 22000],
                colors: ['#66BB6A', '#29B6F6', '#FFCA28', '#8D6E63', '#D4E157']
            }
        },

        /*Insights*/
        insightsData: {
            environmentInsights: [{
                title: "🌱 Growth Efficiency",
                description: "Barley growth is on par with other regional fields.",
            },
                {
                    title: "💧 Water Efficiency",
                    description: "Your drip irrigation provides 25% better water savings vs. average farms.",
                },
                {
                    title: "🌧 Rainfall Utilization",
                    description: "Next week’s expected 20 mm rainfall covers most moisture needs.",
                },
                {
                    title: "🌡 Heat Stress Outlook",
                    description: "Low overall heat stress (1/9) predicted — no actions required.",
                },
                {
                    title: "📉 Seasonal Water Use Comparison",
                    description: "Projected use: 15,000 m³ (3,000 m³/acre) — excellent efficiency.",
                },
            ],
            businessInsights: [{
                title: "🌾 Yield Prediction",
                description: "Barley expected to yield 10% above average due to high soil quality and minimal stress.",
            },
                {
                    title: "💰 Market Price Forecast",
                    description: "Forecasts suggest barley prices may rise 4–6% during early December.",
                },
                {
                    title: "⏳ Harvest Timing Recommendation",
                    description: "Late November harvest (20–25) is optimal for both quality and pricing.",
                },
                {
                    title: "🧑‍🌾 Labor & Machinery Cost Insights",
                    description: "Early equipment rentals offer 20% savings vs. seasonal peak prices.",
                },
                {
                    title: "🚜 Resource Efficiency",
                    description: "Your drip irrigation setup is already among the most cost-effective in the region.",
                },
            ],
            protectionInsights: [{
                title: "🛡 Recommended Biological Products",
                description: "'Root Energizer' helps increase frost resistance at root level.",
            },
                {
                    title: "🐛 Pest & Disease Alert",
                    description: "No major pests observed, but weekly inspections are encouraged.",
                },
                {
                    title: "⚠️ Frost Risk",
                    description: "High frost risk in early November — activate frost protection protocols.",
                },
                {
                    title: "💦 Irrigation Risk",
                    description: "No issues found. Drip irrigation shows consistent delivery.",
                },
                {
                    title: "✅ Soil Protection Recommendations",
                    description: "Soil quality is excellent (91%). Continue low-impact fertilization approach.",
                },
            ],
        },
    }
]