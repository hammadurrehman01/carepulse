"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormFields from "../CustomFormFields";
import { Button } from "../ui/button";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

export enum FormFieldType {
  INPUT = "input",
  CHECK_BOX = "checkbox",
  RADIO = "radio",
  SELECT = "select",
  TEXT_AREA = "textarea",
  DATE_PICKER = "datePicker",
  TIME_PICKER = "timePicker",
  PHONE_INPUT = "phoneInput",
}

const PatientForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>

        <CustomFormFields
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormFields
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="hammadurrehman1954@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormFields
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default PatientForm;
