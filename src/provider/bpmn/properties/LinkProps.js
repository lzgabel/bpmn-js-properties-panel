import { TextFieldEntry, isTextFieldEntryEdited } from '@bpmn-io/properties-panel';

import {
  useService
} from '../../../hooks';

import {
  getLinkEventDefinition,
  isLinkSupported
} from '../utils/EventDefinitionUtil';

/**
 * @typedef { import('@bpmn-io/properties-panel').EntryDefinition } Entry
 */

/**
 * @returns {Array<Entry>} entries
 */
export function LinkProps(props) {
  const {
    element
  } = props;

  if (!isLinkSupported(element)) {
    return [];
  }

  return [
    {
      id: 'linkName',
      component: <LinkName element={ element } />,
      isEdited: isTextFieldEntryEdited
    },
  ];
}

function LinkName(props) {
  const { element } = props;

  const commandStack = useService('commandStack');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const linkEventDefinition = getLinkEventDefinition(element);

  const getValue = () => {
    return linkEventDefinition.get('name');
  };

  const setValue = (value) => {
    commandStack.execute('properties-panel.update-businessobject', {
      element: element,
      businessObject: linkEventDefinition,
      properties: {
        'name': value
      }
    });
  };

  return TextFieldEntry({
    element,
    id: 'linkName',
    label: translate('Name'),
    getValue,
    setValue,
    debounce
  });
}
