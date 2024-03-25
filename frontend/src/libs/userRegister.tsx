export default async function userRegister(username: string, userEmail: string, userPassword: string, userTel: string) {
    const response = await fetch("http://localhost:4000/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            email: userEmail,
            password: userPassword,
            tel: userTel,
            role: 'user'
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to register user");
    }

    return await response.json();
}
