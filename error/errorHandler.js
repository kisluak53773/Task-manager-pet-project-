class errorHandler extends Error{
    constructor(status,message){
        super();
        this.status=status
        this.message=message
    }

    static badRequest(message){
        return new errorHandler(404,message)
    }

    static internalError(message){
        return new errorHandler(500,message)
    }

    static forbidden(message){
        return new errorHandler(403,message)
    }
}

module.exports= errorHandler