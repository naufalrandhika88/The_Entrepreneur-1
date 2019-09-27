# The Entrepreneur Society

### Comment/Notes
- [x] Finished (fetchable)
- [ ] Ongoing 

# Table

### Users Collection

| Name | Type | Description |
| ---- | ---- | ----------- |
| _id  | number | Auto-generated|
| email | string | Unique, no user will have the same email |
| user_role | string : enum | Either 'User' or 'Admin' |
| first_name | string | First name for user |
| last_name | string | Last name for user |
| password | string | password of account which has passed frontend verification, Hash(password+salt) |
| avatar | string/null | Display image in url for cloudinary |
| membership | string : enum | Either 'Basic' or 'Premium' |
| gender | string(male, female) / default (other) | User's gender if they want to state it |

  
# Authentication

- [X] Register (SIGN UP SCENE)

| A | B |
| ----------- | ------------- |
| FETCH       | /api/auth/sign-up  |
| METHOD      | POST  |
| Description | Endpoint used for user registration |

Please use email with @admin.tes to grant Admin role.

Request Body
```
{
  email: string,
  first_name: string,
  last_name: string,
  password: string,
}
```

Response Value
```
{
  success: boolean,
  data: {
    _id : number,
    email : string,
    user_role : 'User' | 'Admin',
    first_name : string,
    last_name : string,
    avatar : string | null,
    membership : 'Basic' | 'Premium',
    gender : 'Male' | 'female' | 'Other',
  },
  message : "User" + first_name + ' ' + last_name + "has been added",
  token : generated with JWT middleware, use this for session and authenticate each time fetching,
}
```
<br/>

- [X] Login (LOGIN SCENE)

| A | B |
| ----------- | ------------- |
| FETCH       | /api/auth/sign-in  |
| METHOD      | POST |
| Description | Endpoint used for login account |

Request Body
```
{
  email: string,
  password: string,
}
```

Response Value
```
{
  success: boolean,
  data: {
  _id : number,
  email : string,
  user_role : 'User' | 'Admin',
  first_name : string,
  last_name : string,
  avatar : string | null,
  membership : 'Basic' | 'Premium',
  gender : 'Male' | 'female' | 'Other',
  },
  message: "Login Success",
  token : generated with JWT middleware, use this for session and authenticate each time fetching,
}
