/* eslint-disable no-new-wrappers */
/* eslint-disable no-undef */
/* eslint-disable no-import-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { api } from '../../../../services/api'
import { Button, List, Line } from '../../../../components/Elements'
import { useLocation, useNavigate } from 'react-router-dom'
import { environment } from '../../../../config/environment'
import { Tree, Tabs } from 'antd'
import { ReactFormGenerator } from 'react-form-builder2'
import RegistrationHeader from '../../../../components/RegisterationHeader/registrationheader'
import { storage } from '../../../../storage/storage'
import { Key } from 'antd/es/table/interface'
import { AuthUser } from '../../../../types/auth.types'
import { getTitleFromTabs, removeSpaceAndSpecialCharacters, tabs } from '../../../../services/filmservices'
interface InputData {
  selectedNodes
}

let renderTabsOfSelectedNodes = []
export const SelectedIndustry: React.FC = () => {
  const inputData = useLocation().state as InputData

  const [choiceTreeData, setChoiceTreeData] = React.useState<any[]>([])
  const [formGeneratorData, setformGeneratorData] = React.useState<any[]>([])
  const [formData, setformData] = React.useState<any[]>([])
  const [selectedNodes, setSelectedNodes] = React.useState<any[]>([])
  const [checkedkeys, setCheckedKeys] = React.useState<Key[]>()
  const [selectedTabKey, setSelectedTabKey] = useState('')
  const [currentUser, setCurrentUser] = useState<AuthUser>(storage.getLoggedUser())
  const navigate = useNavigate()
  const selectedTabIndex = 0
  let path: any
  if (inputData.selectedNodes.length === 0) {
    path = currentUser.industrySelection[selectedTabIndex].title
  } else {
    path = inputData.selectedNodes[selectedTabIndex].title
  }
  useEffect(() => {
    renderTabs()
    if (inputData.selectedNodes.length > 0) {
      loadDataFromBE(inputData.selectedNodes[selectedTabIndex].key)
    } else {
      loadDataFromBE(currentUser.industrySelection[selectedTabIndex].key)
    }
  }, [])

  const renderTabs = async () => {
    if (inputData.selectedNodes.length > 0) {
      const nodes = JSON.stringify(inputData.selectedNodes)
      const selectedNodes = tabs(nodes)
      renderTabsOfSelectedNodes = selectedNodes
    } else {
      const nodes = JSON.stringify(currentUser.industrySelection)
      const selectedNodes = tabs(nodes)
      renderTabsOfSelectedNodes = selectedNodes
    }
  }

  const loadDataFromBE = async (key: any) => {
    let treeResponse = []
    const tempIndustrySelection: Key[] = []
    const labelPath = await removeSpaceAndSpecialCharacters(path)
    const serverData = await api
      .get(`auth/${labelPath}/${environment.professionalData}`)
    treeResponse = await serverData.data
    const temp = JSON.stringify(treeResponse)

    if (temp.includes('FILE_NOT_FOUND')) { // Do formbuilder
      const formData = await api
        .get(`form/readfile/${environment.formLayoutPath}/${labelPath}/${environment.professionalData}`)
      const response = await formData.data
      setformGeneratorData(response)
      setChoiceTreeData([])
      if (currentUser.userSubCategory) {
        const currentSubCategories = currentUser.userSubCategory.find(element => element.key === key)
        if (currentSubCategories) {
          setformData(currentSubCategories.value)
        } else {
          const subUserIndustry = await api.post('users/createUserSubCategory', {
            key,
            value: [],
            userId: currentUser.id,
            createdBy: currentUser.userName,
            updatedBy: currentUser.userName
          })

          if (subUserIndustry) {
            currentUser.userSubCategory.push(subUserIndustry.data)
          }
        }
      }
    } else { // Do tree
      setChoiceTreeData(treeResponse)
      setformGeneratorData([])
      if (currentUser.userSubCategory) {
        const currentSubCategories = currentUser.userSubCategory.find(element => element.key === key)
        if (currentSubCategories) {
          currentSubCategories.value.map((item) => {
            tempIndustrySelection.push(item.key)
          })
        }
      }
      setCheckedKeys(tempIndustrySelection)
    }
    setSelectedTabKey(key)
  }

  const loadSubCategory = () => {
    // SelectedTabKey is actually the previous tab in case of Tab click.
    const selectedSubCategories = currentUser.userSubCategory.find(
      element => element.key === selectedTabKey)

    if (selectedSubCategories) {
      selectedSubCategories.value = selectedNodes
    } else {
      currentUser.userSubCategory.push({
        key: selectedTabKey,
        value: selectedNodes,
        userId: currentUser.id,

        createdBy: currentUser.userName,
        updatedBy: currentUser.userName
      })
    }
    setCurrentUser(currentUser)
  }

  const submitIndustrySelection = async () => {
    loadSubCategory()
    currentUser.step = '/film/register/selectedindustry'
    delete currentUser.token
    delete currentUser.otp
    // to delete column while saving
    currentUser.userSubCategory.map((item) => {
      delete item.createdAt
      delete item.updatedAt
    })
    api.post('users/userAndUserSubCategory', currentUser)

    navigate('/film/register/subcategoryuserform', { state: { user: currentUser } })
  }

  const saveLevel2SelectededIndustry = async () => {
    if (selectedNodes.length !== 0) {
      await submitIndustrySelection()
    } else {
      $('#formGeneratorSubmit').click()
    }
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

  const handleFormSubmit = (data) => {
    delete currentUser.token
    delete currentUser.otp
    currentUser.userSubCategory.map((item) => {
      delete item.createdAt
      delete item.updatedAt
    })
    if (currentUser.userSubCategory) {
      const currentSubCategories = currentUser.userSubCategory.find(element => element.key === selectedTabKey)
      if (currentSubCategories) {
        currentSubCategories.value = currentSubCategories.value.slice(currentSubCategories.value.length, currentSubCategories.value.length)
        data.map((items) => {
          currentSubCategories.key = selectedTabKey
          currentSubCategories.userId = currentUser.id
          currentSubCategories.value.push(items)
        })
      }
    }
    console.log(currentUser.userSubCategory)
    api.post('users/userAndUserSubCategory', currentUser)
  }
  return (
    <>
      <div className="bg-white_A700 flex flex-col items-center justify-start mx-auto pb-7 w-full">
        <div className="bg-bluegray_101 flex font-montserrat sm:px-5 shadow-bs3 w-full">
          <RegistrationHeader />
        </div>
        <div className="flex font-montserrat items-start mt-[10px] md:px-10 sm:px-5 px-[78px] w-full">
          <div className="flex items-center justify-start w-[74%] md:w-full">
            <div className="flex flex-col items-center justify-start w-full">
              <div className="flex md:flex-col items-start w-full">
                <Tabs defaultActiveKey="1" items={renderTabsOfSelectedNodes} onChange={handleOnClickTitle} />
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
                    defaultCheckedKeys={checkedkeys}
                    treeData={choiceTreeData}
                    onCheck={onCheck}
                  />
                }
              </div>

              <div className="pr-5">
                {formGeneratorData.length > 0 &&
                  <ReactFormGenerator
                    back_action=""
                    form_action=""
                    answer_data={ formData }
                    form_method="POST"
                    data={formGeneratorData}
                    onSubmit={handleFormSubmit}
                    submitButton={<button type="submit" id="formGeneratorSubmit" className="form-builder-button"> </button>}
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
