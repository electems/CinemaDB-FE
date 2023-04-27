/* eslint-disable object-curly-spacing */
/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react'
import { api } from '../../../../services/api'
import './style.css'
import { Button } from '../../../../components/Elements'
import { useNavigate } from 'react-router-dom'
import { environment } from '../../../../config/environment'
import { Tree } from 'antd'
import { storage } from '../../../../storage/storage'
import { Key } from 'antd/es/table/interface'
import { DataNode } from 'antd/es/tree'
import RegistrationHeader from '../../../../components/RegisterationHeader/registrationheader'

export const FilmPersonRegister: React.FC = () => {
  const [mainProfessional, setMainProfessional] = React.useState([])
  const [lablePath, setLablePath] = useState('')
  const [selectedNodes, setSelectedNodes] = React.useState<any[]>([])
  const [breadCrumPathList, setBreadCrumPathList] = React.useState<string[]>([])
  const [previouslySelectedIndustries, setPreviouslySelectedIndustries] = React.useState<Key[]>([])

  const navigate = useNavigate()

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

  const getParentKey = (key, tree) => {
    let parentKey
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          const matchedNode = node.children.find(element => element.key === key)
          parentKey = matchedNode.title
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children)
        }
      }
    }
    return parentKey
  }

  const getParentKeyInRootNodes = (key, tree) => {
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.key === key) {
        return node.title
      }
    }
  }

  const onCheck = (selectedRow, selected) => {
    setSelectedNodes(selected.checkedNodes)

    let breadCrumPath = ''
    for (let i = selected.halfCheckedKeys.length - 1; i >= 0; i--) {
      const key = selected.halfCheckedKeys[i]
      let title = getParentKey(key, mainProfessional)

      if (!title) {
        title = getParentKeyInRootNodes(key, mainProfessional)
      }

      breadCrumPath += title + ' > '
    }

    setBreadCrumPathList((breadCrumPathList) => [
        ...breadCrumPathList, breadCrumPath
      ])
  }

  const retrieveProfessionalList = async () => {
    const mainLabel = localStorage.getItem('professionalLable') || ''
    const newLabelPath = mainLabel.replace(/\s+/g, '').toLowerCase()
    const mainLablePath = newLabelPath.replace('/', '').toLocaleLowerCase()
    setLablePath(lablePath)

    const response = await api.get(
      `form/${mainLablePath}/${environment.professionalData}`
    )
    setMainProfessional(response.data)
  }

  const saveUserIndustrySelect = async () => {
     navigate('/film/register/selectedindustry', { state: {selectedNodes, breadCrumPathList}})
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
