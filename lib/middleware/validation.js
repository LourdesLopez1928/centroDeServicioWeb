import withJoi from "next-joi";
import _get from "lodash/get"
import _replace from "lodash/replace"

export default withJoi({
  onValidationError: (req, res, error) => {
    return res.status(400).json({
      status: 'error',
      message: _get(error, 'details[0].message', 'Something went wrong!'),
    });
  },
});