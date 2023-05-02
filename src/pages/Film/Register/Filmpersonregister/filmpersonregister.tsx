/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react'
import { api } from '../../../../services/api'
import './style.css'
import { Button } from '../../../../components/Elements'
import { useLocation, useNavigate } from 'react-router-dom'
import { environment } from '../../../../config/environment'
import { Tree } from 'antd'
import { storage } from '../../../../storage/storage'
import { Key } from 'antd/es/table/interface'
import { DataNode } from 'antd/es/tree'
import RegistrationHeader from '../../../../components/RegisterationHeader/registrationheader'
import { removeSpaceAndSpecialCharacters } from '../../../../services/filmservices'
interface InputData {
  namePhoneNumber,
  type
}

export const FilmPersonRegister: React.FC = () => {
  const [mainProfessional, setMainProfessional] = React.useState([])
  const [lablePath, setLablePath] = useState('')
  const [selectedNodes, setSelectedNodes] = React.useState<any[]>([])
  const [previouslySelectedIndustries, setPreviouslySelectedIndustries] = React.useState<Key[]>([])
  const navigate = useNavigate()
  const inputData = useLocation().state as InputData

  useEffect(() => {
    retriveMainProfessionalList('mainprofessional', 'professionaldata')
    retrieveProfessionalList()
  }, [])

  const retriveMainProfessionalList = async (path: string, fileName: string) => {
    const response = await api.get(`form/${path}/${fileName}`)
    const temp = await response.data
    setMainProfessional(temp)

    const loggedInUser = storage.getLoggedUser()

    const tempIndustrySelection:Key[] = []
    if (loggedInUser.industrySelection) {
      loggedInUser.industrySelection.map((item: DataNode) => {
        if (item.key) {
          tempIndustrySelection.push(item.key)
        }
      })
      setPreviouslySelectedIndustries(tempIndustrySelection)
    }
  }

  const onCheck = (selectedRow, selected) => {
    setSelectedNodes(selected.checkedNodes)
  }

  const retrieveProfessionalList = async () => {
    const mainLabel = localStorage.getItem('professionalLable') || ''
    const labelPath = await removeSpaceAndSpecialCharacters(mainLabel)
    setLablePath(lablePath)

    const response = await api.get(
      `form/${labelPath}/${environment.professionalData}`
    )
    setMainProfessional(response.data)
  }

  const saveUserIndustrySelect = async () => {
    const currentUser = storage.getLoggedUser()
    if (currentUser) {
      delete currentUser.token
      delete currentUser.otp
      currentUser.industrySelection = selectedNodes
      currentUser.step = '/film/register/filmpersonregister'
      api.put(`/users/updateuser/${currentUser.id}`, currentUser)
    } else {
      api.post('/users/createuser/', {
        firstName: inputData.namePhoneNumber,
        email: inputData.namePhoneNumber,
        password: '1234567890',
        phoneNumber: inputData.namePhoneNumber,
        userName: inputData.namePhoneNumber,
        role: 'USER',
        step: '/film/register/filmpersonregister',
        industrySelection: selectedNodes
      })
    }

    navigate('/film/register/selectedindustry', { state: {selectedNodes}})
  }

  return (
    <>
      <div className="bg-white_A700 flex items-center justify-start mx-auto pb-[76px] w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <div className="bg-bluegray_101 flex font-montserrat sm:px-5 shadow-bs3 w-full">
            <RegistrationHeader/>
          </div>
          <div className='text-[28.67px]'>
          {mainProfessional.length > 0 && <Tree
            checkable
            checkStrictly
            defaultCheckedKeys={previouslySelectedIndustries}
            treeData={mainProfessional}
            onCheck={onCheck}
          />}
          </div>
          <Button
            className="bg-red_A700 cursor-pointer font-roboto font-semibold leading-[normal] min-w-[1250px] md:min-w-full mt-4 py-[29px] rounded-[17px] sm:text-3xl md:text-[32px] text-[34px] text-center text-white_A700 w-auto"
            onClick={() => saveUserIndustrySelect()}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  )
}
