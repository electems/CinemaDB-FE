/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect } from 'react'

import AdminHeader from '../../../components/AdminHeader'
import { api } from '../../../services/api'
import { environment } from '../../../config/environment'
import { EditableAntdTree, EditableAntdTreeNode } from '../../../components/editablantd/EditableAntdTree'

const ProfessionalListing: React.FC = () => {
  const [industrySelectionList, setIndustrySelectionList] = React.useState<EditableAntdTreeNode[]>([])

  useEffect(() => {
    retrieveMainProfessional()
    console.log(industrySelectionList)
  }, [])

  const retrieveMainProfessional = async () => {
    const response = await api.get(
      `auth/${environment.mainProfessionalPath}/${environment.professionalData}`)

    const data = await response.data
    const temp: EditableAntdTreeNode[] = []

    for (let i = 0; i < 200; i++) {
      if (data[i] !== undefined) {
        temp.push(data[i])
      } else {
        break
      }
    }
    setIndustrySelectionList(temp)
  }

  return (
    <>
      <AdminHeader />
      <h3 id="professionalList" className="title text-center pt-3">
        Core Professional List
      </h3>
      <div className="container">
      </div>
      {industrySelectionList.length > 0 &&
        <div >
          <EditableAntdTree source="level1" size="md" treeData={industrySelectionList} />
        </div>
      }
    </>
  )
}

export default ProfessionalListing
