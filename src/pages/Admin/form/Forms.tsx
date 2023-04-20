import { Fragment, useState, useMemo } from 'react';
import React, { useEffect } from "react";
import { JsonForms } from '@jsonforms/react';

import './Forms.css';
// import uischema from './uischema.json';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import { api } from '../../../services/api';
import { Button } from '../../../components/Elements';
import { FormContainer } from '../../../styles/global';
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import UserHeader from '../../../components/UserHeader';



const Forms = () => {
  const [data, setData] = useState<any>({});
  const [schema, setSchemaFormData] = useState<any>();
  const [uischema, setUIFormData] = useState<any>();
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);
  const token = localStorage.getItem("@cinimaDb:Token");
  const { id } = useParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    retrieveSchemaForm("EN");
    retrieveUIForm("En")
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
    let res =await api.get(`/users/${id}`);
    setData(res.data)
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
    navigate("/admin/user")
    // window.location.reload()
  }

  function onClickCancle(){
    navigate("/admin/user")
  }
 

  const renderers = [
    ...materialRenderers,
  ];

  return (
    <>
    <UserHeader/>
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
        {/* <div id="button" className="w3-show-inline-block">
           <div className="w3-bar">
            <button id="saveUser" className="btn btn-success mr-4">Save</button>
             <button id="cancle" className="btn btn-danger" onClick={onClickCancle}>Cancel</button>
          </div>
  </div> */}

  <div  className="row">
    <div className= "col-md-6">
    <button id="saveUser" className="btn btn-success mr-4 ">Save</button>
    </div>
    <div className= "col-md-6">
    <button id="cancle" className="btn btn-danger " onClick={onClickCancle}>Cancel</button>
    </div>  
</div>

    </FormContainer>
    </>
  );
};

export default Forms;
