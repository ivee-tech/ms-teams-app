// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";

/**
 * The 'PersonalTab' component renders the main tab content
 * of your app.
 */
class Tab extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      context: {},
      forms: []
    }
  }

  //React lifecycle method that gets called once a component has finished mounting
  //Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount() {
    // Get the user context from Teams and set it in the state
    microsoftTeams.getContext((context: microsoftTeams.Context) => {
      this.setState({
        context: context
      });
    });
    // Next steps: Error handling using the error object
    fetch('http://localhost:4000/forms').then(response => {
      response.json().then(forms => {
        // this.formData = JSON.stringify(forms);
        console.log(forms);
        this.setState({ forms });
      });
    });
  }

  render() {

    const userName = Object.keys(this.state.context).length > 0 ? this.state.context['upn'] : "";
    const { forms } = this.state;

    return (
      <div>
        <h3>Hello World!</h3>
        <h1>Congratulations {userName}!</h1> <h3>This is the tab you made :-)</h3>
        <hr />
        <div>{JSON.stringify(forms)}</div>
      </div>
    );
  }
}
export default Tab;