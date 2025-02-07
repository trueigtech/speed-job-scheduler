import _ from 'lodash'

/**
 * @class WorkerBase
 * @classdesc Worker Base class for creating workers for business logic
 * and performing tasks while logging them properly.
 * @hideconstructor
 */
class WorkerBase {
  #_args = {}
  #_context = {}
  #_errors = {}
  #_successful = null
  #_failed = null
  #_result = null

  constructor(args = {}, context = {}) {
    this.#_args = args
    this.#_context = context
    this.#_errors = {}
    this.#_successful = null
    this.#_failed = null
    this.#_result = null
    this.#validateWorkerInputs()
  }

  get context() {
    return this.#_context
  }

  get args() {
    return this.#_args
  }

  get result() {
    return this.#_result
  }

  get failed() {
    return this.#_failed
  }

  get errors() {
    return this.#_errors
  }

  get successful() {
    return this.#_successful
  }

  get log() {
    return {
      info: (logTitle, argHash = {}) => {
        argHash.klass = this.constructor.name
        console.info(`[INFO] ${logTitle}`, argHash)
      },
      debug: (logTitle, argHash = {}) => {
        argHash.klass = this.constructor.name
        console.debug(`[DEBUG] ${logTitle}`, argHash)
      },
      error: (logTitle, argHash = {}) => {
        argHash.klass = this.constructor.name
        console.error(`[ERROR] ${logTitle}`, argHash)
      }
    }
  }

  async #tryExecuting() {
    if (_.size(this.errors)) {
      this.#_failed = true
      this.#_successful = false
      return
    }
    try {
      this.#_result = await this.run()
    } catch (error) {
      console.error('Exception raised in Worker', {
        klass: this.constructor.name,
        message: error.message,
        context: this.args,
        exception: error,
        userCtx: this.context
      })
      throw error
    }
    this.#_successful = !_.size(this.errors)
    this.#_failed = !!_.size(this.errors)
  }

  addError(attribute, errorMessage) {
    if (attribute !== _.camelCase(attribute)) {
      throw new Error(`${attribute} should be camel cased in addError()`)
    }
    console.debug('Custom Validation Failed', {
      klass: this.constructor.name,
      message: errorMessage,
      context: { attribute },
      userCtx: this.context,
      fault: this.errors
    })

    const errors = (this.#_errors[this.constructor.name] = this.#_errors[this.constructor.name] || {})
    if (!errors[attribute]) {
      return _.extend(errors, { [attribute]: `${_.startCase(attribute)} ${errorMessage}` })
    }
    errors[attribute] = Array.isArray(errors[attribute]) ? errors[attribute] : [errors[attribute]]
    errors[attribute].push(`${_.startCase(attribute)} ${errorMessage}`)
  }

  mergeErrors(errors) {
    _.defaults(this.#_errors, errors)
  }

  async #validateWorkerInputs() {
    const schema = this.constraints
    if (schema) {
      const valid = schema(this.#_args)
      if (!valid) {
        const validationErrors = schema.errors.map(error => error.message)
        _.extend(this.errors, { [this.constructor.name]: validationErrors })
        console.debug('Worker input Validation Failed', {
          klass: this.constructor.name,
          message: 'Validation Failed',
          context: this.args,
          userCtx: this.context,
          fault: this.errors
        })
      }
    }
  }

  static async run(...args) {
    console.info(`Worker Started: ${this.name}`, { wrap: 'start' })
    const instance = new this(...args)
    await instance.#tryExecuting()
    if (_.size(instance.errors)) throw instance.errors
    console.info(`Worker Finished: ${this.name}`, { wrap: 'end' })
    return instance.result
  }

  static async execute(...args) {
    console.info(`Worker Started: ${this.name}`, { wrap: 'start' })
    const instance = new this(...args)
    await instance.#tryExecuting()
    console.info(`Worker Finished: ${this.name}`, { wrap: 'end' })
    return instance
  }
}

export default WorkerBase