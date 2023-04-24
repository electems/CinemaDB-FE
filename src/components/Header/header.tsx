import React from 'react'
import { Img, Input, Text } from '../Elements/index'
import { CloseSVG } from './index'
import './header.css'
import { useNavigate } from 'react-router-dom'
import { Login } from 'tabler-icons-react'
type MainHeader = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{}>;

const Header: React.FC<MainHeader> = (props) => {
  const [inputvalue, setInputvalue] = React.useState<string>('')
  const navigate = useNavigate()

  const navigateToPreferencePage = () => {
    navigate('/film/selectPreference')
  }
  return (
    <>
      <header className="bg-gray_800 flex flex-row font-roboto items-center justify-center md:px-5 w-full">
        <div className="h-[93px] md:ml-[0] ml-[99px] md:mt-0 mt-[5px] relative w-[16%] md:w-full">
          <Img
            src="/images/cinemadbheaderlogo.png"
            className="absolute h-[93px] inset-[0] justify-center m-auto object-cover w-full"
            alt="imageSixteen"
          />
          <Img
            src="/images/cinemadbheaderlogo.png"
            className="absolute h-[93px] inset-[0] justify-center m-auto object-cover w-full"
            alt="imageSixteen_One"
          />
        </div>
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
        <div className="flex flex-row gap-[11px] items-end justify-center mb-[35px] md:ml-[0] ml-[53px] md:mt-0 mt-[43px] w-[10%] md:w-full">
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
        <div className="flex flex-row gap-2.5 items-center justify-center mb-[35px] md:ml-[0] ml-[53px] md:mt-0 mt-[43px] w-[10%] md:w-full">
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
        <div className="flex flex-row gap-2.5 items-center justify-center mb-[35px] md:ml-[0] ml-[53px] md:mt-0 mt-[43px] w-[10%] md:w-full">
          <Login
         size={34}
         strokeWidth={1.5}
         color={'white'}
         onClick={navigateToPreferencePage}
           />
        </div>
      </header>
    </>
  )
}

export default Header
