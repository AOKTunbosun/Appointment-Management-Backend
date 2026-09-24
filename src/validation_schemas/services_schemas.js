
export const createServicesSchema = {
    name: {
        isString: {
            errorMessage: 'Service name must be a string'
        }, 
        notEmpty: {
            errorMessage: 'Service name must be provided'
        }
    }, 
    description: {
        isString: {
            errorMessage: 'Service description must be a string'
        },
        notEmpty: {
            errorMessage: 'Service description must be provided'
        },
        isLength: {
            options: {min: 2, max: 255},
            errorMessage: 'Service description length must be between 2 and 255.'
        }
    },
    averageDuration: {
        toInt:true,
        isInt: {
            errorMessage: 'Service duration must be an integer'
        },
        notEmpty: {
            errorMessage: 'Service duration must be provided'
        }
    },
    dailyCapacity: {
        toInt: true,
        isInt: {
            errorMessage: 'Service duration must be an integer'
        },
        notEmpty: {
            errorMessage: 'Service duration must be provided'
        }
    }
}


export const getServicebyIdSchema = {
    id: {
        isUUID: {
            errorMessage: 'Invalid service ID'
        }
    }
}