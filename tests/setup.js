import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => cleanup())

// jsdom does not implement native modal rendering/focus trapping. Test React
// state and dialog lifecycle here; layout and native behavior need browser QA.
HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute('open', '')
}
HTMLDialogElement.prototype.close = function () {
  this.removeAttribute('open')
}
Element.prototype.scrollIntoView = vi.fn()
window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false, media: query, addEventListener: vi.fn(), removeEventListener: vi.fn(),
}))
