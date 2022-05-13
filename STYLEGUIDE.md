### Code Style
- Strip trailing whitespace
- 2 soft indent (spaces)
- 100 char line limit
- no semi-colons

### Import Statements
- Sort the imports in an alphabetical order
- Group the imports based on their type

```
import React, { Component } from 'react';

// Components
import Header from '../Header';

// Helper Components
import Loader from '../../Loader';

// Utils
import { ifDev } from '../utils';

// Styles
import './app.scss';
```

### Method Organization
Our components are organized in order of life-cycle events. Functions are
ordered alphabetically. We recommend using an add-on for your editor for sorting
if available.


### Self Closing Tags
Components without children should be self closed.

`<Example />`


### Formatting Attributes
Indent attributes for elements as shown below

```
<input
  type="text"
  value={this.props.example}
/>
```

### Naming convention
- CSS class names should have hyphenated naming pattern. Example -- `breeding-modal-content`
- Variables should follow snake case pattern. Example -- `horse_type`
- Functions/Methods should follow camel case pattern. Example -- `getHorseInfo`
- Constants should follow upper snake case pattern. Example -- `API_URL`


### CSS
- Use em, rem instead of px
