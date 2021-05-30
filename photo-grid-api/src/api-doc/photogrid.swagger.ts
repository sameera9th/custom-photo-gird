import { info, servers } from './info.swagger';

export const PhotoGridDoc = {
    "openapi": info.openapi,
    "info": info.info,
    "servers": servers(''),
    "tags": [
        {
            "name": "signin | signup",
            "description": "APIs for user signup and signin"
        },
        {
            "name": "photogird",
            "description": "APIs for photogrid"
        }
    ],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "components": {
        "schemas": {},
        "securitySchemes": info.securitySchemes
    },
    "paths": {
        "/user/signup": {
            "post": {
                "tags": [
                    "signin | signup"
                ],
                "summary": "Signup a new user into the system",
                "requestBody": {
                    "description": "User signup object",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/UserSignUp"
                            }
                        }
                    }
                },
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/UserSignUp"
                        }
                    },
                    "212": {
                        "description": "The email address has already been registered for a different account"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        },
        "/user/signin": {
            "post": {
                "tags": [
                    "signin | signup"
                ],
                "summary": "Signin a user into the system",
                "produces": [
                    "application/json"
                ],
                "requestBody": {
                    "description": "User signin object",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/UserSignIn"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/UserSignIn"
                        }
                    },
                    "212": {
                        "description": "Invalid login credentials"
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/BadRequest"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/grid/photo/default": {
            "get": {
                "tags": [
                    "photogird"
                ],
                "summary": "Retrieve default set of images",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "Data found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/PhotoResponse"
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/BadRequest"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/grid/photo": {
            "get": {
                "tags": [
                    "photogird"
                ],
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "summary": "Retrieve user selected set of images",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "Data found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SelectedPhotoResponse"
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/BadRequest"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Not authorized"
                    }
                }
            },
            "post": {
                "tags": [
                    "photogird"
                ],
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "requestBody": {
                    "description": "Select a photo into the album",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/SelectedAPhoto"
                            }
                        }
                    }
                },
                "summary": "Select a photo into the gallery",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "Successfully selected the photo",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/SelectedPhotoResponse"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/BadRequest"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Not authorized"
                    }
                }
            }
        },
        "/grid/photo/{photoId}": {
            "delete": {
                "tags": [
                    "photogird"
                ],
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "summary": "Deselect an image from the album",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "photoId",
                        "required": true,
                        "description": "photo Id",
                        "schema": {
                            "$ref": "#/definitions/PhotoId"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successfully deleted",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SelectedPhotoResponse"
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/BadRequest"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Not authorized"
                    }
                }
            }
        },
        "/grid/photo/order": {
            "post": {
                "tags": [
                    "photogird"
                ],
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "summary": "Re-order selected images in the album",
                "produces": [
                    "application/json"
                ],
                "requestBody": {
                    "description": "Re-order selected images array of objects",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/selectedPhotosRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Selected photo list successfully ordered",
                        "schema": {
                            "$ref": "#/definitions/selectedPhotosRequest"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/definitions/BadRequest"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "PhotoId": {
            "properties": {
                "photoId": {
                    "type": "integer",
                    "format": "int64",
                    "description": "Unique ID for a photo"
                }
            }
        },
        "UserSignIn": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string",
                    "required": true,
                    "description": "User's email address"
                },
                "password": {
                    "type": "string",
                    "required": true,
                    "description": "User's password"
                }
            }
        },
        "UserSignUp": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string",
                    "required": true,
                    "description": "User's email address"
                },
                "password": {
                    "type": "string",
                    "required": true,
                    "description": "User's password"
                }
            }
        },
        "PhotoResponse": {
            "type": "object",
            "properties": {
                "_id": {
                    "type": "string",
                    "description": "Monogo object Id for default photo"
                },
                "id": {
                    "type": "integer",
                    "format": "int64",
                    "description": "Unique ID for a photo"
                },
                "picture": {
                    "type": "string",
                    "description": "Picture name with extension"
                },
                "createdAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Record created date/time"
                },
                "updatedAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Record updated date/time"
                }
            }
        },
        "SelectedPhotoResponse": {
            "type": "object",
            "properties": {
                "_id": {
                    "type": "string",
                    "description": "Monogo object Id for default photo"
                },
                "id": {
                    "type": "integer",
                    "format": "int64",
                    "description": "Unique ID for a photo"
                },
                "picture": {
                    "type": "string",
                    "description": "Picture name with extension"
                }
            }
        },
        "SelectedAPhoto": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64",
                    "description": "Unique ID for a photo"
                },
                "picture": {
                    "type": "string",
                    "description": "Picture name with extension"
                }
            }
        },
        "selectedPhotosRequest": {
            "type": "object",
            "properties": {
                "selectedPhotos": {
                    "type": "array",
                    "description": "Errors",
                    "items": {
                        "type": "object",
                        "properties": {
                            "_id": {
                                "type": "string",
                                "description": "Monogo object Id for default photo"
                            },
                            "id": {
                                "type": "integer",
                                "format": "int64",
                                "description": "Unique ID for a photo"
                            },
                            "picture": {
                                "type": "string",
                                "description": "Picture name with extension"
                            }
                        }
                    }
                }
            }
        },
        "BadRequest": {
            "type": "object",
            "properties": {
                "errors": {
                    "type": "array",
                    "description": "Errors",
                    "items": {
                        "type": "object",
                        "properties": {
                            "message": {
                                "type": "string",
                                "description": "Details of the error occurred"
                            }
                        }
                    }
                }
            }
        }
    }
}