import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ExternalLink,
  Sparkles,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  BookOpen,
  Brain,
  Target,
  Activity,
  Info,
  Loader2,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────

interface ModelInput {
  hours_studied: number;
  attendance: number;
  sleep_hours: number;
  previous_scores: number;
  tutoring_sessions: number;
  physical_activity: number;
  distance_from_home: "Near" | "Moderate" | "Far";
  parental_involvement: "Low" | "Medium" | "High";
  access_to_resources: "Low" | "Medium" | "High";
  motivation_level: "Low" | "Medium" | "High";
  family_income: "Low" | "Medium" | "High";
  teacher_quality: "Low" | "Medium" | "High";
  parent_education_level: "High School" | "College" | "Post Graduate";
  extracurricular_activities: "Yes" | "No";
  internet_access: "Yes" | "No";
  learning_disabilities: "Yes" | "No";
  school_type: "Public" | "Private";
  peer_influence: "Positive" | "Neutral" | "Negative";
  gender: "Male" | "Female";
}

interface ModelResponse {
  predicted_score: number;
  confidence: number;
  performance_tier: "High" | "Medium" | "Low";
  feature_importance: {
    feature: string;
    importance: number;
    current_value: string | number;
    direction: "positive" | "negative";
  }[];
}

interface AISuggestion {
  category: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  estimated_impact: string;
  actionable_steps: string[];
}

// ─── Mock Data (Replace with real API response) ──────────────────────────

const modelInput: ModelInput = {
  hours_studied: 34,
  attendance: 93,
  sleep_hours: 4,
  previous_scores: 95,
  tutoring_sessions: 2,
  physical_activity: 0,
  distance_from_home: "Far",
  parental_involvement: "Low",
  access_to_resources: "Low",
  motivation_level: "Low",
  family_income: "Low",
  teacher_quality: "Low",
  parent_education_level: "Post Graduate",
  extracurricular_activities: "No",
  internet_access: "Yes",
  learning_disabilities: "No",
  school_type: "Public",
  peer_influence: "Negative",
  gender: "Female",
};

const modelResponse: ModelResponse = {
  predicted_score: 67,
  confidence: 82,
  performance_tier: "Medium",
  feature_importance: [
    { feature: "hours_studied", importance: 85, current_value: 34, direction: "positive" },
    { feature: "previous_scores", importance: 78, current_value: 95, direction: "positive" },
    { feature: "attendance", importance: 71, current_value: 93, direction: "positive" },
    { feature: "sleep_hours", importance: -82, current_value: 4, direction: "negative" },
    { feature: "motivation_level", importance: -68, current_value: "Low", direction: "negative" },
    { feature: "physical_activity", importance: -54, current_value: 0, direction: "negative" },
    { feature: "peer_influence", importance: -47, current_value: "Negative", direction: "negative" },
    { feature: "access_to_resources", importance: -41, current_value: "Low", direction: "negative" },
    { feature: "family_income", importance: -38, current_value: "Low", direction: "negative" },
    { feature: "teacher_quality", importance: -32, current_value: "Low", direction: "negative" },
  ],
};

