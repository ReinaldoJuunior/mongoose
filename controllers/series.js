const index = async ({Serie}, req, res) =>  {
    try{
        const found = await Serie.find({})
        res.render('series/index', {series: found})
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

module.exports = {
    index, novaProcess, novaForm
}