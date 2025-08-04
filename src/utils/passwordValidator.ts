const isSecurePassword = (password: string) => {
    const regex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

    return regex.test(password);
};

export { isSecurePassword };
