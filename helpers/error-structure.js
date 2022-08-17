import _get from 'lodash/get'

export const errorWrapper = {
    getError
};

function getError (error) {
    let message = error
    if (error.isJoi) {
      message = _get(error, 'details[0].message', 'Something went wrong!')
    }

    return {
      status: 'error',
      message
    }
}