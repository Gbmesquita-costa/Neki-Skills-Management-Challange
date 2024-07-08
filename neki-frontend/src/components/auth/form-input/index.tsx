import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps extends InputProps {
  label: string;
  htmlfor: string;
  errorName: string[] | undefined;
  icon?: JSX.Element;
}

export const FormInput = ({
  label,
  htmlfor,
  errorName,
  icon,
  ...props
}: FormInputProps): JSX.Element => {
  return (
    <div className="grid gap-3 relative">
      <Label className={`${errorName && "text-red-500"}`} htmlFor={htmlfor}>
        {errorName ? errorName.join(",") : label}
      </Label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <Input id={htmlfor} className={"pl-12 h-11"} {...props} />
      </div>
    </div>
  );
};
