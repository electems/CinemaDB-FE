/* eslint-disable eqeqeq */
import React, { useState, useEffect, useCallback } from 'react'

import { JsonForms } from '@jsonforms/react'

import {
  materialCells,
  materialRenderers
} from '@jsonforms/material-renderers'
import { api } from '../../../services/api'
import { FormContainer } from '../../../styles/global'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AdminHeader from '../../../components/AdminHeader'

interface FolderName {
  folderName: string
}

const AddEditForms: React.FC = () => {
  const [data, setData] = useState<any>({})
  const [schema, setSchemaFormData] = useState<any>()
  const [uischema, setUIFormData] = useState<any>()
  const { id } = useParams()
  const navigate = useNavigate()
  const folderName = (useLocation().state as FolderName).folderName

  useEffect(() => {
    retrieveSchemaForm(folderName)
    retrieveUIForm(folderName)
    retrieveUserById()
  }, [])

  const retrieveSchemaForm = async (folderName:string) => {
    const res = await api.get(`/auth/${folderName}/adduserform`)
    setSchemaFormData(res.data)
  }

  const retrieveUIForm = async (folderName:string) => {
    const res = await api.get(`/auth/${folderName}/UIadduser`)
    setUIFormData(res.data)
  }

  const retrieveUserById = async () => {
    if (id != undefined) {
      const res = await api.get(`/users/user/${id}`)
      const response = await res.data
      setData(response)
    }
  }
  /**
   * Pure componeents in react are components that only re-render when their props or state changed
   * In modern we can achieve the same optimization using React.memo higher-order component or the useMemo
   hook for functional components.
  */

  const handleCreateandUpdateuser = useCallback(() => {
    if (data.id == null) {
      api.post('/auth/createuser', data);
    } else {
      api.put(`/auth/updateuser/${id}`, data);
    }
  }, [data]);

  function handleSaveuser () {
    handleCreateandUpdateuser()
    navigate('/admin/userListing')
  }

  function onClickCancel () {
    navigate('/admin/userListing')
  }

  const renderers = [
    ...materialRenderers
  ]

  return (
    <>
    <AdminHeader/>
    <FormContainer onSubmit={handleSaveuser}>
        <h1>User form</h1>
        {
          <div>
            <JsonForms
              schema={schema}
              uischema={uischema}
              renderers={renderers}
              data={data}
              cells={materialCells}
              onChange={({ errors, data }) => setData(data)}
            />
          </div>
        }
  <div className="row">
    <div className= "col-md-6">
    <button id="saveUser" className="btn btn-success mr-4 ">Save</button>
    </div>
    <div className= "col-md-6">
    <button id="cancle" className="btn btn-danger " onClick={onClickCancel}>Cancel</button>
    </div>
</div>
</FormContainer>
</>)
}

export default AddEditForms