// Mock AI suggestions (replace with real API call)
const aiSuggestions: AISuggestion[] = [
  {
    category: "Health & Wellness",
    title: "Critical Sleep Deficit",
    description:
      "With only 4 hours of sleep per night, you're operating at a significant cognitive deficit. Research shows that students need 7-9 hours for optimal memory consolidation and exam performance.",
    priority: "high",
    estimated_impact: "+8-12 points",
    actionable_steps: [
      "Set a consistent bedtime at 10:30 PM to wake at 6:30 AM",
      "Reduce study hours from 34/week to 28/week to create time for sleep",
      "Create a wind-down routine 30 minutes before bed (no screens)",
      "Consider naps: 20-minute power naps between 2-3 PM can help",
    ],
  },
  {
    category: "Mental Health",
    title: "Motivation & Burnout Risk",
    description:
      "Low motivation combined with extreme study hours (34/week) and minimal sleep suggests burnout risk. You're studying hard but not efficiently.",
    priority: "high",
    estimated_impact: "+5-8 points",
    actionable_steps: [
      "Identify your 'why' — write down 3 personal reasons this exam matters",
      "Use the Pomodoro Technique: 25 min focus, 5 min break",
      "Reward yourself after study sessions (not before)",
      "Connect with a counselor or mentor for accountability",
    ],
  },
  {
    category: "Physical Health",
    title: "Zero Physical Activity",
    description:
      "No physical activity compounds sleep deprivation and stress. Even 20 minutes of movement per day improves focus, memory, and mood.",
    priority: "medium",
    estimated_impact: "+3-5 points",
    actionable_steps: [
      "Morning: 10-minute walk before studying",
      "Afternoon: Stretching or yoga between study blocks",
      "Join a study group that meets for walks (combine social + movement)",
      "Use movement as a study break reward",
    ],
  },
  {
    category: "Social Environment",
    title: "Negative Peer Influence",
    description:
      "Negative peer influence can undermine motivation and create distractions. Seek out peers who share your academic goals.",
    priority: "medium",
    estimated_impact: "+2-4 points",
    actionable_steps: [
      "Find 1-2 study partners who are also preparing seriously",
      "Join online study communities or Discord servers for your subject",
      "Politely limit time with peers who discourage studying",
      "Consider library study sessions to reduce social distractions",
    ],
  },
  {
    category: "Resources & Support",
    title: "Low Access to Resources",
    description:
      "Limited resources can be overcome with free online tools. You have internet access — leverage it strategically.",
    priority: "low",
    estimated_impact: "+2-3 points",
    actionable_steps: [
      "Khan Academy, Coursera, edX for subject-specific courses",
      "YouTube channels: Crash Course, 3Blue1Brown (math), etc.",
      "Free practice exams: Search '[your exam] practice test PDF'",
      "Ask teachers for recommended free resources",
    ],
  },
];

// ─── Utility Functions ────────────────────────────────────────────────────

const getFeatureLabel = (feature: string): string => {
  const labels: Record<string, string> = {
    hours_studied: "Study Hours per Week",
    attendance: "Attendance Rate",
    sleep_hours: "Sleep Hours per Night",
    previous_scores: "Previous Exam Scores",
    tutoring_sessions: "Tutoring Sessions per Month",
    physical_activity: "Physical Activity (hrs/week)",
    distance_from_home: "Distance from School",
    parental_involvement: "Parental Involvement",
    access_to_resources: "Access to Resources",
    motivation_level: "Motivation Level",
    family_income: "Family Income",
    teacher_quality: "Teacher Quality",
    parent_education_level: "Parent Education Level",
    extracurricular_activities: "Extracurricular Activities",
    internet_access: "Internet Access",
    learning_disabilities: "Learning Disabilities",
    school_type: "School Type",
    peer_influence: "Peer Influence",
    gender: "Gender",
  };
  return labels[feature] || feature;
};

const formatValue = (value: string | number): string => {
  if (typeof value === "number") return value.toString();
  return value;
};

const tierConfig = {
  High: {
    color:
      "bg-emerald-500/15 text-emerald-700 border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-700",
    dot: "bg-emerald-500",
  },
  Medium: {
    color:
      "bg-amber-500/15 text-amber-700 border-amber-300 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-700",
    dot: "bg-amber-500",
  },
  Low: {
    color:
      "bg-red-500/15 text-red-700 border-red-300 dark:bg-red-500/10 dark:text-red-400 dark:border-red-700",
    dot: "bg-red-500",
  },
};

const priorityConfig = {
  high: {
    color: "border-l-red-400 dark:border-l-red-500",
    badge: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800",
  },
  medium: {
    color: "border-l-amber-400 dark:border-l-amber-500",
    badge: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
  },
  low: {
    color: "border-l-blue-400 dark:border-l-blue-500",
    badge: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
  },
};

// ─── Component ────────────────────────────────────────────────────────────

