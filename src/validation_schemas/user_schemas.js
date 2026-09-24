

export const registerUserSchema = {
    firstName: {
        isString: {
            errorMessage: 'First name must be a string',
        },
        isLength: {
            options: { min: 2, max: 100 },
            errorMessage: 'First name must be between 2 and 100 characters',
        },
        notEmpty: {
            errorMessage: 'First name is required',
        },
    },
    lastName: {
        isString: {
            errorMessage: 'Last name must be a string',
        },
        isLength: {
            options: { min: 2, max: 100 },
            errorMessage: 'Last name must be between 2 and 100 characters',
        },
        notEmpty: {
            errorMessage: 'Last name is required',
        },
    },
    email: {
        isEmail: {
            errorMessage: 'Invalid email address',
        },
        notEmpty: {
            errorMessage: 'Email is required',
        },
    },
    role:{
        isIn: {
            options: [['staff', 'customer', 'admin']],
            errorMessage: 'Role must be either staff, customer, or admin',
        },notEmpty: {
            errorMessage: 'Role is required',
        },
    },
    password: {
        isString: {
            errorMessage: 'Password must be a string',
        },
        isLength: {
            options: { min: 6, max: 100 },
            errorMessage: 'Password must be between 6 and 100 characters',
        },
        notEmpty: {
            errorMessage: 'Password is required',
        },
    },

}



export const loginUserSchema = {
    email: {
        isEmail: {
            errorMessage: 'Invalid email address',
        },
        notEmpty: {
            errorMessage: 'Email is required',
        },
    },
    password: {
        isString: {
            errorMessage: 'Password must be a string',
        },
        isLength: {
            options: { min: 6, max: 100 },
            errorMessage: 'Password must be between 6 and 100 characters',
        },
        notEmpty: {
            errorMessage: 'Password is required',
        },
    },
};
