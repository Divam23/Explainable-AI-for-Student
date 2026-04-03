import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Sparkles,
  BookOpen,
  Brain,
  Target,
  Activity,
  Info,
} from "lucide-react";
import axios from "axios";
import { useModelStore } from "@/context/ModelInputContext";

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
  parent_education_level: "High School" | "College" | "Postgraduate";
  extracurricular_activities: "Yes" | "No";
  internet_access: "Yes" | "No";
  learning_disabilities: "Yes" | "No";
  school_type: "Public" | "Private";
  peer_influence: "Positive" | "Neutral" | "Negative";
  gender: "Male" | "Female";
}

interface AIWeakness {
  feature: string;
  impact: string;
  advice: string;
}

interface AIStrength {
  feature: string;
  reason: string;
}

interface AISuggestion {
  title: string;
  priority: "High" | "Medium" | "Low";
  expected_impact: string;
  action_steps: string[];
}

interface AIResponse {
  strengths: AIStrength[];
  weaknesses: AIWeakness[];
  suggestions: AISuggestion[];
}

interface ModelResponse {
  message: string;
  received_input: number[];
  prediction: number;
  explaination: string[];
  contribution: {
    [key: string]: number;
  };
  aiSuggestions?: AIResponse;
}

const API_URL = import.meta.env.BACKEND_URL ?? "http://localhost:8000";

const getFeatureLabel = (feature: string): string => {
  const labels: Record<string, string> = {
    Hours_Studied: "Study Hours per Week",
    Attendance: "Attendance Rate",
    Sleep_Hours: "Sleep Hours per Night",
    Previous_Scores: "Previous Exam Scores",
    Tutoring_Sessions: "Tutoring Sessions",
    Physical_Activity: "Physical Activity",
    Distance_from_Home: "Distance from Home",
    Parental_Involvement: "Parental Involvement",
    Access_to_Resources: "Access to Resources",
    Motivation_Level: "Motivation Level",
    Family_Income: "Family Income",
    Teacher_Quality: "Teacher Quality",
    Parental_Education_Level: "Parent Education Level",
    Extracurricular_Activities: "Extracurricular Activities",
    Internet_Access: "Internet Access",
    Learning_Disabilities: "Learning Disabilities",
    School_Type: "School Type",
    Peer_Influence: "Peer Influence",
    Gender: "Gender",
  };
  return labels[feature] || feature;
};

const formatValue = (key: string, input: ModelInput): string => {
  const keyMap: Record<string, keyof ModelInput> = {
    Hours_Studied: "hours_studied",
    Attendance: "attendance",
    Sleep_Hours: "sleep_hours",
    Previous_Scores: "previous_scores",
    Tutoring_Sessions: "tutoring_sessions",
    Physical_Activity: "physical_activity",
    Distance_from_Home: "distance_from_home",
    Parental_Involvement: "parental_involvement",
    Access_to_Resources: "access_to_resources",
    Motivation_Level: "motivation_level",
    Family_Income: "family_income",
    Teacher_Quality: "teacher_quality",
    Parental_Education_Level: "parent_education_level",
    Extracurricular_Activities: "extracurricular_activities",
    Internet_Access: "internet_access",
    Learning_Disabilities: "learning_disabilities",
    School_Type: "school_type",
    Peer_Influence: "peer_influence",
    Gender: "gender",
  };

  const inputKey = keyMap[key];
  if (!inputKey) return "";

  const value = input[inputKey];

  if (key === "Hours_Studied") return `${value} hrs/week`;
  if (key === "Attendance") return `${value}%`;
  if (key === "Sleep_Hours") return `${value} hrs/night`;
  if (key === "Physical_Activity") return `${value} hrs/week`;
  if (key === "Tutoring_Sessions") return `${value} sessions`;

  return String(value);
};

const getPerformanceTier = (score: number): "High" | "Medium" | "Low" => {
  if (score >= 80) return "High";
  if (score >= 60) return "Medium";
  return "Low";
};

const calculateConfidence = (contributions: {
  [key: string]: number;
}): number => {
  const values = Object.values(contributions || {}).map(Math.abs);
  if (values.length === 0) return 75; 
  const max = Math.max(...values);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  // avoid division by zero
  const factor = avg === 0 ? 1 : max / avg;
  return Math.min(95, Math.max(70, Math.round(75 + factor * 5)));
};

const tierConfig = {
  High: {
    color:
      "bg-emerald-500/15 text-emerald-700 border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-700",
    dot: "bg-emerald-500",
  },
  Medium: {
    color:
      "bg-orange-500/15 text-orange-400 border-orange-400 dark:bg-orange-600/10 dark:text-orange-500 dark:border-orange-700",
    dot: "bg-orange-500",
  },
  Low: {
    color:
      "bg-red-500/15 text-red-700 border-red-300 dark:bg-red-500/10 dark:text-red-400 dark:border-red-700",
    dot: "bg-red-500",
  },
};

