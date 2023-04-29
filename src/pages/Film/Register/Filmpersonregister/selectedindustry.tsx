/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { api } from '../../../../services/api'
import { Button, List } from '../../../../components/Elements'
import { useLocation, useNavigate } from 'react-router-dom'
import { environment } from '../../../../config/environment'
import { Tree, Tabs } from 'antd'
import { ReactFormGenerator } from 'react-form-builder2'
import RegistrationHeader from '../../../../components/RegisterationHeader/registrationheader'
import { storage } from '../../../../storage/storage'
import { Key } from 'antd/es/table/interface'
import { AuthUser } from '../../../../types/auth.types'
import { getTitleFromTabs } from '../../../../services/filmservices'
interface InputData {
  selectedNodes
  breadCrumPathList
}
interface userSubIndustry{
  key: string;
  value: []
}
const user: AuthUser = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  bio: '',
  role: 'ADMIN',
  type: '',
  industrySelection: [],
  UserSubCategory: []
}

let renderTabsOfSelectedNodes = []
export const SelectedIndustry: React.FC = () => {
  const inputData = useLocation().state as InputData
  const [choiceTreeData, setChoiceTreeData] = React.useState<any[]>([])
  const [formGeneratorData, setformGeneratorData] = React.useState<any[]>([])
  const [selectedNodes, setSelectedNodes] = React.useState<any[]>([])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>()
  const [selectedTabKey, setSelectedTabKey] = useState('')
  const [currentUser, setCurrentUser] = useState<AuthUser>(storage.getLoggedUser())
  const navigate = useNavigate()
  const selectedTabIndex = 0
  let path = inputData.selectedNodes[selectedTabIndex].title
  useEffect(() => {
    renderTabs()
    loadDataFromBE(inputData.selectedNodes[selectedTabIndex].key)
  }, [])

  const renderTabs = async () => {
    const tabs = JSON.stringify(inputData.selectedNodes)
    const replaceTitleToLabel = tabs.replaceAll('title', 'label')
    const afterReplacedFromTitleToLabel = JSON.parse(replaceTitleToLabel)
    renderTabsOfSelectedNodes = afterReplacedFromTitleToLabel
  }

  const loadDataFromBE = async (key: string) => {
    const newLabelPath = path.replace(/\s+/g, '').toLowerCase()
    const mainLablePath = newLabelPath.replace('/', '').toLocaleLowerCase()
    const serverData = await api
      .get(`form/readfile/${environment.formLayoutPath}/${mainLablePath}/${environment.professionalData}`)
    const response = await serverData.data
    const temp = JSON.stringify(response)
    if (temp.includes('children')) {
      setChoiceTreeData(response)
      setformGeneratorData([])
    } else {
      setChoiceTreeData([])
      setformGeneratorData(response)
    }

    const tempIndustrySelection:Key[] = []
    if (currentUser.UserSubCategory) {
      const currentSubCategories = currentUser.UserSubCategory.find(element => element.key === key)
      if (currentSubCategories) {
        currentSubCategories.value.map((item) => {
          tempIndustrySelection.push(item.key)
        })
      }
    }
    setCheckedKeys(tempIndustrySelection)
    setSelectedTabKey(key)
  }

  const loadSubCategory = () => {
    // SelectedTabKey is actually the previous tab in case of Tab click.
    const selectedSubCategories = currentUser.UserSubCategory.find(
      element => element.key === selectedTabKey)
    if (selectedSubCategories) {
      selectedSubCategories.value = selectedNodes
    } else {
      currentUser.UserSubCategory.push({
        key: selectedTabKey,
        value: selectedNodes
      })
    }
    setCurrentUser(currentUser)
  }

  const saveLevel2SelectededIndustry = () => {
    loadSubCategory()
    currentUser.step = '/film/register/selectedindustry'
    delete currentUser.token
    delete currentUser.otp
    api.put(`users/updateUserSubCategory/${currentUser.id}`, currentUser)
    navigate('/film/register/subcategoryuserForm', { state: { user: currentUser } })
  }
  const onCheck = (selectedRow, selected) => {
    console.log(selected.checkedNodes)
    setSelectedNodes(selected.checkedNodes)
  }
  const handleOnClickTitle = (key: string) => {
    loadSubCategory()
    const tabs = getTitleFromTabs(key, renderTabsOfSelectedNodes)
    path = tabs
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
                 <Tabs defaultActiveKey="1" items={renderTabsOfSelectedNodes} onChange={handleOnClickTitle} />
                 title= {inputData.breadCrumPathList[selectedTabIndex]}
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
                  {choiceTreeData.length > 0 &&
                    <Tree
                      checkable
                      checkStrictly
                      treeData={choiceTreeData}
                      onCheck={onCheck}
                      defaultCheckedKeys={checkedKeys}
                    />
                  }
              </div>

              <div className="flex md:flex-col flex-row md:gap-5 items-center justify-start my-0 w-[93%] md:w-full">
                 {formGeneratorData.length > 0 &&
                    <ReactFormGenerator
                    back_action=""
                    form_action=""
                    form_method="POST"
                    data={formGeneratorData}
                    onSubmit={loadSubCategory}
                  />
                  }
              </div>
            </List>
          </div>
        </div>
        <Button
        onClick={saveLevel2SelectededIndustry}
          className="common-pointer bg-red_A700 cursor-pointer font-roboto font-semibold leading-[normal] min-w-[1260px] md:min-w-full mt-[34px] py-[29px] rounded-[17px] sm:text-3xl md:text-[32px] text-[34px] text-center text-white_A700 w-auto"
        >
          Submit
        </Button>
      </div>
    </>
  )
}