export default function ResultsPage() {
  const [aiExpanded, setAiExpanded] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [expandedSuggestion, setExpandedSuggestion] = useState<number | null>(null);

  const tier = tierConfig[modelResponse.performance_tier];
  const scoreDelta = modelResponse.predicted_score - modelInput.previous_scores;

  const positiveFeatures = modelResponse.feature_importance
    .filter((f) => f.direction === "positive")
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 4);

  const negativeFeatures = modelResponse.feature_importance
    .filter((f) => f.direction === "negative")
    .sort((a, b) => Math.abs(b.importance) - Math.abs(a.importance))
    .slice(0, 4);

  const handleGenerateAISuggestions = async () => {
    setLoadingAI(true);
    // Simulate API call — replace with real call to your backend
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoadingAI(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] dark:bg-[#0a1628] transition-colors duration-300">
      {/* Subtle corner radials */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-64 -right-64 h-[600px] w-[600px] rounded-full bg-[#003153]/5 dark:bg-[#4a90c4]/5 blur-3xl" />
        <div className="absolute -bottom-64 -left-64 h-[500px] w-[500px] rounded-full bg-[#003153]/4 dark:bg-[#4a90c4]/4 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* ── Page Header ──────────────────────────────────────────────────── */}
        <header className="mb-10">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#003153]/50 dark:text-[#93b8d4]/50">
            <Activity className="h-3.5 w-3.5" />
            <span>Prediction Report</span>
            <span className="text-[#003153]/30 dark:text-[#93b8d4]/30">·</span>
            <span>Student Performance AI</span>
          </div>
          <h1 className="font-['Playfair_Display',Georgia,serif] text-3xl font-bold tracking-tight text-[#002244] dark:text-[#d4e6f1] sm:text-4xl">
            Exam Performance Analysis
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[#003153]/60 dark:text-[#93b8d4]/70">
            Generated from your academic profile. Results are model-based estimates and should be
            interpreted alongside teacher feedback.
          </p>
        </header>

        {/* ── Section 1: Prediction Hero ───────────────────────────────────── */}
        <section aria-labelledby="prediction-heading" className="mb-8">
          <Card className="overflow-hidden border border-[#003153]/10 bg-white shadow-sm dark:border-[#4a90c4]/15 dark:bg-[#0d1f3c]">
            <div className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_1px_auto]">
              {/* Score panel */}
              <CardContent className="p-7 sm:p-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#003153]/50 dark:text-[#93b8d4]/50">
                      Predicted Exam Score
                    </p>
                    <div className="mt-1 flex items-end gap-3">
                      <span className="font-['Playfair_Display',Georgia,serif] text-7xl font-bold leading-none text-[#002244] dark:text-[#d4e6f1]">
                        {modelResponse.predicted_score}
                      </span>
                      <span className="mb-2 text-xl font-light text-[#003153]/40 dark:text-[#93b8d4]/40">
                        / 100
                      </span>
                    </div>

                    {/* Delta from previous */}
                    <div className="mt-3 flex items-center gap-2">
                      <div
                        className={`flex items-center gap-1 text-sm font-medium ${
                          scoreDelta > 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : scoreDelta < 0
                            ? "text-red-500 dark:text-red-400"
                            : "text-[#003153]/50 dark:text-[#93b8d4]/50"
                        }`}
                      >
                        {scoreDelta > 0 ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : scoreDelta < 0 ? (
                          <ArrowDownRight className="h-4 w-4" />
                        ) : (
                          <Minus className="h-4 w-4" />
                        )}
                        <span>
                          {scoreDelta > 0 ? "+" : ""}
                          {scoreDelta} from previous
                        </span>
                      </div>
                      <span className="text-xs text-[#003153]/35 dark:text-[#93b8d4]/40">
                        (was {modelInput.previous_scores})
                      </span>
                    </div>
                  </div>

                  {/* Performance badge */}
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide ${tier.color}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${tier.dot}`} />
                      {modelResponse.performance_tier} Performance
                    </span>
                  </div>
                </div>

                <Separator className="my-6 bg-[#003153]/8 dark:bg-[#4a90c4]/10" />

                {/* Confidence */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-[#003153]/60 dark:text-[#93b8d4]/60">
                      <Target className="h-3.5 w-3.5" />
                      Model Confidence
                    </span>
                    <span className="text-sm font-semibold text-[#002244] dark:text-[#d4e6f1]">
                      {modelResponse.confidence}%
                    </span>
                  </div>
                  <Progress
                    value={modelResponse.confidence}
                    className="h-1.5 bg-[#003153]/10 dark:bg-[#4a90c4]/10 [&>div]:bg-[#003153] dark:[&>div]:bg-[#4a90c4]"
                  />
                  <p className="mt-2 text-[11px] text-[#003153]/45 dark:text-[#93b8d4]/40">
                    Based on gradient-boosted ensemble trained on 12,400+ student records
                  </p>
                </div>
              </CardContent>

              {/* Vertical divider */}
              <div className="hidden w-px bg-[#003153]/8 dark:bg-[#4a90c4]/10 md:block" />

              {/* Quick stats */}
              <CardContent className="flex flex-row justify-between gap-6 border-t border-[#003153]/8 p-7 dark:border-[#4a90c4]/10 md:min-w-[220px] md:flex-col md:justify-start md:border-t-0 sm:p-9">
                <div>
                  <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-[#003153]/45 dark:text-[#93b8d4]/45">
                    Study Hours
                  </p>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-[#003153]/40 dark:text-[#4a90c4]/60" />
                    <span className="text-lg font-semibold text-[#002244] dark:text-[#d4e6f1]">
                      {modelInput.hours_studied}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-[#003153]/45 dark:text-[#93b8d4]/45">
                    Attendance
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-[#003153]/40 dark:text-[#4a90c4]/60" />
                    <span className="text-lg font-semibold text-[#002244] dark:text-[#d4e6f1]">
                      {modelInput.attendance}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-[#003153]/45 dark:text-[#93b8d4]/45">
                    Sleep
                  </p>
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 text-red-500 dark:text-red-400" />
                    <span className="text-lg font-semibold text-red-600 dark:text-red-400">
                      {modelInput.sleep_hours} hrs
                    </span>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </section>

        {/* ── Section 2: Feature Importance ─────────────────────────────────── */}
        <section aria-labelledby="explainability-heading" className="mb-8">
          <div className="mb-4">
            <h2
              id="explainability-heading"
              className="font-['Playfair_Display',Georgia,serif] text-xl font-semibold text-[#002244] dark:text-[#d4e6f1]"
            >
              What Drives This Prediction
            </h2>
            <p className="mt-1 text-sm text-[#003153]/55 dark:text-[#93b8d4]/60">
              Feature importance calculated by the model. Higher values indicate stronger influence
              on your predicted score.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Positive factors */}
            <Card className="border border-[#003153]/10 bg-white shadow-sm dark:border-[#4a90c4]/15 dark:bg-[#0d1f3c]">
              <CardHeader className="px-5 pb-3 pt-5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                    Positive Contributors
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 px-5 pb-5">
                {positiveFeatures.map((f) => (
                  <div key={f.feature}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs font-medium text-[#002244] dark:text-[#c8dff0]">
                        {getFeatureLabel(f.feature)}
                      </span>
                      <span className="font-mono text-[11px] text-[#003153]/50 dark:text-[#93b8d4]/50">
                        {formatValue(f.current_value)}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-950/40">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700 dark:from-emerald-500 dark:to-emerald-400"
                        style={{ width: `${f.importance}%` }}
                      />
                    </div>
                    <div className="mt-1 text-right text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      +{f.importance}%
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Negative factors */}
            <Card className="border border-[#003153]/10 bg-white shadow-sm dark:border-[#4a90c4]/15 dark:bg-[#0d1f3c]">
              <CardHeader className="px-5 pb-3 pt-5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-red-600 dark:text-red-400">
                    Negative Contributors
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 px-5 pb-5">
                {negativeFeatures.map((f) => (
                  <div key={f.feature}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs font-medium text-[#002244] dark:text-[#c8dff0]">
                        {getFeatureLabel(f.feature)}
                      </span>
                      <span className="font-mono text-[11px] text-[#003153]/50 dark:text-[#93b8d4]/50">
                        {formatValue(f.current_value)}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-red-100 dark:bg-red-950/40">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-700 dark:from-red-500 dark:to-red-400"
                        style={{ width: `${Math.abs(f.importance)}%` }}
                      />
                    </div>
                    <div className="mt-1 text-right text-[10px] font-medium text-red-500 dark:text-red-400">
                      {f.importance}%
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── Section 3: AI-Generated Suggestions ──────────────────────────── */}
        <section aria-labelledby="ai-suggestions-heading" className="mb-8">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2
                  id="ai-suggestions-heading"
                  className="font-['Playfair_Display',Georgia,serif] text-xl font-semibold text-[#002244] dark:text-[#d4e6f1]"
                >
                  Personalized AI Recommendations
                </h2>
                <p className="mt-1 text-sm text-[#003153]/55 dark:text-[#93b8d4]/60">
                  AI-generated actionable advice based on your specific profile and weak areas.
                </p>
              </div>
              {aiSuggestions.length === 0 && (
                <Button
                  onClick={handleGenerateAISuggestions}
                  disabled={loadingAI}
                  className="bg-[#003153] text-white hover:bg-[#002244] dark:bg-[#4a90c4] dark:text-[#0a1628] dark:hover:bg-[#5ba3d6]"
                >
                  {loadingAI ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Suggestions
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {aiSuggestions.length > 0 && (
            <div className="space-y-3">
              {aiSuggestions.map((suggestion, i) => (
                <Card
                  key={i}
                  className={`border border-l-4 ${priorityConfig[suggestion.priority].color} border-[#003153]/10 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-[#4a90c4]/15 dark:bg-[#0d1f3c]`}
                >
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`text-[10px] border px-2 py-0 h-5 font-semibold uppercase tracking-wide ${priorityConfig[suggestion.priority].badge}`}
                          >
                            {suggestion.priority} priority
                          </Badge>
                          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#003153]/40 dark:text-[#93b8d4]/40">
                            {suggestion.category}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-[10px] h-5 border-emerald-300 bg-emerald-50 px-2 py-0 font-semibold text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                          >
                            {suggestion.estimated_impact}
                          </Badge>
                        </div>

                        <h3 className="mb-2 text-sm font-semibold text-[#002244] dark:text-[#d4e6f1]">
                          {suggestion.title}
                        </h3>

                        <p className="mb-3 text-xs leading-relaxed text-[#003153]/60 dark:text-[#93b8d4]/65">
                          {suggestion.description}
                        </p>

                        {/* Collapsible action steps */}
                        <button
                          onClick={() => setExpandedSuggestion(expandedSuggestion === i ? null : i)}
                          className="flex items-center gap-2 text-xs font-semibold text-[#003153] transition-colors hover:text-[#002244] dark:text-[#93b8d4] dark:hover:text-[#d4e6f1]"
                        >
                          <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform ${
                              expandedSuggestion === i ? "rotate-180" : ""
                            }`}
                          />
                          {expandedSuggestion === i ? "Hide" : "View"} Action Steps
                        </button>

                        {expandedSuggestion === i && (
                          <div className="mt-3 rounded-lg border border-[#003153]/10 bg-[#003153]/[0.02] p-3 dark:border-[#4a90c4]/15 dark:bg-[#4a90c4]/5">
                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#003153]/50 dark:text-[#93b8d4]/50">
                              Actionable Steps:
                            </p>
                            <ul className="space-y-1.5">
                              {suggestion.actionable_steps.map((step, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-xs leading-relaxed text-[#003153]/70 dark:text-[#93b8d4]/70"
                                >
                                  <ChevronRight className="mt-0.5 h-3 w-3 flex-shrink-0 text-[#003153]/40 dark:text-[#4a90c4]/60" />
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <footer className="mb-10 border-t border-[#003153]/10 pt-6 text-center dark:border-[#4a90c4]/10">
          <p className="mx-auto max-w-xl text-[11px] leading-relaxed text-[#003153]/40 dark:text-[#93b8d4]/35">
            This report is generated by a machine learning model and is intended as a supplementary
            academic tool only. Predictions carry inherent uncertainty. Please consult an academic
            advisor for personalised guidance.
          </p>
        </footer>
      </div>
    </div>
  );
}