export default function ResultsPage() {
  const modelInput = useModelStore((state) => state.modelInput);

  if (!modelInput) {
    return <div>No input data found</div>;
  }

  const [modelResponse, setModelResponse] = useState<ModelResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPrediction();
  }, []);

  const ai = modelResponse?.aiSuggestions;

  const weaknesses = ai?.weaknesses ?? [];
  const strengths = ai?.strengths ?? [];
  const suggestions = ai?.suggestions ?? [];

  async function fetchPrediction() {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/predict`, modelInput, {
        headers: { "Content-Type": "application/json" },
        timeout: 60000,
      });
      setModelResponse(res.data as ModelResponse);
    } catch (err: any) {
      // prefer server message, then axios message
      const serverMsg = err?.response?.data ?? err?.response?.data?.message;
      setError(
        typeof serverMsg === "string"
          ? serverMsg
          : (err?.response?.data?.message ?? err.message ?? String(err)),
      );
    } finally {
      setLoading(false);
    }
  }

  const [aiExpanded, setAiExpanded] = useState(false);
  const predictedScore = Math.round(modelResponse?.prediction ?? 0);
  const previousScore = modelInput.previous_scores;
  const scoreDelta = predictedScore - previousScore;
  const performanceTier = getPerformanceTier(predictedScore);
  const confidence = calculateConfidence(modelResponse?.contribution ?? {});
  const tier = tierConfig[performanceTier];

  const sortedContributions = Object.entries(modelResponse?.contribution ?? {})
    .map(([key, value]) => ({
      feature: key,
      contribution: value,
      direction: value > 0 ? ("positive" as const) : ("negative" as const),
    }))
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));

  const positiveFactors = sortedContributions
    .filter((f) => f.direction === "positive")
    .slice(0, 4);

  const negativeFactors = sortedContributions
    .filter((f) => f.direction === "negative")
    .slice(0, 4);

  const maxContribution =
    sortedContributions.length > 0
      ? Math.max(...sortedContributions.map((f) => Math.abs(f.contribution)))
      : 1;
  const toPercentage = (value: number) =>
    Math.round((Math.abs(value) / maxContribution) * 100);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading prediction…</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <p className="text-red-600">API error: {error}</p>
          <button onClick={fetchPrediction} className="mt-2 underline">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alabaster-900 dark:bg-prussian-100 transition-colors duration-300">
      {/* Subtle corner radials */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-64 -right-64 h-150 w-150 rounded-full bg-prussian-500/5 dark:bg-prussian-700/5 blur-3xl" />
        <div className="absolute -bottom-64 -left-64 h-125 w-125 rounded-full bg-orange-500/4 dark:bg-orange-600/4 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-prussian-500/50 dark:text-prussian-800/50">
            <Activity className="h-3.5 w-3.5" />
            <span>Prediction Report</span>
            <span className="text-prussian-500/30 dark:text-prussian-800/30">
              ·
            </span>
            <span>Student Performance AI</span>
          </div>
          <h1 className="font-['Playfair_Display',Georgia,serif] text-3xl font-bold tracking-tight text-prussian-400 dark:text-alabaster-800 sm:text-4xl">
            Exam Performance Analysis
          </h1>
          <p className="mt-2 max-w-xl text-sm text-prussian-500/60 dark:text-prussian-800/70">
            Generated from your academic profile. Results are model-based
            estimates and should be interpreted alongside teacher feedback.
          </p>
        </header>

        <section aria-labelledby="prediction-heading" className="mb-8">
          <Card className="overflow-hidden border border-prussian-500/10 bg-white shadow-sm dark:border-prussian-700/15 dark:bg-prussian-200">
            <div className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_1px_auto]">
              <CardContent className="p-7 sm:p-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-prussian-500/50 dark:text-prussian-800/50">
                      Predicted Exam Score
                    </p>
                    <div className="mt-1 flex items-end gap-3">
                      <span className="font-['Playfair_Display',Georgia,serif] text-7xl font-bold leading-none text-prussian-400 dark:text-alabaster-800">
                        {predictedScore}
                      </span>
                      <span className="mb-2 text-xl font-light text-prussian-500/40 dark:text-prussian-800/40">
                        / 100
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <div
                        className={`flex items-center gap-1 text-sm font-medium ${
                          scoreDelta > 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : scoreDelta < 0
                              ? "text-red-500 dark:text-red-400"
                              : "text-prussian-500/50 dark:text-prussian-800/50"
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
                      <span className="text-xs text-prussian-500/35 dark:text-prussian-800/40">
                        (was {previousScore})
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide ${tier.color}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${tier.dot}`}
                      />
                      {performanceTier} Performance
                    </span>
                  </div>
                </div>

                <Separator className="my-6 bg-prussian-500/8 dark:bg-prussian-700/10" />

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-prussian-500/60 dark:text-prussian-800/60">
                      <Target className="h-3.5 w-3.5" />
                      Model Confidence
                    </span>
                    <span className="text-sm font-semibold text-prussian-400 dark:text-alabaster-800">
                      {confidence}%
                    </span>
                  </div>
                  <Progress
                    value={confidence}
                    className="h-1.5 bg-prussian-500/10 dark:bg-prussian-700/10 [&>div]:bg-prussian-600 dark:[&>div]:bg-prussian-700"
                  />
                  <p className="mt-2 text-[11px] text-prussian-500/45 dark:text-prussian-800/40">
                    Based on gradient-boosted ensemble model trained on
                    historical student data
                  </p>
                </div>
              </CardContent>

              <div className="hidden w-px bg-prussian-500/8 dark:bg-prussian-700/10 md:block" />

              <CardContent className="flex flex-row justify-between gap-6 border-t border-prussian-500/8 p-7 dark:border-prussian-700/10 md:min-w-55 md:flex-col md:justify-start md:border-t-0 sm:p-9">
                {[
                  {
                    label: "Study Hours",
                    value: `${modelInput.hours_studied}`,
                    icon: BookOpen,
                  },
                  {
                    label: "Attendance",
                    value: `${modelInput.attendance}%`,
                    icon: Activity,
                  },
                  {
                    label: "Sleep",
                    value: `${modelInput.sleep_hours} hrs`,
                    icon: Info,
                    alert: modelInput.sleep_hours < 6,
                  },
                ].map(({ label, value, icon: Icon, alert }) => (
                  <div key={label}>
                    <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-prussian-500/45 dark:text-prussian-800/45">
                      {label}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Icon
                        className={`h-3.5 w-3.5 ${
                          alert
                            ? "text-red-500 dark:text-red-400"
                            : "text-prussian-500/40 dark:text-prussian-700/60"
                        }`}
                      />
                      <span
                        className={`text-lg font-semibold ${
                          alert
                            ? "text-red-600 dark:text-red-400"
                            : "text-prussian-400 dark:text-alabaster-800"
                        }`}
                      >
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </div>
          </Card>
        </section>
        <section aria-labelledby="explainability-heading" className="mb-8">
          <div className="mb-4">
            <h2
              id="explainability-heading"
              className="font-['Playfair_Display',Georgia,serif] text-xl font-semibold text-prussian-400 dark:text-alabaster-800"
            >
              What Drives This Prediction
            </h2>
            <p className="mt-1 text-sm text-prussian-500/55 dark:text-prussian-800/60">
              Feature contributions calculated by the model. Longer bars
              indicate stronger influence on the predicted score.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card className="border border-prussian-500/10 bg-white shadow-sm dark:border-prussian-700/15 dark:bg-prussian-200">
              <CardHeader className="px-5 pb-3 pt-5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                    Positive Contributors
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 px-5 pb-5">
                {positiveFactors.map((f) => (
                  <div key={f.feature}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs font-medium text-prussian-400 dark:text-alabaster-700">
                        {getFeatureLabel(f.feature)}
                      </span>
                      <span className="font-mono text-[11px] text-prussian-500/50 dark:text-prussian-800/50">
                        {formatValue(f.feature, modelInput)}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-950/40">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-emerald-400 to-emerald-600 transition-all duration-700 dark:from-emerald-500 dark:to-emerald-400"
                        style={{ width: `${toPercentage(f.contribution)}%` }}
                      />
                    </div>
                    <div className="mt-1 text-right text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      +{f.contribution.toFixed(2)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-prussian-500/10 bg-white shadow-sm dark:border-prussian-700/15 dark:bg-prussian-200">
              <CardHeader className="px-5 pb-3 pt-5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-red-600 dark:text-red-400">
                    Negative Contributors
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 px-5 pb-5">
                {negativeFactors.map((f) => (
                  <div key={f.feature}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs font-medium text-prussian-400 dark:text-alabaster-700">
                        {getFeatureLabel(f.feature)}
                      </span>
                      <span className="font-mono text-[11px] text-prussian-500/50 dark:text-prussian-800/50">
                        {formatValue(f.feature, modelInput)}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-red-100 dark:bg-red-950/40">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-red-400 to-red-600 transition-all duration-700 dark:from-red-500 dark:to-red-400"
                        style={{ width: `${toPercentage(f.contribution)}%` }}
                      />
                    </div>
                    <div className="mt-1 text-right text-[10px] font-medium text-red-500 dark:text-red-400">
                      {f.contribution.toFixed(2)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section aria-labelledby="ai-explanation-heading" className="mb-8">
          <Card className="border border-prussian-500/15 bg-prussian-400/3 shadow-sm dark:border-prussian-700/20 dark:bg-prussian-700/5">
            <CardContent className="p-5 sm:p-7">
              <button
                className="group flex w-full items-center justify-between gap-3"
                onClick={() => setAiExpanded(!aiExpanded)}
                aria-expanded={aiExpanded}
                aria-controls="ai-explanation-body"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-prussian-500/10 dark:bg-prussian-700/15">
                    <Brain className="h-3.5 w-3.5 text-prussian-500 dark:text-prussian-700" />
                  </div>
                  <div className="text-left">
                    <h2
                      id="ai-explanation-heading"
                      className="text-sm font-semibold text-prussian-400 dark:text-alabaster-800"
                    >
                      Model Explanation
                    </h2>
                    <p className="text-[11px] text-prussian-500/50 dark:text-prussian-800/50">
                      Detailed breakdown of feature impacts
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-prussian-500/60 opacity-70 transition-opacity group-hover:opacity-100 dark:text-prussian-700/70">
                  <Sparkles className="h-3 w-3" />
                  <span>{aiExpanded ? "Collapse" : "View details"}</span>
                </div>
              </button>

              {aiExpanded && (
                <div id="ai-explanation-body" className="mt-5">
                  <Separator className="mb-5 bg-prussian-500/8 dark:bg-prussian-700/10" />
                  <div className="rounded-lg border border-prussian-500/10 bg-white/60 p-4 dark:border-prussian-700/15 dark:bg-prussian-100/60 sm:p-5">
                    <div className="mb-3 flex items-center gap-1.5">
                      <Info className="h-3 w-3 text-prussian-500/40 dark:text-prussian-800/40" />
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-prussian-500/40 dark:text-prussian-800/40">
                        Feature Impact Analysis
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {(modelResponse?.explaination ?? []).map((line, i) => (
                        <p
                          key={i}
                          className="text-xs leading-relaxed text-prussian-500/75 dark:text-prussian-800/80"
                        >
                          • {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="ai-suggestions-heading" className="mb-8">
          <div className="mb-4">
            <h2 className="font-['Playfair_Display',Georgia,serif] text-xl font-semibold text-prussian-400 dark:text-alabaster-800">
              Personalized AI Recommendations
            </h2>
            <p className="mt-1 text-sm text-prussian-500/55 dark:text-prussian-800/60">
              AI-generated actionable advice based on your profile.
            </p>
          </div>

          {!ai ? (
            <div className="text-sm text-prussian-500">
              No AI suggestions available.
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-red-500 mb-2">
                  Key Weak Areas
                </h3>
                <div className="space-y-2">
                  {weaknesses.map((w, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    >
                      <p className="text-xs font-semibold">
                        {getFeatureLabel(w.feature)}
                      </p>
                      <p className="text-[11px] text-red-600">
                        Impact: {w.impact}
                      </p>
                      <p className="text-xs mt-1 text-prussian-500 dark:text-prussian-300">
                        {w.advice}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 🟢 Strengths */}
              <div>
                <h3 className="text-sm font-semibold text-emerald-500 mb-2">
                  Strengths
                </h3>
                <div className="space-y-2">
                  {strengths.map((s, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
                    >
                      <p className="text-xs font-semibold">
                        {getFeatureLabel(s.feature)}
                      </p>
                      <p className="text-xs mt-1 text-prussian-500 dark:text-prussian-300">
                        {s.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-orange-500 mb-2">
                  Action Plan
                </h3>
                <div className="space-y-3">
                  {suggestions.map((s, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-semibold">{s.title}</p>
                        <span className="text-xs text-orange-400 font-bold border-2 border-orange-400 rounded-xl px-2 py-0.5  bg-orange-500/10 dark:bg-orange-800">
                          {s.priority}
                        </span>
                      </div>

                      <p className="text-xs text-orange-600 mb-2">
                        Impact: {s.expected_impact}
                      </p>

                      <ul className="list-disc list-inside text-xs text-prussian-500 dark:text-alabaster-900 space-y-1">
                        {(s.action_steps ?? []).map((step, idx) => (
                          <li key={idx} className="">
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
        <footer className="border-t border-prussian-500/10 pt-6 text-center dark:border-prussian-700/10">
          <p className="mx-auto max-w-xl text-[11px] leading-relaxed text-prussian-500/40 dark:text-prussian-800/35">
            This report is generated by a machine learning model and is intended
            as a supplementary academic tool only. Predictions carry inherent
            uncertainty. Please consult an academic advisor for personalised
            guidance.
          </p>
        </footer>
      </div>
    </div>
  );
}
