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

- [X] Event (EVENT SCENE - ALL EVENT ENDPOINT)

### 1. Create Event
| A | B |
| ----------- | ------------- |
| FETCH       | /api/feature/create-event  |
| METHOD      | POST |
| Description | Endpoint used for create event |

Please use email with @admin.tes to grant Admin role.

Request Body
```
{
	event_name: string;
    event_name: string;
    category: 'Workshop' | 'Seminar';
    event_date: string;
    place: string;
    price: number;
    description: string;
    available_seat: number;
    image?: string | null;
}
```

Response Value
```
{
    success: boolean,
    data: {
        _id: number,
        event_name: string,
        category: string,
        event_date: string,
        place: string,
        price: string,
        description: string,
        available_seat: number,
        image: string,
    },
    message: 'Event created successfully',
}
```

### 2. Get Event by ID
| A | B |
| ----------- | ------------- |
| FETCH       | /api/feature/get-event/:id  |
| METHOD      | GET |
| Description | Endpoint used for get event by id |

Response Value
```
{
    success: boolean,
    data: {
        _id: number,
        event_name: string,
        category: string,
        event_date: string,
        place: string,
        price: string,
        description: string,
        available_seat: number,
        image: string,
    },
    message: 'Successfully retrieve event data',
}
```

### 3. Update Event
| A | B |
| ----------- | ------------- |
| FETCH       | /api/feature/update-event/:id  |
| METHOD      | POST |
| Description | Endpoint used for update event |

Please use email with @admin.tes to grant Admin role.

Request Body
```
{
	event_name: string;
    category: 'Workshop' | 'Seminar';
    event_date: string;
    place: string;
    price: number;
    description: string;
    available_seat: number;
    isImageChange?: boolean;
    image: string | null;
}
```

Response Value
```
{
    success: boolean,
    data: {
        _id: number,
        event_name: string,
        category: string,
        event_date: string,
        place: string,
        price: string,
        description: string,
        available_seat: number,
        image: string,
    },
    message: 'Event has been updated',
}
```

### 4. Delete Event
| A | B |
| ----------- | ------------- |
| FETCH       | /api/feature/delete-event/:id  |
| METHOD      | GET |
| Description | Endpoint used for delete event |

Please use email with @admin.tes to grant Admin role.

Response Value
```
{
    success: boolean,
    data: {},
    message: 'Successfully delete event',
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
    success: boolean,
    data: {
        _id: number,
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
    success: boolean,
    data: {
        "umum": [
            {
                _id: number,
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
                _id: number,
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
                _id: number,
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
    success: boolean,
    data: {
        _id: number,
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
    success: boolean,
    data: {
        _id: number,
        id_user: number,
        cdate: timestamptz,
        udate: timestamptz,
        forum_name: string,
        category: string,
        description: string,
        image: string[],
        likes: number
    },
    message: 'Successfully update forum',
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
    success: boolean,
    data: {},
    message: 'Successfully delete forum',
}
```

- [X] Comment (FORUM SCENE - ALL COMMENT ENDPOINT)

### 1. Create Comment
| A | B |
| ----------- | ------------- |
| FETCH       | /api/feature/add-comment  |
| METHOD      | POST |
| Description | Endpoint used for create comment |

Request Body
```
{
	id_forum: number;
    id_user: number;
    comment: string;
}
```

Response Value
```
{
    success: boolean,
    data: {
        _id: number,
        id_forum: number,
        id_user: number,
        comment: string,
        likes: number
    },
    message: 'Comment has been added',
}
```

### 2. Edit Comment
| A | B |
| ----------- | ------------- |
| FETCH       | /api/feature/èdit-comment  |
| METHOD      | POST |
| Description | Endpoint used for edit comment |

Request Body
```
{
	id_forum: number;
    comment: string;
    likes: number;
}
```

Response Value
```
{
    success: boolean,
    data: {
        comment: string,
        likes: number
    },
    message: 'Comment has been added',
}
```

### 3. Get Comment
| A | B |
| ----------- | ------------- |
| FETCH       | /api/feature/get-comment/:id  |
| METHOD      | GET |
| Description | Endpoint used for get comment |


Response Value
```
{
    success: boolean,
    data: {
        id_user: number,
        email: string,
        user_role: string,
        full_name: string,
        avatar: string,
        membership: string,
        gender: string,
        comment: string,
        likes: number,
    },
    message: 'Successfully retrieve comments',
}
```

- [X] Ticket (TRANSACTION SCENE - ALL TICKET ENDPOINT)

### 1. New Ticket
| A | B |
| ----------- | ------------- |
| FETCH       | /api/feature/new-ticket  |
| METHOD      | POST |
| Description | Endpoint used for new ticket |

Request Body
```
{
	id_event: number;
    id_user: number;
    type: 'Regular';
    qty: number;
    total: number;
}
```

Response Value
```
{
    success: boolean,
    data: {
        id_event: number,
        id_user: number,
        type: string,
        qty: number,
        total: number
    },
    message: 'Successfully purchased tickets',
}
```

### 2. Get Ticket
| A | B |
| ----------- | ------------- |
| FETCH       | /api/feature/get-ticket  |
| METHOD      | GET |
| Description | Endpoint used for get ticket |


Response Value
```
{
    success: boolean,
    data: {
        id_event: number,
        id_user: number,
        type: string,
        qty: number,
        total: number
    },
    message: 'User's ticket has been retrieved',
}
```

- [X] Inbox (INBOX SCENE - ALL INBOX ENDPOINT)
### 1. Get Inbox
| A | B |
| ----------- | ------------- |
| FETCH       | /api/feature/inbox  |
| METHOD      | GET |
| Description | Endpoint used for get inbox |


Response Value
```
{
    success: boolean,
    data: {
        id: number,
        message: string,
        inbox_date: string
    }
}
```

### 2. Delete Inbox
| A | B |
| ----------- | ------------- |
| FETCH       | /api/feature//delete-inbox/:id  |
| METHOD      | GET |
| Description | Endpoint used for delete inbox |


Response Value
```
{
    success: boolean,
    data: { },
    message: 'Successfully delete inbox',
}
```