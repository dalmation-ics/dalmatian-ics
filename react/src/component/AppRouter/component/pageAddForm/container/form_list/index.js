import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelFooter, PanelHeading} from 'react-bootstrap';

class FormList extends Component {

  static propTypes = {
    forms: PropTypes.arrayOf(PropTypes.any),
    selected: PropTypes.any,
    onSelect: PropTypes.func,
    onSubmit: PropTypes.func,
    onClickOpenUpdatePanel: PropTypes.func,
  };

  componentDidMount() {

  }

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
            <Panel className={'panel panel-warning'}>
              <Panel.Heading>
                Warning: no form data
              </Panel.Heading>
              <Panel.Body>
                <p>No form data has been downloaded yet! </p>
                <p>Please use the form updater to get current
                  versions of the BCICS forms</p>
              </Panel.Body>
              <Panel.Footer>
                <button className={'btn btn-warning btn-block'}
                        onClick={this.props.onClickOpenUpdatePanel}>
                  Show/Hide Updater window
                </button>
              </Panel.Footer>
            </Panel>
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
