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
```

- [X] Forum (FORUM SCENE - ALL FORUM ENDPOINT)

### 1. Create Forum
| A | B |
| ----------- | ------------- |
| FETCH       | /api/feature/create-forum  |
| METHOD      | POST |
| Description | Endpoint used for create forum |

Please use email with @admin.tes to grant Admin role.

Request Body
```
{
	forum_name: string,
    category: string,
    description: string,
    image: string
}
```

Response Value
```
{
    success: true,
    data: {
        id: number,
        id_user: number,
        cdate: timestamptz,
        udate: timestamptz,
        forum_name: string,
        category: string,
        description: string,
        image: string[],
        likes: number,
    },
    message: 'Forum created successfully',
}
```

### 2. Get All Forum
| A | B |
| ----------- | ------------- |
| FETCH       | /api/feature/get-forums  |
| METHOD      | GET |
| Description | Endpoint used for get all forum |

Response Value
```
{
    success: true,
    data: {
        "umum": [
            {
                id: number,
                id_user: number,
                cdate: timestamptz,
                udate: timestamptz,
                forum_name: string,
                category: string,
                description: string,
                image: string[],
                likes: number,
            }
        ],
        "jual": [
            {
                id: number,
                id_user: number,
                cdate: timestamptz,
                udate: timestamptz,
                forum_name: string,
                category: string,
                description: string,
                image: string[],
                likes: number,
            }
        ],
        "beli": [
            {
                id: number,
                id_user: number,
                cdate: timestamptz,
                udate: timestamptz,
                forum_name: string,
                category: string,
                description: string,
                image: string[],
                likes: number,
            }
        ]
    },
    message: 'Successfully retrieve forums data',
}
```

### 3. Get Forum by ID
| A | B |
| ----------- | ------------- |
| FETCH       | /api/feature/get-forum/:id  |
| METHOD      | GET |
| Description | Endpoint used for get forum by id |

Response Value
```
{
    success: true,
    data: {
        id: number,
        id_user: number,
        cdate: timestamptz,
        udate: timestamptz,
        forum_name: string,
        category: string,
        description: string,
        image: string[],
        likes: number,
    },
    message: 'Successfully retrieve forum data by id',
}
```

### 4. Update Forum
| A | B |
| ----------- | ------------- |
| FETCH       | /api/feature/update-forum/:id  |
| METHOD      | POST |
| Description | Endpoint used for update forum |

Please use email with @admin.tes to grant Admin role.

Response Value
```
{
    success: true,
    data: {
        id: number,
        id_user: number,
        cdate: timestamptz,
        udate: timestamptz,
        forum_name: string,
        category: string,
        description: string,
        image: string[],
        likes: number
    },
    message: 'Successfully delete forum',
}
```

### 5. Delete Forum
| A | B |
| ----------- | ------------- |
| FETCH       | /api/feature/delete-forum/:id  |
| METHOD      | GET |
| Description | Endpoint used for delete forum |

Please use email with @admin.tes to grant Admin role.

Response Value
```
{
    success: true,
    data: {},
    message: 'Successfully delete forum',
}
```