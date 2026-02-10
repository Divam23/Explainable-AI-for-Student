import * as z from "zod"; 


//helper function for number input
const numberField = (min: number, max: number) => z.preprocess(
    (val) => {
      if (val === '' || val === undefined || val === null) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z.number().int().min(min).max(max)
  );

const inputFormValidationSchema = z.object({
    hours_studied: numberField(1, 44),
    attendance: numberField(50, 100),
    sleep_hours: numberField(4, 10),
    previous_scores: numberField(0, 100),
    tutoring_sessions: numberField(0, 30),
    physical_activity: numberField(0, 10),

    parental_involvement: z.enum(["Low", "Medium", "High"]),
    access_to_resources: z.enum(["Low", "Medium", "High"]),
    motivation_level: z.enum(["Low", "Medium", "High"]),
    family_income: z.enum(["Low", "Medium", "High"]),
    teacher_quality: z.enum(["Low", "Medium", "High"]),
    peer_influence: z.enum(["Negative", "Neutral", "Positive"]),
    parent_education_level: z.enum(["High School", "College", "Postgraduate"]),
    distance_from_home: z.enum(["Near", "Moderate", "Far"]),


    extracurricular_activities: z.enum(["Yes", "No"]),
    internet_access: z.enum(["Yes", "No"]),
    school_type: z.enum(["Public", "Private"]),
    learning_disabilities: z.enum(["Yes", "No"]),
    gender: z.enum(["Male", "Female"])
})

export type InputFormData = z.infer<typeof inputFormValidationSchema>;

export {inputFormValidationSchema as formSchema}