/* eslint-disable prefer-const */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
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
import { ISubCategoryUserForm } from '../../../../types/subcategoryuserform.type'
interface InputData {
    user
    selectednodes
}
interface Tab {
  key: string;
  label: string
}
const displayTabs: Tab[] = []
let renderTabsOfSelectedNodes: any = []
let currentSubCategoryType: any
let currentSubCategory: string = ''
export const SubCategoryUserForm: React.FC = () => {
  const inputData = useLocation().state as InputData
  const [selectedMastersOfTheCurrentSubCategory, setSelectedMastersOfTheCurrentSubCategory] = React.useState([])
  const [retriveForm, setRetriveForm] = React.useState()
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
      /* whenever i come to this page from previous page dispalytab gets pushed of tabs its empty and then getting pushed
      its not rendering on the 1st click i want go to previous page and come back so i added to this renderTabsOfSelectedNodes variable
      bow working fine */
      renderTabsOfSelectedNodes = displayTabs
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
    currentSubCategoryType = currentSubCategoryType.replaceAll(' ', '_')
    const formGeneratorLayoutOfSelectedTabAndType = await api.get(`form/readfile/mastertemplates/${currentSubCategoryType}/${environment.professionalData}`)
    setFormUserProfessionData(await formGeneratorLayoutOfSelectedTabAndType.data)
    const formUserProfessionData = await api.get(`userprofession/formdata/${inputData.user.id}/${currentSubCategory}/${currentSubCategoryType}`)
    setRetriveForm(await formUserProfessionData.data)
  }

  // vertical bar onclick
  const onClickOfSubCategoryType = (selectedTab: string) => {
    currentSubCategoryType = selectedTab
    loadFormGeneratorAndUserProfessionData(currentSubCategory, currentSubCategoryType)
  }
  // horizontal bar on click
  /* Here i cant able to get the title of tab so i will use key and call (getTitleFromTabs) which is in
 ile service file */
  const onClickOfSubCategoryTab = (key : string) => {
    console.log(key)
    const title = getTitleFromTabs(key, renderTabsOfSelectedNodes)
    console.log(title)
    currentSubCategory = title
    loadSubCategoryTypes(currentSubCategory)
    currentSubCategoryType = selectedMastersOfTheCurrentSubCategory[0]
    loadFormGeneratorAndUserProfessionData(currentSubCategory, currentSubCategoryType)
  }

  // on save should call post api
  const onClickOfSave = (data) => {
    /* here i am not using if condition retriveForm because for retriveing i need both tabs index now left bar
    i used list for test */
    const subCategoryForm: ISubCategoryUserForm = {
      userId: inputData.user.id,
      subCategory: currentSubCategory,
      subCategoryType: currentSubCategoryType,
      value: data
    }
    api.post('userprofession/createform/formdata', subCategoryForm)
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
                 <Tabs defaultActiveKey="1" items={renderTabsOfSelectedNodes} onChange={onClickOfSubCategoryTab}/>
              </div>
              <div className="h-[3px] relative w-full">
              </div>
              <div>
   {selectedMastersOfTheCurrentSubCategory.map(tab => <li onClick={() => onClickOfSubCategoryType(tab)}key={tab}>{tab}</li>)}
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
                    onSubmit={onClickOfSave}
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
