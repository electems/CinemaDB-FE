/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from 'react'
import { ReactFormGenerator, ElementStore } from 'react-form-builder2'
import './form.css'
import { api } from '../../services/api'
import { environment } from '../../config/environment'
import { removeSpaceAndSpecialCharacters, errorToastify } from '../../services/filmservices'
let jsondata = []
let labelName = ''
let masterLabelFormLabel = ''
export default class Demobar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false
    }

    this._onUpdate = this._onChange.bind(this)
  }

  componentDidMount () {
    ElementStore.subscribe((state) => this._onUpdate(state.data))
    labelName = localStorage.getItem('selectedLabel')
    masterLabelFormLabel = localStorage.getItem('masterFormslabel')
    this.retriveForms()
  }

  showPreview () {
    this.setState({
      previewVisible: true
    })
  }

  showShortPreview () {
    this.setState({
      shortPreviewVisible: true
    })
  }

  showRoPreview () {
    this.setState({
      roPreviewVisible: true
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

  async retriveForms () {
    if (labelName) {
      const labelpath = await removeSpaceAndSpecialCharacters(labelName)
      const response = await api.get(
        `form/readfile/${environment.formLayoutPath}/${labelpath}/${environment.professionalData}`
      )
      if (response.data === 'FILE_NOT_FOUND') {
        await errorToastify('Form Not Found for ' + labelpath)
      } else {
        jsondata = response.data
      }
    } else if (masterLabelFormLabel) {
      const masterForm = await api.get(
        `form/readfile/${environment.masterFormPath}/${masterLabelFormLabel}/${environment.professionalData}`
      )
      if (masterForm.data === 'FILE_NOT_FOUND') {
        await errorToastify('Form Not Found for ' + masterLabelFormLabel)
      } else {
        jsondata = masterForm.data
      }
    }
  }

  async _onSubmit () {
    const data = jsondata
    if (labelName) {
      const labelPath = await removeSpaceAndSpecialCharacters(labelName)
      await api.post(
        `form/writefile/${environment.formLayoutPath}/${labelPath}/${environment.professionalData}`,
        data
      )
      await api.delete(`form/deletedirectory/${labelPath}`)
      localStorage.removeItem('selectedLabel');
      window.location.href = '/admin/professionallisting'
    } else if (masterLabelFormLabel) {
      await api.post(
        `form/writefile/${environment.masterFormPath}/${masterLabelFormLabel}/${environment.professionalData}`,
        data
      )
      localStorage.removeItem('masterFormslabel');
      window.location.href = '/admin/masterforms'
    }
  }

  onGoBackPrevious () {
    if (labelName) {
      localStorage.removeItem('selectedLabel');
      window.location.href = '/admin/professionallisting'
    } else if (masterLabelFormLabel) {
      localStorage.removeItem('masterFormslabel');
      window.location.href = '/admin/masterforms'
    }
  }

  render () {
    let modalClass = 'modal'
    if (this.state.previewVisible) {
      modalClass += ' show d-block'
    }

    return (
      <div className="clearfix" style={{ margin: '25px', width: '70%' }}>
        <h4 className="float-left">Build Forms</h4>
        <button
          className="btn btn-primary float-right"
          style={{ marginRight: '25px' }}
          onClick={this.showPreview.bind(this)}
        >
          Preview Form
        </button>
        <button
          className="btn btn-primary float-right"
          style={{ marginRight: '25px' }}
          onClick={this.onGoBackPrevious}
        >
          Go Back To Previous Page
        </button>

        {this.state.previewVisible && (
          <div className={modalClass}>
            <div className="modal-dialog">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path="src/download"
                  action_name="Save"
                  form_action="/"
                  answer_data={{ jsondata }}
                  form_method="POST"
                  onSubmit={this._onSubmit}
                  data={jsondata}
                />

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
