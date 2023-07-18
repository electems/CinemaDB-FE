/* eslint-disable no-undef */
import React from 'react'

const variantClasses = {
  h1: 'font-light sm:text-5xl md:text-5xl text-[86.7px]',
  h2: 'font-light text-[8px]',
  h3: 'font-normal text-[7.33px]',
  h4: 'font-normal text-[6.04px]',
  h5: 'font-medium text-[5.24px]',
  h6: 'font-bold sm:text-[32px] md:text-[38px] text-[42px]',
  body1: 'font-semibold sm:text-[31.71px] md:text-[37.71px] text-[41.71px]',
  body2: 'sm:text-4xl md:text-[38px] text-[40px]',
  body3: 'text-4xl sm:text-[32px] md:text-[34px]',
  body4: 'font-bold sm:text-[31px] md:text-[33px] text-[35px]',
  body5:
    'font-bold sm:text-[28.259999999999998px] md:text-[30.259999999999998px] text-[32.26px]',
  body6: 'font-bold md:text-3xl sm:text-[28px] text-[32px]',
  body7: 'sm:text-[24.67px] md:text-[26.67px] text-[28.67px]',
  body8: 'font-bold sm:text-2xl md:text-[26px] text-[28px]',
  body9: 'font-bold md:text-2xl sm:text-[22px] text-[26px]',
  body10: 'font-medium sm:text-[20.6px] md:text-[22.6px] text-[24.6px]',
  body11: 'text-2xl md:text-[22px] sm:text-xl',
  body12: 'font-bold sm:text-[19.68px] md:text-[21.68px] text-[23.68px]',
  body13: 'text-[22px] sm:text-lg md:text-xl',
  body14: 'sm:text-[17.62px] md:text-[19.62px] text-[21.62px]',
  body15: 'font-bold sm:text-[17.51px] md:text-[19.51px] text-[21.51px]',
  body16: 'font-semibold sm:text-[16.65px] md:text-[18.65px] text-[20.65px]',
  body17: 'text-xl',
  body18: 'font-bold text-[19.13px]',
  body19: 'font-normal text-[19.12px]',
  body20: 'font-bold text-[18.43px]',
  body21: 'font-bold text-[18.2px]',
  body22: 'text-lg',
  body23: 'font-normal text-[17.89px]',
  body24: 'font-medium text-[17.7px]',
  body25: 'font-bold text-[17.22px]',
  body26: 'text-base',
  body27: 'font-bold text-[15.6px]',
  body28: 'font-bold text-[15.07px]',
  body29: 'font-medium text-[14.75px]',
  body30: 'font-normal text-[14.7px]',
  body31: 'text-sm',
  body32: 'font-normal text-[12.91px]',
  body33: 'font-semibold text-[12.19px]',
  body34: 'font-semibold text-[12.18px]',
  body35: 'font-semibold text-[12.01px]',
  body36: 'text-xs',
  body37: 'font-medium text-[11.54px]',
  body38: 'font-normal text-[10.67px]',
  body39: 'font-normal text-[10.66px]',
  body40: 'font-normal text-[10.51px]',
  body41: 'text-[10px]'
} as const

export type TextProps = Partial<{
  className: string;
  variant: keyof typeof variantClasses;
  disabled: boolean;
  as: React.ElementType;
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className,
  variant,
  disabled,
  as,
  ...restProps
}) => {
  const Component = as || 'span'
  return (
    <Component
      className={`${className} ${variant && variantClasses[variant]}`}
      {...restProps}
    >
      {children}
    </Component>
  )
}

export { Text }
