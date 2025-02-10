"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FormFieldType } from "./forms/PatientForm";
import { Input } from "./ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface Props {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  className?: string;
}

const RenderField = ({ field, props }: { field: any; props: Props }) => {
  const {
    fieldType,
    placeholder,
    iconSrc,
    iconAlt,
    disabled,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
    children,
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              height={24}
              width={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXT_AREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={disabled}
          />
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 ">
          <Image
            src="/assets/icons/calendar.svg"
            alt="calendar"
            height={24}
            width={24}
            className="ml-2"
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showTimeSelect={showTimeSelect ?? false}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : "";
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{props.children}</SelectContent>
          </Select>
        </FormControl>
      );
    default:
      break;
  }
};

const CustomFormFields = (props: Props) => {
  const {
    control,
    fieldType,
    name,
    label,
    placeholder,
    iconSrc,
    iconAlt,
    disabled,
    dateFormat,
    showTimeSelect,
    children,
    renderSkeleton,
    className,
  } = props;
  return (
    <div className={className ?? "w-1/2"}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {fieldType !== FormFieldType.CHECK_BOX && label && (
              <FormLabel>{label}</FormLabel>
            )}
            <RenderField field={field} props={props} />
            <FormMessage className="shad-error" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomFormFields;
