// "use client";

// import { Form, FormControl } from "@/components/ui/form";
// import {
//   Doctors,
//   GenderOptions,
//   IdentificationTypes,
//   PatientFormDefaultValues,
// } from "@/constants";
// import { registerPatient } from "@/lib/actions/patient.actions";
// import { PatientFormValidation } from "@/lib/validation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import CustomFormFields from "../CustomFormFields";
// import { FileUploader } from "../FileUploader";
// import SubmitButton from "../SubmitButton";
// import { Label } from "../ui/label";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// import { SelectItem } from "../ui/select";
// import { FormFieldType } from "./PatientForm";

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// });

// const RegisterForm = ({ user }: { user: User }) => {
//   console.log(user);
  
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm<z.infer<typeof PatientFormValidation>>({
//     resolver: zodResolver(PatientFormValidation),
//     defaultValues: {
//       ...PatientFormDefaultValues,
//       name: "",
//       email: "",
//       phone: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
//     setIsLoading(true);
//     let formData;

//     if (
//       values.identificationDocument &&
//       values.identificationDocument.length > 0
//     ) {
//       const blobFile = new Blob([values.identificationDocument[0]], {
//         type: values.identificationDocument[0].type,
//       });

//       formData = new FormData();

//       formData.append("blobfile", blobFile);
//       formData.append("fileName", values.identificationDocument[0].name);
//     }

//     try {
//       const patientData = {
//         ...values,
//         userId: user.$id,
//         birthDate: new Date(values.birthDate),
//         identificationDocument: formData,
//       };

//       // @ts-ignore
//       const patient = await registerPatient(patientData);

//       if (patient) router.push(`/patient/${user.$id}/new-appoinment`);
//     } catch (error: any) {
//       console.log(error.message);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <section className="mb-12 space-y-4">
//           <h1 className="header">Welcome 👋</h1>
//           <p className="text-dark-700">Let us know more about yourself.</p>
//         </section>

//         {/* Personal Information Section */}

//         <section className="space-y-6">
//           <div className="mb-9 space-y-1">
//             <h2 className="sub-header"> Personal Information</h2>
//           </div>
//         </section>

//         <CustomFormFields
//           fieldType={FormFieldType.INPUT}
//           control={form.control}
//           className="w-full"
//           name="name"
//           placeholder="John Doe"
//           iconSrc="/assets/icons/user.svg"
//           iconAlt="user"
//           label="Full Name"
//         />

//         <div className="flex flex-col xl:flex-row gap-6">
//           <CustomFormFields
//             fieldType={FormFieldType.INPUT}
//             control={form.control}
//             name="email"
//             label="Email"
//             placeholder="hammadurrehman1954@gmail.com"
//             iconSrc="/assets/icons/email.svg"
//             iconAlt="email"
//           />
//           <CustomFormFields
//             fieldType={FormFieldType.PHONE_INPUT}
//             control={form.control}
//             name="phone"
//             label="Phone number"
//             placeholder="(555) 123-4567"
//             iconSrc="/assets/icons/email.svg"
//             iconAlt="phone"
//           />
//         </div>

//         <div className="flex flex-col xl:flex-row gap-6">
//           <CustomFormFields
//             fieldType={FormFieldType.DATE_PICKER}
//             control={form.control}
//             name="birthdate"
//             label="Date of Birth"
//           />
//           <CustomFormFields
//             fieldType={FormFieldType.SKELETON}
//             control={form.control}
//             name="gender"
//             label="Gender"
//             renderSkeleton={(field) => (
//               <FormControl>
//                 <RadioGroup
//                   className="flex h-11 gap-6 xl:justify-between"
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   {GenderOptions.map((option) => (
//                     <div key={option} className="radio-group">
//                       <RadioGroupItem value={option} id={option} />
//                       <Label htmlFor={option} className="cursor-pointer">
//                         {option}
//                       </Label>
//                     </div>
//                   ))}
//                 </RadioGroup>
//               </FormControl>
//             )}
//           />
//         </div>

//         <div className="flex flex-col xl:flex-row gap-6">
//           <CustomFormFields
//             fieldType={FormFieldType.INPUT}
//             control={form.control}
//             name="address"
//             label="Address"
//             placeholder="14th street, New York"
//           />
//           <CustomFormFields
//             fieldType={FormFieldType.INPUT}
//             control={form.control}
//             name="occupation"
//             label="Occupation"
//             placeholder="Software Engineer"
//           />
//         </div>

//         <div className="flex flex-col xl:flex-row gap-6">
//           <CustomFormFields
//             fieldType={FormFieldType.INPUT}
//             control={form.control}
//             name="emergencyContactName"
//             label="Emergency contact name"
//             placeholder="Guardian's name"
//           />
//           <CustomFormFields
//             fieldType={FormFieldType.PHONE_INPUT}
//             control={form.control}
//             name="emergencyContactNumber"
//             label="Emergency contact number"
//             placeholder="(555) 123-4567"
//           />
//         </div>

//         {/* Medical Information */}

//         <section className="space-y-6">
//           <div className="mb-9 space-y-1">
//             <h2 className="sub-header"> Medical Information</h2>
//           </div>
//         </section>

//         <CustomFormFields
//           fieldType={FormFieldType.SELECT}
//           control={form.control}
//           label="Primary care physician"
//           name="primaryPhysician"
//           placeholder="Select a physician"
//           className="w-full"
//         >
//           {Doctors.map((doctor) => (
//             <SelectItem
//               key={doctor.name}
//               value={doctor.name}
//               className="bg-dark-500"
//             >
//               <div className="flex items-center gap-2 cursor-pointer ">
//                 <Image
//                   src={doctor.image}
//                   alt={doctor.name}
//                   width={32}
//                   height={32}
//                   className="rounded-full border border-dark-500 "
//                 />
//                 <p>{doctor.name}</p>
//               </div>
//             </SelectItem>
//           ))}
//         </CustomFormFields>

//         <div className="flex flex-col xl:flex-row gap-6">
//           <CustomFormFields
//             fieldType={FormFieldType.INPUT}
//             control={form.control}
//             name="incuranceProvider"
//             label="Incurance provider"
//             placeholder="BlueCross BlueShield"
//           />
//           <CustomFormFields
//             fieldType={FormFieldType.INPUT}
//             control={form.control}
//             name="incurancePolicyNumber"
//             label="Incurance policy number"
//             placeholder="ABC12345678"
//           />
//         </div>

//         <div className="flex flex-col xl:flex-row gap-6">
//           <CustomFormFields
//             fieldType={FormFieldType.TEXT_AREA}
//             control={form.control}
//             name="allergies"
//             label="Allergies (if any)"
//             placeholder="ex: Peanuts, Penicillin, Pollen"
//           />
//           <CustomFormFields
//             fieldType={FormFieldType.TEXT_AREA}
//             control={form.control}
//             name="currentMedication"
//             label="Current medications"
//             placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
//           />
//         </div>

//         <div className="flex flex-col xl:flex-row gap-6">
//           <CustomFormFields
//             fieldType={FormFieldType.TEXT_AREA}
//             control={form.control}
//             name="familyMedicalHistory"
//             label="Family medical history (if relevant)"
//             placeholder="ex: Mother has disease"
//           />
//           <CustomFormFields
//             fieldType={FormFieldType.TEXT_AREA}
//             control={form.control}
//             name="pastMedicalHistory"
//             label="Past medical history"
//             placeholder="ex: Asthma diagnosis in childhood"
//           />
//         </div>

//         {/* Identification and Verification */}

//         <section className="space-y-6">
//           <div className="mb-9 space-y-1">
//             <h2 className="sub-header">Identification and Verfication</h2>
//           </div>
//         </section>

//         <CustomFormFields
//           fieldType={FormFieldType.SELECT}
//           control={form.control}
//           name="identificationType"
//           label="Identification Type"
//           placeholder="Select a identification type"
//           className="w-full"
//         >
//           {IdentificationTypes.map((type) => (
//             <SelectItem key={type} value={type} className="bg-dark-500">
//               {type}
//             </SelectItem>
//           ))}
//         </CustomFormFields>

//         <CustomFormFields
//           fieldType={FormFieldType.INPUT}
//           control={form.control}
//           name="identitificationNumber"
//           label="Identitification Number"
//           placeholder="123456789"
//           className="w-full"
//         />

//         <CustomFormFields
//           fieldType={FormFieldType.SKELETON}
//           control={form.control}
//           name="identificationDocument"
//           label="Scanned Copy of Identification Document"
//           className="w-full"
//           renderSkeleton={(field) => (
//             <FormControl>
//               <FileUploader files={field.value} onChange={field.onChange} />
//             </FormControl>
//           )}
//         />

//         {/* Consent and Privacy */}

//         <section className="space-y-6">
//           <div className="mb-9 space-y-1">
//             <h2 className="sub-header">Consent and Privacy</h2>
//           </div>
//         </section>

//         <CustomFormFields
//           fieldType={FormFieldType.CHECK_BOX}
//           control={form.control}
//           name="treatmentConsent"
//           label="I consent to receive treatment for my health condition."
//           className="w-full"
//         />
//         <CustomFormFields
//           fieldType={FormFieldType.CHECK_BOX}
//           control={form.control}
//           name="disclosureConsent"
//           label="I consent to the use and disclosure of my health information for treatment purposes."
//           className="w-full"
//         />
//         <CustomFormFields
//           fieldType={FormFieldType.CHECK_BOX}
//           control={form.control}
//           name="privacyConsent"
//           label="I acknowledge that I have reviewed and agree to the privacy policy"
//           className="w-full"
//         />

//         <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
//       </form>
//     </Form>
//   );
// };

// export default RegisterForm;



















"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { registerPatient } from "@/lib/actions/patient.actions";
import { PatientFormValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import { FileUploader } from "../FileUploader";
import SubmitButton from "../SubmitButton";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "./PatientForm";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    // Store file info in form data as
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      };

      const newPatient = await registerPatient(patient);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>

          {/* NAME */}

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="(555) 123-4567"
            />
          </div>

          {/* BirthDate & Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of birth"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field:any) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          {/* Address & Occupation */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="14 street, New york, NY - 5101"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder=" Software Engineer"
            />
          </div>

          {/* Emergency Contact Name & Emergency Contact Number */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="(555) 123-4567"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>

          {/* PRIMARY CARE PHYSICIAN */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          {/* INSURANCE & POLICY NUMBER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance provider"
              placeholder="BlueCross BlueShield"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ABC123456789"
            />
          </div>

          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXT_AREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Pollen"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXT_AREA}
              control={form.control}
              name="currentMedication"
              label="Current medications"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>

          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXT_AREA}
              control={form.control}
              name="familyMedicalHistory"
              label=" Family medical history (if relevant)"
              placeholder="Mother had brain cancer, Father has hypertension"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXT_AREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verfication</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field:any) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECK_BOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECK_BOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECK_BOX}
            control={form.control}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy"
          />
        </section>

        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;