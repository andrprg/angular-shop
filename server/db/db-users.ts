interface User {
    id: string;
    name:string;
    email: string;
    password: string;
};

export const USERS: User[] = [
    {
        id: '1',
        name:'Kukko Michail',
        email: 'test@test.ru',
        password: 'test',
    }
];
export function authenticate(email: string, password: string) {
    const user: any = USERS.find(user => user.email === email);

    if (user && user.password == password) {
        return user;
    } else {
        return undefined;
    }
}