exports.Faker = class Faker{
    static generateRandomString(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }

    static generateValidEmail() {
        const username = Faker.generateRandomString(8);
        const domain = Faker.generateRandomString(4);
        const tlds = ['com', 'net', 'org', 'gov', 'edu'];
        const randomTLD = tlds[Math.floor(Math.random() * tlds.length)];
        return `${username}@${domain}.${randomTLD}`;
    }

    static generateInvalidEmail() {
        // Generate an email with missing '@' character
        const username = Faker.generateRandomString(8);
        const domain = Faker.generateRandomString(6);
        return `${username}${domain}`;
    }
}