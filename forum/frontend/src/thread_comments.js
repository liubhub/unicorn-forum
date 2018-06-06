import React from 'react'
import {render} from 'react-dom'

import Comments from "./components/ThreadComments";

render(<CommentsApp/>, document.querySelector('#comments .container'));