/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-dupe-keys */
import * as React from 'react'
import { api } from '../../../services/api'
import { environment } from '../../../config/environment'
import { useEffect, useState } from 'react'
import AdminHeader from '../../../components/AdminHeader'
import { useNavigate } from 'react-router-dom'
import { EditableAntdTree, EditableAntdTreeNode } from '../../../components/Editablantd/EditableAntdTree'
import { v4 as uuidv4 } from 'uuid'
// import "editable-antd-tree/dist/esm/output.css";

const ProfessionalTree = () => {
  const [lablePath, setLablePath] = useState('')
  const [lable, setLable] = useState('')
  const [industryCategoryList, setIndustryCategoryList] = useState<EditableAntdTreeNode[]>([])
  const navigate = useNavigate()
  useEffect(() => {
    retrieveProfessionalList()
  }, [])

  const retrieveProfessionalList = async () => {
    const mainLabel = localStorage.getItem('selectedLabel') || ''
    setLable(mainLabel)
    const newLabelPath = mainLabel.replace(/\s+/g, '').toLowerCase()
    const mainLablePath = newLabelPath.replace('/', '').toLocaleLowerCase()
    setLablePath(mainLablePath)

    const response = await api.get(
      `form/${mainLablePath}/${environment.professionalData}`)
    const temp = await response.data
    if (temp.error !== 'FILE_NOT_FOUND') {
      setIndustryCategoryList(temp)
    } else {
      setIndustryCategoryList([
        {
          key: uuidv4(),
          title: mainLabel,
          isLeaf: false,
          children: []
        }
      ])
    }
  }

  const saveProfessional = () => {
    api.post(`form/${lablePath}/${environment.professionalData}`, industryCategoryList)
  }

  function onClickCancel () {
    navigate('/admin/professionalListing')
  }

  return (
    <>
      <AdminHeader />
      <h1 className="title">{lable}</h1>
      <br />
      <div>
      {industryCategoryList.length > 0 &&
        <div >
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
