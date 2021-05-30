export const info = {
    openapi: "3.0.0",
    info: {
        "version": "1.0.0",
        "title": "Photogrid API",
        "description": "API documentation of Photogrid",
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    },
    servers: [
        {
            "url": "/api/",
            "description": "All Environments"
        }
    ],
    securitySchemes: {
        "ApiKeyAuth": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    }
}

export const servers = (url: string) =>{
    return [
        {
            "url": url ? `/api/${url}` : "/api",
            "description": "All Environments"
        }
    ]
}