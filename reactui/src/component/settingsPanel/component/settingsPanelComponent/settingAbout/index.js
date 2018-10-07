// @flow
import {Component} from 'react';
import * as React from 'react';
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardDeck,
  CardFooter, CardHeader,
} from 'reactstrap';
import DeveloperCardStack from './container/developerCardStack';
import {connect} from 'react-redux';

class SettingAbout extends Component<{}> {

  render() {
    return (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Dalmatian ICS team</CardTitle>
            </CardHeader>
            <CardBody>
              <p>
                Dalmatian ICS is the continuation of BC_ICS, an Incident
                Command System form editor and manager. Originally designed
                for Eastside Fire & Rescue in Washington State, the utility
                of Dalmatian ICS extends to any group who rely on the
                creation and distribution of ICS forms.
              </p>
            </CardBody>
          </Card>
          <CardDeck>
            <DeveloperCardStack className={'col-xs-12 col-sm-8'}/>
            <Card className={'col-xs-12 col-sm-4'}>
              <CardHeader>
                <CardTitle>Technical stack</CardTitle>
              </CardHeader>
              <CardBody>
                <dl>
                  <dt>Dev platform:</dt>
                  <dd> NodeJS (Javascript / ES6 / ES7 /
                    ECMAScript)
                  </dd>
                  <dt>UI & State:</dt>
                  <dd>ReactJS & ReduxJS with FlowJS</dd>
                  <dt>OS frame:</dt>
                  <dd>ElectronJS with Typescript</dd>
                  <dt>Icons:</dt>
                  <dd>Font Awesome</dd>
                  <dt>UX & style:</dt>
                  <dd>Twitter bootstrap</dd>
                </dl>
              </CardBody>
            </Card>
          </CardDeck>
        </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(SettingAbout);
