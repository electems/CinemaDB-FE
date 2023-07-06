/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';

import Header from '../../../../components/MainScreenHeader/mainscreenheader';
import { Text } from '../../../../components/Elements/index';
import Footer from '../../../../components/Footer/footer';
import Accordion from 'react-bootstrap/Accordion';
import { api } from '../../../../services/api';
import { useLocation } from 'react-router-dom';
import './notification.css'
interface InputData {
  user,
}
const Notification: React.FC = () => {
  const [formValue, setFormValue] = React.useState([])
  const inputData = useLocation().state as InputData
  const [filmTrainingInstituteNotifications, setFilmInstituteNotifications] = React.useState([])

  useEffect(() => {
    retriveNotificationsBasedOnUser()
    retriveFilmInstituteNotifications()
  }, [])

  const retriveNotificationsBasedOnUser = async () => {
    if (inputData.user.role === 'PERSON') {
      await retriveNotificationsForProductionHouseCompany()
    }
    if (inputData.user.role === 'LOVER') {
      await retriveNotifications()
    }
  }

  const retriveNotifications = async () => {
    const movies = await api.get(`auditioncall/audition/notification/${inputData.user.id}`)
    const response = await movies.data
    setFormValue(response)
  }

  const retriveNotificationsForProductionHouseCompany = async () => {
    const movies = await api.get(`auditioncall/audition/person/notification/${inputData.user.id}`)
    const response = await movies.data
    setFormValue(response)
  }

  const retriveFilmInstituteNotifications = async () => {
    const filmInstituteNotifications = await api.get(`notifications/getnotifcationforfilminstitute/${inputData.user.id}/${inputData.user.role}`)
    const response = await filmInstituteNotifications.data
    setFilmInstituteNotifications(response)
    console.log(filmTrainingInstituteNotifications)
  }

  return (
    <>
      <div className="bg-gray_902 flex font-roboto items-center justify-start mx-auto w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <Header className="bg-gray_800 flex flex-row items-center justify-center md:px-5 w-full" />
          <div className="flex flex-row font-montserrat md:gap-10 items-start justify-between max-w-[1286px] mt-12 mx-auto md:px-5 w-full">
            <Text
              className="font-bold text-amber_A400 text-left w-auto"
              variant="body11"
            >
              Notifications{' '}
            </Text>
            <Text
              className="font-medium text-left text-red_A700 w-auto"
              variant="body22"
            >
              Mark all as read
            </Text>
          </div>
        <div className = "notification flex-col font-montserrat gap-2.5 grid items-center max-w-[1265px] mt-[26px] mx-auto md:px-5 w-full">
          {inputData.user.role === 'LOVER'
            ? <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header >Audition Calls <span className="badge rounded-pill bg-danger">{formValue.length}</span></Accordion.Header>
              <Accordion.Body >
                {formValue.map((item: any) => {
                  return (
                    <p key={item.id}> You applied to audition to the movie {item.movie} and role {item.role}</p>
                  )
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
            : ''}

          {inputData.user.role === 'PERSON'
            ? <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header >Audition Calls <span className="badge rounded-pill bg-danger">{formValue.length}</span></Accordion.Header>
                <Accordion.Body >
                  {formValue.map((item: any) => {
                    return (
                      <p key={item.id}><a href="">{item.firstName}</a> <a href="">{item.lastName}</a> has been applied to the audition created for the movie {item.movie} and role {item.role}</p>
                    )
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            : ''}
        </div>

        <div className = "notification flex-col font-montserrat gap-2.5 grid items-center max-w-[1265px] mt-[26px] mx-auto md:px-5 w-full">
          {inputData.user.role === 'LOVER'
            ? <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header >Film Training Institute<span className="badge rounded-pill bg-danger">{filmTrainingInstituteNotifications.length}</span></Accordion.Header>
              <Accordion.Body >
                {filmTrainingInstituteNotifications.map((item: any, index) => {
                  return (
                    <p key={item.id}> You applied to audition to the movie {item.movie} and role {item.role}</p>
                  )
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
            : ''}

          {inputData.user.role === 'PERSON'
            ? <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header >Film Training Institute<span className="badge rounded-pill bg-danger">{filmTrainingInstituteNotifications.length}</span></Accordion.Header>
                <Accordion.Body >
                  {filmTrainingInstituteNotifications.map((item: any) => {
                    return (
                      <p key={item.id}><a href="">{item.firstName}</a> <a href="">{item.lastName}</a> has been applied to the audition created for the movie {item.movie} and role {item.role}</p>
                    )
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            : ''}
        </div>
          <Footer className="bg-gray_800 flex font-roboto items-center justify-center mt-28 md:px-5 w-full" />
        </div>
      </div>
    </>
  );
};

export default Notification;
