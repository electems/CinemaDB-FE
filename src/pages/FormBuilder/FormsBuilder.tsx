import React, { Component } from "react";
import { ReactFormBuilder, ElementStore } from "react-form-builder2";
import Demobar from "./demobar";
import { get } from "./request.js";
import { variable } from "./variables";
import "./form.css";
import { api } from "../../services/api";
import { environment } from "../../config/environment";
import UserHeader from "../../components/UserHeader";
const getUrl = (cid: string) =>
  `https://safe-springs-35306.herokuapp.com/api/formdata?cid=${cid}`;
const labelName = localStorage.getItem("formlabelname");
let jsonData = [];
const content = [
  {
    id: "C68B673B-3948-4D62-AF6D-5320CAB4DDB7",
    element: "TextInput",
    text: "Text Input",
    required: true,
    canHaveAnswer: true,
    field_name: "text_input_EEA6F5DA-5C2C-43D3-AB62-62385E3925D9",
    label: "<div>Name</div>\n",
  },
  {
    id: "6DAF1E95-44F6-4E5B-ABDD-D9A6BCA2C08A",
    element: "TextInput",
    text: "Text Input",
    required: true,
    canHaveAnswer: true,
    field_name: "text_input_C5305462-9704-4E77-BFAB-A43C14AB2B8E",
    label: "<div>Email</div>\n",
  },
];

type Props = {};

type State = {
  formId: string;
};
class FormsBuilder extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { formId: "1" };
    this.formId = this.state.formId;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(): void {
    this.retriveForms();
    this.onLoad();
  }

  formId = "";

  handleChange(event: { target: { value: string } }) {
    this.formId = event.target.value;
    const url = getUrl(this.formId);
    console.log("handleChange", url);
    ElementStore.dispatch("load", { loadUrl: url });
    this.setState({ formId: this.formId });
  }
  async retriveForms() {
    let response = await api.get(
      `form/readfile/${environment.formLayoutPath}/${labelName}/${environment.professionalData}`
    );
    jsonData = response.data;
    console.log(jsonData);
  }

  onLoad = () => {
    const url = `form/readfile/${environment.formLayoutPath}/${labelName}/${environment.professionalData}`;
    console.log("onLoad", url);
    return get(url);
  };

  render() {
    return (
      <div className="App">
        <UserHeader />
        <Demobar variables={variable} />
        <ReactFormBuilder url="./editor.json" onLoad={this.onLoad} />,
      </div>
    );
  }
}

export default FormsBuilder;
