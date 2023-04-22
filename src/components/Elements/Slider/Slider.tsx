/* eslint-disable react/display-name */
import React from "react";
import AliceCarousel, { Props } from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

type SliderComponentProps = Props &
  Partial<{
    className: string;
    slidesToShow: number;
    items: React.ReactElement[];
    centerMode: boolean;
    magnifiedIndex?: number;
    activeSlideCSS?: string;
  }>;

const Slider = React.forwardRef<AliceCarousel, SliderComponentProps>(
  (
    {
      className,
      slidesToShow,
      items,
      centerMode,
      magnifiedIndex = 0,
      activeSlideCSS = "scale-75",

      ...props
    },
    ref
  ) => {
    // const isSmall = (index: any) => {
    //   if (props?.activeIndex + magnifiedIndex >= items?.length) {
    //     return index !== props?.activeIndex + magnifiedIndex - items?.length;
    //   } else {
    //     return index !== props.activeIndex + magnifiedIndex;
    //   }
    // };

    // const slideItems = centerMode
    //   ? items.map((child, index) => {
    //       if (isSmall(index)) {
    //         return React.cloneElement(child, {
    //           ...child.props,
    //           className: [child.props?.className, activeSlideCSS].filter(Boolean).join(' '),
    //         });
    //       }
    //       return React.cloneElement(child);
    //     })
    //   : items;

    return (
      <div className={className}>
        <AliceCarousel
          // items={slideItems}
          ref={ref}
          // responsive={{
          //   0: { items: 1 },
          //   568: { items: slidesToShow },
          //   1024: { items: slidesToShow },
          // }}
          disableButtonsControls
          disableDotsControls
          mouseTracking
          touchTracking
          infinite
          {...props}
        />
      </div>
    );
  }
);
export { Slider };
