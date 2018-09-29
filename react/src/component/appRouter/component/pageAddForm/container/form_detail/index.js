import React, {Component} from 'react';

type props = {
  form: any
}

class FormDetail extends Component<props> {

  componentDidMount() {

  }

  render() {

    const {form} = this.props;

    if (form) {
      return (
          <div className="card card-default">
            <h3 className="card-title">{form.name}</h3>
            <div className="card-body">
              <div className="scrollBox"
                   dangerouslySetInnerHTML={{
                     __html: form.detail || '',
                   }}/>
            </div>
          </div>
      );
    } else {
      return (
          <div testid="FormDetailNoFormSelected"
               className="panel panel-default">
            <div className="panel-body">
              <p>No Form Selected</p>
            </div>
          </div>
      );
    }

  }

}

export default FormDetail;
