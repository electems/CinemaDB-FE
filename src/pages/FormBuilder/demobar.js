/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { ReactFormGenerator, ElementStore } from "react-form-builder2";
import "./form.css";
import { api } from "../../services/api";
import { environment } from "../../config/environment";
let jsondata = [];
const labelName = localStorage.getItem("formlabelname");
export default class Demobar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    };

    this._onUpdate = this._onChange.bind(this);
  }

  componentDidMount() {
    ElementStore.subscribe((state) => this._onUpdate(state.data));
    this.retriveForms();
  }

  showPreview() {
    this.setState({
      previewVisible: true,
    });
  }

  showShortPreview() {
    this.setState({
      shortPreviewVisible: true,
    });
  }

  showRoPreview() {
    this.setState({
      roPreviewVisible: true,
    });
  }

  closePreview() {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    });
  }

  _onChange(data) {
    this.setState({
      data,
    });
    jsondata = data;
  }

  async retriveForms() {
    let response = await api.get(
      `form/readfile/${environment.formLayoutPath}/${labelName}/${environment.professionalData}`
    );
    jsondata = response.data;
  }

  _onSubmit() {
    const data = jsondata;
    console.log(data);
    api.post(
      `form/writefile/${environment.formLayoutPath}/${labelName}/${environment.professionalData}`,
      data
    );
    this.props.history.push("/admin/formlisitng");
  }
  render() {
    let modalClass = "modal";
    if (this.state.previewVisible) {
      modalClass += " show d-block";
    }

    let shortModalClass = "modal short-modal";
    if (this.state.shortPreviewVisible) {
      shortModalClass += " show d-block";
    }

    let roModalClass = "modal ro-modal";
    if (this.state.roPreviewVisible) {
      roModalClass += " show d-block";
    }

    return (
      <div className="clearfix" style={{ margin: "20px", width: "70%" }}>
        <h4 className="float-left">Preview</h4>
        <button
          className="btn btn-primary float-right"
          style={{ marginRight: "10px" }}
          onClick={this.showPreview.bind(this)}
        >
          Preview Form
        </button>
        <button
          className="btn btn-default float-right"
          style={{ marginRight: "10px" }}
          onClick={this.showShortPreview.bind(this)}
        >
          Alternate/Short Form
        </button>
        <button
          className="btn btn-default float-right"
          style={{ marginRight: "10px" }}
          onClick={this.showRoPreview.bind(this)}
        >
          Read Only Form
        </button>

        {this.state.previewVisible && (
          <div className={modalClass}>
            <div className="modal-dialog">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path="src/download"
                  back_action="/"
                  back_name="Back"
                  action_name="Save"
                  form_action="/"
                  answer_data={{ jsondata }}
                  form_method="POST"
                  onSubmit={this._onSubmit}
                  variables={this.props.variables}
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

        {this.state.roPreviewVisible && (
          <div className={roModalClass}>
            <div className="modal-dialog">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name="Back"
                  answer_data={{ jsondata }}
                  action_name="Save"
                  form_action="/"
                  form_method="POST"
                  read_only={true}
                  variables={this.props.variables}
                  hide_actions={true}
                  data={this.state.data}
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

        {this.state.shortPreviewVisible && (
          <div className={shortModalClass}>
            <div className="modal-dialog">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  back_action=""
                  answer_data={{ jsondata }}
                  form_action="/"
                  form_method="POST"
                  data={this.state.data}
                  display_short={true}
                  variables={this.props.variables}
                  hide_actions={false}
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
    );
  }
}
