type DesignFlowSteps = {
    id: number;
    title: string;
    description: string;
    tags: string[];
};
const designFlowData:DesignFlowSteps[] = [
    {
        id:1,
        title: "Data Input & Collection",
        description:"Students provide comprehensive information through an intuitive form interface. The system collects multiple dimensions of data to ensure accurate predictions.",
        tags: ["Academic Records", "Study Habits", "Attendance Data", "Lifestyle Factors", "Environmental Conditions"]
    },
    {
        id:2,
        title: "AI-Powered Prediction",
        description:"Our machine learning model analyzes the input data using advanced algorithms trained on thousands of student records. The model identifies patterns and correlations to generate accurate performance predictions.",
        tags: ["Pattern Recognition", "Predictive Analytics", "Score Forecasting", "Confidence Metrics"]
    },
    {
        id:3,
        title: "Explainable Results",
        description:"Unlike black-box AI systems, we provide transparent explanations for every prediction. The system highlights which factors most influenced the predicted outcome, helping students understand the 'why' behind their results.",
        tags: ["Feature Importance", "Visual Explanations", "Impact Analysis", "SHAP Values"]
    },
    {
        id:4,
        title: "Personalized Recommendations",
        description:"Based on the analysis, the system generates tailored improvement strategies and curates relevant learning resources. Each recommendation is specific, actionable, and designed to maximize academic success.",
        tags:["Study Plans", "Resource Library", "Action Items", "Progress Tracking"]
    },
]

export {designFlowData}