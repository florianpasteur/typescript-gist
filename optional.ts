// Example type
type UserInfo = {
    username: string,
    email: string
};

type Present<T> = { exists: true, value: T };
type Absent = {exists: false};
type Optional<T> = Present<T> | Absent;