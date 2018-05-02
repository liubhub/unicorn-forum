import React from 'react'
import {render} from 'react-dom'

import ThreadList from "./components/ThreadList/ThreadList"

render(<ThreadList />, document.querySelector('#threads .section .container'));