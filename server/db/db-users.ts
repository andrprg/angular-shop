export const USERS = [
    {
        id: 1,
        name:'Kukko Michail',
        email: 'test@test.ru',
        password: 'test',
    }
];
export function authenticate(email: string, password: string) {
    console.log('authenticate', email, password, USERS);
    const user: any = USERS.find(user => user.email === email);

    if (user && user.password == password) {
        return user;
    } else {
        return undefined;
    }
}