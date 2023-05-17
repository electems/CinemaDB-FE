/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'
export type InputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'size' | 'prefix' | 'type'
> &
  Partial<{
    wrapClassName: string;
    className: string;
    name: string;
    placeholder: string;
    type: string;
    errors: string;
    label: string;
    prefix: React.ReactNode;
    suffix: React.ReactNode;
  }>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      wrapClassName = '',
      className = '',
      name = '',
      placeholder,
      type = 'text',
      children,
      label = '',
      prefix,
      suffix,
      errors = '',

      ...restProps
    },
    ref
  ) => {
    return (
      <>
        <div
          className={`${wrapClassName} 
               
               
              `}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            className={`${className} bg-transparent border-0`}
            type={type}
            name={name}
            placeholder={placeholder}
            {...restProps}
          />
          {errors && <span>{errors}</span>}
          {!!suffix && suffix}
        </div>
      </>
    )
  }
)

export { Input }
