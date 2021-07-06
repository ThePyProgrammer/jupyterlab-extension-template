import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { requestAPI } from './handler';

/**
 * Initialization data for the name_of_package extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'name_of_package:plugin',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension name_of_package is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('name_of_package settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for name_of_package.', reason);
        });
    }

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The name_of_package server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
