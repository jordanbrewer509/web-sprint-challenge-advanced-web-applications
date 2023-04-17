// Import the Spinner component into this file and test
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Spinner from "./Spinner"

// that it renders what it should for the different props it can take.

test('sanity', () => {
  expect(true).toBe(true)
})

test('spinner works', () => {
  render(<Spinner on={true}/>)
  const text = screen.getByText('Please wait...')
  waitFor(() => {expect(text).toBeInTheDocument()})
})