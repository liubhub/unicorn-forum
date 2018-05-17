import React from 'react'
import {render} from 'react-dom'

import Comments from "./components/ThreadComments";

render(<Comments/>, document.querySelector('#comments .container'));