const signIn = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: 'ajsdhflajkshdkfljaldsfhkajsfdklaskdjhlajsdhf',
                user: {
                    name: 'Silvio',
                    email: 'silvioramalho@gmail.com',
                },
            });
        }, 2000);
    });
}

export default signIn