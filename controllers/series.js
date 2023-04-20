const labels =[
    {id: 'to-watch', name: 'Para Assistir'},
    {id: 'watching', name: 'Assistindo'},
    {id: 'watched', name: 'Assistido'}
]

const index = async ({Serie}, req, res) =>  {
    try{
        const found = await Serie.find({})
        res.render('series/index', {series: found, labels })
    }catch(err){
        res.render(err)
    }
}

const novaProcess = async ({Serie}, req, res) => {
    const serie = new Serie(req.body)

    try{
        await serie.save()
        res.redirect('/series')
    }catch(e){
        res.render('series/nova', {
            errors: Object.keys(e.errors)
        })
    }
}

const novaForm = (req, res) => {
    res.render('series/nova', { errors: []})
}

const excluir = async ({ Serie }, req, res) => {
    try{
        const remove = await Serie.deleteOne({
            _id: req.params.id
        })
        res.redirect('/series')
    }catch(err){
        res.send(err)
    }
}

const editarProcess = async ({Serie}, req, res) => {

    const serie = await Serie.findOne({ _id: req.params.id})
    serie.name = req.body.name
    serie.status = req.body.status
    await serie.save()

    try{
        res.redirect('/series')
    }catch(e){
        res.render('series/nova', {serie, labels,
            errors: Object.keys(e.errors)
        })
    }
}

const editarForm = async ({Serie}, req, res) => {
    try{
        const serie = await Serie.findOne({ _id: req.params.id })
        res.render('series/editar', { serie, labels, errors: [] })
    }catch(err){
        res.send(err)
    }
}

const info = async ({Serie},req, res) => {
    try {
        const serie = await Serie.findOne({_id: req.params.id})
        res.render('series/info', {serie})
    } catch (error) {
        res.render('series/info')
    }
}

const addComentario = async ({Serie}, req, res) =>{
    try {
        await Serie.updateOne({_id: req.params.id},
            {$push:
                { comments: req.body.comentario }
            })
        res.redirect('/series/info/' + req.params.id)
    } catch (e) {
        res.render('/series')

    }
}

module.exports = {
    index, novaProcess, novaForm, excluir, editarForm, editarProcess, info, addComentario
}