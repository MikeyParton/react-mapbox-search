import React from 'react'
import { shallow } from 'enzyme'
import { SearchBox, getResults } from './index.js'

it('renders without crashing', () => {
  const wrapper = shallow(<SearchBox />)
})

it('provides access to the getResults function', () => {
  expect(typeof getResults).toEqual('function')
})
