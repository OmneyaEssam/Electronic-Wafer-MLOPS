import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { requestAPI } from './handler';

/**
 * Initialization data for the Wafer mlops extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'Wafer mlops:plugin',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension Wafer mlops is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('Wafer mlops settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for Wafer mlops.', reason);
        });
    }

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The Wafer MLOPS server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
