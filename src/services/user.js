module.exports = (app) => {
    const findAll = () => {
        return app.db('users').select();
    };

    const save = (user) => {
        if(!user.name) return {error:'nome é um atributo obrigatório'};
        if(!user.mail) return {error:'email é um atributo obrigatório'};
        if(!user.passwd) return {error:'senha é um atributo obrigatório'};
        return app.db('users').insert(user,'*');
    };

    return {findAll,save}
}