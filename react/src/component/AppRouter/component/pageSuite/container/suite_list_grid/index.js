import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {Card, CardHeader, CardFooter, CardTitle, CardBody} from 'reactstrap';

type propsSuiteListGridElement = {
  formData: object,
  onFormClick: (Event) => any,
  onFormDoubleClick: (Event) => any,
};

export class SuiteListGridElement extends Component<propsSuiteListGridElement> {

  render() {

    const {
      onFormClick,
      onFormDoubleClick,
      formData,
    } = this.props;

    //compute how much to shrink the name
    let nameFontScalar = 1;
    if (formData && formData.name && formData.name.length > 0) {
      nameFontScalar = 1.2 -
          (0.001 * formData.name.length * formData.name.length);
      nameFontScalar = Math.max(nameFontScalar, 0.8);
    }
    return (
        <Card color='info'
              onClick={() => {
                if (onFormClick)
                  onFormClick(formData.uuid);
              }}
              onDoubleClick={() => {
                if (onFormDoubleClick)
                  onFormDoubleClick(formData.uuid);
              }}
              style={{
                margin: 2,
                width: '25%',
                maxWidth: 350,
                minWidth: 240,
              }}>
          <CardTitle>{formData.fileName}</CardTitle>
          <CardBody>
            <h3><FontAwesome icon='list-alt'/></h3>
          </CardBody>
          <CardFooter>
            <p>{formData.id}</p>
            <p style={{
              fontStretch: 'condensed',
              fontSize: nameFontScalar + 'em',
              height: '4rem',
              overflowY: 'auto',
            }}>{formData.name || ''}</p>
          </CardFooter>
        </Card>);
  }

}

type propTypesSuiteListGrid = {
  formList: Array<any>,
  onFormClick: (Event) => any,
  onFormDoubleClick: (Event) => any,
};

export default class SuiteListGrid extends Component<propTypesSuiteListGrid> {

  render() {

    const {
      onFormClick,
      onFormDoubleClick,
      formList,
    } = this.props;

    if (formList === undefined || formList.map === undefined)
      return <h3>Please go back and load a bcics file</h3>;

    if (formList.length === 0)
      return <div className={'panel panel-info'}>
        <div className={'panel-heading'}><h2>This suite is empty</h2>
        </div>
        <div className={'panel-body'}>
          <p>
            Press the above "Add form" button to add a form to the
            suite.
          </p>
        </div>
      </div>;

    return (
        <div className="container-fluid">
          <div className={'row'}>
            <h3>Forms in archive</h3>
          </div>
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'stretch',
            overflowY: 'auto',
          }}>
            {formList.map((form, index) => {
              return (
                  <SuiteListGridElement
                      formData={form}
                      key={'formSuiteGrid' + index}
                      onFormClick={onFormClick}
                      onFormDoubleClick={onFormDoubleClick}
                  />
              );
            })}
          </div>
        </div>
    );
  }
}
