import { create } from "zustand";
import { persist } from "zustand/middleware";

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

interface Store {
  modelInput: ModelInput | null;
  setModelInput: (data: ModelInput) => void;
  clearModelInput: () => void;
}

export const useModelStore = create<Store>()(
  persist(
    (set) => ({
      modelInput: null,
      setModelInput: (data) => set({ modelInput: data }),
      clearModelInput: () => set({ modelInput: null }),
    }),
    {
      name: "model-storage", // localStorage key
    }
  )
);