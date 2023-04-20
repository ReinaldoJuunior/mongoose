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
        const saved = await serie.save()
        console.log('saved 1')
        res.redirect('/series')
        return saved
    }catch(err){
        res.render(err)
    }
}

const novaForm = (req, res) => {
    console.log('saved 2')
    res.render('series/nova')
}

const excluir = async ({ Serie }, req, res) => {
    try{
        const remove = await Serie.deleteOne({
            _id: req.params.id
        })
        res.redirect('/series')
        return remove
    }catch(err){
        res.send(err)
    }
}

const editarProcess = async ({Serie}, req, res) => {
    try{
        const serie = await Serie.findOneAndUpdate({__id: req.params.id})
        serie.name = req.body.name
        serie.status = req.body.status
        await serie.save()
        res.redirect('/series')
    }catch(err){
        res.render(err)
    }
}

const editarForm = async ({Serie}, req, res) => {
    try{
        const serie = await Serie.findOne({ _id: req.params.id })
        res.render('series/editar', { serie, labels })
        return serie
    }catch(err){
        res.send(err)
    }
}

module.exports = {
    index, novaProcess, novaForm, excluir, editarForm, editarProcess
}