// Definición del tipo de usuario
//Recordatorio: Nunca pasar password por props. El backend nunca tiene que devolver el password ni siquiera hasheado
interface User {
    _id: string;
    name: string;
    userName: string;
    age: number;
    email: string;
    profilePicture: string;
    bio: string;
}

export default User;