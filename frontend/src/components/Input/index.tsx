import type React from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";
import ReactInputMask from "react-input-mask";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  customLabel?: React.ReactNode;
  error?: string | undefined;
  register: UseFormRegister<FieldValues>;
  mask?: string | (string | RegExp)[];
}

export const Input: React.FC<Props> = ({
  id,
  label,
  customLabel,
  register,
  name,
  error,
  mask = "",
  ...rest
}) => {
  if (rest.type === "radio" && name) {
    return (
      <div className="mb-6">
        <div className="flex gap-2 items-center">
          <input className="text-sm" id={id} {...register(name)} {...rest} />
          <label className="mb-1 text-[#697386]" htmlFor={id}>
            {label}
          </label>
        </div>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mb-6">
      {label && (
        <label className="block mb-1 text-[#697386]" htmlFor={id}>
          {label}
        </label>
      )}
      {customLabel}
      <ReactInputMask
        mask={mask}
        className={`text-sm shadow appearance-none border ${
          error ? "border-red-500" : ""
        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        id={id}
        {...register(id)}
        {...rest}
      />
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};
