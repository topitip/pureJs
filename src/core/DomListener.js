import {capitalize} from '@core/utils'

export class DomListener {
  constructor($root, listeners = [], removeListeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`)
    }
    this.$root = $root
    this.listeners = listeners
    this.removeListeners = removeListeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(
            `Method ${method} is not implemented in ${name} Component`
        )
      }
      this[method] = this[method].bind(this)
      // Тоже самое что и addEventListener
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.removeListeners.forEach(listener => {
      const method = getMethodName(listener)
      // Тоже самое что и removeEventListener
      this.$root.off(listener, this[method])
    })
  }
}

// input => onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
