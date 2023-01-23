import IUserFull from "../../interfaces/userLogin"

export const requestWithoutEmail = {
    password: 'secret_admin'
}

export const requestWIthoutPassword = {
    email: 'admin@admin.com'
}

export const userFull = {
    dataValues : {
    id: 1,
    username: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    role: 'admin'
    }
}

export const userValid = {
    email: 'admin@admin.com',
    password: 'secret_admin'
}

export const userInvalid = {
    email: 'admin@admin.co',
    password:'secretadm'
}

export const mockToken = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjc0NTAzNjc3LCJleHAiOjE2NzQ1OTAwNzd9.yq7OgfoVIBF-DN-F4FO3Py4SWixuIuF4VUS8RLKvASw"
}