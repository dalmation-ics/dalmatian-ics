import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import {
  Card,
  CardFooter,
  CardTitle,
  CardBody,
  CardHeader,
  CardText, CardDeck, CardColumns, Row,
} from 'reactstrap';

import * as s from 'src/_core/res/strings';

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
              cssClass={'col-xs-6 col-sm-3 col-md-2'}>
          <CardHeader>
            <CardTitle>{formData.fileName}</CardTitle>
          </CardHeader>
          <CardBody className={'text-center'}>
            <h3><FontAwesome name='list-alt' icon='list-alt'/></h3>
            <CardText>{formData.fileType || s.DATA_TYPE_FORM}</CardText>
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
      return <h3>Please go back and load a .dalmatianics or .bcics file</h3>;

    if (formList.length === 0)
      return <Card>
        <CardHeader><CardTitle>This suite is empty</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>
            Press the above "Add form" button to add a form to the
            suite.
          </CardText>
        </CardBody>
      </Card>;

    return (
        <div className="container-fluid">
          <CardColumns>
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
          </CardColumns>
        </div>
    );
  }
}
