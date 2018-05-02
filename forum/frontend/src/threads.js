import React from 'react'
import {render} from 'react-dom'

import Threads from "./components/Thread/Thread.js"

render(<Threads/>, document.querySelector('#threads .section .container'));