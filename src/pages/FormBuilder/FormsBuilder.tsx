import React, { Component } from 'react'
import { ReactFormBuilder, ElementStore } from 'react-form-builder2'
import Demobar from './demobar'
import { get } from './request.js'
import { variable } from './variables'
import './form.css'
import { api } from '../../services/api'
import { environment } from '../../config/environment'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserHeader from '../../components/UserHeader'
import 'font-awesome/css/font-awesome.min.css'
const getUrl = (cid: string) =>
  `https://safe-springs-35306.herokuapp.com/api/formdata?cid=${cid}`
const labelName = localStorage.getItem('formlabelname')
let jsonData = []

type Props = {};

type State = {
  formId: string;
};
class FormsBuilder extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = { formId: '1' }
    this.formId = this.state.formId
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount (): void {
    this.retriveForms()
    this.onLoad()
  }

  formId = ''

  handleChange (event: { target: { value: string } }) {
    this.formId = event.target.value
    const url = getUrl(this.formId)
    console.log('handleChange', url)
    ElementStore.dispatch('load', { loadUrl: url })
    this.setState({ formId: this.formId })
  }

  async retriveForms () {
    const response = await api.get(
      `form/readfile/${environment.formLayoutPath}/${labelName}/${environment.professionalData}`
    )
    jsonData = response.data
    console.log(jsonData)
  }

  onLoad = () => {
    const url = `form/readfile/${environment.formLayoutPath}/${labelName}/${environment.professionalData}`
    console.log('onLoad', url)
    return get(url)
  }

  render () {
    return (
      <div className="App">
        <UserHeader />
        <Demobar variables={variable} />
        <ReactFormBuilder url="./editor.json" onLoad={this.onLoad} />,
      </div>
    )
  }
}

export default FormsBuilder
