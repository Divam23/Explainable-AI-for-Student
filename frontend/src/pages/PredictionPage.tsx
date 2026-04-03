
import {
  formSchema,
  type InputFormData,
} from "@/validators/inputForm.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { InputField } from "@/components/InputField";
//import { toast } from "sonner";



import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useModelStore } from "@/context/ModelInputContext";

const PredictionPage = () => {
  const navigate = useNavigate();

  const setModelInput = useModelStore((state) => state.setModelInput);


  const form = useForm<InputFormData>({
    resolver: zodResolver(formSchema) as Resolver<InputFormData>,
    mode: "onChange",
    defaultValues: {
      hours_studied: 1,
      attendance: 50,
      sleep_hours: 7,
      previous_scores: 50,
      tutoring_sessions: 10,
      physical_activity: 4,

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

  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = async (data: InputFormData) => {
    try {
      //console.log("Form Submitted, Details are provided below: ", data);

      const response = await axios.post<typeof data>(
        "https://hyperosmic-sylas-ideational.ngrok-free.dev/predict",
        data,
      );
      console.log(response);
      setModelInput(data);
      if (response.status === 200) {

        navigate("/analysis");
      }
      return response;
    } catch (error) {
      console.log("Something went wrong: ", error);
      throw error;
    }
  };

  return (
    <div
      className="main-container
                h-auto p-5
                min-w-140 md:min-w-190 min-h-auto 
                text-prussian-500 dark:text-alabaster-900
                flex flex-col items-center justify-center flex-wrap
                
                bg-alabaster-900
                bg-[radial-gradient(circle_at_top_left,var(--color-prussian-900),transparent_70%),radial-gradient(circle_at_bottom_right,var(--color-prussian-900),transparent_70%)]

                dark:bg-prussian-100
                dark:bg-[radial-gradient(circle_at_top_left,var(--color-prussian-300),transparent_75%),radial-gradient(circle_at_bottom_right,var(--color-prussian-300),transparent_75%)]"
    >
      <div className="top-section h-full w-full flex flex-col gap-4 p-10 justify-center items-center lg:max-w-5xl border-2 rounded-[4rem] mb-10 ">
        <div className="heading text-5xl md:text-6xl lg:text-6xl dark:text-alabaster-800 font-fredoka text-center text-pretty font-semibold text-prussian-500 tracking-tight">
          Performance Prediction
        </div>
        <div className="sub-heading text-xl text-pretty lg:max-w-5xl text-center dark:text-alabaster-300 text-prussian-700 tracking-tight">
          Fill in the details below to get an AI-powered prediction of your
          academic performance along with personalized recommendations{" "}
          <strong>(Use arrow keys to alter the values)</strong> .
        </div>
      </div>
      <div className="middle-section h-full w-full lg:max-w-5xl  p-10 border-2 rounded-[4rem]">
        <form id="predictionForm" className="flex flex-col gap-3 w-full">
          <div className="academic_section mb-7">
            <div className="text-3xl font-semibold mb-4 font-mono">
              Academic Information
            </div>
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
          <div className="lifestyle_section mb-7">
            <div className="text-3xl mb-4 font-semibold font-mono">
              Lifestyle and Wellness
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <InputField
                control={form.control}
                name="sleep_hours"
                label="Sleep Hours"
                description="How much hours do you sleep in a day?"
                type="number"
                className=""
              />
              <InputField
                control={form.control}
                name="physical_activity"
                label="Physical Activity"
                description="How many days do you do physical workout in a month?"
                type="number"
                className=""
              />
              <Controller
                name="extracurricular_activities"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldContent className="gap-1.5">
                      <FieldLabel htmlFor={field.name}>
                        Extracurricular Activities
                      </FieldLabel>
                      <FieldDescription>
                        Do you do any extracurricular activities?
                      </FieldDescription>
                      <Tabs
                        defaultValue=""
                        className=""
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <TabsList className="">
                          <TabsTrigger className="" value="Yes">
                            Yes
                          </TabsTrigger>
                          <TabsTrigger value="No">No</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
          <div className="enviromental_section mb-7">
            <div className="text-3xl font-semibold mb-4 font-mono">
              Enviromental Factors
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 ">
              {/* parental_involvement: "Medium",
                  family_income: "Medium",
                  parent_education_level: "College",
                  distance_from_home: "Moderate",
                  access_to_resources: "High",
                  internet_access: "Yes", 
              */}
              <Controller
                name="parental_involvement"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldContent className="gap-1.5">
                      <FieldLabel htmlFor={field.name}>
                        Parental Involvement
                      </FieldLabel>
                      <FieldDescription>
                        How much does your parent(s) involve in your studies?
                      </FieldDescription>
                      <Tabs
                        defaultValue=""
                        className=""
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <TabsList className="">
                          <TabsTrigger className="" value="Low">
                            Not much
                          </TabsTrigger>
                          <TabsTrigger value="Medium">
                            Up to some extent
                          </TabsTrigger>
                          <TabsTrigger value="High">Too much</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="family_income"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldContent className="gap-1.5">
                      <FieldLabel htmlFor={field.name}>
                        Family Income
                      </FieldLabel>
                      <FieldDescription>
                        What is your family income?
                      </FieldDescription>
                      <Tabs
                        defaultValue=""
                        className=""
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <TabsList className="">
                          <TabsTrigger className="" value="Low">
                            Below Middle Class
                          </TabsTrigger>
                          <TabsTrigger value="Medium">Middle Class</TabsTrigger>
                          <TabsTrigger value="High">
                            Above Middle Class
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="parent_education_level"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldContent className="gap-1.5">
                      <FieldLabel htmlFor={field.name}>
                        Parent Education Level
                      </FieldLabel>
                      <FieldDescription>
                        What is your parents educational qualification?
                      </FieldDescription>
                      <Tabs
                        defaultValue=""
                        className=""
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <TabsList className="">
                          <TabsTrigger className="" value="High School">
                            High School
                          </TabsTrigger>
                          <TabsTrigger value="College">College</TabsTrigger>
                          <TabsTrigger value="Postgraduate">
                            Post Graduate
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="distance_from_home"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldContent className="gap-1.5">
                      <FieldLabel htmlFor={field.name}>
                        Distance From Home
                      </FieldLabel>
                      <FieldDescription>
                        How far do you live from your school or college?
                      </FieldDescription>
                      <Tabs
                        defaultValue=""
                        className=""
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <TabsList className="">
                          <TabsTrigger className="" value="Near">
                            Nearby
                          </TabsTrigger>
                          <TabsTrigger value="Moderate">Far</TabsTrigger>
                          <TabsTrigger value="Far">Very Far</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="access_to_resources"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldContent className="gap-1.5">
                      <FieldLabel htmlFor={field.name}>
                        Access to Resources
                      </FieldLabel>
                      <FieldDescription>
                        How much access do you have to the study materials?
                      </FieldDescription>
                      <Tabs
                        defaultValue=""
                        className=""
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <TabsList className="">
                          <TabsTrigger className="" value="Low">
                            Not at all
                          </TabsTrigger>
                          <TabsTrigger value="Medium">
                            Only necessary ones
                          </TabsTrigger>
                          <TabsTrigger value="High">
                            Every possible notes accessible
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="internet_access"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldContent className="gap-1.5">
                      <FieldLabel htmlFor={field.name}>
                        Access to Internet?
                      </FieldLabel>
                      <FieldDescription>
                        Do you have internet access?
                      </FieldDescription>
                      <Tabs
                        defaultValue=""
                        className=""
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <TabsList className="">
                          <TabsTrigger className="" value="Yes">
                            Yes
                          </TabsTrigger>
                          <TabsTrigger value="No">No</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
          <div className="education_section mb-7">
            <div className="text-3xl font-semibold mb-4 font-mono ">
              School/College Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              {/* 
                school: {
                  teacher_quality: "High",
                  school_type: "Public",
                  peer_influence: "Neutral",
                },
              */}
              <Controller
                name="teacher_quality"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldContent className="gap-1.5">
                      <FieldLabel htmlFor={field.name}>
                        Quality of Teachers
                      </FieldLabel>
                      <FieldDescription>
                        How good are the teachers when it comes to teaching?
                      </FieldDescription>
                      <Tabs
                        defaultValue=""
                        className=""
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <TabsList className="">
                          <TabsTrigger className="" value="Low">
                            Good
                          </TabsTrigger>
                          <TabsTrigger value="Medium">Very Good</TabsTrigger>
                          <TabsTrigger value="High">Excellent</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="school_type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldContent className="gap-1.5">
                      <FieldLabel htmlFor={field.name}>
                        Type of School/College
                      </FieldLabel>
                      <FieldDescription>
                        Is your educational institution Government or Private?
                      </FieldDescription>
                      <Tabs
                        defaultValue=""
                        className=""
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <TabsList className="">
                          <TabsTrigger className="" value="Public">
                            Government
                          </TabsTrigger>
                          <TabsTrigger value="Private">Private</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="peer_influence"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldContent className="gap-1.5">
                      <FieldLabel htmlFor={field.name}>
                        Level of Peer Influence
                      </FieldLabel>
                      <FieldDescription>
                        How much do your friends and classmates influence your
                        academic performance?
                      </FieldDescription>
                      <Tabs
                        defaultValue=""
                        className=""
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <TabsList className="">
                          <TabsTrigger className="" value="Negative">
                            Affects Negatively
                          </TabsTrigger>
                          <TabsTrigger value="Neutral">
                            Remains Neutral
                          </TabsTrigger>
                          <TabsTrigger value="Positive">
                            Affects Positively
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
          <div className="personal_section mb-7">
            <div className="text-3xl font-semibold mb-4 font-mono">
              Personal Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              {/* 
                personal: {
                  motivation_level: "High",
                  learning_disabilities: "No",
                  gender: "Male",
                }
              */}
              <Controller
                name="motivation_level"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldContent className="gap-1.5">
                      <FieldLabel htmlFor={field.name}>
                        Motivation Level
                      </FieldLabel>
                      <FieldDescription>
                        What is your motivation level during studies?
                      </FieldDescription>
                      <Tabs
                        defaultValue=""
                        orientation="vertical"
                        className=""
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <TabsList className="">
                          <TabsTrigger className="" value="Low">
                            No motivation at all
                          </TabsTrigger>
                          <TabsTrigger value="Medium">
                            A little motivation
                          </TabsTrigger>
                          <TabsTrigger value="High">
                            Highly motivated
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="learning_disabilities"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldContent className="gap-1.5">
                      <FieldLabel htmlFor={field.name}>
                        Learning Disabilities
                      </FieldLabel>
                      <FieldDescription>
                        Do you have any learning disabilities?
                      </FieldDescription>
                      <Tabs
                        defaultValue=""
                        orientation="vertical"
                        className=""
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <TabsList className="">
                          <TabsTrigger className="" value="Yes">
                            Yes
                          </TabsTrigger>
                          <TabsTrigger value="No">No</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="gender"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldContent className="gap-1.5">
                      <FieldLabel htmlFor={field.name}>Gender</FieldLabel>
                      <FieldDescription>What is your gender?</FieldDescription>
                      <Tabs
                        defaultValue=""
                        orientation="vertical"
                        className=""
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <TabsList className="">
                          <TabsTrigger className="" value="Male">
                            Male
                          </TabsTrigger>
                          <TabsTrigger value="Female">Female</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
          {/* <Button type="button" className="active:bg-orange-500 bg-prussian-500 dark:text-alabaster-900 hover:bg-prussian-600">
            Create
          </Button> */}
          <AlertDialog onOpenChange={setOpen} open={open}>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                className="active:bg-orange-500 bg-prussian-500 dark:text-alabaster-900 hover:bg-prussian-600"
              >
                Continue
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                {!form.formState.isValid ? (
                  <>
                  <AlertDialogTitle className="text-red-500">Please fill all the fields correctly</AlertDialogTitle>
                  <AlertDialogDescription>Check if something's wrong</AlertDialogDescription>
                  </>
                ) : (
                  <>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to submit the form?
                    </AlertDialogDescription>
                  </>
                )}
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={!form.formState.isValid}
                  className="disabled:bg-gray-700"
                  onClick={form.handleSubmit(async (data) => {
                    setOpen(false);
                    await onSubmit(data);
                  })}
                >
                  Submit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </div>
    </div>
  );
};

export default PredictionPage;
