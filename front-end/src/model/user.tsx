export interface User{
    "id": number
    "email": string
    "user_role": 'User' | 'Admin'
    "full_name": string
    "avatar": string | null,
    "membership": 'Basic' | 'Premium',
    "gender": 'Male' | 'female' | 'Other',
    "token": string
}