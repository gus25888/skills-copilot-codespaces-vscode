function skillsMember() {
    var skills = ['HTML', 'CSS', 'JS'];
    var member = {
        name: 'Rafael',
        skills: skills,
        age: 33,
        sayHello: function () {
            console.log('Hello');
        }
    };
    console.log(member.skills);
    member.sayHello();
}