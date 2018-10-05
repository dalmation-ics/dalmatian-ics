// @flow
import * as React from 'react';
import {Component} from 'react';
import SettingAbout from './settingAbout';
import SettingLegal from './settingLegal';
import {SettingsTheme} from './theme_selector';

// select what settings items will actually be displayed by commenting them
// out in the following export

export type SettingsPanelSection = {
  title: string,
  BodyComponent: Component<any | null, any | null> | React.Node
}

///List of settings items
const list: Array<SettingsPanelSection> = [
  {title: 'Legal', BodyComponent: <SettingLegal/>},
  {title: 'Look and feel', BodyComponent: <SettingsTheme/>},
  {title: 'About', BodyComponent: <SettingAbout/>},
];

export default list;
