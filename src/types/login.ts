type Login = { username: string; token: string; role: string; refreshToken: string };

const defaultLoginValue: Login = {
    username: "",
    token: "",
    role: "",
    refreshToken: "",
};

export {Login, defaultLoginValue };
