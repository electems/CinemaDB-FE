/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { api } from '../../../../services/api'
import { Text, Button, List, Line } from '../../../../components/Elements'
import { useLocation, useNavigate } from 'react-router-dom'
import { environment } from '../../../../config/environment'
import { Tree } from 'antd'
import { ReactFormGenerator } from 'react-form-builder2'
import { MathLower } from 'tabler-icons-react'
import RegistrationHeader from '../../../../components/RegisterationHeader/registrationheader'
interface InputData {
  selectedNodes
  breadCrumPathList
}
export const SelectedIndustry: React.FC = () => {
  const navigate = useNavigate()
  const inputData = useLocation().state as InputData
  const [choiceTreeData, setChoiceTreeData] = React.useState<any[]>([])
  const [formBuilderJsonData, setFormBuilderJsonData] = React.useState<any[]>([])
  const [formGeneratorData, setformGeneratorData] = React.useState<any[]>([])

  let selectedTabIndex = 0

  useEffect(() => {
    loadDataFromBE()
  }, [])

  const loadDataFromBE = async () => {
    const path = inputData.selectedNodes[selectedTabIndex].title

    const serverData = await api
      .get(`form/readfile/${environment.formLayoutPath}/${path}/${environment.professionalData}`)

    const response = await serverData.data
    const temp = JSON.stringify(response)
    if (temp.includes('children')) {
      setChoiceTreeData(response)
    } else {
      setFormBuilderJsonData(response)
    }
  }
  const handleOnClickTitle = (title: string, tabIndex: string, key: string) => {
    selectedTabIndex = tabIndex as unknown as number
    loadDataFromBE()
  }

  const onCheck = (selectedRow, selected) => {
    console.log(selectedRow)
  }

  return (
    <>
   <div className="bg-white_A700 flex flex-col items-center justify-start mx-auto pb-7 w-full">
        <div className="bg-bluegray_101 flex font-montserrat sm:px-5 shadow-bs3 w-full">
          <RegistrationHeader/>
        </div>
        <div className="flex font-montserrat items-start mt-[19px] md:px-10 sm:px-5 px-[78px] w-full">
          <div className="flex items-center justify-start w-[74%] md:w-full">
            <div className="flex flex-col items-center justify-start w-full">
              <div className="flex md:flex-col items-start w-full">
                {inputData.selectedNodes.map(function (item: any, tabIndex) {
                  return (
                    <div
                    className="flex items-center justify-center w-[204px]"
                    key={tabIndex}
                    onClick={() => handleOnClickTitle(item.title, tabIndex, item.key)}
                  >
                     {item.title}
                  </div>
                  )
                })}
              </div>
              <div className="h-[3px] relative w-full">
                <Line className="absolute bg-gray_101 bottom-[0] h-[3px] inset-x-[0] mx-auto w-full" />
                <Line className="absolute bg-gray_901 h-[3px] inset-y-[0] left-[0] my-auto w-[21%]" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white_A700 border border-gray_200 border-solid flex font-montserrat items-center justify-end max-w-[1320px] mt-3 mx-auto rounded w-full">
          <div className="flex items-center justify-start mt-[30px] w-[99%] md:w-full">
            <List
              className="flex-col gap-[53px] grid items-start self-stretch w-auto md:w-full"
              orientation="vertical"
            >
              <div className="flex md:gap-5 items-center justify-start my-0">
                <div className="gap-[7px] justify-start">
                  {inputData.breadCrumPathList[selectedTabIndex]}
                </div>
              </div>
              <div className="flex md:flex-col flex-row md:gap-5 items-center justify-start my-0 w-[93%] md:w-full">
                  {choiceTreeData.length > 0 &&
                    <Tree
                      checkable
                      treeData={choiceTreeData}
                      onCheck={onCheck}
                    />
                  }
              </div>

              <div className="flex md:flex-col flex-row md:gap-5 items-center justify-start my-0 w-[93%] md:w-full">
                  {formBuilderJsonData.length > 0 &&
                   <ReactFormGenerator
                   back_action="/"
                   back_name="Back"
                   answer_data={formBuilderJsonData}
                   action_name="Save"
                   form_action="/"
                   form_method="POST"
                   read_only={true}
                   hide_actions={true}
                   data={formGeneratorData}
                 />
                  }
              </div>
            </List>
          </div>
        </div>
        <Button
          className="common-pointer bg-red_A700 cursor-pointer font-roboto font-semibold leading-[normal] min-w-[1260px] md:min-w-full mt-[34px] py-[29px] rounded-[17px] sm:text-3xl md:text-[32px] text-[34px] text-center text-white_A700 w-auto"
        >
          Submit
        </Button>
      </div>
    </>
  )
}
