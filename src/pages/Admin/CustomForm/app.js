/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react'
import { ReactFormBuilder, ElementStore, Registry } from 'react-form-builder2'
import Demobar from './demobar'
const getUrl = (cid) => `https://safe-springs-35306.herokuapp.com/api/formdata?cid=${cid}`

const TestComponent = () => <h2>Hello</h2>

const MyInput = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props
  return <input ref={ref} name={name} defaultValue={defaultValue} disabled={disabled} />
})
Registry.register('MyInput', MyInput)
Registry.register('TestComponent', TestComponent)

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
  key: 'TestComponent',
  element: 'TwoColumnRow',
  component: MyInput,
  type: 'custom',
  field_name: 'movie_input',
  name: 'Movie Form',
  static: true,
  props: { test: 'test_comp' },
  label: 'Movie Inputs'
},
{
  group_name: 'Movie Form',
  element: 'Dropdown',
  field_name: 'movie_dropdown',
  name: 'Dropdown',
  label: 'Movie Dropdown'
}
]
export class CustomForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { formId: '1' }
    this.formId = this.state.formId
    this.handleChange = this.handleChange.bind(this)
  }

  formId

  handleChange (event) {
    this.formId = event.target.value
    const url = getUrl(this.formId)
    console.log('handleChange', url)
    ElementStore.dispatch('load', { loadUrl: url })
    this.setState({ formId: this.formId })
  }

  onLoad = () => {
    const url = getUrl(this.formId)
    console.log('onLoad', url)
    // return get(url)
  }

  onPost = (data) => {
    const saveUrl = getUrl(this.formId)
    console.log('onPost', saveUrl, data)
    // post(saveUrl, data)
  }

  render () {
    return (
        <div className="App">
          <Demobar />
          <ReactFormBuilder
            // onLoad={this.onLoad}
            // onPost={this.onPost}
            toolbarItems={items}
          />,
        </div>
    )
  }
}
