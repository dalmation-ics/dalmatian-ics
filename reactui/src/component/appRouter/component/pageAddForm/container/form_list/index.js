import React, {Component} from 'react';
import {
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  CardTitle,
  CardText,
  Button,
} from 'reactstrap';

type propTypesFormList = {
  forms: Array<any>,
  selected: any,
  onSelect: (any) => any,
  onSubmit: (any) => any,
  onClickOpenUpdatePanel: (any) => any,
};

class FormList extends Component<propTypesFormList> {

  render() {

    const {forms, selected, onSelect, onSubmit} = this.props;

    if (forms) {

      return (
          <ul testid="FormList" className="list-group scrollBox">
            {forms.map(f =>
                <FormListItem
                    itemId={f.id}
                    title={f.name}
                    detail={f.detail}
                    key={f.id}
                    onSelect={onSelect}
                    onSubmit={onSubmit}
                    isSelected={f.id === selected}/>,
            )}
          </ul>
      );

    } else {

      return (
          <div testid="FormListNoData">
            <Card color="warning">
              <CardHeader>
                <CardTitle>
                  Warning: no form data
                </CardTitle>
              </CardHeader>
              <CardBody>
                <CardText>
                  No form data has been downloaded yet!
                </CardText>
                <CardText>
                  Please use the form updater to get current
                  versions of the BCICS forms
                </CardText>
              </CardBody>
              <CardFooter>
                <Button
                    onClick={this.props.onClickOpenUpdatePanel}>
                  Show/Hide Updater window
                </Button>
              </CardFooter>
            </Card>
          </div>
      );

    }

  }

}

type propTypesFormListItem = {
  itemId: any,
  title: string,
  detail: string,
  isSelected: boolean,
  onSelect: (any) => any,
  onSubmit: (any) => any,
};

class FormListItem extends Component<propTypesFormListItem> {

  render() {

    const {itemId, isSelected, onSelect, title, onSubmit} = this.props;

    return (
        <li className={`list-group-item ${isSelected ? 'active' : ''}`}
            onClick={() => {
              if (onSelect)
                onSelect(itemId);
            }}
            onDoubleClick={() => {
              if (onSubmit)
                onSubmit(itemId);
            }}
            testid={isSelected ? 'FormListItemSelected' : null}
        >
          {itemId} | {title}
        </li>
    );

  }

}

export default FormList;
