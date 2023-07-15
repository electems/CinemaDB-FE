/* eslint-disable no-undef */
import React from 'react'
import { ReactFormGenerator, ElementStore } from 'react-form-builder2'
import { environment } from '../../../config/environment'
import { api } from '../../../services/api'
import './customform.css'
let jsondata = []
let masterLabelFormLabel = ''
export default class Demobar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      closePreview: false,
      shortPreviewVisible: false,
      roPreviewVisible: false
    }

    this._onUpdate = this._onChange.bind(this)
  }

  componentDidMount () {
    ElementStore.subscribe(state => this._onUpdate(state.data))
    masterLabelFormLabel = localStorage.getItem('masterFormslabel')
    this.retriveForms()
  }

  showPreview () {
    this.setState({
      previewVisible: true
    })
  }

  closePreview () {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false
    })
  }

  _onChange (data) {
    this.setState({
      data
    })
    jsondata = data
  }

  async _onSubmit () {
    const data = jsondata
    await api.post(
      `form/writefile/${environment.masterFormPath}/${masterLabelFormLabel}/${environment.professionalData}`,
      data
    )
    window.location.href = '/admin/masterforms'
  }

  async retriveForms () {
    const response = await api.get(
      `form/readfile/${environment.masterFormPath}/${masterLabelFormLabel}/${environment.professionalData}`
    )
    jsondata = response.data
  }

  onGoBackPrevious () {
    // eslint-disable-next-line no-undef
    localStorage.removeItem('masterFormslabel');
    window.location.href = '/admin/masterforms'
  }

  render () {
    let modalClass = 'modal'
    if (this.state.previewVisible) {
      modalClass += ' show d-block'
    }

    return (
      <div className="clearfix" style={{ margin: '10px', width: '70%' }}>
        <h4 className="float-left">Build Movie Form</h4>
        <button className="btn btn-primary float-right" style={{ marginRight: '10px' }} onClick={this.showPreview.bind(this)}>Preview Form</button>
        <button
          className="btn btn-primary float-right"
          style={{ marginRight: '25px' }}
          onClick={this.onGoBackPrevious}
        >
          Go Back To Previous Page
        </button>

        {this.state.previewVisible &&
          <div className={modalClass} role="dialog">
            <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  answer_data={{ jsondata }}
                  action_name="Save"
                  form_action="/"
                  form_method="POST"
                  onSubmit={this._onSubmit}
                  data={jsondata} />

                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
