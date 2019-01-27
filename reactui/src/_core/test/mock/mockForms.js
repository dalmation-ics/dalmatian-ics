class Form {

    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

}

module.exports = [
    new Form(
        'ics204',
        'dummy test forms',
        'An Assignment List'),
    new Form(
        'ics214',
        'dummy test forms',
        'An Assignment List 2'),

];