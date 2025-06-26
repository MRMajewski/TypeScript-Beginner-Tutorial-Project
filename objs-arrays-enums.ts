
enum Role {ADMIN='ADMIN', READ_ONLY='READ ONLY', USER='USER'};


const person = {
    name: "Martin",
    age: 35,
    hobbies: ['MMA', "Manga"],
    role: Role.ADMIN

}

console.log(person.name);

for(const hobby of person.hobbies)
{
    console.log(hobby);
}

console.log(person.hobbies[1]);
console.log(person.role);