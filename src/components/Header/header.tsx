/* eslint-disable no-undef */
import React from 'react'
import { Img, Input, Text } from '../Elements/index'
import { CloseSVG } from './index'
import './header.css'
import { useNavigate } from 'react-router-dom'
import { Login } from 'tabler-icons-react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
type MainHeader = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{}>;

const Header: React.FC<MainHeader> = (props) => {
  const [inputvalue, setInputvalue] = React.useState<string>('')
  const navigate = useNavigate()

  const navigateToPreferencePage = () => {
    navigate('/film/login/selectpreference')
  }
  const handleInputChange = (e) => {
    const data = e.target.value
    if (data === 'AuditionCall') {
      navigate('/film/auditioncall/auditioncall')
    }
  };

  return (
    <>
      <Navbar collapseOnSelect expand="sm" className={props.className}>
        <div className="h-[93px] md:ml-[0] ml-[99px] md:mt-0 mt-[5px] relative w-[16%] md:w-full">
          <Img
            src="/images/cinemadbheaderlogo.png"
            className="absolute h-[93px] inset-[0] justify-center m-auto object-cover w-full"
            alt="imageSixteen"
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
        <Navbar.Toggle className="navbar-toggler" aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
        <div className="flex flex-row gap-[11px] items-end justify-center mb-[35px] md:ml-[0] ml-[53px] md:mt-0 mt-[43px] md:w-full">
          <Text
            className="cursor-pointer font-medium font-montserrat text-left text-white_A700 w-auto"
            variant="body26"
          >
            Film Industry{' '}
          </Text>
          <Img
            src="/images/img_arrowdown.svg"
            className="cursor-pointer mb-2 h-[9px] w-auto"
            alt="arrowdown"
          />
        </div>
        <div className="flex flex-row gap-2.5 items-center justify-center mb-[35px] md:ml-[0] ml-[53px] md:mt-0 mt-[43px] md:w-full">
          <Text
            className="cursor-pointer font-medium font-montserrat text-left text-white_A700 w-auto"
            variant="body26"
          >
            Film Updates{' '}
          </Text>
          <Img
            src="/images/img_arrowdown.svg"
            className="cursor-pointer h-[9px] w-auto"
            alt="arrowdown_One"
          />
        </div>
        <div className="flex flex-row gap-2.5 items-center justify-center mb-[35px] md:ml-[0] ml-[53px] md:mt-0 mt-[43px] md:w-full">
          <NavDropdown
            className="font-montserrat"
            title = "Menu"
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item>Legacy of the Industry</NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate('/film/filmfestival/filmfestival')}>
            Film Festival
            </NavDropdown.Item>
            <NavDropdown.Item>Award News</NavDropdown.Item>
            <NavDropdown.Item>OTT</NavDropdown.Item>
            <NavDropdown.Item>Tickets</NavDropdown.Item>
            <NavDropdown.Item>Master class</NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate('/film/auditioncall/auditioncall')}>Audition Call</NavDropdown.Item>
            <NavDropdown.Item>Film Institute</NavDropdown.Item>
            <NavDropdown.Item>Birthdays</NavDropdown.Item>
            <NavDropdown.Item>Shop</NavDropdown.Item>
            <NavDropdown.Item>Contact  us</NavDropdown.Item>
          </NavDropdown>
        </div>
        <div className="flex flex-row gap-2.5 items-center justify-center mb-[35px] md:ml-[0] ml-[53px] md:mt-0 mt-[43px] w-[10%] md:w-full">
          <Login
         size={34}
         strokeWidth={1.5}
         color={'white'}
         className='cursor-pointer'
         onClick={navigateToPreferencePage}
           />
        </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header
