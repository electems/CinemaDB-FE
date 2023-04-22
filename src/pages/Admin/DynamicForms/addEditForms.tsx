import { useState, useMemo } from 'react';
import { useEffect } from "react";
import { JsonForms } from '@jsonforms/react';
// import uischema from './uischema.json';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import { api } from '../../../services/api';
import { FormContainer } from '../../../styles/global';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AdminHeader from '../../../components/AdminHeader';

interface FolderName {
  folderName: string
}

const AddEditForms = () => {
  const [data, setData] = useState<any>({});
  const [schema, setSchemaFormData] = useState<any>();
  const [uischema, setUIFormData] = useState<any>();
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);
  const { id } = useParams()
  const navigate = useNavigate()
  let location = useLocation().state as FolderName;
  const folderName = localStorage.getItem("folderName")as string ;

  
  useEffect(() => {
    retrieveSchemaForm(folderName);
    retrieveUIForm(folderName)
     retrieveUserById()
  }, [])

  const retrieveSchemaForm  = async (language:string) => {
    let res =await api.get(`/form/${language}/adduserform`);
    setSchemaFormData(res.data)
  };

  const retrieveUIForm = async (language:string) => {
    let res =await api.get(`/form/${language}/UIadduser`);
    setUIFormData(res.data)
  };

  const retrieveUserById = async () => {
    if(id != undefined){
      let res =await api.get(`/users/${id}`);
      setData(res.data)
    }    
  };

  
  const handleCreateandUpdateuser = async () =>{ 
    if(data.id == null){
        await api
          .post("/users/createuser", data)
          }
            else{
                await api
                .put(`/users/updateuser/${id}`,data)  
              }     
      }
  function handleSaveuser (){
    handleCreateandUpdateuser()
    navigate("/admin/userListing")
  }

  function onClickCancle(){
    navigate("/admin/userListing")
  }
 
  const renderers = [
    ...materialRenderers,
  ];

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
  <div  className="row">
    <div className= "col-md-6">
    <button id="saveUser" className="btn btn-success mr-4 ">Save</button>
    </div>
    <div className= "col-md-6">
    <button id="cancle" className="btn btn-danger " onClick={onClickCancle}>Cancel</button>
    </div>  
</div>
</FormContainer>
</> );
};

export default AddEditForms;
