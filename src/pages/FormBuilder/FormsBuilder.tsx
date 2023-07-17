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
import ImageUpload from '../../components/FIleUpload/fileUpload'
import MultipleUploads from '../../components/MultipleFileUpload/multiplefileupload'

let jsonData: any = []
type Props = {};

class FormsBuilder extends Component<Props> {
  constructor (props: Props) {
    super(props)
  }

  componentDidMount () {
    this.onLoad()
  }

  items = [{
    key: 'Header',
    canHaveAnswer: true,
    name: 'Header-text',
    icon: 'fas fa-heading',
    static: true,
    content: 'Header'
  },
  {
    key: 'Label',
    name: 'Label',
    static: true,
    icon: 'fas fa-font',
    content: ''
  },
  {
    key: 'Paragraph',
    label: 'Paragraph',
    name: 'Paragraph',
    static: true,
    icon: 'fas fa-paragraph',
    content: ''
  },
  {
    key: 'LineBreak',
    name: 'Line-Break',
    static: true,
    icon: 'fas fa-arrows-alt-h',
    content: ''
  },
  {
    key: 'Dropdown',
    canHaveAnswer: true,
    name: 'Dropdown',
    icon: 'far fa-caret-square-down',
    label: 'Dropdown',
    field_name: 'dropdown_',
    options: [],
    static: true,
    content: ''
  },
  {
    key: 'Tags',
    canHaveAnswer: true,
    name: 'Tags',
    icon: 'fas fa-tags',
    label: 'Tags',
    field_name: 'tags_',
    options: [],
    static: true,
    content: ''
  },
  {
    key: 'PhoneNumber',
    canHaveAnswer: true,
    name: 'PhoneNumber',
    label: 'PhoneNumber',
    icon: 'fas fa-phone',
    field_name: 'phone_input_',
    static: true,
    content: ''
  },
  {
    key: 'EmailInput',
    canHaveAnswer: true,
    name: 'E-mail',
    label: 'E-mail',
    icon: 'fas fa-envelope',
    field_name: 'email_input_',
    static: true,
    content: ''
  },
  {
    key: 'Checkboxes',
    canHaveAnswer: true,
    name: 'Checkboxes',
    icon: 'far fa-check-square',
    label: 'Checkboxes',
    field_name: 'checkboxes_',
    options: [],
    static: true,
    content: ''
  },
  {
    key: 'RadioButtons',
    canHaveAnswer: true,
    name: 'Multiple-choice',
    icon: 'far fa-dot-circle',
    label: 'RadioButtons',
    field_name: 'radiobuttons_',
    options: [],
    static: true,
    content: ''
  },
  {
    key: 'TextInput',
    canHaveAnswer: true,
    name: 'TextInput',
    label: 'TextInput',
    icon: 'fas fa-font',
    field_name: 'text_input_',
    static: true,
    content: ''
  },
  {
    key: 'Number',
    canHaveAnswer: true,
    name: 'Number',
    label: 'Number',
    icon: 'fas fa-plus',
    field_name: 'number_input_',
    static: true,
    content: ''
  },
  {
    key: 'TextArea',
    canHaveAnswer: true,
    name: 'Multi-line-input',
    label: 'place-holder-label',
    icon: 'fas fa-text-height',
    field_name: 'text_area_',
    static: true,
    content: ''
  },
  {
    key: 'TwoColumnRow',
    canHaveAnswer: false,
    name: 'Two-columns-row',
    label: 'Two-columns-row',
    icon: 'fas fa-columns',
    field_name: 'two_col_row_',
    static: true,
    content: ''
  },
  {
    key: 'DatePicker',
    canDefaultToday: true,
    canReadOnly: true,
    dateFormat: 'yyyy/MM/dd',
    showTimeSelect: false,
    showTimeSelectOnly: false,
    showTimeInput: false,
    name: 'Date',
    icon: 'far fa-calendar-alt',
    label: 'Date',
    field_name: 'date_picker_',
    static: true,
    content: ''
  },
  {
    key: 'FileUpload',
    element: 'CustomElement',
    component: ImageUpload,
    type: 'custom',
    field_name: 'image_component',
    name: 'FileUpload',
    icon: 'fas fa-file',
    label: 'Image Upload',
    static: true,
    content: ''
  },
  {
    key: 'FileUpload',
    element: 'CustomElement',
    component: MultipleUploads,
    type: 'custom',
    field_name: 'multiple_component',
    name: 'multipleImage',
    icon: 'fas fa-file',
    label: 'Multiple File Upload',
    static: true,
    content: ''
  },
  {
    key: 'ThreeColumnRow',
    canHaveAnswer: false,
    name: 'ThreeColumnRow',
    label: 'ThreeColumnRow',
    icon: 'fas fa-columns',
    field_name: 'three_col_row_',
    static: true,
    content: ''
  }
  ]

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
        <ReactFormBuilder onLoad={this.onLoad} toolbarItems={this.items}/>,
      </div>
    )
  }
}

export default FormsBuilder
