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
     retrieveUserById(id)
  }, [])

  const retrieveSchemaForm = (language:string) => {
    api
    .get(`/form/${language}/adduserform`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSchemaFormData(response.data)
      });
  };

  const retrieveUIForm = (language:string) => {
    api
    .get(`/form/${language}/UIadduser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUIFormData(response.data)
      });
  };
  const retrieveUserById = (id:any) => {
    api
    .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setData(response.data)
      });
  };
  
  function handleCreateuser(){ 
    console.log(data)
    if(data.id == null){
    api
    .post("/users/createuser", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }
        if(data.id != null){
          api
          .put(`/users/updateuser/${id}`,data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
        }
        navigate("/user")
  }
 

  const renderers = [
    ...materialRenderers,
  ];

  return (
    <FormContainer onSubmit={handleCreateuser}>
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
        
        <Button type = 'submit'>Click to submit</Button>
    </FormContainer>
  );
};

export default Forms;
