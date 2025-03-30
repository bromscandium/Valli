export const environmentInsights = [
    {
        title: "🌿 Growth Efficiency",
        description: "Your crop is growing 15% faster than regional average for this time of year.",
    },
    {
        title: "💧 Water Efficiency",
        description: "You're using 20% less water than last season while maintaining excellent crop health.",
    },
    {
        title: "🌧️ Rainfall Utilization",
        description: "Based on current growth rate, optimal harvest time will be November 25–30.",
    },
]

export const businessInsights = [
    {
        title: "📈 Market Trends",
        description: "Market prices for Cotton are projected to rise 8% by harvest time.",
    },
    {
        title: "💹 Cost Efficiency",
        description: "Your operational costs are 10% lower than regional competitors.",
    },
]

export const protectionInsights = [
    {
        title: "🦠 Pest Risk",
        description: "Slightly increased risk of aphids due to mild weather.",
    },
    {
        title: "🛡️ Crop Shield",
        description: "Biological protection recommended for next week.",
    },
]

export const dataStress = {
    labels: ["Daytime", "Nighttime"],
    datasets: [
        {
            label: "Heat Stress Levels",
            data: [3, 7],
            backgroundColor: ["#FFC107", "#1F3A93"],
            borderRadius: 12,
        },
    ],
}

export const optionsStress = {
    responsive: true,
}

export const waterData = {
    waterSources: {
        labels: ["Tube Wells", "Canal", "Sprinkler", "Drip"],
        data: [52, 22.8, 13.9, 11.3],
        colors: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722"],
    },
    waterUsage: {
        labels: ["January", "February", "March", "April"],
        current: [22000, 20000, 25000, 21000],
        estimated: [15000, 17000, 19000, 18000],
        colors: {
            current: "#1F3A93",
            estimated: "#FFC107",
        },
    },
}

export const financialData = {
    transactions: [
        { icon: "📈", category: "Estimated Profit", amount: 15000, unit: "₹", description: "per acre" },
        { icon: "🌾", category: "Yield Expectation", amount: 1800, unit: "kg", description: "per acre" },
        { icon: "💰", category: "Expected Revenue", amount: 45000, unit: "₹", description: "per acre" },
        { icon: "💸", category: "Total Cost", amount: 30000, unit: "₹", description: "per acre" },
        { icon: "📊", category: "Price Trends", amount: "Up 3%", unit: "", description: "this month" },
    ],
    summaryData: {
        labels: ["Seeds & Fertilizers", "Irrigation Costs", "Labor & Machinery", "Electricity & Fuel", "Protection"],
        data: [20000, 20000, 50000, 80000, 80000],
        colors: ["#66BB6A", "#42A5F5", "#FFA726", "#AB47BC", "#FF7043"],
    },
}

export const recommendationData = {
    header: {
        title: "🌿 Stress Buster",
        subtitle: "Anti-Stress & Growth Activator",
    },
    description: "A bio-stimulant that helps plants tolerate and recover from abiotic stress (cold, heat, drought, wounding), preserving yield.",
    benefits: ["Reduces stress impact", "Supports plant metabolism"],
    link: {
        text: "Learn More",
        url: "https://www.syngenta.com/",
    },
}
