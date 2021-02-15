/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import {App} from '@inertiajs/inertia-react'
import React from 'react'
import { render } from 'react-dom'

const el = document.getElementById('app')

render(
  <App
    initialPage={JSON.parse(el.dataset.page)}
    resolveComponent={name => require(`./Pages/${name}`).default}
  />,
  el
)

