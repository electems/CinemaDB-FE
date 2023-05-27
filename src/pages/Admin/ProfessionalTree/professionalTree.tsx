/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-dupe-keys */
import * as React from 'react'
import { api } from '../../../services/api'
import { environment } from '../../../config/environment'
import { useEffect, useState } from 'react'
import AdminHeader from '../../../components/AdminHeader'
import { useLocation, useNavigate } from 'react-router-dom'
import { EditableAntdTree, EditableAntdTreeNode } from '../../../components/editablantd/editableAntdTree'
import { v4 as uuidv4 } from 'uuid'
import { removeSpaceAndSpecialCharacters } from '../../../services/filmservices'
interface inputTitle {
  titlePath: string
}
const ProfessionalTree = () => {
  const [lablePath, setLablePath] = useState('')
  const [lable, setLable] = useState('')
  const titleLabel = (useLocation().state as inputTitle).titlePath
  const [industryCategoryList, setIndustryCategoryList] = useState<EditableAntdTreeNode[]>([])
  const navigate = useNavigate()
  useEffect(() => {
    retrieveProfessionalList()
  }, [])

  const retrieveProfessionalList = async () => {
    console.log(titleLabel)
    setLable(titleLabel)
    const labelPath = await removeSpaceAndSpecialCharacters(titleLabel)
    setLablePath(labelPath)

    const response = await api.get(
      `form/${labelPath}/${environment.professionalData}`)
    const temp = await response.data
    if (temp.error !== 'FILE_NOT_FOUND') {
      setIndustryCategoryList(temp)
    } else {
      setIndustryCategoryList([
        {
          key: uuidv4(),
          title: titleLabel,
          isLeaf: false,
          children: []
        }
      ])
    }
  }

  const saveProfessional = () => {
    api.post(`form/${lablePath}/${environment.professionalData}`, industryCategoryList)
    api.delete(`form/deletedirectory${environment.formLayoutPath}/${lablePath}`)
  }

  function onClickCancel() {
    navigate('/admin/professionalListing')
  }

  return (
    <>
      <AdminHeader />
      <h1 className="title text-center pt-3">{lable}</h1>
      <br />
      <div>
        {industryCategoryList.length > 0 &&
          <div id='industry_lists'>
            <EditableAntdTree source="level2" size="md" treeData={industryCategoryList}
            />
          </div>
        }
        <button
          className="btn btn-success mr-4"
          onClick={() => saveProfessional()}
          type="submit"
        >
          Save
        </button>
        <button
          id="profcancle"
          className="btn btn-danger"
          type="submit"
          onClick={() => onClickCancel()}
        >
          Cancle
        </button>
      </div>
    </>
  )
}
export default ProfessionalTree
