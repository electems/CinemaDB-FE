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
import { getTitleFromTabs } from '../../../../services/filmservices'
interface InputData {
    user
    selectednodes
}
interface Tab {
  key: string;
  label: string
}

const displayTabs: Tab[] = []
let currentSubCategoryType: any
let currentSubCategory: string = ''
export const SubCategoryUserForm: React.FC = () => {
  const inputData = useLocation().state as InputData
  const [selectedMastersOfTheCurrentSubCategory, setSelectedMastersOfTheCurrentSubCategory] = React.useState([])
  const [formGeneratorLayoutOfSelectedTabAndType, setFormGeneratorLayoutOfSelectedTabAndType] = React.useState()
  const [formUserProfessionData, setFormUserProfessionData] = React.useState<any[]>([])

  useEffect(() => {
    retriveTabs()
  }, [])

  const retriveTabs = async () => {
    const userdata = inputData.user
    userdata.userSubCategory.map((item) => {
      item.value.map((item) => {
        displayTabs.push({
          key: item.key,
          label: item.title
        })
      })
    })
    currentSubCategory = displayTabs[0].label
    loadSubCategoryTypes(currentSubCategory)
    currentSubCategoryType = selectedMastersOfTheCurrentSubCategory[0]
  }
  // load vertical menu
  /* for the vertical menu same antd component to render it we want both key and label as per
 the documentation like same as the tab bar but should change the position */
  // https://stackblitz.com/run?file=demo.tsx
  const loadSubCategoryTypes = async (currentSubCategory) => {
    const selectedMastersOfTheCurrentSubCategory = await api.get(`form/readfile/formlayout/${currentSubCategory}/${environment.professionalData}`)
    setSelectedMastersOfTheCurrentSubCategory(await selectedMastersOfTheCurrentSubCategory.data)
  }
  // load both tabs at same time
  const loadFormGeneratorAndUserProfessionData = async (currentSubCategory, currentSubCategoryType) => {
    const formGeneratorLayoutOfSelectedTabAndType = await api.get(`form/readfile/mastertemplates/${currentSubCategoryType}/${environment.professionalData}`)
    setFormGeneratorLayoutOfSelectedTabAndType(await formGeneratorLayoutOfSelectedTabAndType.data)
    const formUserProfessionData = await api.get(`userprofession/formdata/${inputData.user.id}/${currentSubCategory}/${currentSubCategoryType}`)
    setFormUserProfessionData(await formUserProfessionData.data)
  }

  // vertical bar onclick
  /* Here i cant able to get the title of tab so i will use key and call (getTitleFromTabs) which is in
 ile service file */
  const onClickOfSubCategoryType = (selectedSubCategoryType : string) => {
    currentSubCategoryType = selectedSubCategoryType
    loadFormGeneratorAndUserProfessionData(currentSubCategory, currentSubCategoryType)
  }
  // horizontal bar on click
  /* Here i cant able to get the title of tab so i will use key and call (getTitleFromTabs) which is in
 ile service file */
  const onClickOfSubCategoryTab = (selectedSubCategory : string) => {
    currentSubCategory = selectedSubCategory
    loadSubCategoryTypes(currentSubCategory)
    currentSubCategoryType = selectedMastersOfTheCurrentSubCategory[0]
    loadFormGeneratorAndUserProfessionData(currentSubCategory, currentSubCategoryType)
  }

  // on save should call post api
  const onClickOfSave = () => {
    if (formUserProfessionData === undefined) {
      formUserProfessionData.userId = inputData.user.id,
      formUserProfessionData.subCategory = currentSubCategory,
      formUserProfessionData.subCategoryType = currentSubCategoryType

      // formdatajson - is value from submit of form
      formUserProfessionData.value = formDataJson
      api.post('userprofession/formdata​​​​', formUserProfessionData)
    }
  }
  return (
    <>
   <div className="bg-white_A700 flex flex-col items-center justify-start mx-auto pb-7 w-full">
        <div className="bg-bluegray_101 flex font-montserrat sm:px-5 shadow-bs w-full">
          <RegistrationHeader/>
        </div>
        <div className="flex font-montserrat items-start mt-[10px] md:px-10 sm:px-5 px-[78px] w-full">
          <div className="flex items-center justify-start w-[74%] md:w-full">
            <div className="flex flex-col items-center justify-start w-full">
              <div className="flex md:flex-col items-start w-full">
                 <Tabs defaultActiveKey="1" items={displayTabs}/>
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
                 {formUserProfessionData.length > 0 &&
                    <ReactFormGenerator
                    back_action=""
                    form_action=""
                    form_method="POST"
                    data={formUserProfessionData}
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
