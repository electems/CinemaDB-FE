/* eslint-disable no-tabs */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { api } from '../../../../services/api'
import { Button, List } from '../../../../components/Elements'
import { useLocation } from 'react-router-dom'
import { environment } from '../../../../config/environment'
import { Tabs } from 'antd'
import { ReactFormGenerator } from 'react-form-builder2'
import RegistrationHeader from '../../../../components/RegisterationHeader/registrationheader'
import { getBreadCrumbs, getTitleFromTabs } from '../../../../services/filmservices'
interface InputData {
    user
    selectednodes
}
interface Tab {
  key: string;
  label: string
}

const displayTabs: Tab[] = []
let breadCrumbPathLists: string[] = []
export const SubCategoryUserForm: React.FC = () => {
  const inputData = useLocation().state as InputData
  const [formGeneratorData, setformGeneratorData] = React.useState<any[]>([])
  let path = ''
  const selectedTabIndex = 0
  useEffect(() => {
    retriveTabs()
  }, [])

  const retriveTabs = async () => {
    const userdata = inputData.user
    userdata.UserSubCategory.map((item) => {
      item.value.map((item) => {
        displayTabs.push({
          key: item.key,
          label: item.title
        })
      })
    })
  }
  const loadDataFromBE = async (key: string) => {
    const newLabelPath = path.replace(/\s+/g, '').toLowerCase()
    const mainLablePath = newLabelPath.replace('/', '').toLocaleLowerCase()
    const serverData = await api
      .get(`form/readfile/${environment.formLayoutPath}/${mainLablePath}/${environment.professionalData}`)
    const response = await serverData.data
    setformGeneratorData(response)
  }

  const handleOnClickTitle = (key: string) => {
    const tabs = getTitleFromTabs(key, displayTabs)
    path = tabs
    breadCrumbPathLists = getBreadCrumbs(key, displayTabs)
    loadDataFromBE(key)
  }
  return (
    <>
   <div className="bg-white_A700 flex flex-col items-center justify-start mx-auto pb-7 w-full">
        <div className="bg-bluegray_101 flex font-montserrat sm:px-5 shadow-bs3 w-full">
          <RegistrationHeader/>
        </div>
        <div className="flex font-montserrat items-start mt-[10px] md:px-10 sm:px-5 px-[78px] w-full">
          <div className="flex items-center justify-start w-[74%] md:w-full">
            <div className="flex flex-col items-center justify-start w-full">
              <div className="flex md:flex-col items-start w-full">
                 <Tabs defaultActiveKey="1" items={displayTabs} onChange={handleOnClickTitle}/>
              </div>
              <div className="h-[3px] relative w-full">
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white_A700 border border-gray_200 border-solid flex font-montserrat items-center justify-end max-w-[1320px] mt-3 mx-auto rounded w-full">
          <div className=" w-[99%] md:w-full">
            <List
              className="flex-col gap-[25px] grid items-start self-stretch w-auto md:w-full"
              orientation="horizontal"
            >

              <div className="flex md:flex-col flex-row md:gap-5 items-center justify-start my-0 w-[93%] md:w-full">
              </div>

              <div className="flex md:flex-col flex-row md:gap-5 items-center justify-start my-0 w-[93%] md:w-full">
                 {formGeneratorData.length > 0 &&
                    <ReactFormGenerator
                    back_action=""
                    form_action=""
                    form_method="POST"
                    data={formGeneratorData}
                  />
                  }
              </div>
            </List>
            <Button
            className="bg-red_A700 cursor-pointer font-roboto font-semibold leading-[normal] min-w-[1250px] md:min-w-full mt-4 py-[29px] rounded-[17px] sm:text-3xl md:text-[32px] text-[34px] text-center text-white_A700 w-auto"
          >
            Submit
          </Button>
          </div>
        </div>
      </div>
    </>
  )
}
