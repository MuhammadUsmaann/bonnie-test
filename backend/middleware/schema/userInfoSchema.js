const Joi = require('joi');

const postSchema = Joi.object({
  name: Joi.string().label('First Name').messages({
    'string.empty': 'First Name cannot be empty',
    'any.required': `First Name is a required field`,
    'string.base': `First Name should be a type of 'text'`,
  }),
  lastname: Joi.string().label('Last Name').messages({
    'string.empty': 'Last Name cannot be empty',
    'any.required': `Last Name is a required field`,
    'string.base': `Last Name should be a type of 'text'`,
  }),
  username: Joi.string().required().label('Last Name').messages({
    'string.empty': 'Last Name cannot be empty',
    'any.required': `Last Name is a required field`,
    'string.base': `Last Name should be a type of 'text'`,
  }),
  email: Joi.string().email().required().label('Email').messages({
    'string.empty': 'Email cannot be empty',
    'any.required': `Email is a required field`,
    'string.base': `Email should be a type of 'text'`,
    'string.email': `Must be a Valid Email!`,
  }),
  role: Joi.string().required().label('Role').messages({
    'string.empty': 'Role cannot be empty',
    'any.required': `Role is a required field`,
    'string.base': `Role should be a type of 'text'`,
  }),
  organization: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().optional().allow(null).label('Organization Name'),
        a3mId: Joi.number().optional().allow(null).label('Organization Id'),
        isDefault: Joi.boolean()
          .optional()
          .allow(null)
          .label('Organization is Default'),
      })
    )
    .optional()
    .allow(null)
    .label('Organization Id'),
  id: Joi.number().optional().allow(null).label('User Id'),
  status: Joi.string().optional().allow(null).label('User Status'),
});

const newUserSchemaValidation = async function (req, res, next) {
  const { error } = await postSchema.validate(req.body, { abortEarly: false });
  if (error)
    return res.status(400).send({
      code: 400,
      message: 'Schema Validation failed',
      errors: error.details,
    });

  next();
};

const patchSchema = Joi.object({
  name: Joi.string().label('User Name').messages({
    'string.empty': 'First Name cannot be empty',
    'any.required': `First Name is a required field`,
    'string.base': `First Name should be a type of 'text'`,
  }),
  lastname: Joi.string().label('Last Name').messages({
    'string.empty': 'Last Name cannot be empty',
    'any.required': `Last Name is a required field`,
    'string.base': `Last Name should be a type of 'text'`,
  }),
  username: Joi.string().label('Last Name').messages({
    'string.empty': 'Last Name cannot be empty',
    'any.required': `Last Name is a required field`,
    'string.base': `Last Name should be a type of 'text'`,
  }),
  email: Joi.string().email().label('Email').messages({
    'string.empty': 'Email cannot be empty',
    'any.required': `Email is a required field`,
    'string.base': `Email should be a type of 'text'`,
    'string.email': `Must be a Valid Email!`,
  }),
  role: Joi.string().label('Role').messages({
    'string.empty': 'Role cannot be empty',
    'any.required': `Role is a required field`,
    'string.base': `Role should be a type of 'text'`,
  }),
  organization: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().optional().allow(null).label('Organization Name'),
        a3mId: Joi.number().optional().allow(null).label('Organization Id'),
        isDefault: Joi.boolean()
          .optional()
          .allow(null)
          .label('Organization is Default'),
      })
    )
    .optional()
    .allow(null)
    .label('Organization'),
});

const updateUserSchemaValidation = async function (req, res, next) {
  const { error } = await patchSchema.validate(req.body, { abortEarly: false });
  if (error)
    return res.status(400).send({
      code: 400,
      message: 'Schema Validation failed',
      errors: error.details,
    });

  next();
};

module.exports = { newUserSchemaValidation, updateUserSchemaValidation };
