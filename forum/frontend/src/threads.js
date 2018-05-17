import React from 'react'
import {render} from 'react-dom'

import ThreadList from "./components/ThreadList"

render(<ThreadList />, document.querySelector('#threads .section .container'));