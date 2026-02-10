//import { Link } from "react-router-dom"
import {
  formSchema,
  type InputFormData,
} from "@/validators/inputForm.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import InputField from "@/components/InputField";

import { Button } from "@/components/ui/button";

const PredictionPage = () => {
  const form = useForm<InputFormData>({
    resolver: zodResolver(formSchema) as Resolver<InputFormData>,
    defaultValues: {
      hours_studied: 1,
      attendance: 50,
      sleep_hours: 7,
      previous_scores: 0,
      tutoring_sessions: 0,
      physical_activity: 0,

      parental_involvement: "Medium",
      access_to_resources: "High",
      motivation_level: "High",
      family_income: "Medium",
      teacher_quality: "High",
      peer_influence: "Neutral",
      parent_education_level: "College",
      distance_from_home: "Moderate",

      extracurricular_activities: "No",
      internet_access: "Yes",
      school_type: "Public",
      learning_disabilities: "No",
      gender: "Male",
    },
  });

  const onSubmit = (data: InputFormData) => {
    console.log("Form Submitted, Details are provided below: ", data);
  };

  return (
    <div
      className="main-container
                    h-auto p-5
                    min-w-100 min-h-auto
                    text-prussian-500 dark:text-alabaster-900
                    bg-alabaster-900 bg-[radial-gradient(circle_at_top_left,var(--color-prussian-900),transparent_70%),radial-gradient(circle_at_bottom_right,var(--color-prussian-900),transparent_70%)]
                    dark:bg-prussian-100 dark:bg-[radial-gradient(circle_at_top_left,var(--color-prussian-300),transparent_75%),radial-gradient(circle_at_bottom_right,var(--color-prussian-300),transparent_75%)] flex flex-col items-center justify-center"
    >
      <div className="top-section h-full w-full flex flex-col gap-4 p-10 justify-center items-center lg:max-w-5xl border-2 rounded-[4rem] mb-10 ">
        <div className="heading text-5xl md:text-6xl lg:text-6xl dark:text-alabaster-800 font-fredoka text-center text-pretty font-semibold text-prussian-500 tracking-tight">
          Performance Prediction
        </div>
        <div className="sub-heading text-xl text-pretty lg:max-w-5xl text-center dark:text-alabaster-300 text-prussian-700 tracking-tight">
          Fill in the details below to get an AI-powered prediction of your
          academic performance along with personalized recommendations.
        </div>
      </div>
      <div className="middle-section h-full w-full lg:max-w-5xl  p-10 border-2 rounded-[4rem]">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full"
        >
          <div className="academic_section">
            <div className="text-3xl font-semibold mb-3">Academic Information</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                control={form.control}
                name="hours_studied"
                label="Hours Studied"
                description="How many hours do you study in a week?"
                type="number"
                className=""
              />
              <InputField
                control={form.control}
                name="attendance"
                label="Attendance"
                description="What is your current attendance?"
                type="number"
                className=""
              />
              <InputField
                control={form.control}
                name="tutoring_sessions"
                label="Tutoring Sessions"
                description="How many hours tutor sessions do you attend in a month on an average?"
                type="number"
                className=""
              />
              <InputField
                control={form.control}
                name="previous_scores"
                label="Previous Score"
                description="How much did you scored in your last semester?"
                type="number"
                className=""
              />
            </div>
          </div>
          <div className="lifestyle_section">
            <div className="text-3xl ">Lifestyle and Wellness</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <InputField
                control={form.control}
                name="hours_studied"
                label="Hours Studied"
                description="How many hours do you study in a week?"
                type="number"
                className=""
              />
              <InputField
                control={form.control}
                name="attendance"
                label="Attendance"
                description="What is your current attendance?"
                type="number"
                className=""
              />
              <InputField
                control={form.control}
                name="tutoring_sessions"
                label="Tutoring Sessions"
                description="How many hours tutor sessions do you attend in a month on an average?"
                type="number"
                className=""
              />
              <InputField
                control={form.control}
                name="previous_scores"
                label="Previous Score"
                description="How much did you scored in your last semester?"
                type="number"
                className=""
              />
            </div>
          </div>
          <div className="enviromental_section">
            <div className="text-3xl ">Enviromental Factors</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <InputField
                control={form.control}
                name="hours_studied"
                label="Hours Studied"
                description="How many hours do you study in a week?"
                type="number"
                className=""
              />
              <InputField
                control={form.control}
                name="attendance"
                label="Attendance"
                description="What is your current attendance?"
                type="number"
                className=""
              />
              <InputField
                control={form.control}
                name="tutoring_sessions"
                label="Tutoring Sessions"
                description="How many hours tutor sessions do you attend in a month on an average?"
                type="number"
                className=""
              />
              <InputField
                control={form.control}
                name="previous_scores"
                label="Previous Score"
                description="How much did you scored in your last semester?"
                type="number"
                className=""
              />
            </div>
          </div>
          <div className="education_section">
            <div className="text-3xl ">Education Factors</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <InputField
                control={form.control}
                name="hours_studied"
                label="Hours Studied"
                description="How many hours do you study in a week?"
                type="number"
                className=""
              />
              <InputField
                control={form.control}
                name="attendance"
                label="Attendance"
                description="What is your current attendance?"
                type="number"
                className=""
              />
              <InputField
                control={form.control}
                name="tutoring_sessions"
                label="Tutoring Sessions"
                description="How many hours tutor sessions do you attend in a month on an average?"
                type="number"
                className=""
              />
              <InputField
                control={form.control}
                name="previous_scores"
                label="Previous Score"
                description="How much did you scored in your last semester?"
                type="number"
                className=""
              />
            </div>
          </div>
          <div className="personal_section">
            <div className="text-3xl ">Personal Information</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <InputField
                control={form.control}
                name="hours_studied"
                label="Hours Studied"
                description="How many hours do you study in a week?"
                type="number"
                className=""
              />
              <InputField
                control={form.control}
                name="attendance"
                label="Attendance"
                description="What is your current attendance?"
                type="number"
                className=""
              />
              <InputField
                control={form.control}
                name="tutoring_sessions"
                label="Tutoring Sessions"
                description="How many hours tutor sessions do you attend in a month on an average?"
                type="number"
                className=""
              />
              <InputField
                control={form.control}
                name="previous_scores"
                label="Previous Score"
                description="How much did you scored in your last semester?"
                type="number"
                className=""
              />
            </div>
          </div>
          <Button>Create</Button>
        </form>
      </div>
    </div>
  );
};

export default PredictionPage;
