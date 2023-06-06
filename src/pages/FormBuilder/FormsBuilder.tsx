/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
import React, { Component } from 'react'
import { ReactFormBuilder } from 'react-form-builder2'
import Demobar from './demobar'
import './form.css'
import { api } from '../../services/api'
import { environment } from '../../config/environment'
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminHeader from '../../components/AdminHeader'
import 'font-awesome/css/font-awesome.min.css'
import { removeSpaceAndSpecialCharacters } from '../../services/filmservices'
let jsonData: any = []

type Props = {};

class FormsBuilder extends Component<Props> {
  constructor (props: Props) {
    super(props)
  }

  componentDidMount () {
    this.onLoad()
  }

  onLoad = async () => {
    const labelname = localStorage.getItem('selectedLabel')
    const masterFormLabelName = localStorage.getItem('masterFormslabel')
    if (labelname) {
      const labelpath = await removeSpaceAndSpecialCharacters(labelname)
      const buildeResponse = await api.get(
        `form/readfile/${environment.formLayoutPath}/${labelpath}/${environment.professionalData}`
      )
      jsonData = buildeResponse.data
    } else {
      const masterForm = await api.get(
        `form/readfile/${environment.masterFormPath}/${masterFormLabelName}/${environment.professionalData}`
      )
      jsonData = masterForm.data
    }
    return jsonData
  }

  render () {
    return (
      <div className="App">
        <AdminHeader />
        <Demobar/>
        <ReactFormBuilder onLoad={this.onLoad}/>,
      </div>
    )
  }
}

export default FormsBuilder
