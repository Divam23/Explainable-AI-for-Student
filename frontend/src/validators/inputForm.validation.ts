import * as z from "zod"; 


const inputFormValidationSchema = z.object({
    
    hours_studied: z.number().int().min(1,{message: "You're cooked"}).max(44, {message: "who tf studies that much, keep it under 44hrs"}),
    attendance: z.number().int().min(30, {message: "Shame on you"}).max(100, {message:"Bruh get a life!!!"}),
    sleep_hours: z.number().int().min(4, {message: "Get some sleep"}).max(10, {message:"Lazy ass..."}),
    previous_scores: z.number().int().min(0, {message: "You are the real deal"}).max(100, {message:"Einstien IQ?"}),
    tutoring_sessions: z.number().int().min(0, {message:"How come it can be negative"}).max(30, {message:"Who're you trying to beat?"}),
    physical_activity: z.number().int().min(0,{message:"Touch some grass"}).max(30, {message:"Next LeBron James?"}),


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