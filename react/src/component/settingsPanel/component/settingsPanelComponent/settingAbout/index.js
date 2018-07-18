// @flow
import React, {Component} from 'react';
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardDeck,
  CardFooter,
} from 'reactstrap';
import DeveloperCardStack from './container/developerCardStack';

class SettingAbout extends Component<{}> {

  render() {
    return (
        <Card>
          <CardTitle>About</CardTitle>
          <CardBody>
            <CardDeck>
              <Card className={'col-xs-12 col-sm-8'}>
                <CardTitle>Dalmatian ICS team</CardTitle>
                <CardBody>
                  <p>
                    Dalmatian ICS is the continuation of BC_ICS, an Incident
                    Command System form editor and manager. Originally designed
                    for Eastside Fire & Rescue in Washington State, the utility
                    of Dalmatian ICS extends to any group who rely on the
                    creation and distribution of ICS forms.
                  </p>
                </CardBody>
                <CardFooter>
                  <CardText>Developers</CardText>
                  <DeveloperCardStack/>
                </CardFooter>
              </Card>
              <Card className={'col-xs-12 col-sm-4'}>
                <CardTitle>Technical stack</CardTitle>
                <CardBody>
                  <dl>
                    <dt>Dev platform:</dt>
                    <dd> NodeJS (Javascript / ES6 / ES7 /
                      ECMAScript)
                    </dd>
                    <dt>UI & State:</dt>
                    <dd> ReactJS & ReduxJS</dd>
                    <dt>OS frame:</dt>
                    <dd> ElectronJS</dd>
                    <dt>Icons:</dt>
                    <dd> Font Awesome</dd>
                    <dt>UX & style:</dt>
                    <dd> Twitter bootstrap</dd>
                  </dl>
                </CardBody>
              </Card>
            </CardDeck>
          </CardBody>
        </Card>
    );
  }
}

export default SettingAbout;
