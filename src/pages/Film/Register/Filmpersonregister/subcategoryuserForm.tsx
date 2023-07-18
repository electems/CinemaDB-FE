/* eslint-disable no-mixed-operators */
/* eslint-disable no-constant-condition */
/* eslint-disable no-return-assign */
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
import { useLocation } from 'react-router-dom'
import { environment } from '../../../../config/environment'
import { Tabs } from 'antd'
import './style'
import './style.css'
import { ReactFormGenerator } from 'react-form-builder2'
import { getTitleFromTabs } from '../../../../services/filmservices'
import { ISubCategoryUserForm } from '../../../../types/subcategoryuserform.type'
import MyProfilePage from '../../MyProfile/myprofile'
import { Accordion } from 'react-bootstrap'

interface InputData {
  user
  selectednodes
  role
  profile
}
interface Tab {
  key: string;
  label: string
}

let displayTabs: Tab[] = []
let renderTabsOfSelectedNodes: any = []
const typeUndefined = undefined;
let currentSubCategoryType = typeUndefined || '';
let currentSubCategory: string = ''
let userId: string

export const SubCategoryUserForm: React.FC = () => {
  const inputData = useLocation().state as InputData
  const [selectedMastersOfTheCurrentSubCategory, setSelectedMastersOfTheCurrentSubCategory] = React.useState<any>([])
  const [formUserProfessionData, setFormUserProfessionData] = React.useState<any[]>([])
  const [active, setActive] = React.useState('')
  const [formGeneratorLayoutOfSelectedTabAndType, setFormGeneratorLayoutOfSelectedTabAndType] = React.useState<any[]>([])
  const [formValue, setFormValue] = React.useState<any[]>([])
  const [dropdownId, setDropdownId] = React.useState<string>('')

  useEffect(() => {
    userId = inputData.user.id
    retriveTabs()
    retriveMovies()
  }, [])

  const retriveTabs = async () => {
    displayTabs = [{
      key: '1',
      label: 'General'
    }]
    renderTabsOfSelectedNodes = []
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
    const types = await loadSubCategoryTypes(currentSubCategory)
    currentSubCategoryType = types[0]
    await loadFormGeneratorAndUserProfessionData(currentSubCategory, currentSubCategoryType)
  }
  // load vertical menu
  const loadSubCategoryTypes = async (currentSubCategory) => {
    let response: any = []
    let tabs = { key: '', label: '' }
    if (currentSubCategory === 'General') {
      renderTabsOfSelectedNodes = displayTabs
      tabs = renderTabsOfSelectedNodes.find(o => o.label !== currentSubCategory)
    }
    if (currentSubCategory !== 'General') {
      renderTabsOfSelectedNodes = displayTabs
    }
    tabs = renderTabsOfSelectedNodes.find(o => o.label !== currentSubCategory)
    const retriveOtherForms = await api.get(`form/readfile/formlayout/${tabs.label}/${environment.professionalData}`)
    const form = retriveOtherForms.data
    const subCategory = currentSubCategory.replaceAll(' ', '_')
    const leftMenuData = await api.get(`form/readfile/formlayout/${subCategory}/${environment.professionalData}`)
    response = await leftMenuData.data
    form.map((item) => {
      response.push(item)
    })
    setSelectedMastersOfTheCurrentSubCategory(response)
    return response
  }

  const loadFormGeneratorAndUserProfessionData = async (currentSubCategory, currentSubCategoryType) => {
    const currentSubCategoryTypePath = currentSubCategoryType ? currentSubCategoryType.replaceAll(' ', '_') : ''
    setActive(currentSubCategoryType)
    localStorage.setItem('leftmenu', currentSubCategoryType)
    // fetch form layout
    const formGeneratorLayoutOfSelectedTabAndType = await api.get(`form/readfile/mastertemplates/${currentSubCategoryTypePath}/${environment.professionalData}`)
    const response = await formGeneratorLayoutOfSelectedTabAndType.data
    setFormGeneratorLayoutOfSelectedTabAndType(response)

    // fetch user form data.
    const formProfessionData = await api.get(`userprofession/formdata/${userId}/${currentSubCategory}/${currentSubCategoryType}`)
    const loadDataFromBackend = await formProfessionData.data
    const dropDownValues = await retriveMovies()
    loadDataFromBackend.map((item) => {
      const movieForCastAndCrew = dropDownValues.find(moviesFk => moviesFk.id === item.movie_fk)
      Object.assign(item, { movie: movieForCastAndCrew });
    })
    loadDataFromBackend.forEach(arr1Obj => {
      const matchedObject = dropDownValues.find(arr2Obj => arr2Obj.id === arr1Obj.id);
      if (matchedObject) {
        Object.assign(arr1Obj, { movies: matchedObject });
      }
    })
    setFormUserProfessionData(loadDataFromBackend)
  }
  // vertical bar onclick
  const onClickOfSubCategoryType = async (selectedTab: string) => {
    const leftMenuContains = selectedTab.includes('Personnel Information') || selectedTab.includes('Biography') || selectedTab.includes('Social Media Links') || selectedTab.includes('KYC');
    if (!leftMenuContains && currentSubCategory === 'General') {
      renderTabsOfSelectedNodes = renderTabsOfSelectedNodes.filter(o => o.label !== currentSubCategory)
      if (renderTabsOfSelectedNodes.length === 0) {
        renderTabsOfSelectedNodes = displayTabs
        renderTabsOfSelectedNodes = renderTabsOfSelectedNodes.filter(o => o.label === currentSubCategory)
      }
      currentSubCategory = renderTabsOfSelectedNodes[0].label
    }
    if (leftMenuContains) {
      renderTabsOfSelectedNodes = displayTabs
      currentSubCategory = renderTabsOfSelectedNodes[0].label
    }
    setActive(selectedTab)
    localStorage.setItem('leftmenu', selectedTab)
    currentSubCategoryType = selectedTab
    setFormUserProfessionData([])
    await loadFormGeneratorAndUserProfessionData(currentSubCategory, currentSubCategoryType)
  }
  // horizontal bar on click
  const onClickOfSubCategoryTab = async (key: string) => {
    const title = getTitleFromTabs(key, renderTabsOfSelectedNodes)
    currentSubCategory = title
    const types = await loadSubCategoryTypes(currentSubCategory)
    currentSubCategoryType = types[0]
    setFormUserProfessionData([])
    await loadFormGeneratorAndUserProfessionData(currentSubCategory, currentSubCategoryType)
  }
  const handleChange = (e) => {
    setDropdownId(JSON.parse(e.target.value).id)
  };

  // on save should call post api
  const onClickOfSave = async (data, pk?) => {
    const subCategoryUserForm: ISubCategoryUserForm = {
      userId: userId,
      subCategory: currentSubCategory,
      subCategoryType: currentSubCategoryType,
      value: data,
      movieFk: Number(dropdownId)
    }
    if (pk) {
      subCategoryUserForm.id = pk
    }

    if (inputData.role === 'PENMAN') {
      subCategoryUserForm.status = 'APPROVED'
    }

    const responseOfCreatedData = await api.post('/userprofession/createform/formdata', subCategoryUserForm)
    const getIdOfCreatedSubCategoryForm = responseOfCreatedData.data
    const files = JSON.parse(localStorage.getItem('fileupload')!)
    if (files !== null) {
      if (files.length > 1) {
        for (let i = 0; i < files.length; i++) {
          await api.post('/fileupload/createfile', {
            fileName: files[i].filename,
            destination: files[i].destination,
            originalName: files[i].originalname,
            tableName: currentSubCategoryType,
            tableId: getIdOfCreatedSubCategoryForm.id
          })
        }
      } else {
        await api.post('/fileupload/createfile', {
          fileName: files.filename,
          destination: files.destination,
          originalName: files.originalname,
          tableName: currentSubCategoryType,
          tableId: getIdOfCreatedSubCategoryForm.id
        })
      }
    }
    localStorage.removeItem('fileupload');
  }

  const onClickOfAddNewMovie = async () => {
    setDropdownId('')
    await onClickOfSave([])
    await loadFormGeneratorAndUserProfessionData(currentSubCategory, currentSubCategoryType)
  }
  // Retrive Movies
  const retriveMovies = async () => {
    const movies = await api.get(`userprofession/movies/${userId}`)
    const response = await movies.data
    setFormValue(response)
    return response
  }

  return (
    <>
      <div className="">
        {inputData.profile === true ? <MyProfilePage /> : ''}
        <div className="row">
          <div className="col-sm-6 col-md-4 mt-5">
            {selectedMastersOfTheCurrentSubCategory.map((item, i) => {
              return (
                <div className="flex items-center justify-start mt-[10px] mx-auto w-[89%]">
                  <div onClick={() => onClickOfSubCategoryType(item)}
                    className={item === active ? 'bg-white_A700 border-4 border-amber_A400 border-solid flex flex-row gap-[25px] items-start justify-start p-[19px] rounded-[5px] w-full' : ' bg-white_A700 border border-solid flex flex-row gap-[25px] items-start justify-start p-[19px] rounded-[5px] w-full'}>
                    {item}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="col">
            <div className="row mt-5 tab-label">
            {currentSubCategoryType === 'Personnel Information' || currentSubCategoryType === 'Biography' || currentSubCategoryType === 'Social Media Links' || currentSubCategoryType === 'KYC'
              ? ' '
              : <div>
                    <Tabs defaultActiveKey="1" items={renderTabsOfSelectedNodes} onChange={onClickOfSubCategoryTab} />
                  </div>
              }
          </div>
          <div>
              {currentSubCategoryType.includes('Movie')
                ? <button onClick={onClickOfAddNewMovie} className='cursor-pointer add_new_movie mr-4'>+ Add New Movie</button>
                : ''}
          </div>
          <div>
              {currentSubCategoryType.includes('Crew')
                ? <button onClick={onClickOfAddNewMovie} className='cursor-pointer add_new_movie mr-4'>+ Add Crew</button>
                : ''}
          </div>
          <div>
              {currentSubCategoryType.includes('Cast')
                ? <button onClick={onClickOfAddNewMovie} className='cursor-pointer add_new_movie mr-4'>+ Add Cast</button>
                : ''}
          </div>
          <div>
              {currentSubCategoryType.includes('Workitem')
                ? <button onClick={onClickOfAddNewMovie} className='cursor-pointer add_new_movie mr-4'>+ Add</button>
                : ''}
          </div>
          <div>
            {formUserProfessionData.length && formGeneratorLayoutOfSelectedTabAndType.length > 0
              ? formUserProfessionData.map((record: any) => {
                return (
                <>
                      <div className='mt-8'>
                        <>
                        <Accordion defaultActiveKey="0">
                          {currentSubCategoryType.includes('Movie') && record.movies !== undefined
                            ? <Accordion.Header>{currentSubCategoryType}-{record.movies.value}</Accordion.Header>
                            : currentSubCategoryType === 'Cast' && record.movie !== undefined
                              ? <Accordion.Header>{currentSubCategoryType}-{record.movie.value}</Accordion.Header>
                              : currentSubCategoryType === 'Crew' && record.movie !== undefined
                                ? <Accordion.Header>{currentSubCategoryType}-{record.movie.value}</Accordion.Header>
                                : <Accordion.Header>{currentSubCategoryType}</Accordion.Header>}
                         <Accordion.Body>
                            <div>
                              {currentSubCategoryType === 'Cast' || currentSubCategoryType === 'Crew'
                                ? <div>
                                  <label className="form-label"><span>Select Movie</span></label>
                                  <select id="movie_dropdown" className="form-control" placeholder="Please select Movie" name='countryOfOrigin' onChange={handleChange} value={JSON.stringify(record.movie)}>
                                    {formValue.map(item => (
                                      <option key={item.value} value={JSON.stringify(item)}>
                                        {item.value}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                : ''
                              }
                            </div>
                          <ReactFormGenerator
                           back_action=""
                           form_action=""
                           answer_data={record.value}
                           form_method="POST"
                           data={formGeneratorLayoutOfSelectedTabAndType}
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
                           } />
                          </Accordion.Body>
                        </Accordion>
                        </>
                      </div>
                  </>
                )
              })
              : <div className='mt-6'>
                  {formGeneratorLayoutOfSelectedTabAndType.length > 0 &&
                    <>
                      <div>
                        {currentSubCategoryType === 'Cast' || currentSubCategoryType === 'Crew'
                          ? <div>
                            <label className="form-label"><span>Select Movie</span></label>
                            <select className="form-control" placeholder="Please select Movie" name='countryOfOrigin' onChange={handleChange}>
                              {formValue.map(item => (
                                <option key={item.value} value={JSON.stringify(item)}>
                                  {item.value}
                                </option>
                              ))}
                            </select>
                          </div>
                          : ''}
                      </div>
                      <ReactFormGenerator
                       back_action=""
                       form_action=""
                       form_method="POST"
                       data={formGeneratorLayoutOfSelectedTabAndType}
                       onSubmit={(data) => onClickOfSave(data)}
                       submitButton={
                       <div className="flex sm:flex-col flex-row font-poppins gap-[25px] items-center justify-end ml-auto w-[44%] md:w-full mr-4">
                        <button className="border border-gray_400 border-solid capitalize cursor-pointer font-semibold leading-[normal] min-w-[139px] py-[9px] rounded-[5px] sm:text-[17.62px] md:text-[19.62px] text-[21.62px] text-center text-indigo_900 tracking-[1.73px] w-auto">
                         Reset
                        </button>
                        <div className="flex items-center justify-center self-stretch w-auto">
                          <button className="border border-gray_400 border-solid capitalize cursor-pointer font-semibold leading-[normal] min-w-[139px] py-[9px] rounded-[5px] sm:text-[17.62px] md:text-[19.62px] text-[21.62px] text-center text-indigo_900 tracking-[1.73px] w-auto">
                           cancel
                          </button>
                        </div>
                        <button type="submit"
                        className="bg-red_A700 capitalize font-semibold justify-center pl-5 sm:pr-5 pr-8 py-[13px] rounded-[5px] sm:text-[17.62px] md:text-[19.62px] text-center text-white_A700 tracking-[1.73px] w-[113px] text-lg"
                        >
                        Save
                        </button>
                       </div>
                      } />
                    </>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
