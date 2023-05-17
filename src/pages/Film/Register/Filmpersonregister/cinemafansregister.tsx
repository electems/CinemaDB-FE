/* eslint-disable object-shorthand */
/* eslint-disable no-sequences */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-tabs */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect } from 'react'
import { api } from '../../../../services/api'
import { environment } from '../../../../config/environment'
import './style'
import { ReactFormGenerator } from 'react-form-builder2'
import { ISubCategoryUserForm } from '../../../../types/subcategoryuserform.type'
import { useLocation } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion'

interface InputData{
    loggedUser
}
let currentSubCategoryType: any
export const CinemaFansForm: React.FC = () => {
  const [selectedMastersOfTheCurrentSubCategory, setSelectedMastersOfTheCurrentSubCategory] = React.useState([])
  const [cinemaFansForm, setCinemaFansForm] = React.useState<any[]>([])
  const [active, setActive] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState()
  const [formGeneratorLayoutOfRoleAndType, setFormGeneratorLayoutOfRoleAndType] = React.useState<any[]>([])
  const inputData = useLocation().state as InputData
  useEffect(() => {
    retriveTabs()
  }, [])

  const retriveTabs = async () => {
    const types = await loadSubCategoryTypes('Cinema Fans')
    currentSubCategoryType = types[0]
    await loadFormGeneratorAndUserProfessionData(currentSubCategoryType, inputData.loggedUser.role)
  }
  // load vertical menu
  const loadSubCategoryTypes = async (currentSubCategory) => {
    const leftMenuData = await api.get(`form/readfile/formlayout/${currentSubCategory}/${environment.professionalData}`)
    const response = await leftMenuData.data
    setSelectedMastersOfTheCurrentSubCategory(response)
    return response
  }
  // load left menu and form
  const loadFormGeneratorAndUserProfessionData = async (currentSubCategoryType, userRole) => {
    const currentSubCategoryTypePath = currentSubCategoryType ? currentSubCategoryType.replaceAll(' ', '_') : ''

    // fetch form layout
    const formGeneratorLayoutOfSelectedTabAndType = await api.get(`form/mastertemplatereadfile/mastertemplates/Cinema_Fans/${currentSubCategoryTypePath}/${environment.professionalData}`)
    const response = await formGeneratorLayoutOfSelectedTabAndType.data
    setFormGeneratorLayoutOfRoleAndType(response)

    // fetch user form data.
    const formProfessionData = await api.get(`userprofession/formdata/${inputData.loggedUser.id}/${userRole}/${currentSubCategoryType}`)
    const loadDataFromBackend = await formProfessionData.data
    if (loadDataFromBackend && loadDataFromBackend.length > 0) {
      setCinemaFansForm(loadDataFromBackend)
    }
  }

  // vertical bar onclick
  const onClickOfSubCategoryType = async (selectedTab: string, i) => {
    setActive(!active)
    setSelectedIndex(i)
    currentSubCategoryType = selectedTab
    await loadFormGeneratorAndUserProfessionData(currentSubCategoryType, inputData.loggedUser.role)
  }

  // on save should call post api
  const onClickOfSave = async (data, pk?) => {
    const subCategoryUserForm: ISubCategoryUserForm = {
      userId: inputData.loggedUser.id,
      subCategory: inputData.loggedUser.role,
      subCategoryType: currentSubCategoryType,
      value: data
    }
    if (pk) {
      subCategoryUserForm.id = pk
    }

    api.post('userprofession/createform/formdata', subCategoryUserForm)
  }

  return (
    <>
      <div className="accordion">
        <div className="row">
          <div className="col-6 col-md-4 mt-5">
            {selectedMastersOfTheCurrentSubCategory.map((item, i) => {
              return (
                <div className="flex items-center justify-start mt-[10px] mx-auto w-[89%]">
                  <div onClick={() => onClickOfSubCategoryType(item, i)}
                  className= {i === selectedIndex ? 'bg-white_A700 border-amber_A400 border-solid flex flex-row gap-[25px] items-start justify-start p-[19px] rounded-[5px] w-full' : ' bg-white_A700 border border-solid flex flex-row gap-[25px] items-start justify-start p-[19px] rounded-[5px] w-full'}>
                       {item}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="col">
            <div className="row mt-5 tab-label">
            </div>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
              <Accordion.Header>{currentSubCategoryType}</Accordion.Header>
              <Accordion.Body>
                {cinemaFansForm.length > 0
                  ? cinemaFansForm.map((record: any, i) => {
                    return (
                  <><div>{record.value[0]?.value}</div>
                    <div>
                      <ReactFormGenerator
                        back_action=""
                        form_action=""
                        answer_data={record.value}
                        form_method="POST"
                        data={formGeneratorLayoutOfRoleAndType}
                        onSubmit={(data) => onClickOfSave(data, record.id)}
                        submitButton={
                          <div className="flex sm:flex-col flex-row font-poppins gap-[25px] items-center justify-end ml-auto w-[44%] md:w-full">
                            <button className="border border-gray_400 border-solid capitalize cursor-pointer font-semibold leading-[normal] min-w-[139px] py-[13px] rounded-[5px] sm:text-[17.62px] md:text-[19.62px] text-[21.62px] text-center text-indigo_900 tracking-[1.73px] w-auto">
                              Reset
                            </button>
                            <div className="flex items-center justify-center self-stretch w-auto">
                              <button className="border border-gray_400 border-solid capitalize cursor-pointer font-semibold leading-[normal] min-w-[139px] py-[13px] rounded-[5px] sm:text-[17.62px] md:text-[19.62px] text-[21.62px] text-center text-indigo_900 tracking-[1.73px] w-auto">
                                cancel
                              </button>
                            </div>
                            <button type="submit"
                              className="bg-red_A700 capitalize font-semibold h-[59px] justify-center pl-5 sm:pr-5 pr-8 py-[13px] rounded-[5px] text-center text-white_A700 tracking-[1.73px] w-[113px]"
                            >
                              Save
                            </button>
                          </div>
                        }/>
                    </div>
                  </>
                    )
                  })
                  : <div>
              <ReactFormGenerator
                back_action=""
                form_action=""
                form_method="POST"
                data={formGeneratorLayoutOfRoleAndType}
                onSubmit={onClickOfSave}
                submitButton={
                  <div className="flex sm:flex-col flex-row font-poppins gap-[25px] items-center justify-end ml-auto w-[44%] md:w-full">
                    <button className="border border-gray_400 border-solid capitalize cursor-pointer font-semibold leading-[normal] min-w-[139px] py-[13px] rounded-[5px] sm:text-[17.62px] md:text-[19.62px] text-[21.62px] text-center text-indigo_900 tracking-[1.73px] w-auto">
                      Reset
                    </button>
                    <div className="flex items-center justify-center self-stretch w-auto">
                      <button className="border border-gray_400 border-solid capitalize cursor-pointer font-semibold leading-[normal] min-w-[139px] py-[13px] rounded-[5px] sm:text-[17.62px] md:text-[19.62px] text-[21.62px] text-center text-indigo_900 tracking-[1.73px] w-auto">
                        cancel
                      </button>
                    </div>
                    <button type="submit"
                      className="bg-red_A700 capitalize font-semibold h-[59px] justify-center pl-5 sm:pr-5 pr-8 py-[13px] rounded-[5px] text-center text-white_A700 tracking-[1.73px] w-[113px]"
                    >
                      Save
                    </button>
                  </div>
                }/>
              </div>}
              </Accordion.Body>
             </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  )
}
