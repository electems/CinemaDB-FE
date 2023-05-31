import React from 'react';

import { Img, Input, Text } from '../Elements/index';
import { CloseSVG } from '../Header/index';
import { useNavigate } from 'react-router-dom';

type HeaderProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{}>;

const MainScreenHeader: React.FC<HeaderProps> = (props) => {
  const navigate = useNavigate();

  const [inputvalue, setInputvalue] = React.useState<string>('');

  return (
    <>
      <header className={props.className}>
        <Img
          src="/images/img_image16.png"
          className="common-pointer h-[93px] sm:h-auto md:ml-[0] ml-[99px] md:mt-0 mt-[5px] object-cover w-[16%] md:w-full"
          onClick={() => navigate('/mainscreen')}
          alt="imageSixteen"
        />
        <Input
          value={inputvalue}
          onChange={(e) => setInputvalue(e?.target?.value)}
          wrapClassName="bg-bluegray_100 flex mb-7 md:ml-[0] ml-[53px] md:mt-0 mt-[33px] px-[18px] py-[3px] rounded-md w-[21%] md:w-full"
          className="font-normal font-roboto leading-[normal] not-italic p-0 placeholder:text-gray_800 text-base text-gray_800 text-left w-full"
          name="group986"
          placeholder="Search CDBS"
          suffix={
            inputvalue?.length > 0
              ? (
              <CloseSVG
                className="cursor-pointer ml-[35px] my-auto"
                onClick={() => setInputvalue('')}
                fillColor="#3a3a3c"
                height={32}
                width={32}
                viewBox="0 0 32 32"
              />
                )
              : (
              <Img
                src="/images/img_search.svg"
                className="cursor-pointer ml-[35px] my-auto"
                alt="search"
              />
                )
          }
        ></Input>
        <div
          className="common-pointer flex flex-row gap-[11px] items-end justify-center mb-[35px] md:ml-[0] ml-[53px] md:mt-0 mt-[43px] w-[10%] md:w-full"
          onClick={() => navigate('/film/filmfestival/filmfestivalregistration')}
        >
          <Text
            className="font-medium font-montserrat text-left text-white_A700 w-auto"
            variant="body26"
          >
            Film Industry{' '}
          </Text>
          <Img
            src="/images/img_arrowdown.svg"
            className="h-[9px] mb-[3px] mt-1.5 w-auto"
            alt="arrowdown"
          />
        </div>
        <div
          className="common-pointer flex flex-row gap-2.5 items-center justify-center mb-[35px] md:ml-[0] ml-[53px] md:mt-0 mt-[43px] w-[10%] md:w-full"
          onClick={() => navigate('/filmupdates')}
        >
          <Text
            className="font-medium font-montserrat text-left text-white_A700 w-auto"
            variant="body26"
          >
            Film Updates{' '}
          </Text>
          <Img
            src="/images/img_arrowdown.svg"
            className="h-[9px] w-auto"
            alt="arrowdown_One"
          />
        </div>
        <div
          className="common-pointer flex flex-row gap-2 items-start justify-center mb-[31px] md:ml-[0] ml-[53px] md:mt-0 mt-9 w-[6%] md:w-full"
          onClick={() => navigate('/menu')}
        >
          <Img src="/images/img_menu.svg" className="h-8 w-8" alt="menu" />
          <Text
            className="font-medium font-montserrat mt-1 text-left text-white_A700 w-auto"
            variant="body26"
          >
            Menu
          </Text>
        </div>
        <Img
          src="/images/img_notification.svg"
          className="h-[30px] mb-[31px] md:ml-[0] ml-[52px] md:mt-0 mt-[38px] w-[30px]"
          alt="notification"
        />
        <Img
          src="/images/img_ellipse29.png"
          className="common-pointer h-[50px] md:h-auto mb-[22px] md:ml-[0] ml-[53px] mr-[110px] md:mt-0 mt-[27px] rounded-[50%] w-[50px]"
          onClick={() => navigate('/profile')}
          alt="ellipseTwentyNine"
        />
      </header>
    </>
  );
};

MainScreenHeader.defaultProps = {};

export default MainScreenHeader;
