/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';

import { Img, Input, Text } from '../Elements/index';
import { CloseSVG } from '../Header/index';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../storage/storage';
import { api } from '../../services/api';
import './style.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

type HeaderProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{}>;

const MainScreenHeader: React.FC<HeaderProps> = (props) => {
  const navigate = useNavigate();

  const [inputvalue, setInputvalue] = React.useState<string>('');
  const [displayProfile, setDisplayProfile] = React.useState(true);
  const loggedUser = storage.getLoggedUser()

  useEffect(() => {
  }, [])

  const navigateToSubCategoryUserForm = async () => {
    const res = await api.get(`/users/${loggedUser.id}`)
    const userList = await res.data
    const selectedUser = userList[0]
    selectedUser.userSubCategory = selectedUser.usersubcategory
    navigate('/film/register/subcategoryuserform', { state: { user: selectedUser } })
  }

  const navigateToNotificationPage = async () => {
    navigate('/film/public/notification', { state: { user: loggedUser } })
  }

  const navigateToProfilePage = async () => {
    const res = await api.get(`/users/${loggedUser.id}`)
    const userList = await res.data
    const selectedUser = userList[0]
    selectedUser.userSubCategory = selectedUser.usersubcategory
    if (loggedUser.role === 'PERSON') {
      navigate('/film/register/subcategoryuserform', { state: { profile: displayProfile, user: selectedUser } })
    } else {
      navigate('/film/register/cinemafansform', { state: { profile: displayProfile, user: selectedUser } })
    }
  }
  const movieType = [
    { value: 'Sandalwood', label: 'Sandalwood' },
    { value: 'Tollywood', label: 'Tollywood' },
    { value: 'Mollywood', label: 'Mollywood' },
    { value: 'Kollywood', label: 'Kollywood' }
  ];
  return (
    <>
      <Navbar collapseOnSelect expand="sm" className='bg-gray_800 flex flex-row font-roboto items-center justify-center w-full'>
        <div className="ml-10 h-[93px] md:ml-[0] md:mt-0 mt-[5px] relative w-[16%] md:w-full">
          <Img
            src="/images/cinemadbheaderlogo.png"
            className="absolute h-[93px] inset-[0] justify-center m-auto object-cover w-full"
            alt="imageSixteen"
          />
        </div>
        <Input
          value={inputvalue}
          onChange={(e) => setInputvalue(e?.target?.value)}
          wrapClassName="bg-bluegray_100 flex mb-7 md:ml-[0] ml-[53px] md:mt-0 mt-[33px] px-[18px] py-[3px] rounded-md w-[15%] md:w-full"
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
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <div className="flex flex-row gap-[11px] items-end justify-center mb-[35px] md:ml-[0] ml-[53px] md:mt-0 mt-[43px] md:w-full">
              <div className="">
                <select className="text-white bg-gray_800 block" name='movieType'>
                  <option>Film Industry</option>
                  {movieType.map(item => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-row gap-[11px] items-end justify-center mb-[35px] md:ml-[0] ml-[53px] md:mt-0 mt-[43px] md:w-full">
              <Text
                className="font-medium font-montserrat text-left text-white_A700 w-auto"
                variant="body26"
                onClick={navigateToSubCategoryUserForm}
              >
                Movies
              </Text>
            </div>
            <div className="mainheader flex flex-row gap-2.5 items-center justify-center mb-[35px] md:ml-[0] ml-[53px] md:mt-0 mt-[43px] md:w-full">
              <NavDropdown
                title="Film Updates"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item>Coming Soon</NavDropdown.Item>
                <NavDropdown.Item>This Week Release</NavDropdown.Item>
                <NavDropdown.Item>Trailers</NavDropdown.Item>
                <NavDropdown.Item>Movie Songs</NavDropdown.Item>
                <NavDropdown.Item>Movie News</NavDropdown.Item>
              </NavDropdown>
            </div>
            <div
              className="mainheader common-pointer flex flex-row gap-2 items-start justify-center mb-[31px] md:ml-[0] ml-[53px] md:mt-0 mt-9 w-[6%] md:w-full"
            >
              <NavDropdown
                className="font-montserrat"
                title="Menu"
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
                <NavDropdown.Item onClick={() => navigate('/film/filminstitutetraining/traininginstitutes')}>Film Institute</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/film/public/birthday')} >Birthdays</NavDropdown.Item>
                <NavDropdown.Item>Shop</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/film/public/watchlist')} >Watchlist</NavDropdown.Item>
                <NavDropdown.Item>Contact  us</NavDropdown.Item>
              </NavDropdown>
            </div>
            <div className="flex flex-row gap-2 items-start justify-center ">
              <Img
                src="/images/img_notification.svg"
                className="cursor-pointer h-[30px]  mb-[31px] md:ml-[0] ml-[52px] md:mt-0 mt-[38px] w-[30px]"
                alt="notification"
                onClick={navigateToNotificationPage}
              />
            </div>
            <ul className="flex flex-row gap-2 items-start justify-center">
              <Img
                src="/images/img_ellipse29.png"
                className="common-pointer h-[50px] h-[50px] md:h-auto mb-[22px] md:ml-[0] ml-[53px] md:mt-0 mt-[27px] rounded-[50%] w-[50px]"
                alt="arrowdown_One"
                onClick={navigateToProfilePage}
              />
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

MainScreenHeader.defaultProps = {};

export default MainScreenHeader;
