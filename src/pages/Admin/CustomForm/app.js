/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react'
import { ReactFormBuilder, Registry } from 'react-form-builder2'
import Demobar from './demobar'
import { environment } from '../../../config/environment'
import { api } from '../../../services/api'
import ImageUpload from '../../../components/FIleUpload/fileUpload'

const TestComponent = () => {
  return <><div className='form-control'>
<div className="row">
  <div className="col-8">
    <label className="btn btn-default p-0">
      <input type="file" accept="image/*"/>
    </label>
  </div>

  <div className="col-4">
    <button
      className="btn btn-success btn-sm"
    >
      Upload
    </button>
  </div>
</div>
</div></>
}
const MyInput = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props
  return <input ref={ref} name={name} defaultValue={defaultValue} disabled={disabled} />
})

Registry.register('MyInput', MyInput)
Registry.register('TestComponent', TestComponent)
Registry.register('FileUpload', ImageUpload)
const items = [{
  key: 'Header'
}, {
  key: 'TextInput'
}, {
  key: 'TextArea'
}, {
  key: 'RadioButtons'
}, {
  key: 'Checkboxes'
}, {
  key: 'Image'
},
{
  group_name: 'Movie Form',
  element: 'Dropdown',
  field_name: 'movie_dropdown',
  name: 'Dropdown',
  label: 'Movie Dropdown'
},
{
  group_name: 'Movie Form',
  element: 'TextInput',
  field_name: 'movie_name',
  name: 'MovieName',
  label: 'Movie Name'
},
{
  group_name: 'Movie Form',
  element: 'TextInput',
  field_name: 'actor_name',
  name: 'ActorName',
  label: 'Actor Name'
},
{
  group_name: 'Movie Form',
  element: 'TextInput',
  field_name: 'director_name',
  name: 'DirectorName',
  label: 'Director Name'
},
{
  group_name: 'Movie Form',
  key: 'FileUpload',
  element: 'CustomElement',
  component: ImageUpload,
  type: 'custom',
  field_name: 'image_component',
  name: 'MovieImage',
  icon: 'fa fa-file',
  label: 'Movie Image Upload'
}
]
let jsonData = []
export class CustomForm extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.onLoad()
  }

  onLoad = async () => {
    const masterFormLabelName = localStorage.getItem('masterFormslabel')
    const masterForm = await api.get(
      `form/readfile/${environment.masterFormPath}/${masterFormLabelName}/${environment.professionalData}`
    )
    jsonData = masterForm.data
    return jsonData
  }

  render () {
    return (
      <div className="App">
        <Demobar />
        <ReactFormBuilder
          onLoad={this.onLoad}
          toolbarItems={items}
        />,
      </div>
    )
  }
}
